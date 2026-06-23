export const analysisWindowDays = 730;
export const storageKey = 'capitol-trade:trades:v3';

const sourceCycle = [
  'Quiver Quant',
  'Unusual Whales',
  'Capitol Trades',
  'Senate Financial Disclosures',
  'House Clerk Disclosures',
  'SEC EDGAR',
  'OpenSecrets',
  'Financial Disclosure Portal',
  'Congressional Stock Tracker',
  'Public Records',
];
const returnPattern = [0.32, 0.14, 0.09, -0.06, 0.21, 0.27, -0.11, 0.05, 0.18, 0.12];
const delayPattern = [12, 14, 16, 21, 34, 18, 27, 41, 13, 15];
const amountPattern = [24000, 32000, 40000, 52000, 68000, 84000, 110000, 160000];
const tradeDatePattern = [
  '2025-08-19',
  '2025-09-12',
  '2025-10-03',
  '2025-10-28',
  '2025-11-14',
  '2025-12-09',
  '2026-01-22',
  '2026-02-11',
  '2026-03-06',
  '2026-03-26',
  '2026-04-09',
  '2026-04-24',
  '2026-05-08',
];

const tickerCatalog = {
  NVDA: { company: 'NVIDIA', sector: 'Semiconductors', currentPrice: 618 },
  MSFT: { company: 'Microsoft', sector: 'Software', currentPrice: 449 },
  AAPL: { company: 'Apple', sector: 'Consumer Tech', currentPrice: 212 },
  AMZN: { company: 'Amazon', sector: 'Consumer Tech', currentPrice: 205 },
  GOOGL: { company: 'Alphabet', sector: 'Consumer Tech', currentPrice: 179 },
  META: { company: 'Meta Platforms', sector: 'Consumer Tech', currentPrice: 587 },
  CRWD: { company: 'CrowdStrike', sector: 'Cybersecurity', currentPrice: 434 },
  PANW: { company: 'Palo Alto Networks', sector: 'Cybersecurity', currentPrice: 382 },
  AMD: { company: 'AMD', sector: 'Semiconductors', currentPrice: 161 },
  AVGO: { company: 'Broadcom', sector: 'Semiconductors', currentPrice: 195 },
  JPM: { company: 'JPMorgan Chase', sector: 'Financials', currentPrice: 268 },
  ORCL: { company: 'Oracle', sector: 'Software', currentPrice: 178 },
  PLTR: { company: 'Palantir', sector: 'Software', currentPrice: 132 },
  NFLX: { company: 'Netflix', sector: 'Media', currentPrice: 761 },
  COST: { company: 'Costco', sector: 'Consumer', currentPrice: 934 },
  UNH: { company: 'UnitedHealth', sector: 'Healthcare', currentPrice: 487 },
  XOM: { company: 'Exxon Mobil', sector: 'Energy', currentPrice: 112 },
  TSLA: { company: 'Tesla', sector: 'Automotive', currentPrice: 195 },
  V: { company: 'Visa', sector: 'Payments', currentPrice: 302 },
  'BRK.B': { company: 'Berkshire Hathaway', sector: 'Financials', currentPrice: 468 },
};

