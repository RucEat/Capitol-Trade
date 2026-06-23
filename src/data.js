export const analysisWindowDays = 730;
export const storageKey = 'capitol-whales:trades:v1';

export const sampleTrades = [
  {
    id: 't1',
    politician: 'Nancy Pelosi',
    chamber: 'House',
    party: 'D',
    ticker: 'NVDA',
    company: 'NVIDIA',
    sector: 'Semiconductors',
    tradeType: 'Buy',
    source: 'Quiver Quant',
    tradeDate: '2026-03-10',
    filingDate: '2026-03-24',
    disclosureDelayDays: 14,
    shares: 1000,
    amount: 500000,
    closePriceAtTrade: 475,
    currentPrice: 618,
  },
  {
    id: 't2',
    politician: 'Nancy Pelosi',
    chamber: 'House',
    party: 'D',
    ticker: 'MSFT',
    company: 'Microsoft',
    sector: 'Software',
    tradeType: 'Buy',
    source: 'Capitol Trades',
    tradeDate: '2026-02-06',
    filingDate: '2026-02-18',
    disclosureDelayDays: 12,
    shares: 300,
    amount: 120000,
    closePriceAtTrade: 417,
    currentPrice: 449,
  },
  {
    id: 't3',
    politician: 'Josh Gottheimer',
    chamber: 'House',
    party: 'D',
    ticker: 'NVDA',
    company: 'NVIDIA',
    sector: 'Semiconductors',
    tradeType: 'Buy',
    source: 'Unusual Whales',
    tradeDate: '2026-03-14',
    filingDate: '2026-03-28',
    disclosureDelayDays: 14,
    shares: 250,
    amount: 125000,
    closePriceAtTrade: 482,
    currentPrice: 618,
  },
  {
    id: 't4',
    politician: 'Josh Gottheimer',
    chamber: 'House',
    party: 'D',
    ticker: 'MSFT',
    company: 'Microsoft',
    sector: 'Software',
    tradeType: 'Buy',
    source: 'Quiver Quant',
    tradeDate: '2026-01-22',
    filingDate: '2026-02-03',
    disclosureDelayDays: 12,
    shares: 200,
    amount: 80000,
    closePriceAtTrade: 405,
    currentPrice: 449,
  },
  {
    id: 't5',
    politician: 'Mark Green',
    chamber: 'House',
    party: 'R',
    ticker: 'TSLA',
    company: 'Tesla',
    sector: 'Automotive',
    tradeType: 'Buy',
    source: 'Capitol Trades',
    tradeDate: '2026-03-02',
    filingDate: '2026-03-18',
    disclosureDelayDays: 16,
    shares: 150,
    amount: 30000,
    closePriceAtTrade: 210,
    currentPrice: 195,
  },
  {
    id: 't6',
    politician: 'Mark Green',
    chamber: 'House',
    party: 'R',
    ticker: 'AAPL',
    company: 'Apple',
    sector: 'Consumer Tech',
    tradeType: 'Buy',
    source: 'Unusual Whales',
    tradeDate: '2026-04-11',
    filingDate: '2026-04-23',
    disclosureDelayDays: 12,
    shares: 240,
    amount: 50000,
    closePriceAtTrade: 184,
    currentPrice: 212,
  },
  {
    id: 't7',
    politician: 'Raja Krishnamoorthi',
    chamber: 'House',
    party: 'D',
    ticker: 'AAPL',
    company: 'Apple',
    sector: 'Consumer Tech',
    tradeType: 'Buy',
    source: 'Quiver Quant',
    tradeDate: '2026-04-09',
    filingDate: '2026-04-22',
    disclosureDelayDays: 13,
    shares: 200,
    amount: 42000,
    closePriceAtTrade: 181,
    currentPrice: 212,
  },
  {
    id: 't8',
    politician: 'Raja Krishnamoorthi',
    chamber: 'House',
    party: 'D',
    ticker: 'NVDA',
    company: 'NVIDIA',
    sector: 'Semiconductors',
    tradeType: 'Buy',
    source: 'Capitol Trades',
    tradeDate: '2026-03-13',
    filingDate: '2026-03-27',
    disclosureDelayDays: 14,
    shares: 180,
    amount: 90000,
    closePriceAtTrade: 480,
    currentPrice: 618,
  },
  {
    id: 't9',
    politician: 'Debbie Dingell',
    chamber: 'House',
    party: 'D',
    ticker: 'AMZN',
    company: 'Amazon',
    sector: 'Consumer Tech',
    tradeType: 'Buy',
    source: 'Quiver Quant',
    tradeDate: '2026-02-18',
    filingDate: '2026-03-05',
    disclosureDelayDays: 15,
    shares: 120,
    amount: 25000,
    closePriceAtTrade: 168,
    currentPrice: 205,
  },
  {
    id: 't10',
    politician: 'Debbie Dingell',
    chamber: 'House',
    party: 'D',
    ticker: 'TSLA',
    company: 'Tesla',
    sector: 'Automotive',
    tradeType: 'Sell',
    source: 'Unusual Whales',
    tradeDate: '2026-05-05',
    filingDate: '2026-05-19',
    disclosureDelayDays: 14,
    shares: 80,
    amount: 16000,
    closePriceAtTrade: 205,
    currentPrice: 195,
  },
  {
    id: 't11',
    politician: 'Pat Ryan',
    chamber: 'House',
    party: 'D',
    ticker: 'CRWD',
    company: 'CrowdStrike',
    sector: 'Cybersecurity',
    tradeType: 'Buy',
    source: 'Capitol Trades',
    tradeDate: '2025-12-20',
    filingDate: '2026-01-08',
    disclosureDelayDays: 19,
    shares: 150,
    amount: 35000,
    closePriceAtTrade: 357,
    currentPrice: 434,
  },
  {
    id: 't12',
    politician: 'Markwayne Mullin',
    chamber: 'Senate',
    party: 'R',
    ticker: 'XOM',
    company: 'Exxon Mobil',
    sector: 'Energy',
    tradeType: 'Buy',
    source: 'Quiver Quant',
    tradeDate: '2026-04-02',
    filingDate: '2026-04-18',
    disclosureDelayDays: 16,
    shares: 400,
    amount: 43000,
    closePriceAtTrade: 114,
    currentPrice: 112,
  },
  {
    id: 't13',
    politician: 'Markwayne Mullin',
    chamber: 'Senate',
    party: 'R',
    ticker: 'AMD',
    company: 'AMD',
    sector: 'Semiconductors',
    tradeType: 'Buy',
    source: 'Capitol Trades',
    tradeDate: '2026-03-21',
    filingDate: '2026-04-04',
    disclosureDelayDays: 14,
    shares: 300,
    amount: 60000,
    closePriceAtTrade: 182,
    currentPrice: 161,
  },
  {
    id: 't14',
    politician: 'John Hickenlooper',
    chamber: 'Senate',
    party: 'D',
    ticker: 'AAPL',
    company: 'Apple',
    sector: 'Consumer Tech',
    tradeType: 'Buy',
    source: 'Unusual Whales',
    tradeDate: '2026-04-10',
    filingDate: '2026-04-24',
    disclosureDelayDays: 14,
    shares: 150,
    amount: 32000,
    closePriceAtTrade: 181,
    currentPrice: 212,
  },
  {
    id: 't15',
    politician: 'John Hickenlooper',
    chamber: 'Senate',
    party: 'D',
    ticker: 'MSFT',
    company: 'Microsoft',
    sector: 'Software',
    tradeType: 'Buy',
    source: 'Quiver Quant',
    tradeDate: '2026-02-03',
    filingDate: '2026-02-16',
    disclosureDelayDays: 13,
    shares: 120,
    amount: 48000,
    closePriceAtTrade: 410,
    currentPrice: 449,
  },
  {
    id: 't16',
    politician: 'Ron Wyden',
    chamber: 'Senate',
    party: 'D',
    ticker: 'GOOGL',
    company: 'Alphabet',
    sector: 'Consumer Tech',
    tradeType: 'Buy',
    source: 'Capitol Trades',
    tradeDate: '2026-03-08',
    filingDate: '2026-03-22',
    disclosureDelayDays: 14,
    shares: 90,
    amount: 18000,
    closePriceAtTrade: 155,
    currentPrice: 179,
  },
  {
    id: 't17',
    politician: 'Ron Wyden',
    chamber: 'Senate',
    party: 'D',
    ticker: 'NVDA',
    company: 'NVIDIA',
    sector: 'Semiconductors',
    tradeType: 'Buy',
    source: 'Quiver Quant',
    tradeDate: '2026-02-11',
    filingDate: '2026-02-26',
    disclosureDelayDays: 15,
    shares: 60,
    amount: 30000,
    closePriceAtTrade: 468,
    currentPrice: 618,
  },
  {
    id: 't18',
    politician: 'Rick Scott',
    chamber: 'Senate',
    party: 'R',
    ticker: 'AAPL',
    company: 'Apple',
    sector: 'Consumer Tech',
    tradeType: 'Buy',
    source: 'Unusual Whales',
    tradeDate: '2026-04-01',
    filingDate: '2026-04-16',
    disclosureDelayDays: 15,
    shares: 110,
    amount: 24000,
    closePriceAtTrade: 181,
    currentPrice: 212,
  },
  {
    id: 't19',
    politician: 'Rick Scott',
    chamber: 'Senate',
    party: 'R',
    ticker: 'TSLA',
    company: 'Tesla',
    sector: 'Automotive',
    tradeType: 'Buy',
    source: 'Capitol Trades',
    tradeDate: '2026-03-27',
    filingDate: '2026-04-12',
    disclosureDelayDays: 16,
    shares: 70,
    amount: 14000,
    closePriceAtTrade: 208,
    currentPrice: 195,
  },
  {
    id: 't20',
    politician: 'Hakeem Jeffries',
    chamber: 'House',
    party: 'D',
    ticker: 'MSFT',
    company: 'Microsoft',
    sector: 'Software',
    tradeType: 'Buy',
    source: 'Quiver Quant',
    tradeDate: '2026-03-19',
    filingDate: '2026-04-02',
    disclosureDelayDays: 14,
    shares: 100,
    amount: 40000,
    closePriceAtTrade: 406,
    currentPrice: 449,
  },
  {
    id: 't21',
    politician: 'Hakeem Jeffries',
    chamber: 'House',
    party: 'D',
    ticker: 'GOOGL',
    company: 'Alphabet',
    sector: 'Consumer Tech',
    tradeType: 'Buy',
    source: 'Capitol Trades',
    tradeDate: '2026-02-25',
    filingDate: '2026-03-10',
    disclosureDelayDays: 13,
    shares: 120,
    amount: 26000,
    closePriceAtTrade: 149,
    currentPrice: 179,
  },
  {
    id: 't22',
    politician: 'Mark Kelly',
    chamber: 'Senate',
    party: 'D',
    ticker: 'AMD',
    company: 'AMD',
    sector: 'Semiconductors',
    tradeType: 'Buy',
    source: 'Unusual Whales',
    tradeDate: '2026-04-04',
    filingDate: '2026-04-19',
    disclosureDelayDays: 15,
    shares: 170,
    amount: 34000,
    closePriceAtTrade: 177,
    currentPrice: 161,
  },
  {
    id: 't23',
    politician: 'Mark Kelly',
    chamber: 'Senate',
    party: 'D',
    ticker: 'CRWD',
    company: 'CrowdStrike',
    sector: 'Cybersecurity',
    tradeType: 'Buy',
    source: 'Quiver Quant',
    tradeDate: '2026-02-14',
    filingDate: '2026-03-01',
    disclosureDelayDays: 15,
    shares: 80,
    amount: 22000,
    closePriceAtTrade: 361,
    currentPrice: 434,
  },
  {
    id: 't24',
    politician: 'Marjorie Taylor Greene',
    chamber: 'House',
    party: 'R',
    ticker: 'XOM',
    company: 'Exxon Mobil',
    sector: 'Energy',
    tradeType: 'Buy',
    source: 'Capitol Trades',
    tradeDate: '2026-03-11',
    filingDate: '2026-03-26',
    disclosureDelayDays: 15,
    shares: 260,
    amount: 29000,
    closePriceAtTrade: 113,
    currentPrice: 112,
  },
  {
    id: 't25',
    politician: 'Marjorie Taylor Greene',
    chamber: 'House',
    party: 'R',
    ticker: 'NVDA',
    company: 'NVIDIA',
    sector: 'Semiconductors',
    tradeType: 'Buy',
    source: 'Unusual Whales',
    tradeDate: '2026-04-08',
    filingDate: '2026-04-23',
    disclosureDelayDays: 15,
    shares: 40,
    amount: 21000,
    closePriceAtTrade: 488,
    currentPrice: 618,
  },
];

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

