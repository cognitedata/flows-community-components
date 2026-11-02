# Mapping changed components to Storybook screenshots

## 1. Find the component
From each PR's `files` list, match paths against `component_path_pattern` (in `config.local.md`), e.g. `.../components/ui/data-grid/data-grid.tsx` -> DataGrid. A PR may touch several components; list each. Files ending in `.stories.*` confirm the component and reveal story names.

## 2. Find the story ID
Storybook IDs are `<title-slug>--<story-name-slug>` (lowercase, hyphenated), e.g. `primitives-datagrid--basic`.
1. Read the `.stories.*` file in the repo (title + exported story names).
2. Or search the live index. Fetch tools truncate this large file, so dump it with Chrome and parse it:
   ```bash
   chrome --headless=new --disable-gpu --dump-dom "<storybook_base_url>/index.json" > index-dom.html
   ```
   The JSON sits inside a `<pre>` element (HTML-escaped); `entries` is keyed by story ID, with `type: "story"` for stories.
3. Pick the default/overview story, or one that demonstrates the change (a new variant, a selection state).

If no story exists for a brand-new component (the Chromatic `master` build can lag), use the closest related story, a crop of the component's community-site page, or a labelled illustration, and flag it in the review table.

## 3. Capture
Chromatic refuses iframe embedding ("refused to connect"), so capture images:

```bash
scripts/capture-story.sh <storybook_base_url> <story-id> out.png [width] [height] [scale]
```
Use a wide window (1000px) for grids and pages, a tight one (about 320-480px wide, 80-100px tall, scale 2-3) for small components. Then follow the "clean edges" rule in SKILL.md step 5, inline as base64, and link to the live story:

`<storybook_base_url>/?path=/story/<story-id>`
