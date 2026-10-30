#!/usr/bin/env python3
"""Turn a content JSON file into a What's new report folder for the site.

Usage: python3 scripts/render-report.py <content.json> <out-dir>
       e.g. ... content.json public/whats-new-posts/2026-10-21

Writes <out-dir>/report.json plus the processed image files, then rebuilds
<out-dir>/../index.json from every sibling folder that has a report.json (newest first).
The site renders report.json natively (src/components/whats-new/whats-new-report.tsx), so
this is the only published format: there is no HTML renderer. Review a draft by copying the
folder under public/whats-new-posts/ and opening /whats-new in `pnpm dev`, or in the PR preview.

The folder name is the report's slug (its end date). Image `src` values in report.json are file
names relative to the report folder; the site resolves them against its own base path.

Content file (image paths are relative to the content file):
{
  "headline": "Title shown in the sidebar index and the browser tab",
  "eyebrow": "Oct 8 – Oct 21, 2026",              # date range: sidebar label and report eyebrow
  "title": "Aura & Community Updates",            # optional
  "intro": "1-2 sentence key takeaways",
  "asOf": "2026-10-21",                           # eval readings on or before this date
  "evals": [ ...3 cards... ],                     # optional; default: scripts/read-evals.mjs 7 <asOf>
  "highlights": {"summary": "...", "items": [ {title, text, url, label, image} x3 ]},
  "components": {"summary": "...", "cards": [ {title, subtitle, badge, text, url, label, image} ]},
  "context":    {"summary": "...", "cards": [ ... ]},
  "other":      {"summary": "...", "cards": [ ... ]},
  "thanks":     {"summary": "...", "people": ["github-handle", ...]}
}
image: {"path": "shots/x.png" | "svg": "<svg ...>", "alt": "...",
        "trim": [left, top, right, bottom]   # pixels removed so rounded panel corners don't land on the image edge
        "auto": true}                         # small component: shown at natural size, centred, instead of cropped
badge: "New" | "Update" | "Fix" | anything else (neutral, e.g. "Docs").
Only stdlib; `sips` (macOS), when present, trims and downsizes screenshots so the folder stays small.
"""
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
SKILL = HERE.parent


def sips(*args):
    return subprocess.run(["sips", *args], capture_output=True, text=True).returncode == 0


def image_bytes(image, base_dir):
    """Process an image spec. Returns (bytes, extension)."""
    if "svg" in image:
        return image["svg"].encode("utf-8"), "svg"
    path = (base_dir / image["path"]).resolve()
    if not path.exists():
        sys.exit("Image not found: %s" % path)
    if path.suffix.lower() == ".svg":
        return path.read_bytes(), "svg"
    data = path.read_bytes()
    ext = "png" if path.suffix.lower() == ".png" else "jpg"
    if shutil.which("sips"):
        with tempfile.TemporaryDirectory() as tmp:
            work = Path(tmp) / "in.png"
            shutil.copyfile(path, work)
            trim = image.get("trim")
            if trim:
                info = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(work)], capture_output=True, text=True).stdout
                width = int(re.search(r"pixelWidth: (\d+)", info).group(1))
                height = int(re.search(r"pixelHeight: (\d+)", info).group(1))
                left, top, right, bottom = trim
                cropped = Path(tmp) / "crop.png"
                if sips("-c", str(height - top - bottom), str(width - left - right), "--cropOffset", str(top), str(left), str(work), "--out", str(cropped)):
                    work = cropped
            out = Path(tmp) / "out.jpg"
            if sips("-s", "format", "jpeg", "-s", "formatOptions", "85", "--resampleWidth", "900", str(work), "--out", str(out)):
                data, ext = out.read_bytes(), "jpg"
    return data, ext


def load_evals(as_of):
    script = HERE / "read-evals.mjs"
    args = ["node", str(script), "7"] + ([as_of] if as_of else [])
    result = subprocess.run(args, capture_output=True, text=True, cwd=str(SKILL))
    if result.returncode != 0:
        sys.exit("Could not read the eval cards (%s). Provide \"evals\" in the content file or fix access.\n%s" % (script.name, result.stderr.strip()))
    return json.loads(result.stdout)


def write_report(content, base_dir, out_dir):
    evals = content.get("evals") or load_evals(content.get("asOf"))
    if len(evals) != 3:
        sys.exit("The header needs exactly 3 eval cards (got %d)" % len(evals))
    if len(content["highlights"]["items"]) != 3:
        sys.exit("Highlights must be exactly 3 (got %d)" % len(content["highlights"]["items"]))
    for key in ("components", "context", "other"):
        block = content.get(key) or {}
        if block.get("cards") and not block.get("summary"):
            sys.exit("Section %r needs a summary of the work in its cards" % key)

    out_dir.mkdir(parents=True, exist_ok=True)
    counter = {"n": 0}

    def save(image, role):
        data, ext = image_bytes(image, base_dir)
        counter["n"] += 1
        name = "%s-%02d.%s" % (role, counter["n"], ext)
        (out_dir / name).write_bytes(data)
        ref = {"src": name, "alt": image.get("alt", "")}
        if image.get("auto"):
            ref["auto"] = True
        return ref

    def item(entry, role):
        out = {k: v for k, v in entry.items() if k != "image"}
        if entry.get("image"):
            out["image"] = save(entry["image"], role)
        elif role != "highlight":
            print("warning: %r has no image (every component item should have one)" % entry["title"], file=sys.stderr)
        return out

    report = {
        "slug": out_dir.name,
        "headline": content["headline"],
        "eyebrow": content["eyebrow"],
        "title": content.get("title", "Aura & Community Updates"),
        "intro": content["intro"],
        "evals": evals,
        "highlights": {"summary": content["highlights"]["summary"], "items": [item(h, "highlight") for h in content["highlights"]["items"]]},
        "thanks": content["thanks"],
    }
    for key in ("components", "context", "other"):
        block = content.get(key) or {}
        if block.get("cards"):
            report[key] = {"summary": block["summary"], "cards": [item(c, key) for c in block["cards"]]}
    (out_dir / "report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("wrote %s/report.json and %d images" % (out_dir, counter["n"]))


def write_index(reports_dir):
    """Rebuild index.json from the report folders next to the one just written."""
    entries = []
    for report_file in sorted(reports_dir.glob("*/report.json"), reverse=True):
        report = json.loads(report_file.read_text(encoding="utf-8"))
        entries.append({"slug": report["slug"], "label": report["eyebrow"], "headline": report["headline"]})
    (reports_dir / "index.json").write_text(json.dumps(entries, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("wrote %s/index.json (%d reports)" % (reports_dir, len(entries)))


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    content_path, out_dir = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
    content = json.loads(content_path.read_text(encoding="utf-8"))
    write_report(content, content_path.parent, out_dir)
    write_index(out_dir.parent)


if __name__ == "__main__":
    main()
