# Aura styling for the post

`assets/post-template.html` already uses real Aura tokens. It is used for the standalone review draft: no page background (html and body are transparent) and it follows `prefers-color-scheme`. The site itself renders the report natively with its own components and theme. The values were copied from Aura's `colors.css` and `DESIGN.md` (paths in `config.local.md`). Re-sync them if Aura's colors change.

## Tokens in use (dark values; light values are in the template's `:root`)
| Role | Value | Aura source |
|---|---|---|
| Card | `#212426` | between mountain-900 (`#1e2022`) and 800 (`#26292c`) |
| Text | `#f8f9f9` | mountain-10 |
| Muted text | `#a3aab0` | mountain-400 |
| Border / rule | `#33373a` | mountain-700 |
| Link | `#7796e6` (hover `#ccd7f6`) | fjord-450 / fjord-200 |
| Focus ring | `#8fa8eb` | fjord-400 |
| Badges | New `#bbf3d0`/`#0f5026`, Update `#d0d6ed`/`#32417f`, Fix `#ffe3a2`/`#755200`, neutral `#e4e6e8`/`#40464a` | DESIGN.md success / info / warning pairs |

Typography: Space Grotesk 500-600 for the title and section headings, Inter for everything else (the fonts Aura's DESIGN.md names). Radii: cards 12px, images 8px, badges 4px. Spacing base 4px.

## Rules
- Use tokens, not new colors. Color is for meaning (badge status), not decoration.
- No page background or gradient: the post sits on the website's own background.
- Standalone HTML cannot import Aura's React components, so the badges and cards mirror their look with the tokens. Match the Aura Badge spec if it changes.
- Only use public fonts and assets.
