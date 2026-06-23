#!/bin/sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"
PID_FILE="$ROOT_DIR/.capitol-trade-preview.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "No background stable preview pid file was found."
  exit 0
fi

PREVIEW_PID="$(cat "$PID_FILE" 2>/dev/null || true)"

if [ -z "${PREVIEW_PID:-}" ]; then
  rm -f "$PID_FILE"
  echo "Preview pid file was empty and has been cleared."
  exit 0
fi

if kill -0 "$PREVIEW_PID" 2>/dev/null; then
  kill "$PREVIEW_PID"
  rm -f "$PID_FILE"
  echo "Stable preview stopped (pid $PREVIEW_PID)."
else
  rm -f "$PID_FILE"
  echo "Stable preview was not running. Cleared stale pid file."
fi
