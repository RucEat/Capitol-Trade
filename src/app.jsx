import React, { useMemo, useState } from 'react';
import {
  analysisWindowDays,
  buildAnalytics,
  daysBetween,
  getFreshnessLabel,
  sampleTrades,
} from './data.js';

const today = new Date('2026-06-23T12:00:00Z');

function formatPct(value) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00Z`));
}

function toneClass(value) {
  if (value > 0) return 'tone tone-up';
  if (value < 0) return 'tone tone-down';
  return 'tone tone-flat';
}

function App() {
  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedChamber, setSelectedChamber] = useState('All');
  const [selectedPolitician, setSelectedPolitician] = useState('All');
  const [selectedFreshness, setSelectedFreshness] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedTicker, setSelectedTicker] = useState('All');
  const [tickerQuery, setTickerQuery] = useState('');
  const allTrades = sampleTrades;

  const sources = useMemo(() => ['All', ...new Set(allTrades.map((trade) => trade.source))], [allTrades]);
  const tradeTypes = useMemo(() => ['All', ...new Set(allTrades.map((trade) => trade.tradeType))], [allTrades]);
  const chambers = useMemo(() => ['All', ...new Set(allTrades.map((trade) => trade.chamber))], [allTrades]);
  const politicianOptions = useMemo(
    () => ['All', ...new Set(allTrades.map((trade) => trade.politician))],
    [allTrades],
  );
  const sectorOptions = useMemo(
    () => ['All', ...new Set(allTrades.map((trade) => trade.sector || 'Unknown'))],
    [allTrades],
  );
  const freshnessValues = ['All', 'Fresh', 'Lagged', 'Stale'];

  const filteredTrades = useMemo(() => {
    return allTrades.filter((trade) => {
      const withinWindow = daysBetween(trade.tradeDate, today.toISOString().slice(0, 10)) <= analysisWindowDays;
      const sourceMatch = selectedSource === 'All' || trade.source === selectedSource;
      const typeMatch = selectedType === 'All' || trade.tradeType === selectedType;
      const chamberMatch = selectedChamber === 'All' || trade.chamber === selectedChamber;
      const politicianMatch = selectedPolitician === 'All' || trade.politician === selectedPolitician;
      const sectorMatch = selectedSector === 'All' || (trade.sector || 'Unknown') === selectedSector;
      const freshnessMatch =
        selectedFreshness === 'All' || getFreshnessLabel(trade.disclosureDelayDays) === selectedFreshness;
      const tickerMatch =
        tickerQuery.trim() === '' || trade.ticker.toLowerCase().includes(tickerQuery.trim().toLowerCase());
      const selectedTickerMatch = selectedTicker === 'All' || trade.ticker === selectedTicker;

      return (
        withinWindow &&
        sourceMatch &&
        typeMatch &&
        chamberMatch &&
        politicianMatch &&
        sectorMatch &&
        freshnessMatch &&
        tickerMatch &&
        selectedTickerMatch
      );
    });
  }, [
    allTrades,
    selectedSource,
    selectedType,
    selectedChamber,
    selectedPolitician,
    selectedSector,
    selectedFreshness,
    selectedTicker,
    tickerQuery,
  ]);

  const filteredAnalytics = useMemo(() => buildAnalytics(filteredTrades), [filteredTrades]);
  const { buys, consensusRows, concentrationRows, ideaRows, sectorRows, politicianRows } = filteredAnalytics;

  const summary = {
    buyCount: buys.length,
    consensusTickers: consensusRows.length,
    avgDelay: filteredAnalytics.avgDelay,
    staleCount: filteredAnalytics.staleCount,
    winRate: filteredAnalytics.winRate,
    avgReturn: filteredAnalytics.avgReturn,
    totalAmount: filteredAnalytics.totalAmount,
  };

  const sourceCount = new Set(allTrades.map((trade) => trade.source)).size;
  const politicianCount = new Set(allTrades.map((trade) => trade.politician)).size;
  const activeSectorLabel = selectedSector === 'All' ? 'All sectors' : selectedSector;
  const activeTickerLabel = selectedTicker === 'All' ? 'All tickers' : selectedTicker;

  const topConsensus = consensusRows[0];
  const topIdea = ideaRows[0];
  const topPolitician = politicianRows[0];
  const topSector = sectorRows[0];
  const datasetCount = sampleTrades.length;
  const activeFilterCount =
    [
      selectedSource,
      selectedType,
      selectedChamber,
      selectedPolitician,
      selectedFreshness,
      selectedSector,
      selectedTicker,
    ].filter((value) => value !== 'All').length + Number(Boolean(tickerQuery.trim()));
  const freshTrades = useMemo(
    () => filteredTrades.filter((trade) => getFreshnessLabel(trade.disclosureDelayDays) === 'Fresh'),
    [filteredTrades],
  );
  const freshAnalytics = useMemo(() => buildAnalytics(freshTrades), [freshTrades]);
  const freshestIdea = freshAnalytics.consensusRows[0] || freshAnalytics.ideaRows[0];
  const sourceRows = sources
    .filter((source) => source !== 'All')
    .map((source) => ({
      source,
      count: filteredTrades.filter((trade) => trade.source === source).length,
    }))
    .sort((a, b) => b.count - a.count);
  const strongestSource = sourceRows[0];
  const freshnessRows = ['Fresh', 'Lagged', 'Stale'].map((bucket) => {
    const count = filteredTrades.filter((trade) => getFreshnessLabel(trade.disclosureDelayDays) === bucket).length;
    return {
      bucket,
      count,
      share: filteredTrades.length ? count / filteredTrades.length : 0,
    };
  });

  const tickerTapeRows = ideaRows.slice(0, 8);
  const spotlightPoliticians = politicianRows.slice(0, 5);
  const dispatchRows = [
    {
      id: 'cluster',
      label: 'Crowd',
      value: concentrationRows[0] ? concentrationRows[0].ticker : 'No crowding',
      detail: concentrationRows[0] ? `${concentrationRows[0].count} buys` : 'No crowding',
    },
    {
      id: 'source',
      label: 'Source',
      value: strongestSource ? strongestSource.source : 'No source',
      detail: strongestSource ? `${strongestSource.count} filings` : 'No source',
    },
    {
      id: 'sector',
      label: 'Sector',
      value: topSector ? topSector.sector : 'No sector',
      detail: topSector ? `${topSector.count} buys` : 'No sector',
    },
  ];
  const consistencyOverview = [
    {
      label: 'Operator',
      value: topPolitician ? topPolitician.politician : 'N/A',
      detail: topPolitician ? `${topPolitician.buys} buys` : 'No operator',
    },
    {
      label: 'Win rate',
      value: formatPct(summary.winRate * 100),
      detail: 'Above entry',
    },
    {
      label: 'Lag',
      value: `${summary.avgDelay.toFixed(1)}d`,
      detail: 'Trade to filing',
    },
  ];
  const insightCards = [
    {
      id: 'consensus',
      label: 'Consensus',
      value: topConsensus ? topConsensus.ticker : 'No cluster',
      detail: topConsensus ? `${topConsensus.count} politicians` : 'No cluster',
      tone: topConsensus ? toneClass(topConsensus.avgReturn) : 'tone tone-flat',
      onClick: topConsensus ? () => setSelectedTicker(topConsensus.ticker) : undefined,
    },
    {
      id: 'freshness',
      label: 'Fresh',
      value: freshestIdea ? freshestIdea.ticker : 'No fresh edge',
      detail: freshestIdea ? `${freshTrades.length} fresh rows` : 'No fresh edge',
      tone: freshestIdea ? toneClass(freshestIdea.avgReturn || 0) : 'tone tone-flat',
      onClick: freshestIdea
        ? () => {
            setSelectedFreshness('Fresh');
            setSelectedTicker(freshestIdea.ticker);
          }
        : undefined,
    },
    {
      id: 'operator',
      label: 'Operator',
      value: topPolitician ? topPolitician.politician : 'No operator',
      detail: topPolitician ? `${formatPct(topPolitician.winRate * 100)} win rate` : 'No operator',
      tone: topPolitician ? toneClass(topPolitician.avgReturn) : 'tone tone-flat',
      onClick: topPolitician ? () => setSelectedPolitician(topPolitician.politician) : undefined,
    },
  ];
  const blotterCells = [
    {
      id: 'consensus',
      label: 'Consensus',
      value: topConsensus ? topConsensus.ticker : 'N/A',
      note: topConsensus ? `${topConsensus.count} politicians` : 'No cluster',
      tone: topConsensus ? toneClass(topConsensus.avgReturn) : 'tone tone-flat',
    },
    {
      id: 'fresh-lead',
      label: 'Fresh',
      value: freshestIdea ? freshestIdea.ticker : 'N/A',
      note: freshestIdea ? `${freshTrades.length} fresh rows` : 'No fresh edge',
      tone: freshestIdea ? toneClass(freshestIdea.avgReturn || 0) : 'tone tone-flat',
    },
    {
      id: 'operator',
      label: 'Operator',
      value: topPolitician ? topPolitician.politician : 'N/A',
      note: topPolitician ? `${formatPct(topPolitician.winRate * 100)} win rate` : 'No edge',
      tone: topPolitician ? toneClass(topPolitician.avgReturn) : 'tone tone-flat',
    },
    {
      id: 'avg-return',
      label: 'Avg return',
      value: formatPct(summary.avgReturn),
      note: 'Since trade date',
      tone: toneClass(summary.avgReturn),
    },
    {
      id: 'win-rate',
      label: 'Win rate',
      value: formatPct(summary.winRate * 100),
      note: 'Buys above entry',
      tone: 'tone tone-flat',
    },
    {
      id: 'lag',
      label: 'Lag',
      value: `${summary.avgDelay.toFixed(1)}d`,
      note: 'Trade to filing',
      tone: 'tone tone-flat',
    },
  ];

  function resetFilters() {
    setSelectedSource('All');
    setSelectedType('All');
    setSelectedChamber('All');
    setSelectedPolitician('All');
    setSelectedFreshness('All');
    setSelectedSector('All');
    setSelectedTicker('All');
    setTickerQuery('');
  }

  return (
    <div className="shell">
      <header className="masthead">
        <div className="masthead-bar">
          <div className="brand-lockup">
            <h1>Capitol Trade</h1>
          </div>
          <aside className="card coverage-card">
            <div className="status-cluster status-cluster-compact">
              <div className="status-pill">
                <span>Window</span>
                <strong>2 years</strong>
              </div>
              <div className="status-pill">
                <span>Sources</span>
                <strong>{sourceCount}</strong>
              </div>
              <div className="status-pill">
                <span>Politicians</span>
                <strong>{politicianCount}</strong>
              </div>
              <div className="status-pill">
                <span>Filters</span>
                <strong>{activeFilterCount || 'Open'}</strong>
              </div>
            </div>
          </aside>
        </div>

        <div className="ticker-tape">
          {tickerTapeRows.map((row) => (
            <button
              className={`tape-item ${selectedTicker === row.ticker ? 'tape-item-active' : ''}`}
              key={row.ticker}
              onClick={() => setSelectedTicker((current) => (current === row.ticker ? 'All' : row.ticker))}
            >
              <strong>{row.ticker}</strong>
              <span>{row.count} mentions</span>
              <em className={toneClass(row.avgReturn)}>{formatPct(row.avgReturn)}</em>
            </button>
          ))}
        </div>

        <section className="blotter-overview">
          <article className="card blotter-main">
            <div className="blotter-grid">
              {blotterCells.map((cell) => (
                <div className="blotter-cell" key={cell.id}>
                  <span>{cell.label}</span>
                  <strong className={cell.tone}>{cell.value}</strong>
                  <em>{cell.note}</em>
                </div>
              ))}
            </div>
          </article>

          <aside className="card blotter-side">
            <div className="lead-list">
              {insightCards.map((card) => (
                <button className="lead-row" key={card.id} onClick={card.onClick} type="button">
                  <span className="lead-row-label">{card.label}</span>
                  <strong className={card.tone}>{card.value}</strong>
                  <em>{card.detail}</em>
                </button>
              ))}
            </div>
          </aside>
        </section>
      </header>

      <section className="card control-deck">
        <div className="controls-head controls-head-tight">
          <div className="summary-ribbon">
            <div className="ribbon-stat">
              <span>Fresh</span>
              <strong>{freshnessRows[0].count}</strong>
            </div>
            <div className="ribbon-stat">
              <span>Stale</span>
              <strong>{summary.staleCount}</strong>
            </div>
            <div className="ribbon-stat">
              <span>Rows</span>
              <strong>{datasetCount}</strong>
            </div>
          </div>
          <button className="action-button action-button-muted" type="button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>

        <div className="controls-grid">
          <Filter label="Source" value={selectedSource} onChange={setSelectedSource} options={sources} />
          <Filter label="Trade type" value={selectedType} onChange={setSelectedType} options={tradeTypes} />
          <Filter label="Chamber" value={selectedChamber} onChange={setSelectedChamber} options={chambers} />
          <Filter label="Politician" value={selectedPolitician} onChange={setSelectedPolitician} options={politicianOptions} />
          <Filter label="Sector" value={selectedSector} onChange={setSelectedSector} options={sectorOptions} />
          <Filter label="Freshness" value={selectedFreshness} onChange={setSelectedFreshness} options={freshnessValues} />
          <div className="search">
            <label htmlFor="ticker">Ticker</label>
            <input
              id="ticker"
              value={tickerQuery}
              onChange={(event) => setTickerQuery(event.target.value)}
              placeholder="Search ticker"
            />
          </div>
        </div>
      </section>

      <section className="board-grid">
        <div className="board-main">
          <article className="card table-card consensus-card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ticker</th>
                    <th>Names</th>
                    <th>Return</th>
                    <th>Trend</th>
                    <th>Capital</th>
                    <th>Filed</th>
                  </tr>
                </thead>
                <tbody>
                  {consensusRows.map((row, index) => (
                    <tr key={row.ticker}>
                      <td>
                        <span className="rank-chip">{String(index + 1).padStart(2, '0')}</span>
                      </td>
                      <td>
                        <strong className="ticker-label">{row.ticker}</strong>
                        <div className="subtle">{row.company}</div>
                      </td>
                      <td>{row.count}</td>
                      <td>
                        <span className={toneClass(row.avgReturn)}>{formatPct(row.avgReturn)}</span>
                      </td>
                      <td>
                        <TrendSpark rows={row.rows} />
                      </td>
                      <td>{formatMoney(row.totalAmount)}</td>
                      <td>{formatDate(row.latestFilingDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="card sector-board">
            <div className="sector-grid">
              {sectorRows.slice(0, 8).map((row, index) => (
                <button
                  className={`sector-card ${selectedSector === row.sector ? 'sector-card-active' : ''}`}
                  key={row.sector}
                  onClick={() => setSelectedSector((current) => (current === row.sector ? 'All' : row.sector))}
                >
                  <div className="sector-head">
                    <span className="sector-rank">{String(index + 1).padStart(2, '0')}</span>
                    <strong>{row.sector}</strong>
                  </div>
                  <span>{row.count} buys</span>
                  <em>{formatPct(row.winRate * 100)}</em>
                  <em className={toneClass(row.avgReturn)}>{formatPct(row.avgReturn)}</em>
                </button>
              ))}
            </div>
          </article>
        </div>

        <aside className="board-side">
          <article className="card ideas-panel">
            <div className="idea-list">
              {ideaRows.slice(0, 8).map((row, index) => (
                <button
                  className={`idea-row ${selectedTicker === row.ticker ? 'idea-row-active' : ''}`}
                  key={row.ticker}
                  onClick={() => setSelectedTicker((current) => (current === row.ticker ? 'All' : row.ticker))}
                >
                  <div className="idea-rank-rail">
                    <div className="idea-rank">{String(index + 1).padStart(2, '0')}</div>
                    <span className="idea-score">{Math.round(row.signalScore)}</span>
                  </div>
                  <div className="idea-copy">
                    <div className="idea-row-top">
                      <strong>{row.ticker}</strong>
                      <span>{row.count} politicians</span>
                    </div>
                    <div className="idea-row-meta">
                      <span>{row.count} mentions</span>
                      <span>{formatPct(row.winRate * 100)}</span>
                      <span className={toneClass(row.avgReturn)}>{formatPct(row.avgReturn)}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </article>

          <article className="card operators-panel">
            <div className="operator-list">
              {spotlightPoliticians.map((row, index) => (
                <button
                  className={`operator-card ${selectedPolitician === row.politician ? 'operator-card-active' : ''}`}
                  key={row.politician}
                  onClick={() => setSelectedPolitician((current) => (current === row.politician ? 'All' : row.politician))}
                  type="button"
                >
                  <div className="operator-top">
                    <div className="operator-name">
                      <span className="operator-rank">{String(index + 1).padStart(2, '0')}</span>
                      <strong>{row.politician}</strong>
                    </div>
                    <strong className={toneClass(row.avgReturn)}>{formatPct(row.avgReturn)}</strong>
                  </div>
                  <div className="operator-metrics">
                    <span>{row.buys} buys</span>
                    <span>{formatPct(row.winRate * 100)}</span>
                    <span>{row.consensusCount} tickers</span>
                    <span>{row.avgDelay.toFixed(1)}d</span>
                  </div>
                </button>
              ))}
            </div>
          </article>
        </aside>
      </section>

      <section className="secondary-grid">
        <article className="card timing-card">
          <div className="stack split-stack">
            <div className="bars">
              {sourceRows.map((row) => {
                const max = Math.max(...sourceRows.map((candidate) => candidate.count), 1);

                return (
                  <div className="bar-row" key={row.source}>
                    <div className="bar-label">
                      <span>{row.source}</span>
                      <strong>{row.count}</strong>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(row.count / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="freshness-grid">
              {freshnessRows.map((row) => (
                <div className="freshness-card" key={row.bucket}>
                  <span>{row.bucket}</span>
                  <strong>{row.count}</strong>
                  <em>{Math.round(row.share * 100)}% of current screen</em>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="closing-grid">
        <article className="card table-card consistency-card">
            <div className="consistency-overview">
              {consistencyOverview.map((item) => (
                <div className="consistency-pill" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <em>{item.detail}</em>
                </div>
              ))}
            </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Politician</th>
                  <th>Chamber</th>
                  <th>Buys</th>
                  <th>Win</th>
                  <th>Return</th>
                  <th>Lag</th>
                </tr>
              </thead>
              <tbody>
                {politicianRows.map((row) => (
                  <tr key={row.politician}>
                    <td>
                      <strong>{row.politician}</strong>
                      <div className="subtle">{row.party} · {row.consensusCount}</div>
                    </td>
                    <td>{row.chamber}</td>
                    <td>{row.buys}</td>
                    <td>{formatPct(row.winRate * 100)}</td>
                    <td>
                      <span className={toneClass(row.avgReturn)}>{formatPct(row.avgReturn)}</span>
                    </td>
                    <td>{row.avgDelay.toFixed(1)}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="card dispatch-card">
          <div className="dispatch-list">
            {dispatchRows.map((row) => (
              <div className="dispatch-item" key={row.id}>
                <span className="dispatch-label">{row.label}</span>
                <strong>{row.value}</strong>
                <p>{row.detail}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

    </div>
  );
}

function SignalTile({ label, value, tone = 'default' }) {
  return (
    <div className={`signal-tile signal-tile-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Filter({ label, value, onChange, options }) {
  return (
    <div className="filter">
      <label>{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TrendSpark({ rows }) {
  const values = rows
    .slice()
    .sort((a, b) => new Date(a.tradeDate) - new Date(b.tradeDate))
    .map((row) => row.currentPrice - row.closePriceAtTrade);

  if (!values.length) {
    return <span className="trend-empty">No data</span>;
  }

  const maxAbs = Math.max(...values.map((value) => Math.abs(value)), 1);

  return (
    <div className="trend-spark" aria-label="Price change sparkline">
      {values.map((value, index) => (
        <span
          key={`${rows[index]?.id || index}-${index}`}
          className={`trend-bar ${value >= 0 ? 'trend-bar-up' : 'trend-bar-down'}`}
          style={{ height: `${Math.max(18, (Math.abs(value) / maxAbs) * 100)}%` }}
        />
      ))}
    </div>
  );
}

export default App;
