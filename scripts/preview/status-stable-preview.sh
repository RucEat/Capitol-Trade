#!/bin/sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"
PID_FILE="$ROOT_DIR/.capitol-trade-preview.pid"
LOG_FILE="$ROOT_DIR/.capitol-trade-preview.log"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-4173}"

if [ ! -f "$PID_FILE" ]; then
  echo "Stable preview is not running."
  exit 0
fi

PREVIEW_PID="$(cat "$PID_FILE" 2>/dev/null || true)"

if [ -n "${PREVIEW_PID:-}" ] && kill -0 "$PREVIEW_PID" 2>/dev/null; then
  echo "Stable preview is running."
  echo "URL: http://$HOST:$PORT"
  echo "PID: $PREVIEW_PID"
  echo "Log: $LOG_FILE"
else
  echo "Stable preview is not running, but a stale pid file exists."
  echo "Run: npm run serve:stable:bg:stop"
fi