const politicianRoster = [
  { politician: 'Nancy Pelosi', chamber: 'House', party: 'D', focus: ['NVDA', 'MSFT', 'AVGO'] },
  { politician: 'Josh Gottheimer', chamber: 'House', party: 'D', focus: ['NVDA', 'AMZN', 'META'] },
  { politician: 'Markwayne Mullin', chamber: 'Senate', party: 'R', focus: ['XOM', 'AMD', 'JPM'] },
  { politician: 'John Hickenlooper', chamber: 'Senate', party: 'D', focus: ['AAPL', 'MSFT', 'META'] },
  { politician: 'Rick Scott', chamber: 'Senate', party: 'R', focus: ['AAPL', 'TSLA', 'XOM'] },
  { politician: 'Marjorie Taylor Greene', chamber: 'House', party: 'R', focus: ['NVDA', 'TSLA', 'XOM'] },
  { politician: 'Debbie Dingell', chamber: 'House', party: 'D', focus: ['AMZN', 'AAPL', 'UNH'] },
  { politician: 'Ro Khanna', chamber: 'House', party: 'D', focus: ['NVDA', 'CRWD', 'PLTR'] },
  { politician: 'Tommy Tuberville', chamber: 'Senate', party: 'R', focus: ['XOM', 'NVDA', 'JPM'] },
  { politician: 'Jared Moskowitz', chamber: 'House', party: 'D', focus: ['GOOGL', 'CRWD', 'AAPL'] },
  { politician: 'Scott H. Peters', chamber: 'House', party: 'D', focus: ['MSFT', 'V', 'UNH'] },
  { politician: 'Daniel S. Goldman', chamber: 'House', party: 'D', focus: ['META', 'AAPL', 'GOOGL'] },
  { politician: 'Suzan DelBene', chamber: 'House', party: 'D', focus: ['MSFT', 'AAPL', 'AMZN'] },
  { politician: 'Sara Jacobs', chamber: 'House', party: 'D', focus: ['CRWD', 'PANW', 'MSFT'] },
  { politician: 'Gilbert Ray Cisneros, Jr.', chamber: 'House', party: 'D', focus: ['AMZN', 'GOOGL', 'V'] },
  { politician: 'Vern Buchanan', chamber: 'House', party: 'R', focus: ['JPM', 'XOM', 'BRK.B'] },
  { politician: 'Kevin Hern', chamber: 'House', party: 'R', focus: ['ORCL', 'MSFT', 'NVDA'] },
  { politician: 'Roger Williams', chamber: 'House', party: 'R', focus: ['TSLA', 'JPM', 'XOM'] },
  { politician: 'Donald S. Beyer, Jr.', chamber: 'House', party: 'D', focus: ['AAPL', 'MSFT', 'NVDA'] },
  { politician: 'Pete Ricketts', chamber: 'Senate', party: 'R', focus: ['XOM', 'ORCL', 'JPM'] },
  { politician: 'Mark R. Warner', chamber: 'Senate', party: 'D', focus: ['MSFT', 'META', 'GOOGL'] },
  { politician: 'Jay Obernolte', chamber: 'House', party: 'R', focus: ['NVDA', 'PLTR', 'AMD'] },
  { politician: 'Daniel Meuser', chamber: 'House', party: 'R', focus: ['JPM', 'XOM', 'META'] },
  { politician: 'Lloyd Doggett', chamber: 'House', party: 'D', focus: ['UNH', 'AAPL', 'MSFT'] },
  { politician: 'Julie Johnson', chamber: 'House', party: 'D', focus: ['GOOGL', 'AMZN', 'META'] },
  { politician: 'Lori Trahan', chamber: 'House', party: 'D', focus: ['CRWD', 'NVDA', 'AAPL'] },
  { politician: 'April McClain Delaney', chamber: 'House', party: 'D', focus: ['MSFT', 'AMZN', 'GOOGL'] },
  { politician: 'Sheldon Whitehouse', chamber: 'Senate', party: 'D', focus: ['V', 'MSFT', 'AAPL'] },
  { politician: 'Maria Elvira Salazar', chamber: 'House', party: 'R', focus: ['JPM', 'COST', 'XOM'] },
  { politician: 'David McCormick', chamber: 'Senate', party: 'R', focus: ['META', 'NVDA', 'JPM'] },
  { politician: 'Tina Smith', chamber: 'Senate', party: 'D', focus: ['AAPL', 'AMZN', 'GOOGL'] },
  { politician: 'Susie Lee', chamber: 'House', party: 'D', focus: ['NFLX', 'META', 'MSFT'] },
  { politician: 'Byron Donalds', chamber: 'House', party: 'R', focus: ['TSLA', 'NVDA', 'AMD'] },
  { politician: 'Michael T. McCaul', chamber: 'House', party: 'R', focus: ['XOM', 'JPM', 'AVGO'] },
  { politician: 'Jake Auchincloss', chamber: 'House', party: 'D', focus: ['CRWD', 'PANW', 'MSFT'] },
  { politician: 'Ritchie Torres', chamber: 'House', party: 'D', focus: ['PLTR', 'NVDA', 'GOOGL'] },
  { politician: 'Robert Bresnahan', chamber: 'House', party: 'R', focus: ['JPM', 'XOM', 'ORCL'] },
  { politician: 'Scott Franklin', chamber: 'House', party: 'R', focus: ['AAPL', 'V', 'COST'] },
  { politician: 'Bill Hagerty', chamber: 'Senate', party: 'R', focus: ['ORCL', 'MSFT', 'JPM'] },
  { politician: 'John Boozman', chamber: 'Senate', party: 'R', focus: ['XOM', 'BRK.B', 'JPM'] },
];

