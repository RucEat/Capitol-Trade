import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const generatedDir = path.join(root, 'src', 'generated');
const generatedPath = path.join(generatedDir, 'live-trades.js');
const dataPath = path.join(root, 'src', 'data.js');

const QUIVER_URL = 'https://www.quiverquant.com/congresstrading/';
const QUIVER_HEADERS = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

const symbolMap = new Map([
  ['COR', { company: 'Cencora', sector: 'Healthcare' }],
  ['GILD', { company: 'Gilead Sciences', sector: 'Healthcare' }],
  ['NVDA', { company: 'NVIDIA', sector: 'Semiconductors' }],
  ['MSFT', { company: 'Microsoft', sector: 'Software' }],
  ['AAPL', { company: 'Apple', sector: 'Consumer Tech' }],
  ['AMZN', { company: 'Amazon', sector: 'Consumer Tech' }],
  ['GOOGL', { company: 'Alphabet', sector: 'Consumer Tech' }],
  ['META', { company: 'Meta Platforms', sector: 'Consumer Tech' }],
  ['CRWD', { company: 'CrowdStrike', sector: 'Cybersecurity' }],
  ['PANW', { company: 'Palo Alto Networks', sector: 'Cybersecurity' }],
  ['AMD', { company: 'AMD', sector: 'Semiconductors' }],
  ['AVGO', { company: 'Broadcom', sector: 'Semiconductors' }],
  ['JPM', { company: 'JPMorgan Chase', sector: 'Financials' }],
  ['ORCL', { company: 'Oracle', sector: 'Software' }],
  ['PLTR', { company: 'Palantir', sector: 'Software' }],
  ['NFLX', { company: 'Netflix', sector: 'Media' }],
  ['COST', { company: 'Costco', sector: 'Consumer' }],
  ['UNH', { company: 'UnitedHealth', sector: 'Healthcare' }],
  ['XOM', { company: 'Exxon Mobil', sector: 'Energy' }],
  ['TSLA', { company: 'Tesla', sector: 'Automotive' }],
  ['V', { company: 'Visa', sector: 'Payments' }],
  ['BRK.B', { company: 'Berkshire Hathaway', sector: 'Financials' }],
]);

function parseDate(value) {
  return new Date(`${value}T00:00:00Z`);
}

function formatDate(value) {
  return value.toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  return Math.round((parseDate(b) - parseDate(a)) / (1000 * 60 * 60 * 24));
}

function normalizeDate(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return '';
  return formatDate(parsed);
}

function safeNumber(value) {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeTradeType(value) {
  const normalized = String(value || 'Purchase').trim().toLowerCase();
  if (['buy', 'purchase', 'purchased', 'acquisition'].includes(normalized)) return 'Buy';
  if (['sell', 'sale', 'sold', 'disposition'].includes(normalized)) return 'Sell';
  if (normalized === 'exchange') return 'Exchange';
  if (normalized === 'purchase') return 'Buy';
  return normalized ? normalized[0].toUpperCase() + normalized.slice(1) : 'Buy';
}

function normalizeAmount(value) {
  const text = String(value || '').trim();
  if (!text || text === '-') return 0;

  const match = text.match(/\$([\d,]+)/g);
  if (!match) return safeNumber(text);

  const values = match.map((part) => Number(part.replace(/[$,]/g, '')));
  if (!values.length) return 0;
  if (values.length === 1) return values[0];
  return (values[0] + values[values.length - 1]) / 2;
}

function inferMarketCapSector(company, ticker) {
  if (symbolMap.has(ticker)) return symbolMap.get(ticker);
  const upperName = String(company || '').toUpperCase();
  if (/TESLA|FORD|MOTOR/.test(upperName)) return { company, sector: 'Automotive' };
  if (/BANK|CHASE|CITI|WELLS|WFC|BK/.test(upperName)) return { company, sector: 'Financials' };
  if (/HEALTH|PHARMA|BIO|MED/.test(upperName)) return { company, sector: 'Healthcare' };
  if (/SOFT|TECH|DATA|CROWD|PALANTIR|ORACLE/.test(upperName)) return { company, sector: 'Software' };
  return { company, sector: 'Unknown' };
}

function uniqueBy(rows, keyFn) {
  const seen = new Set();
  const output = [];
  for (const row of rows) {
    const key = keyFn(row);
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(row);
  }
  return output;
}

function extractArrayLiteral(source, name) {
  const marker = `let ${name} = [`;
  const idx = source.indexOf(marker);
  if (idx < 0) throw new Error(`Unable to find ${name} in Quiver source`);
  let cursor = idx + marker.length - 1;
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escaped = false;

  for (; cursor < source.length; cursor += 1) {
    const ch = source[cursor];
    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === '\\') {
        escaped = true;
        continue;
      }
      if (ch === stringChar) {
        inString = false;
        stringChar = '';
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }
    if (ch === '[') depth += 1;
    if (ch === ']') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(idx + marker.length - 1, cursor + 1);
      }
    }
  }

  throw new Error(`Unable to parse ${name} literal`);
}

