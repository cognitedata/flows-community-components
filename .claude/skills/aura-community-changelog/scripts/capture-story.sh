#!/usr/bin/env bash
# Screenshot one Storybook story with headless Chrome (no install needed beyond Chrome).
# Usage: capture-story.sh <storybook_base_url> <story-id> <out.png> [width] [height] [scale]
# Small components (avatars, pickers, counts) look better with a tight window and scale 2-3, then use auto image height in the post.
# Chromatic blocks iframe embedding, so the post uses these images plus a link instead.
set -euo pipefail
base="$1"; id="$2"; out="$3"; w="${4:-1000}"; h="${5:-560}"; sc="${6:-1}"
chrome="${CHROME_BIN:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
mkdir -p "$(dirname "$out")"
"$chrome" --headless=new --disable-gpu --hide-scrollbars \
  --window-size="${w},${h}" --force-device-scale-factor="$sc" --virtual-time-budget=15000 \
  --screenshot="$out" "${base}/iframe.html?id=${id}&viewMode=story" >/dev/null 2>&1
[ -s "$out" ] && echo "ok $out" || { echo "failed $id" >&2; exit 1; }
