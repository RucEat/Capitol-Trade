import React, { useMemo, useState } from 'react';
import {
  analysisWindowDays,
  buildAnalytics,
  daysBetween,
  getFreshnessLabel,
  loadStoredTrades,
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
  const [selectedFreshness, setSelectedFreshness] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedTicker, setSelectedTicker] = useState('All');
  const [tickerQuery, setTickerQuery] = useState('');

  const importedTrades = useMemo(() => loadStoredTrades(), []);
  const allTrades = importedTrades.length ? importedTrades : sampleTrades;

  const sources = useMemo(() => ['All', ...new Set(allTrades.map((trade) => trade.source))], [allTrades]);
  const tradeTypes = useMemo(() => ['All', ...new Set(allTrades.map((trade) => trade.tradeType))], [allTrades]);
  const chambers = useMemo(() => ['All', ...new Set(allTrades.map((trade) => trade.chamber))], [allTrades]);
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
    selectedSector,
    selectedFreshness,
    selectedTicker,
    tickerQuery,
  ]);

  const filteredAnalytics = useMemo(() => buildAnalytics(filteredTrades), [filteredTrades]);
  const { buys, consensusRows, concentrationRows, ideaRows, sectorRows, politicianRows } = filteredAnalytics;

  const summary = {
    tradeCount: filteredTrades.length,
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
  const freshnessRows = ['Fresh', 'Lagged', 'Stale'].map((bucket) => {
    const count = filteredTrades.filter((trade) => getFreshnessLabel(trade.disclosureDelayDays) === bucket).length;
    return {
      bucket,
      count,
      share: filteredTrades.length ? count / filteredTrades.length : 0,
    };
  });

  const tickerTapeRows = ideaRows.slice(0, 6);
  const spotlightPoliticians = politicianRows.slice(0, 3);

  return (
    <div className="shell">
      <header className="masthead">
        <div className="masthead-bar">
          <div className="brand-lockup">
            <p className="eyebrow">Capitol Trade</p>
            <div className="brand-row">
              <h1>Capitol trades, ranked by consensus, timing, and repeatability.</h1>
              <span className="brand-stamp">Local intelligence terminal</span>
            </div>
          </div>
          <div className="status-cluster">
            <div className="status-pill">
              <span>Analysis window</span>
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
          </div>
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

        <div className="hero-grid">
          <section className="card hero-main">
            <p className="section-kicker">Political Flow Radar</p>
            <p className="hero-copy">
              Track where congressional money clusters, separate strong economics from stale disclosures, and surface
              the few names that keep appearing across different politicians.
            </p>

            <div className="hero-thesis">
              <div>
                <span>Consensus lead</span>
                <strong>{topConsensus ? topConsensus.ticker : 'N/A'}</strong>
                <em>{topConsensus ? `${topConsensus.count} politicians aligned` : 'No aligned ticker in view'}</em>
              </div>
              <div>
                <span>Best idea</span>
                <strong>{topIdea ? topIdea.ticker : 'N/A'}</strong>
                <em>{topIdea ? `${Math.round(topIdea.signalScore)} composite signal` : 'No idea in view'}</em>
              </div>
              <div>
                <span>Best operator</span>
                <strong>{topPolitician ? topPolitician.politician : 'N/A'}</strong>
                <em>{topPolitician ? `${formatPct(topPolitician.avgReturn)} average return` : 'No operator in view'}</em>
              </div>
            </div>

            <div className="hero-metrics">
              <HeroMetric label="Consensus tickers" value={summary.consensusTickers} helper="Names bought by 2+ politicians" />
              <HeroMetric label="Average buy return" value={formatPct(summary.avgReturn)} helper="Absolute performance since purchase" />
              <HeroMetric label="Buy win rate" value={formatPct(summary.winRate * 100)} helper="Share of buys still above entry" />
            </div>
          </section>

          <aside className="card signal-board">
            <div className="card-heading compact">
              <div>
                <p className="section-kicker">Command Deck</p>
                <h2>Current screen</h2>
              </div>
            </div>
            <div className="signal-grid">
              <SignalTile label="Trades in view" value={summary.tradeCount} />
              <SignalTile label="Buy-side trades" value={summary.buyCount} />
              <SignalTile label="Capital tracked" value={formatCompactMoney(summary.totalAmount)} />
              <SignalTile label="Average lag" value={`${summary.avgDelay.toFixed(1)}d`} />
              <SignalTile label="Active sector" value={activeSectorLabel} tone="wide" />
              <SignalTile label="Active ticker" value={activeTickerLabel} tone="wide" />
            </div>
          </aside>
        </div>
      </header>

      <section className="card control-deck">
        <div className="controls-head">
          <div>
            <p className="section-kicker">Filters</p>
            <h2>Slice the screen like a workstation</h2>
          </div>
          <div className="summary-ribbon">
            <RibbonStat label="Fresh trades" value={freshnessRows[0].count} />
            <RibbonStat label="Stale trades" value={summary.staleCount} />
            <RibbonStat label="Saved rows" value={importedTrades.length || sampleTrades.length} />
          </div>
        </div>

        <div className="controls-grid">
          <Filter label="Source" value={selectedSource} onChange={setSelectedSource} options={sources} />
          <Filter label="Trade type" value={selectedType} onChange={setSelectedType} options={tradeTypes} />
          <Filter label="Chamber" value={selectedChamber} onChange={setSelectedChamber} options={chambers} />
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
            <div className="card-heading">
              <div>
                <p className="section-kicker">Consensus Board</p>
                <h2>Shared buy conviction across politicians</h2>
              </div>
              <span className="muted">{consensusRows.length} matching tickers</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Ticker</th>
                    <th>Politicians</th>
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
            <div className="card-heading">
              <div>
                <p className="section-kicker">Sector Pressure</p>
                <h2>Where buy interest is clustering</h2>
              </div>
              <span className="muted">{sectorRows.length} sectors</span>
            </div>
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
                  <em>{formatPct(row.winRate * 100)} win rate</em>
                  <em className={toneClass(row.avgReturn)}>{formatPct(row.avgReturn)} avg return</em>
                </button>
              ))}
            </div>
          </article>
        </div>

        <aside className="board-side">
          <article className="card ideas-panel">
            <div className="card-heading">
              <div>
                <p className="section-kicker">High-Conviction Names</p>
                <h2>Signals worth watching</h2>
              </div>
              <span className="muted">{ideaRows.length} names</span>
            </div>
            <div className="idea-list">
              {ideaRows.slice(0, 6).map((row, index) => (
                <button
                  className={`idea-row ${selectedTicker === row.ticker ? 'idea-row-active' : ''}`}
                  key={row.ticker}
                  onClick={() => setSelectedTicker((current) => (current === row.ticker ? 'All' : row.ticker))}
                >
                  <div className="idea-rank">{String(index + 1).padStart(2, '0')}</div>
                  <div className="idea-copy">
                    <div className="idea-row-top">
                      <strong>{row.ticker}</strong>
                      <span>{Math.round(row.signalScore)} signal</span>
                    </div>
                    <div className="idea-row-meta">
                      <span>{row.count} mentions</span>
                      <span>{formatPct(row.winRate * 100)} win rate</span>
                      <span className={toneClass(row.avgReturn)}>{formatPct(row.avgReturn)}</span>
                    </div>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill" style={{ width: `${Math.max(18, Math.min(100, row.winRate * 100))}%` }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </article>

          <article className="card operators-panel">
            <div className="card-heading">
              <div>
                <p className="section-kicker">Repeatable Operators</p>
                <h2>Best-looking politicians in view</h2>
              </div>
            </div>
            <div className="operator-list">
              {spotlightPoliticians.map((row, index) => (
                <div className="operator-card" key={row.politician}>
                  <div className="operator-top">
                    <span className="operator-rank">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <strong>{row.politician}</strong>
                      <p className="subtle">
                        {row.party} · {row.chamber}
                      </p>
                    </div>
                  </div>
                  <div className="operator-metrics">
                    <span>{row.buys} buys</span>
                    <span>{formatPct(row.winRate * 100)} win rate</span>
                    <span className={toneClass(row.avgReturn)}>{formatPct(row.avgReturn)} return</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>

      <section className="secondary-grid">
        <article className="card">
          <div className="card-heading">
            <div>
              <p className="section-kicker">Concentration</p>
              <h2>Most repeated buy-side tickers</h2>
            </div>
            <span className="muted">{concentrationRows.length} tickers</span>
          </div>
          <div className="chips">
            {concentrationRows.slice(0, 10).map((row) => (
              <button
                className={`chip ${selectedTicker === row.ticker ? 'chip-active' : ''}`}
                key={row.ticker}
                onClick={() => setSelectedTicker((current) => (current === row.ticker ? 'All' : row.ticker))}
              >
                <strong>{row.ticker}</strong>
                <span>{row.count} buys</span>
                <em>{Math.round(row.share * 100)}% of buy flow</em>
              </button>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="card-heading">
            <div>
              <p className="section-kicker">Source and Timing</p>
              <h2>What the feed looks like</h2>
            </div>
          </div>
          <div className="stack split-stack">
            <div className="bars">
              {sources
                .filter((source) => source !== 'All')
                .map((source) => {
                  const count = allTrades.filter((trade) => trade.source === source).length;
                  const max = Math.max(
                    ...sources
                      .filter((candidate) => candidate !== 'All')
                      .map((candidate) => allTrades.filter((trade) => trade.source === candidate).length),
                    1,
                  );

                  return (
                    <div className="bar-row" key={source}>
                      <div className="bar-label">
                        <span>{source}</span>
                        <strong>{count}</strong>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${(count / max) * 100}%` }} />
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
        <article className="card table-card">
          <div className="card-heading">
            <div>
              <p className="section-kicker">Consistency Table</p>
              <h2>Politicians ranked by win rate, returns, and repeatability</h2>
            </div>
            <span className="muted">{politicianRows.length} people</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Politician</th>
                  <th>Chamber</th>
                  <th>Buys</th>
                  <th>Win rate</th>
                  <th>Avg return</th>
                  <th>Avg lag</th>
                </tr>
              </thead>
              <tbody>
                {politicianRows.map((row) => (
                  <tr key={row.politician}>
                    <td>
                      <strong>{row.politician}</strong>
                      <div className="subtle">
                        {row.party} · {row.consensusCount} unique tickers
                      </div>
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

        <aside className="stack">
          <article className="card memo-card">
            <div className="card-heading">
              <div>
                <p className="section-kicker">Desk Note</p>
                <h2>How to read the screen</h2>
              </div>
            </div>
            <ul className="memo">
              <li>Consensus matters most when multiple politicians are buying the same ticker, not merely the same sector.</li>
              <li>Fresh filings matter because a strong trade can still be stale by the time it becomes public.</li>
              <li>Repeatability matters more than one lucky trade, which is why politician ranking stays tied to win rate and average return.</li>
              <li>The strongest practical signals usually appear where consensus, freshness, and positive trend bars overlap.</li>
            </ul>
          </article>

          <article className="card footer-note">
            <div>
              <p className="section-kicker">Persistence</p>
              <h2>Local data stays on this device</h2>
            </div>
            <p>
              Imported rows still live in the browser locally, but the page stays focused on analysis rather than export.
              Use the chips and filters to narrow the field quickly.
            </p>
          </article>
        </aside>
      </section>
    </div>
  );
}

function HeroMetric({ label, value, helper }) {
  return (
    <div className="hero-metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{helper}</em>
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

function RibbonStat({ label, value }) {
  return (
    <div className="ribbon-stat">
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
