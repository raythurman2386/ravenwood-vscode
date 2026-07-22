---
name: ravenwood
description: "Use when developing the Ravenwood VS Code theme extension — adding syntax rules, semantic tokens, workbench colors, palette entries, or modifying the build-time/runtime theme generation pipeline. Provides architecture, conventions, color palette, and verification steps."
version: 1.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [vscode, theme, extension, typescript, color-palette, ravenwood]
    related_skills: []
---

# Ravenwood VS Code Theme — Development Skill

Ravenwood is a VS Code theme extension with a refined emerald-forest color scheme. Themes are generated dynamically — at build time for defaults and at runtime when users change settings. This skill gives you the full context to work on it correctly.

## When to Use

- Adding or expanding syntax (TextMate) rules for a language
- Adding or expanding semantic (LSP) token rules for a language
- Modifying workbench UI colors or styles
- Changing palette colors or adding contrast variants
- Working on the build-time hook or runtime regeneration pipeline
- Reviewing PRs to the theme

Don't use for: porting the Ravenwood palette to other apps — use the `ravenwood-theme` porting skill instead.

## Architecture

```
User Config → getPalette() → getWorkbench() + getSyntax() + getSemantic() → JSON files
```

- **Build-time**: `src/hook/generateThemes.ts` creates default `themes/*.json` with hardcoded config
- **Runtime**: `src/utils.ts` regenerates themes when VS Code config changes (via `activate()` in `src/index-client.ts`)
- **Dual entry**: Desktop uses `index-client.ts`, web uses `index-web.ts`
- **Shared logic**: Both paths call `getThemeData()` in `src/themeData.ts` — a pure builder with no side effects

### Module Layout

| Path | Purpose |
|------|---------|
| `src/interface.ts` | TypeScript interfaces: `Configuration`, `Palette`, `ThemeData`, `SyntaxRule` |
| `src/themeData.ts` | Pure `getThemeData()` builder — shared by runtime + build-time |
| `src/utils.ts` | `Utils` class — config detection, file writing, regeneration |
| `src/semantic.ts` | LSP semantic token color mappings |
| `src/hook/generateThemes.ts` | Build-time script → writes `themes/*.json` |
| `src/palette/index.ts` | `getPalette()` — dispatches by variant × contrast |
| `src/palette/dark/foreground.ts` | Dark foreground + accent colors |
| `src/palette/dark/background/{soft,medium,hard}.ts` | Dark bg0–bg5, shadow per contrast |
| `src/palette/light/foreground.ts` | Light foreground + accent colors |
| `src/palette/light/background/{soft,medium,hard}.ts` | Light bg0–bg5, shadow per contrast |
| `src/workbench/index.ts` | `getWorkbench()` — dispatches by style |
| `src/workbench/base.ts` | Shared ~95% token map + highContrast flag overlay |
| `src/workbench/common.ts` | Selection, cursor, diagnostic, variant color helpers |
| `src/workbench/material.ts` | Material style (default — no overrides) |
| `src/workbench/flat.ts` | Flat style — overrides list/sidebar/tab backgrounds |
| `src/workbench/highContrast.ts` | High-contrast style — overrides + `applyHighContrastFlag()` |
| `src/syntax/index.ts` | `getSyntax()` — dispatches by italic setting |
| `src/syntax/default.ts` | Default (upright) TextMate rules |
| `src/syntax/italic.ts` | Italic variant — comments + keywords in italic |

## Color Palette

See `references/palette.md` for the full color tables. Key rules:

- **Backgrounds are olive-tinged, NOT neutral grey.** `#222822` is not `#222222`.
- **Dark foreground is warm beige** `#e8d5b7` — not white.
- **Light foreground is cool slate** `#3d4c53` — not black.
- **Green is the hero accent.** `#4ade80` (dark) / `#5c7a0c` (light) for badges, success, primary CTAs.
- **Contrast levels adjust backgrounds only.** Foreground and accent colors stay the same across soft/medium/hard.
- **Dim variants** exist for every accent — use for secondary UI, not primary semantic meaning.
- **Shadow alpha differs**: dark `#00000070` (44%), light `#3c474d20` (12%).

## Conventions

### TypeScript

- **TypeScript 7.0.2** (native compiler) — no programmatic API, so `typescript-eslint` cannot be used
- **Biome 2.5.x** (Rust-based) — single tool for lint + format, config in `biome.json`
- `tsc --strict` in `tsconfig.json` enforces type safety
- **Explicit types** on all function parameters and return types
- **Interfaces** for config objects (see `src/interface.ts`)
- Avoid `any`; use `unknown` when necessary

