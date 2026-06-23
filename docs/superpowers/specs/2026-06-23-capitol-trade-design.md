# Capitol Trade Design

## Goal

Upgrade the current local dashboard into a more premium, high-contrast product surface named `Capitol Trade`, combining an editorial/newsroom feel with enough quant density to stay credible for active market tracking.

## Product Direction

The primary visual language is `Editorial terminal`:
- bold masthead
- stronger type hierarchy
- sharper ranking cues
- richer market-style panels

The secondary visual language is `Quant workstation`:
- denser metric presentation
- more useful table scanning
- stronger ticker emphasis
- clearer positive/negative encoding

The result should feel more serious and more expensive than the current page, without becoming cluttered or looking like a generic admin dashboard.

## User-Facing Changes

### Branding

- Rename the visible product from `Capitol Whales` to `Capitol Trade`.
- Keep the local-first and free-positioning, but present it more cleanly and with more confidence.

### Layout

- Replace the current top section with a stronger command-center style masthead.
- Introduce a clearer top-to-bottom story:
  - brand and snapshot
  - key market signals
  - consensus and conviction views
  - politician ranking and memo
- Rebalance the mid-page layout so it feels intentionally composed, not just stacked cards.

### Components

- Upgrade hero and masthead treatment.
- Add a ticker-tape or market-strip style summary row.
- Make best-idea and consensus sections feel more ranked and less flat.
- Increase data density in tables while preserving readability.
- Improve chip, card, and filter styling so they feel like part of one system.

### Interaction

- Keep the current filter behavior, including sector filtering and ticker chips.
- Preserve local persistence behavior.
- Do not reintroduce the public import panel on the main page.

## Technical Direction

- Stay in the existing React/Vite app.
- Reuse the current analytics/data pipeline where possible.
- Split presentation helpers out of the single app file if the page becomes too crowded during the redesign.
- Prefer CSS-first upgrades over new dependencies.

## GitHub Delivery

- Create a new GitHub repository named `Capitol Trade`.
- Push the current project into that repository after the UI upgrade is complete.
- Keep the local workspace intact.

## Constraints

- No paid services.
- No export/report product surface.
- Must work locally.
- Must remain usable on desktop and mobile.
