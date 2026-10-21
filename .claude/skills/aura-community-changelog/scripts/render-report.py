#!/usr/bin/env python3
"""Render a What's new report (one self-contained HTML file) from a content JSON file.

Usage: python3 scripts/render-report.py <content.json> [out.html] [--data-out DIR --url-prefix /path]

--data-out also writes report.json plus the processed images, so a site can render the report natively
(the same content, as data). The site renders that data; the HTML is a standalone draft for review.

The layout and styling come from assets/post-template.html (its <style> block is reused),
so the structure is fixed: header with 3 eval cards, exactly 3 highlights, then the
Components, Context & skills and Other news sections (a section with no cards is left out),
then Thank you. Cards fill the container with at most 3 per row.

Content file (paths are relative to the content file):
{
  "eyebrow": "Oct 8 – Oct 21, 2026",
  "title": "Aura & Community Updates",            # optional
  "intro": "1-2 sentence key takeaways",
  "asOf": "2026-10-21",                           # eval readings on or before this date
  "evals": [ ...3 cards... ],                     # optional; default: scripts/read-evals.mjs <7> <asOf>
  "highlights": {"summary": "...", "items": [ {title, text, url, label, image} x3 ]},
  "components": {"summary": "...", "cards": [ {title, subtitle, badge, text, url, label, image} ]},
  "context":    {"summary": "...", "cards": [ ... ]},
  "other":      {"summary": "...", "cards": [ ... ]},
  "thanks":     {"summary": "...", "people": ["github-handle", ...]}
}
image: {"path": "shots/x.png" | "svg": "<svg ...>", "alt": "...",
        "trim": [left, top, right, bottom]  # pixels removed so rounded panel corners don't land on the image edge
        "auto": true                        # small components: show at natural size, centred on white
        "position": "top left"}             # object-position for cropped cards
badge: "New" | "Update" | "Fix" | anything else (neutral, e.g. "Docs").
Text fields are plain text (they are HTML-escaped). Only stdlib; `sips` (macOS) is used, when present,
to trim and downscale screenshots so the file stays small.
"""
import argparse
import base64
import html
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
SKILL = HERE.parent


def esc(text):
    return html.escape(str(text), quote=False)


def attr(text):
    return html.escape(str(text), quote=True)


def read_template_css():
    template = (SKILL / "assets" / "post-template.html").read_text(encoding="utf-8")
    match = re.search(r"<style>(.*?)</style>", template, re.S)
    if not match:
        sys.exit("assets/post-template.html has no <style> block")
    return match.group(1)


def sips(*args):
    return subprocess.run(["sips", *args], capture_output=True, text=True).returncode == 0


def image_bytes(image, base_dir):
    """Process an image spec. Returns (bytes, extension, mime)."""
    if "svg" in image:
        return image["svg"].encode("utf-8"), "svg", "image/svg+xml"
    path = (base_dir / image["path"]).resolve()
    if not path.exists():
        sys.exit("Image not found: %s" % path)
    if path.suffix.lower() == ".svg":
        return path.read_bytes(), "svg", "image/svg+xml"
    data = path.read_bytes()
    ext, mime = ("png", "image/png") if path.suffix.lower() == ".png" else ("jpg", "image/jpeg")
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
                data, ext, mime = out.read_bytes(), "jpg", "image/jpeg"
    return data, ext, mime


def image_uri(image, base_dir):
    """Return (data_uri, is_raster)."""
    data, ext, mime = image_bytes(image, base_dir)
    return "data:%s;base64,%s" % (mime, base64.b64encode(data).decode()), ext != "svg"


def link(url, label):
    return '<a class="more" href="%s">%s →</a>' % (attr(url), esc(label or "Learn more")) if url else ""


def card(c, span, height, base_dir):
    image = c.get("image")
    visual = ""
    if image:
        uri, _ = image_uri(image, base_dir)
        alt = attr(image.get("alt", c["title"]))
        if image.get("auto"):
            visual = '<div class="visual" style="height:%dpx;display:flex;align-items:center;justify-content:center;background:#fff"><img src="%s" alt="%s"></div>' % (height, uri, alt)
        else:
            visual = '<div class="visual"><img src="%s" alt="%s" style="height:%dpx;object-position:%s"></div>' % (uri, alt, height, attr(image.get("position", "top left")))
    else:
        print("warning: card %r has no image (every component item should have one)" % c["title"], file=sys.stderr)
    badge = c.get("badge", "")
    cls = badge.lower() if badge.lower() in ("new", "update", "fix") else ""
    badge_html = '<span class="badge %s">%s</span>' % (cls, esc(badge)) if badge else ""
    return ('<article class="card" style="grid-column:span %d"><div class="head"><div><h3>%s</h3><div class="subtitle">%s</div></div>%s</div>%s<p>%s</p>%s</article>'
            % (span, esc(c["title"]), esc(c.get("subtitle", "")), badge_html, visual, esc(c["text"]), link(c.get("url"), c.get("label"))))


def row_sizes(n):
    """Rows of at most 3 cards; a trailing single card becomes 2+2 with the row above it."""
    sizes, left = [], n
    while left > 0:
        if left == 4:
            sizes += [2, 2]
            break
        take = 3 if left >= 3 else left
        sizes.append(take)
        left -= take
    return sizes


