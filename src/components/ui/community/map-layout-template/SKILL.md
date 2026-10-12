---
name: aura-map-layout
description: Add one map page to a Flows app. Ask which layout the user wants, then run that layout's install command and render the component it adds. Use when the user wants a map, a spatial view, layer controls, or a preview next to a map.
---

# Map layout template

Four map page layouts for industrial apps. Choose the layout by asking the questions below in order.

## Match the request

Ask these in order and stop at the first match.

1. **Does the person control what is drawn on the map?** Layers, scenes, models, visibility toggles.
   → Use **left panel + map + right panel**. A tree with checkboxes is the clearest way to manage visibility, and it needs persistent space next to the map.

2. **Do they need to scan, sort, filter or compare many records as rows?**
   If no → use **map + right panel**. The map is the primary view, so give it the most room and keep only a preview panel.

3. **Do they need to look at one selected record in detail without leaving the page?**
   If yes → use **horizontal split: map + data grid + right panel**.
   If no → use **horizontal split: map + data grid**.

If two layouts both seem to fit, prefer the one with fewer regions. Every extra region takes map space and adds cognitive load.

## Region roles

- **Left panel** — controls what the map shows: search, filter, hierarchy, visibility toggles. It should not hold record detail.
- **Right panel** — detail for one selected item: header (avatar, title, type), description area, and a footer with secondary + primary action. It answers "what is this thing?" and offers a way to the full page.
- **Data grid** — many items at once. Supports selection, sorting, and row actions.
- **Page header** — names the page and holds page-level actions. Layouts 3 and 4 have one (optional) because the grid makes the page feel more like a workspace. Layouts 1 and 2 do not, because the map and its panels carry the context.

## Why the data grid sits under the map

The horizontal split keeps map and grid at the same width, so columns align with the full page and the map keeps a wide, landscape view. A side-by-side split would squeeze the grid into too few columns and the map into a narrow strip. The trade is vertical space: the map gets roughly 40–45% of content height, suiting maps used for orientation and selection more than detailed panning.

## Do not

- Use layout 3 or 4 when there are only a handful of records — a grid for five items is overhead; layout 2 works fine.
- Put record detail in the left panel — left is for map contents, right is for the selected record.
- Use layout 4 and then add a preview — if people keep opening each row, move to layout 3.
- Add a right panel to layout 4 "just in case" — if row actions and a details page are enough, the panel adds noise.