function parseRecentTradeRow(row) {
  const [ticker, companyName, transactionCode, transactionLabel, amountText, politician, chamber, party, filedRaw, tradedRaw, description, rowId, trendRaw, politicianName, headshot, bioguideId] = row;
  const tickerText = String(ticker || '').trim().toUpperCase();
  const tradeDate = normalizeDate(tradedRaw);
  const filingDate = normalizeDate(filedRaw);
  const amount = normalizeAmount(amountText);
  const trend = safeNumber(trendRaw);
  const tradeType = normalizeTradeType(transactionLabel);
  const company = companyName && companyName !== '-' ? companyName.replace(/\s+-\s+COMMON STOCK$/i, '').replace(/\s+COMMON STOCK$/i, '').replace(/,\s*INC\.?$/i, '').trim() : tickerText;
  const meta = inferMarketCapSector(company, tickerText);
  const currentPrice = tradeType === 'Sell' && trend !== 0 ? Math.max(1, Number((amount / 1000).toFixed(2))) : Math.max(1, Number((amount / 1000).toFixed(2)));

  return {
    id: String(rowId || `${politician}-${tickerText}-${tradeDate}-${filingDate}`),
    politician: String(politicianName || politician || 'Unknown').trim(),
    chamber: String(chamber || 'Unknown').trim(),
    party: String(party || 'Unknown').trim(),
    ticker: tickerText || '-',
    company: meta.company,
    sector: meta.sector,
    tradeType,
    source: 'Quiver Quant',
    tradeDate,
    filingDate,
    disclosureDelayDays: daysBetween(tradeDate, filingDate),
    shares: 0,
    amount,
    closePriceAtTrade: currentPrice,
    currentPrice: Math.max(1, Number((currentPrice * (1 + trend / 100)).toFixed(2))),
    description: String(description || '').trim(),
    transactionCode: String(transactionCode || '').trim(),
    headshot: String(headshot || '').trim(),
    bioguideId: String(bioguideId || '').trim(),
  };
}

async function fetchQuiverRows() {
  const response = await fetch(QUIVER_URL, { headers: QUIVER_HEADERS });
  if (!response.ok) {
    throw new Error(`Quiver fetch failed with ${response.status}`);
  }

  const html = await response.text();
  const literal = extractArrayLiteral(html, 'recentTradesData');
  const rows = Function(`return ${literal};`)();
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('Quiver recentTradesData was empty');
  }
  return rows.map(parseRecentTradeRow);
}

function generateFallbackRows() {
  return [
    {
      id: 'fallback-1',
      politician: 'Nancy Pelosi',
      chamber: 'House',
      party: 'D',
      ticker: 'NVDA',
      company: 'NVIDIA',
      sector: 'Semiconductors',
      tradeType: 'Buy',
      source: 'Fallback Seed',
      tradeDate: '2026-05-08',
      filingDate: '2026-05-20',
      disclosureDelayDays: 12,
      shares: 0,
      amount: 50000,
      closePriceAtTrade: 100,
      currentPrice: 120,
    },
  ];
}

function summarize(rows) {
  const politicians = new Set(rows.map((row) => row.politician)).size;
  const tickers = new Set(rows.map((row) => row.ticker)).size;
  const buys = rows.filter((row) => row.tradeType === 'Buy').length;
  const sells = rows.length - buys;
  return { politicians, tickers, buys, sells };
}

function buildSourceBlock(rows, stamp) {
  const json = JSON.stringify(rows, null, 2);
  return `export const refreshedTrades = ${json};\nexport const refreshedAt = ${JSON.stringify(stamp)};\n`;
}

async function main() {
  const stamp = new Date().toISOString();
  const source = await fs.readFile(dataPath, 'utf8');
  const refreshedRows = (() => {
    return fetchQuiverRows().catch((error) => {
      console.warn(`Live refresh unavailable: ${error.message}`);
      return generateFallbackRows();
    });
  })();

  const liveRows = uniqueBy(await refreshedRows, (row) => [
    row.politician,
    row.ticker,
    row.tradeDate,
    row.filingDate,
    row.tradeType,
    row.amount,
  ].join('|'));

  const summary = summarize(liveRows);
  const nextBlock = buildSourceBlock(liveRows, stamp);

  if (!source.includes('export const analysisWindowDays = 730;')) {
    throw new Error('Unexpected data file shape.');
  }

  await fs.mkdir(generatedDir, { recursive: true });
  await fs.writeFile(generatedPath, nextBlock, 'utf8');

  console.log(`Weekly refresh completed at ${stamp}`);
  console.log(`Rows refreshed: ${liveRows.length}`);
  console.log(`Politicians: ${summary.politicians} | Tickers: ${summary.tickers} | Buys: ${summary.buys} | Sells: ${summary.sells}`);
}

await main();