def section(title, block, base_dir):
    cards = (block or {}).get("cards", [])
    if not cards:
        return ""
    summary = (block or {}).get("summary")
    if not summary:
        sys.exit("Section %r needs a summary of the work in its cards" % title)
    body, i = "", 0
    for size in row_sizes(len(cards)):
        for c in cards[i:i + size]:
            body += card(c, 6 // size, {3: 150, 2: 190, 1: 230}[size], base_dir)
        i += size
    return '<section class="section"><h2>%s</h2><p class="sub">%s</p><div class="cards">%s</div></section>' % (title, esc(summary), body)


ICONS = {
    "flat": '<path d="M5 12h14"/>',
    "up": '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
    "down": '<path d="M3 7l6 6 4-4 8 8"/><path d="M21 10v7h-7"/>',
}


def eval_card(c):
    trend = c["trend"]
    cls = "" if trend.get("improved") is None else ("good" if trend["improved"] else "bad")
    return ('<div class="eval"><div class="top"><div><div class="name">%s</div><div class="unit-sub">%s</div></div>'
            '<div class="num">%s<small>%s</small></div></div><p>%s</p>'
            '<div class="foot %s"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">%s</svg><span>%s</span></div></div>'
            % (esc(c["name"]), esc(c["subtitle"]), esc(c["value"]), esc(c["unit"]), esc(c["description"]), cls, ICONS[trend.get("direction") or "flat"], esc(trend["text"])))


def load_evals(as_of):
    script = HERE / "read-evals.mjs"
    args = ["node", str(script), "7"] + ([as_of] if as_of else [])
    result = subprocess.run(args, capture_output=True, text=True, cwd=str(SKILL))
    if result.returncode != 0:
        sys.exit("Could not read the eval cards (%s). Provide \"evals\" in the content file or fix access.\n%s" % (script.name, result.stderr.strip()))
    return json.loads(result.stdout)


def export_data(content, evals, base_dir, out_dir, prefix):
    """Write report.json plus processed image files, for a site that renders the report natively."""
    out_dir.mkdir(parents=True, exist_ok=True)
    prefix = prefix.rstrip("/")
    counter = {"n": 0}

    def save(image, role):
        data, ext, _ = image_bytes(image, base_dir)
        counter["n"] += 1
        name = "%s-%02d.%s" % (role, counter["n"], ext)
        (out_dir / name).write_bytes(data)
        ref = {"src": "%s/%s" % (prefix, name), "alt": image.get("alt", "")}
        if image.get("auto"):
            ref["auto"] = True
        if image.get("position"):
            ref["position"] = image["position"]
        return ref

    def item(entry, role):
        out = {k: v for k, v in entry.items() if k != "image"}
        if entry.get("image"):
            out["image"] = save(entry["image"], role)
        return out

    report = {
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
    (out_dir / "report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print("wrote %s/report.json and %d images" % (out_dir, counter["n"]))


def main():
    parser = argparse.ArgumentParser(description="Render a What's new report from a content JSON file.")
    parser.add_argument("content")
    parser.add_argument("out", nargs="?", help="output HTML file (self-contained)")
    parser.add_argument("--data-out", help="also write report.json and image files to this folder, for native rendering on the site")
    parser.add_argument("--url-prefix", default="", help="URL path the image files will be served from (used with --data-out)")
    args = parser.parse_args()
    if not args.out and not args.data_out:
        parser.error("give an output HTML file, --data-out, or both")
    content_path = Path(args.content).resolve()
    base_dir = content_path.parent
    content = json.loads(content_path.read_text(encoding="utf-8"))

    evals = content.get("evals") or load_evals(content.get("asOf"))
    if len(evals) != 3:
        sys.exit("The header needs exactly 3 eval cards (got %d)" % len(evals))
    highlights = content["highlights"]["items"]
    if len(highlights) != 3:
        sys.exit("Highlights must be exactly 3 (got %d)" % len(highlights))

    if args.data_out:
        export_data(content, evals, base_dir, Path(args.data_out), args.url_prefix)
        if not args.out:
            return
    out_path = Path(args.out)
    hl_html = ""
    for h in highlights:
        uri, _ = image_uri(h["image"], base_dir)
        hl_html += ('<div class="highlight"><div class="visual"><img src="%s" alt="%s"></div><div class="body"><h3>%s</h3><p>%s</p>%s</div></div>'
                    % (uri, attr(h["image"].get("alt", h["title"])), esc(h["title"]), esc(h["text"]), link(h.get("url"), h.get("label"))))

    thanks = content["thanks"]
    people = ", ".join('<a href="https://github.com/%s">@%s</a>' % (attr(p), esc(p)) for p in thanks["people"])
    title = content.get("title", "Aura & Community Updates")

    page = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(title)s</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet">
<style>%(css)s</style></head><body><div class="wrap">
<header><div class="eyebrow">%(eyebrow)s</div><h1>%(title)s</h1>
<p class="intro">%(intro)s</p>
<div class="evals">%(evals)s</div></header><hr class="rule">
<section class="section"><h2>Highlights</h2><p class="sub">%(hl_summary)s</p><div class="highlights">%(highlights)s</div></section>
%(components)s
%(context)s
%(other)s
<section class="section"><h2>Thank you!</h2><p class="sub">%(thanks_summary)s</p><p class="thanks">%(people)s</p></section>
</div></body></html>""" % {
        "title": esc(title),
        "css": read_template_css(),
        "eyebrow": esc(content["eyebrow"]),
        "intro": esc(content["intro"]),
        "evals": "".join(eval_card(c) for c in evals),
        "hl_summary": esc(content["highlights"]["summary"]),
        "highlights": hl_html,
        "components": section("Components", content.get("components"), base_dir),
        "context": section("Context &amp; skills", content.get("context"), base_dir),
        "other": section("Other news", content.get("other"), base_dir),
        "thanks_summary": esc(thanks["summary"]),
        "people": people,
    }
    out_path.write_text(page, encoding="utf-8")
    print("wrote %s (%d KB)" % (out_path, len(page) // 1024))


if __name__ == "__main__":
    main()