### File Organization

- **Vim fold markers**: `// {{{` and `// }}}` within functions, `// vim: fdm=marker fmr={{{,}}}:` at end of file
- **Copyright header** on every source file:

```typescript
/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/
```

- **kebab-case** for source filenames (e.g., `generateThemes.ts`)
- Group imports: external (vscode) → internal (./interface, ./palette)

### Formatting

- 2-space indentation
- Single quotes for strings
- Trailing commas where valid
- Semicolons required

## Build, Lint, Test

```bash
npm run compile        # Full build: clean → tsc → generate themes
npm run compile:ts     # TypeScript only
npm run compile:themes # Generate default theme JSONs
npm run lint           # Biome check (lint + format check)
npm run format         # Biome format --write
npm run package        # Package .vsix
npm run clean          # Remove dist + *.vsix
npm run browser        # VS Code test web
```

No automated tests exist. Verify changes by running `npm run compile && npm run lint`.

## Adding a New Language: Syntax + Semantic

### Syntax Rules (TextMate)

1. Read the existing pattern in `src/syntax/default.ts` — find a similar language block
2. Add rules for both `default.ts` AND `italic.ts` in sync
3. Each rule maps a TextMate scope (e.g., `entity.name.function.elm`) to a palette color
4. Color mapping convention: keyword→red, function→orange, string/constant→yellow, type→aqua, operator→blue, special→purple, variable→green, comment→grey0
5. Add a sample file in `samples/<lang>.<ext>` if one doesn't exist
6. Run `npm run compile` to verify the theme JSONs regenerate cleanly

### Semantic Tokens (LSP)

1. Open `src/semantic.ts`
2. Find the pattern for an existing language (e.g., Go, Python, TypeScript)
3. Add language-scoped entries: `tokenType:langId` → `palette.color`
4. Common semantic tokens: `class`, `function`, `method`, `variable`, `parameter`, `property`, `type`, `struct`, `enum`, `module`, `namespace`, `typeParameter`, `decorator`, `macro`
5. Run `npm run compile` to verify

### Adding a New Configuration Option

1. `package.json` → add to `contributes.configuration.properties`
2. `src/interface.ts` → add to `Configuration` interface
3. `src/utils.ts` → update `getConfiguration()` and `isDefaultConfiguration()`
4. `src/hook/generateThemes.ts` → include default value for build-time

## Common Pitfalls

1. **Missing italic.ts sync** — every syntax rule added to `default.ts` must also go to `italic.ts` (with italic adjustments for keywords/comments). The #1 source of regressions.

2. **Overbroad scopes** — scope suffixes must include the language ID (e.g., `entity.name.class.scala`, NOT `entity.name.class`). A bare scope overrides ALL languages.

3. **Shadowed rules** — if two rules match the same scope, the first one wins. Check for existing rules that overlap before adding new ones.

4. **Invalid hex in template literals** — check for stray `}` characters inside backtick strings. These produce invalid hex values like `#da636280}` that VS Code silently rejects.

5. **Forgetting `npm run compile:themes`** — the `themes/*.json` files are build artifacts. After palette or workbench changes, regenerate them or the extension ships stale themes.

6. **Both variants** — when changing palette colors, update dark AND light together. A change to one without the other creates visual inconsistency.

7. **Palette `satisfies` check** — each palette export file uses `satisfies Partial<Palette>`. Misspelled keys fail at compile time, not runtime.

## Verification Checklist

- [ ] `npm run compile` succeeds (tsc + theme generation)
- [ ] `npm run lint` passes (Biome)
- [ ] Syntax rules added to BOTH `default.ts` and `italic.ts`
- [ ] Semantic tokens use language-scoped keys (e.g., `function:elm`, not bare `function`)
- [ ] No overbroad scopes (all scope strings end with a language suffix)
- [ ] Sample file exists if a new language was added
- [ ] `themes/ravenwood-dark.json` and `themes/ravenwood-light.json` both regenerated
- [ ] No stray `}` in template literals (check hex color values)
- [ ] Copyright header on any new source file
- [ ] Vim fold markers on any new function block

## Related Files

- `references/palette.md` — Full color tables (dark/light, all contrast levels, dim variants)
- `AGENTS.md` — Project overview and build commands (the root agent instruction file)
- `ARCHITECTURE.md` — Detailed architecture walkthrough
- `CONFIGURATION.md` — All user-configurable options