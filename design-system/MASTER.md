# Thaqalayn Library web — design system (MASTER)

Direction **A — academic / editorial** (chosen 2026-09-26). Visual reference: `reference/direction-a.html`.
Built with the `ui-ux-pro-max` skill: style *Minimalism & Swiss*, palette family *book brown + page amber*, Arabic pairing *Naskh + Sans*; dials variance 3 · motion 2 · density 4.
Page-specific rules go in `pages/<page>.md` and override this file.

The site does **not** copy the mobile app design. Features follow the plan; the look follows this file.

## 1. Principles

- Content first: the text of the books is the hero. Chrome is quiet, thin rules instead of boxes.
- One accent colour (burnt orange) used sparingly: links, active state, primary action, highlights in UI.
- Arabic, RTL, logical CSS properties only (`margin-inline-start`, `inset-inline-end`…). Never `left/right`.
- Every control is a real `<a>` or `<button>`, keyboard reachable, visible focus ring.

## 2. Colour tokens (light)

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--paper` | `#faf7f0` | page background | — |
| `--paper-2` | `#f3eee3` | alternate band, reader stage, tags | — |
| `--surface` | `#ffffff` | inputs, cards, buttons | — |
| `--page` | `#fffdf8` | reader page sheet | — |
| `--ink` | `#1f1b16` | primary text | 16:1 |
| `--ink-2` | `#5a5146` | secondary text | 7.3:1 |
| `--ink-3` | `#6f665a` | hints, counts, captions (was `#8a8072`, failed 4.5:1) | ≥4.9:1 on all surfaces |
| `--accent` | `#9a3b12` | links, active, primary button fill | 6.5:1 on paper; white on it 7:1 |
| `--accent-soft` | `#f4e4d8` | active background (TOC item, label) | accent on it 5.6:1 |
| `--line` | `#e3dccd` | dividers (decorative only) | — |
| `--line-strong` | `#8a8072` | input / control borders (non-text ≥3:1) | ≥3.3:1 |
| `--mark` | `#f5d9a8` | search hit / highlight background | — |
| `--danger` | `#a3282a` | errors | — |

Cover palette (generated covers, pick by title hash): `#5b2a14 #1f3b33 #3b2f4f #6b4a16 #243a52 #4a2020`, text `#f7efe1`.

Dark mode: tokens are semantic so a dark theme can be added later; **v1 shell is light**. The reader has its own 5 page themes (plan §6).

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display (h1–h3, brand, book titles, page numbers) | **Amiri** 400/700 | replaces GESS Two (no licence issue) |
| UI (nav, buttons, lists, meta) | **Noto Kufi Arabic** 400/500/700 | |
| Reader body | user choice; default **Noto Naskh Arabic** | also Amiri, Scheherazade, Noto Sans Arabic (Mosawi only once its licence is confirmed) |

Scale (px): 12 caption · 13 meta · 15 body UI · 17 lead · 22 h3 · 30 h2 · 40 h1 · 52 hero (36 on mobile).
Line height: UI 1.7 · display 1.25–1.35 · reader 2.0–2.15 (Arabic with tashkeel needs room).
Minimum text 12px. Reader column ≤ 700px (~65–75 characters).
Numbers in UI: Arabic-Indic digits (`toLocaleString('ar')`-style) for counts and page numbers.

## 4. Spacing, radius, elevation

- Spacing scale (4-based): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 56 · 72.
- Container max 1180px, gutter 24px (16px ≤ 800px). Lists/prose column max 760px.
- Radius: 4 (buttons, inputs, tiles), 6 (search box, page sheet), 999 (pills, tags). Covers 2/6 (spine side smaller).
- Elevation: almost none. Page sheet `0 20px 40px -30px rgb(60 40 10 / 40%)`; covers `inset 6px 0 0 rgb(0 0 0 / 18%)` spine + soft drop.
- Sections separated by 1px `--line` rules and generous vertical space (56px).

## 5. Components

- **Header:** sticky, 68px, paper background, bottom rule. Brand wordmark "مكتبة الثقلين" (Amiri 700, accent). Nav links (active = ink bold). Compact search trigger with `/` shortcut. Mobile: brand + search icon + menu button.
- **Big search:** white field, 1px ink border + 1px bottom shadow line; scope tabs (النصوص · العناوين · الفهارس) with accent underline; primary button accent fill.
- **Section head:** Amiri h2 + optional count + "عرض الكل" link aligned to the end.
- **Cover:** generated typographic cover, 2:3, inner frame line, title in Amiri, volume count at bottom. Meta under cover: title bold + author (ت ...هـ) in `--ink-3`.
- **Index list** (categories, authors, TOC): rows with bottom rule, name start / count end (Amiri numerals). Hover = accent text.
- **Tag / pill:** paper-2 fill, line border, 12px.
- **Buttons:** primary = ink fill + paper text (or accent fill for search). Secondary = 1px ink border. Min height 40px (44px touch).
- **Volume grid:** tiles "ج N" + page count; current volume = accent border.
- **Reader:** see `pages/reader.md` (to write in Phase 3). Summary: sticky crumb bar + tool buttons; side TOC (desktop) with accent-soft active item; page sheet on paper-2 stage; footnotes under a rule; pager with page number; selection toolbar (نسخ مع التوثيق · نسخ الرابط · تظليل).

## 6. Icons

**Lucide** (`lucide-react`), outline, stroke 1.75, sizes 16 / 20 / 24. No emoji or text glyphs as icons. Icon-only buttons need `aria-label`; decorative icons next to text get `aria-hidden`.
Directional icons must be mirrored for RTL (chevrons/arrows: "next" points left).

## 7. Motion

Subtle only: 150–250ms, ease-out, colour/opacity/transform (never width/height). Page turn in reader: short slide (≤200ms). Respect `prefers-reduced-motion` (no motion at all).

## 8. Accessibility & layout rules (pre-delivery checklist)

- [ ] Text contrast ≥ 4.5:1, control borders/icons ≥ 3:1
- [ ] Visible focus ring (2px accent, offset 2px) on every control; `scroll-padding-top` = header height
- [ ] Keyboard: tab order = visual order; `/` focuses search; ←/→ turn pages in reader
- [ ] Touch targets ≥ 44×44 on mobile
- [ ] `min-height: 100dvh`, no horizontal scroll at 375px; test 375 / 768 / 1024 / 1440
- [ ] Images: `next/image` with width/height; fonts via `next/font/local` (no layout shift)
- [ ] Search: debounced suggestions; empty state with a suggestion, never a bare "0 results"
- [ ] `prefers-reduced-motion` respected
