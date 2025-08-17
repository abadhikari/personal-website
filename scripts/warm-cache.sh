#!/usr/bin/env bash
set -euo pipefail

USER_AGENT="prewarmer/1.0"

: "${BASE_URL:?BASE_URL required}"
: "${ORIGIN_HEADER:?ORIGIN_HEADER required}"
: "${URLS:?URLS required}"

failures=0

while IFS= read -r path; do
  [ -z "$path" ] && continue
  full_url="${BASE_URL%/}/${path#/}"
  echo "Warming ${full_url}"

  opts=(
    --fail
    --retry 1 --retry-all-errors --retry-delay 10
    --connect-timeout 5 --max-time 12
    --compressed
    -H "User-Agent: $USER_AGENT"
    -H "Accept-Encoding: gzip, br"
    -H "Origin: $ORIGIN_HEADER"
  )

  if [[ -n "${VERBOSE:-}" ]]; then
    if ! curl -sS -D - -o /dev/null "${opts[@]}" "$full_url"; then
      echo "Failed: ${full_url}"
      ((failures++))
    fi
  else
    if ! curl -sS "${opts[@]}" "$full_url" >/dev/null; then
      echo "Failed: ${full_url}"
      ((failures++))
    fi
  fi
done <<< "$URLS"

if ((failures > 0)); then
  echo "❌ $failures cache warm requests failed"
  exit 1
else
  echo "✅ All cache warm requests succeeded"
fi
