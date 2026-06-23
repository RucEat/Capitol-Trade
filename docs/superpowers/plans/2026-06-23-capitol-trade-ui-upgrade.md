# Capitol Trade UI Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the current local dashboard into a more premium `Capitol Trade` product with an editorial-terminal visual style, richer quant presentation, and a new GitHub repository target.

**Architecture:** Keep the existing React/Vite app and analytics model, but reshape the page into stronger visual sections and extract lightweight presentation helpers if the main file grows too large. Use CSS-driven layout and styling changes first, only adjusting data shaping where new UI elements need derived display values.

**Tech Stack:** React 19, Vite 7, plain CSS, local browser storage

## Global Constraints

- Visible product name must be `Capitol Trade`.
- Visual direction must be `Editorial terminal` with a measured `Quant workstation` mix.
- Do not reintroduce the public import panel on the main page.
- Preserve local-first behavior and current filter functionality.
- No paid services.
- Must remain usable on desktop and mobile.
- Publish to a new GitHub repository named `Capitol Trade`.

---

### Task 1: Restructure the page into a stronger product surface

**Files:**
- Modify: `/Users/kp/Documents/Capitol Whales/src/app.jsx`
- Modify: `/Users/kp/Documents/Capitol Whales/src/styles.css`

**Interfaces:**
- Consumes: `buildAnalytics(rows)`, `sampleTrades`, existing filter state
- Produces: New page sections and renamed visible branding

- [ ] Replace the visible branding and top-page structure with a `Capitol Trade` masthead, stronger hero, and top market strip.
- [ ] Recompose the page so consensus, ideas, sectors, memo, and rankings feel intentionally grouped rather than evenly stacked.
- [ ] Keep all current filtering behavior intact while moving controls into a more premium layout.

### Task 2: Upgrade the data presentation layer

**Files:**
- Modify: `/Users/kp/Documents/Capitol Whales/src/app.jsx`
- Modify: `/Users/kp/Documents/Capitol Whales/src/data.js`
- Modify: `/Users/kp/Documents/Capitol Whales/src/styles.css`

**Interfaces:**
- Consumes: `consensusRows`, `ideaRows`, `sectorRows`, `politicianRows`
- Produces: Richer display fields and stronger ranking visuals

- [ ] Add any small derived display helpers needed for denser cards, ranking badges, or ticker-strip summaries.
- [ ] Improve consensus and politician tables so they read more like a market workstation.
- [ ] Strengthen positive/negative visual encoding and ranked-card treatment.

### Task 3: Clean up component boundaries if needed

**Files:**
- Modify: `/Users/kp/Documents/Capitol Whales/src/app.jsx`
- Create if needed: `/Users/kp/Documents/Capitol Whales/src/components/*.jsx`

**Interfaces:**
- Consumes: Existing state and analytics objects
- Produces: Smaller presentation units if the app file becomes unwieldy

- [ ] If `src/app.jsx` becomes too large during the redesign, extract focused presentational components without changing behavior.
- [ ] Keep the data and filter wiring easy to follow.

### Task 4: Verify the upgraded app locally

**Files:**
- Modify if needed: `/Users/kp/Documents/Capitol Whales/src/app.jsx`
- Modify if needed: `/Users/kp/Documents/Capitol Whales/src/styles.css`

**Interfaces:**
- Consumes: Vite build and running local browser preview
- Produces: Verified local dashboard

- [ ] Run a production build with the bundled Node runtime.
- [ ] Refresh the local browser page and visually confirm the updated layout is live.
- [ ] Spot-check desktop and mobile-responsive behavior in the browser if practical.

### Task 5: Publish to a new GitHub repository

**Files:**
- Modify: `/Users/kp/Documents/Capitol Whales/.git/config` indirectly through git commands

**Interfaces:**
- Consumes: Local git repository state
- Produces: New remote for `Capitol Trade`

- [ ] Inspect the current git state and confirm whether a remote already exists.
- [ ] Create a new GitHub repository named `Capitol Trade`.
- [ ] Add the new repo as remote and push the current branch there.

## Self-Review

- The plan covers the requested visual overhaul, visible renaming, verification, and GitHub publishing.
- There are no placeholder `TODO` steps.
- The plan stays within the existing app and avoids unnecessary dependencies.