function addDays(value, days) {
  const date = parseDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function makeTrade({ id, politician, chamber, party, ticker, tradeType, source, tradeDate, filingDate, amount, shares, closePriceAtTrade }) {
  const security = tickerCatalog[ticker];

  return {
    id,
    politician,
    chamber,
    party,
    ticker,
    company: security.company,
    sector: security.sector,
    tradeType,
    source,
    tradeDate,
    filingDate,
    disclosureDelayDays: daysBetween(tradeDate, filingDate),
    shares,
    amount,
    closePriceAtTrade,
    currentPrice: security.currentPrice,
  };
}

function createGeneratedTrades() {
  const trades = [];

  politicianRoster.forEach((profile, profileIndex) => {
    const [firstTicker, secondTicker, optionalSellTicker] = profile.focus;

    [firstTicker, secondTicker].forEach((ticker, slotIndex) => {
      const source = sourceCycle[(profileIndex + slotIndex) % sourceCycle.length];
      const tradeDate = tradeDatePattern[(profileIndex * 2 + slotIndex) % tradeDatePattern.length];
      const delay = delayPattern[(profileIndex + slotIndex) % delayPattern.length];
      const filingDate = addDays(tradeDate, delay);
      const amount = amountPattern[(profileIndex + slotIndex) % amountPattern.length] + profileIndex * 1800 + slotIndex * 2200;
      const targetReturn = returnPattern[(profileIndex + slotIndex) % returnPattern.length];
      const currentPrice = tickerCatalog[ticker].currentPrice;
      const closePriceAtTrade = Number((currentPrice / (1 + targetReturn)).toFixed(2));
      const shares = Math.max(10, Math.round(amount / closePriceAtTrade));

      trades.push(
        makeTrade({
          id: `g${profileIndex + 1}-${slotIndex + 1}`,
          politician: profile.politician,
          chamber: profile.chamber,
          party: profile.party,
          ticker,
          tradeType: 'Buy',
          source,
          tradeDate,
          filingDate,
          amount,
          shares,
          closePriceAtTrade,
        }),
      );
    });

    if (optionalSellTicker && profileIndex % 4 === 0) {
      const source = sourceCycle[(profileIndex + 2) % sourceCycle.length];
      const tradeDate = tradeDatePattern[(profileIndex + 5) % tradeDatePattern.length];
      const delay = delayPattern[(profileIndex + 3) % delayPattern.length];
      const filingDate = addDays(tradeDate, delay);
      const amount = amountPattern[(profileIndex + 3) % amountPattern.length] + profileIndex * 900;
      const targetReturn = returnPattern[(profileIndex + 3) % returnPattern.length];
      const currentPrice = tickerCatalog[optionalSellTicker].currentPrice;
      const closePriceAtTrade = Number((currentPrice / (1 + targetReturn)).toFixed(2));
      const shares = Math.max(10, Math.round(amount / closePriceAtTrade));

      trades.push(
        makeTrade({
          id: `g${profileIndex + 1}-s`,
          politician: profile.politician,
          chamber: profile.chamber,
          party: profile.party,
          ticker: optionalSellTicker,
          tradeType: 'Sell',
          source,
          tradeDate,
          filingDate,
          amount,
          shares,
          closePriceAtTrade,
        }),
      );
    }
  });

  return trades;
}

export const sampleTrades = createGeneratedTrades();

export function parseDate(value) {
  return new Date(`${value}T00:00:00Z`);
}

export function daysBetween(a, b) {
  return Math.round((parseDate(b) - parseDate(a)) / (1000 * 60 * 60 * 24));
}

export function pctChange(start, end) {
  return ((end - start) / start) * 100;
}

export function getFreshnessLabel(delayDays) {
  if (delayDays <= 14) return 'Fresh';
  if (delayDays <= 30) return 'Lagged';
  return 'Stale';
}

function safeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeTradeType(value) {
  const normalized = String(value || 'Buy').trim().toLowerCase();
  if (['buy', 'purchase', 'purchased', 'acquisition'].includes(normalized)) return 'Buy';
  if (['sell', 'sale', 'sold', 'disposition'].includes(normalized)) return 'Sell';
  if (normalized === 'exchange') return 'Exchange';
  return normalized ? normalized[0].toUpperCase() + normalized.slice(1) : 'Buy';
}

function normalizeSource(value, fallbackSource) {
  const source = String(value || fallbackSource || 'Imported').trim();
  return source || 'Imported';
}

function normalizeDate(value) {
  if (!value) return '';
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return '';

  return parsed.toISOString().slice(0, 10);
}

function inferPrice({ closePriceAtTrade, currentPrice, amount, shares }) {
  if (closePriceAtTrade > 0) return closePriceAtTrade;
  if (amount > 0 && shares > 0) return Number((amount / shares).toFixed(2));
  if (currentPrice > 0) return currentPrice;
  return 1;
}

function splitCsvLine(line) {
  const values = [];
  let current = '';
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const next = line[index + 1];

    if (character === '"' && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (character === ',' && !insideQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += character;
  }

  values.push(current.trim());
  return values;
}

export function normalizeTrade(raw, index) {
  const tradeDate = normalizeDate(
    raw.tradeDate || raw.transactionDate || raw.transaction_date || raw.date || raw.traded_at,
  );
  const filingDate = normalizeDate(
    raw.filingDate ||
      raw.disclosureDate ||
      raw.disclosure_date ||
      raw.filedAt ||
      raw.filed_at ||
      raw.filed_at_date ||
      tradeDate,
  );
  const amount = safeNumber(raw.amount ?? raw.value ?? raw.transactionAmount ?? raw.transaction_amount ?? raw.range_midpoint ?? 0);
  const shares = safeNumber(raw.shares ?? raw.quantity ?? raw.share_count ?? 0);
  const provisionalCurrentPrice = safeNumber(raw.currentPrice ?? raw.marketPrice ?? raw.market_price ?? raw.lastPrice ?? raw.last_price ?? 0);
  const provisionalTradePrice = safeNumber(raw.closePriceAtTrade ?? raw.entryPrice ?? raw.entry_price ?? raw.price ?? raw.tradePrice ?? raw.trade_price ?? 0);
  const closePriceAtTrade = inferPrice({
    closePriceAtTrade: provisionalTradePrice,
    currentPrice: provisionalCurrentPrice,
    amount,
    shares,
  });
  const currentPrice = provisionalCurrentPrice > 0 ? provisionalCurrentPrice : closePriceAtTrade;
  const disclosureDelayDays =
    safeNumber(raw.disclosureDelayDays ?? raw.disclosure_delay_days) || daysBetween(tradeDate, filingDate);
  const ticker = String(raw.ticker ?? raw.symbol ?? raw.asset_ticker ?? '').toUpperCase().trim();
  const security = tickerCatalog[ticker];
  const politician = String(raw.politician ?? raw.name ?? raw.reporter ?? raw.member ?? '').trim() || 'Unknown';

  return {
    id: raw.id ?? `${politician}-${ticker || 'unknown'}-${index}`,
    politician,
    chamber: raw.chamber ?? raw.branch ?? raw.current_chamber ?? raw.member_type ?? 'Unknown',
    party: raw.party ?? raw.current_party ?? 'Unknown',
    ticker,
    company: raw.company ?? raw.issuer ?? raw.assetName ?? raw.asset_name ?? security?.company ?? ticker ?? 'Unknown',
    sector: raw.sector ?? security?.sector ?? 'Unknown',
    tradeType: normalizeTradeType(raw.tradeType ?? raw.type ?? raw.txn_type ?? raw.transaction_type),
    source: normalizeSource(raw.source, 'Imported'),
    tradeDate,
    filingDate,
    disclosureDelayDays,
    shares,
    amount,
    closePriceAtTrade,
    currentPrice,
  };
}

export function parseDisclosureText(text, fallbackSource = 'Imported') {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const parseJson = () => {
    const parsed = JSON.parse(trimmed);
    const rows = Array.isArray(parsed) ? parsed : parsed.trades || parsed.rows || parsed.trade_data || [];
    return rows.map((row, index) => normalizeTrade({ ...row, source: row.source ?? fallbackSource }, index));
  };

  const parseCsv = () => {
    const [headerLine, ...lines] = trimmed.split(/\r?\n/).filter(Boolean);
    const headers = splitCsvLine(headerLine).map((value) => value.trim());
    return lines.map((line, index) => {
      const values = splitCsvLine(line);
      const row = Object.fromEntries(headers.map((header, i) => [header, values[i]]));
      return normalizeTrade({ ...row, source: row.source ?? fallbackSource }, index);
    });
  };

  try {
    return parseJson();
  } catch {
    return parseCsv();
  }
}

export function validateTradeRows(rows) {
  return rows.filter((row) => row.politician && row.ticker && row.tradeDate && row.filingDate);
}

export function dedupeTrades(rows) {
  const seen = new Set();
  const output = [];

  for (const row of rows) {
    const key = [
      row.politician,
      row.ticker,
      row.tradeDate,
      row.filingDate,
      row.tradeType,
      row.source,
      row.amount,
    ].join('|');
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(row);
  }

  return output;
}

export function loadStoredTrades() {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return [];
  try {
    return dedupeTrades(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function saveStoredTrades(rows) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(storageKey, JSON.stringify(rows));
}

export function mergeTradeSets(baseRows, incomingRows) {
  return dedupeTrades([...baseRows, ...incomingRows]);
}

export function groupConsensusRows(rows) {
  const buys = rows.filter((trade) => trade.tradeType === 'Buy');
  const groups = new Map();

  for (const trade of buys) {
    if (!groups.has(trade.ticker)) groups.set(trade.ticker, []);
    groups.get(trade.ticker).push(trade);
  }

  return Array.from(groups.entries())
    .map(([ticker, group]) => {
      const uniquePeople = new Set(group.map((row) => row.politician));
      const totalAmount = group.reduce((sum, row) => sum + row.amount, 0);
      const avgReturn = group.reduce((sum, row) => sum + pctChange(row.closePriceAtTrade, row.currentPrice), 0) / group.length;
      const winRate = group.filter((row) => row.currentPrice > row.closePriceAtTrade).length / group.length;
      const latestFilingDate = group.reduce(
        (latest, row) => (parseDate(row.filingDate) > parseDate(latest) ? row.filingDate : latest),
        group[0].filingDate,
      );
      return {
        ticker,
        company: group[0].company,
        count: uniquePeople.size,
        totalAmount,
        avgReturn,
        winRate,
        latestFilingDate,
        rows: group,
      };
    })
    .filter((row) => row.count >= 2)
    .sort((a, b) => b.count - a.count || b.totalAmount - a.totalAmount || b.avgReturn - a.avgReturn);
}

export function rankPoliticians(rows) {
  const groups = new Map();

  for (const trade of rows) {
    if (!groups.has(trade.politician)) groups.set(trade.politician, []);
    groups.get(trade.politician).push(trade);
  }

  return Array.from(groups.entries())
    .map(([politician, group]) => {
      const buyRows = group.filter((row) => row.tradeType === 'Buy');
      const winners = buyRows.filter((row) => row.currentPrice > row.closePriceAtTrade);
      const avgReturn = buyRows.length
        ? buyRows.reduce((sum, row) => sum + pctChange(row.closePriceAtTrade, row.currentPrice), 0) / buyRows.length
        : 0;
      const winRate = buyRows.length ? winners.length / buyRows.length : 0;
      const consensusCount = new Set(buyRows.map((row) => row.ticker)).size;
      const avgDelay = group.reduce((sum, row) => sum + row.disclosureDelayDays, 0) / group.length;
      return {
        politician,
        chamber: group[0].chamber,
        party: group[0].party,
        trades: group.length,
        buys: buyRows.length,
        winRate,
        avgReturn,
        avgDelay,
        consensusCount,
        rows: group,
      };
    })
    .sort(
      (a, b) =>
        b.winRate - a.winRate ||
        b.avgReturn - a.avgReturn ||
        b.consensusCount - a.consensusCount ||
        b.trades - a.trades,
    );
}

export function buildAnalytics(rows) {
  const normalized = dedupeTrades(rows);
  const buys = normalized.filter((trade) => trade.tradeType === 'Buy');
  const sellCount = normalized.length - buys.length;
  const consensusRows = groupConsensusRows(normalized);
  const politicianRows = rankPoliticians(normalized);
  const staleCount = normalized.filter((trade) => getFreshnessLabel(trade.disclosureDelayDays) === 'Stale').length;
  const totalAmount = normalized.reduce((sum, trade) => sum + trade.amount, 0);
  const buyWinners = buys.filter((trade) => trade.currentPrice > trade.closePriceAtTrade);
  const avgDelay = normalized.reduce((sum, trade) => sum + trade.disclosureDelayDays, 0) / Math.max(normalized.length, 1);
  const avgReturn = buys.length
    ? buys.reduce((sum, trade) => sum + pctChange(trade.closePriceAtTrade, trade.currentPrice), 0) / buys.length
    : 0;
  const winRate = buys.length ? buyWinners.length / buys.length : 0;
  const tickerCounts = new Map();
  const tickerReturns = new Map();
  const sectorCounts = new Map();
  const sectorReturns = new Map();

  for (const trade of buys) {
    tickerCounts.set(trade.ticker, (tickerCounts.get(trade.ticker) || 0) + 1);
    if (!tickerReturns.has(trade.ticker)) tickerReturns.set(trade.ticker, []);
    tickerReturns.get(trade.ticker).push(pctChange(trade.closePriceAtTrade, trade.currentPrice));
    const sector = trade.sector || 'Unknown';
    sectorCounts.set(sector, (sectorCounts.get(sector) || 0) + 1);
    if (!sectorReturns.has(sector)) sectorReturns.set(sector, []);
    sectorReturns.get(sector).push(pctChange(trade.closePriceAtTrade, trade.currentPrice));
  }

  const concentrationRows = Array.from(tickerCounts.entries())
    .map(([ticker, count]) => ({
      ticker,
      count,
      share: buys.length ? count / buys.length : 0,
    }))
    .sort((a, b) => b.count - a.count || b.share - a.share);

  const ideaRows = Array.from(tickerReturns.entries())
    .map(([ticker, returns]) => {
      const count = tickerCounts.get(ticker) || 0;
      const avgReturn = returns.reduce((sum, value) => sum + value, 0) / Math.max(returns.length, 1);
      const winRate = returns.filter((value) => value > 0).length / Math.max(returns.length, 1);
      const signalScore = count * 1.5 + winRate * 100 + avgReturn;
      return {
        ticker,
        count,
        avgReturn,
        winRate,
        signalScore,
      };
    })
    .sort((a, b) => b.signalScore - a.signalScore || b.winRate - a.winRate || b.avgReturn - a.avgReturn);

  const sectorRows = Array.from(sectorReturns.entries())
    .map(([sector, returns]) => {
      const count = sectorCounts.get(sector) || 0;
      const avgReturn = returns.reduce((sum, value) => sum + value, 0) / Math.max(returns.length, 1);
      const winRate = returns.filter((value) => value > 0).length / Math.max(returns.length, 1);
      const signalScore = count * 1.5 + winRate * 100 + avgReturn;
      return {
        sector,
        count,
        avgReturn,
        winRate,
        signalScore,
      };
    })
    .sort((a, b) => b.signalScore - a.signalScore || b.count - a.count || b.winRate - a.winRate);

  return {
    normalized,
    buys,
    sellCount,
    consensusRows,
    concentrationRows,
    ideaRows,
    sectorRows,
    politicianRows,
    staleCount,
    totalAmount,
    avgDelay,
    avgReturn,
    winRate,
  };
}
