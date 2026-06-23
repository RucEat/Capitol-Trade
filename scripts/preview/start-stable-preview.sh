#!/bin/sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"
PID_FILE="$ROOT_DIR/.capitol-trade-preview.pid"
LOG_FILE="$ROOT_DIR/.capitol-trade-preview.log"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-4173}"
BUNDLED_NODE="/Users/kp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"

if [ -x "$BUNDLED_NODE" ]; then
  NODE_BIN="$BUNDLED_NODE"
elif command -v node >/dev/null 2>&1; then
  NODE_BIN="$(command -v node)"
else
  echo "No Node.js runtime was found."
  exit 1
fi

if [ -f "$PID_FILE" ]; then
  EXISTING_PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  if [ -n "${EXISTING_PID:-}" ] && kill -0 "$EXISTING_PID" 2>/dev/null; then
    echo "Stable preview already running at http://$HOST:$PORT (pid $EXISTING_PID)."
    exit 0
  fi
  rm -f "$PID_FILE"
fi

cd "$ROOT_DIR"
"$NODE_BIN" node_modules/vite/bin/vite.js build >/dev/null
nohup "$NODE_BIN" node_modules/vite/bin/vite.js preview --host "$HOST" --port "$PORT" --strictPort >"$LOG_FILE" 2>&1 &
PREVIEW_PID="$!"
echo "$PREVIEW_PID" >"$PID_FILE"
sleep 1

if kill -0 "$PREVIEW_PID" 2>/dev/null && grep -q "http://$HOST:$PORT" "$LOG_FILE"; then
  echo "Stable preview started at http://$HOST:$PORT"
  echo "PID: $PREVIEW_PID"
  echo "Log: $LOG_FILE"
else
  echo "Stable preview failed to start. Check $LOG_FILE"
  rm -f "$PID_FILE"
  exit 1
fi