export function normalizeTrade(raw, index) {
  const tradeDate = raw.tradeDate || raw.transactionDate || raw.date;
  const filingDate = raw.filingDate || raw.disclosureDate || raw.filedAt || tradeDate;
  const amount = Number(raw.amount ?? raw.value ?? raw.transactionAmount ?? 0);
  const closePriceAtTrade = Number(raw.closePriceAtTrade ?? raw.entryPrice ?? raw.price ?? 0);
  const currentPrice = Number(raw.currentPrice ?? raw.marketPrice ?? raw.lastPrice ?? closePriceAtTrade);
  const disclosureDelayDays =
    raw.disclosureDelayDays ?? daysBetween(tradeDate, filingDate);

  return {
    id: raw.id ?? `${raw.politician ?? 'unknown'}-${raw.ticker ?? 'unknown'}-${index}`,
    politician: raw.politician ?? raw.name ?? 'Unknown',
    chamber: raw.chamber ?? raw.branch ?? 'Unknown',
    party: raw.party ?? 'Unknown',
    ticker: String(raw.ticker ?? raw.symbol ?? '').toUpperCase(),
    company: raw.company ?? raw.issuer ?? raw.assetName ?? raw.ticker ?? 'Unknown',
    tradeType: raw.tradeType ?? raw.type ?? 'Buy',
    source: raw.source ?? 'Imported',
    tradeDate,
    filingDate,
    disclosureDelayDays,
    shares: Number(raw.shares ?? raw.quantity ?? 0),
    amount,
    closePriceAtTrade,
    currentPrice,
  };
}

export function parseDisclosureText(text) {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const parseJson = () => {
    const parsed = JSON.parse(trimmed);
    const rows = Array.isArray(parsed) ? parsed : parsed.trades || parsed.rows || [];
    return rows.map((row, index) => normalizeTrade(row, index));
  };

  const parseCsv = () => {
    const [headerLine, ...lines] = trimmed.split(/\r?\n/).filter(Boolean);
    const headers = headerLine.split(',').map((value) => value.trim());
    return lines.map((line, index) => {
      const values = line.split(',').map((value) => value.trim());
      const row = Object.fromEntries(headers.map((header, i) => [header, values[i]]));
      return normalizeTrade(row, index);
    });
  };

  try {
    return parseJson();
  } catch {
    return parseCsv();
  }
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
