# AGENTS.md - Ravenwood VS Code Theme

## Agent Skills

This repo includes two skills under `.agents/skills/`:

- **`ravenwood/SKILL.md`** — Project-specific: architecture, color palette, conventions, build commands, and verification checklists. Read this before working on theme files — it contains the syntax/semantic color mapping rules and common pitfalls that prevent regressions.
- **`vscode/SKILL.md`** — General VS Code theme extension patterns: palette design, workbench/syntax/semantic token mapping, dynamic vs static theme generation, build pipeline, testing, and publishing. Use when adding new theme architecture or patterns.

Agents that support the `.agents/skills/` convention (OpenCode, Hermes, Cursor, etc.) should load them automatically. For agents that don't, read the relevant file before working on theme files.

## Project Overview

Ravenwood is a VS Code theme extension that provides a refined emerald forest color scheme. It features dynamic theme generation based on user configuration (contrast levels, workbench styles, cursor colors, italics).

## Build, Lint, and Test Commands

### Build Commands

```bash
npm run compile        # Full build: cleans dist, compiles TypeScript, generates default themes
npm run compile:ts    # Compile TypeScript only
npm run compile:themes # Generate default theme JSON files (runs dist/hook/generateThemes.js)
npm run clean         # Remove dist folder and *.vsix files
npm run package       # Package extension into .vsix file using vsce
npm run browser       # Run VS Code test web (for browser testing)
```

### Linting

```bash
npm run lint          # Biome check (lint + format check)
npm run format        # Biome format --write
```

### Testing

```bash
npm test              # Node built-in test runner (node:test + tsx)
```

648 tests across 52 suites: structural (theme JSON shape, hex validation, workbench key coverage, realm JSON validation, package.json consistency), palette (color values match documented specs), contrast (WCAG accessibility checks), sync (buildSyntax default/italic variant coverage in sync), scope-safety (no overbroad TextMate scopes), build-combos (all 50 config combinations produce valid output), realms (8 realm palettes: validity, contrast, accent distinctness, bg gradient, dim integrity, realm-to-realm distinctness), semantic-workbench (getSemanticFromPalette, language coverage, workbench style isolation), validation (validateConfig catches typos), build-syntax (per-rule flag behavior: italicizeKeywords, onlyWhenItalicKeywords, italicKeywordsScope, italicComments), helpers-workbench (getCursorColor, getSelectionColors, getDiagnosticOpacity), exhaustiveness (never-branch throws on invalid enum values), highContrast flag values.

No automated browser/integration tests. Manual testing:

```bash
npm run browser       # Run VS Code in browser mode for testing
```

### Pre-commit

The project uses husky and lint-staged:

- `lint-staged` automatically runs `biome check --write` on _.ts, _.js, _.mjs, _.json, _.jsonc, *.md files
- Run `npm run prepare` to set up husky hooks (usually runs automatically on npm install)

## Toolchain

- **TypeScript 7.0.2** (native compiler) — installed as the single `typescript` package; `npx tsc` uses TS 7. TS 7 ships no programmatic API, so `typescript-eslint` cannot be used; type safety is enforced via `tsc --strict` in `tsconfig.json`.
- **Biome 2.5.x** (Rust-based) — replaces ESLint + Prettier. Ships its own CST parser, so it works with TS 7 cleanly without depending on the TS programmatic API. Lints and formats in a single tool. Config in `biome.json`. VS Code extension: `biomejs.biome`.
- **VS Code engine**: `^1.95.0`, `@types/vscode: 1.95.0`.

## Code Style Guidelines

### General Architecture

- **Modular Structure**: Colors are separated into `src/palette/`, workbench rules in `src/workbench/`, syntax highlighting in `src/syntax/`, semantic tokens in `src/semantic/`
- **Dynamic Theme Generation**: Theme JSON files are regenerated at runtime when users change settings
- **Build-time vs Runtime**: `src/hook/generateThemes.ts` generates default themes at build time; `src/utils.ts` handles runtime regeneration

### File Organization

#### File Headers

Every source file must include a copyright header:

```typescript
/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/
```

### TypeScript Conventions

#### Typing

- **Always use explicit types** for function parameters and return types
- Use interfaces for configuration objects (see `src/interface.ts`)
- Avoid `any` type; use proper typing or `unknown` when necessary

#### Naming Conventions

- **Classes**: PascalCase (e.g., `Utils`, `Configuration`)
- **Functions**: camelCase (e.g., `getWorkbench`, `getSyntax`)
- **Interfaces**: PascalCase (e.g., `Configuration`, `Palette`)
- **Variables**: camelCase (e.g., `darkPath`, `lightPath`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for actual constants
- **Files**: kebab-case for source files (e.g., `generateThemes.ts`, `index-client.ts`)

#### Imports

- Group imports logically: external (vscode), internal (./interface, ./palette)
- Use path aliases where applicable
- Example:

```typescript
import * as fs from "fs";
import { join } from "path";
import { ConfigurationChangeEvent, workspace, window, commands } from "vscode";
import { Configuration } from "./interface";
import { getWorkbench } from "./workbench";
import { getSyntax } from "./syntax";
```

### Formatting

#### Prettier Configuration

The project uses Prettier with default settings. Key points:

- 2-space indentation
- Single quotes for strings
- Trailing commas where valid
- Semicolons required

#### Linting Integration

- Biome handles both linting and formatting via `npm run lint` (check) and `npm run format` (write).
- Type safety is enforced by `tsc --strict` (run as part of `npm run compile`).
- lint-staged auto-fixes staged files with `biome check --write` on commit.

### Error Handling

- Use Promise-based async patterns for file operations
- The shared `writeJsonFile()` in `src/fsUtil.ts` handles directory creation and JSON serialization:

```typescript
import { writeJsonFile } from './fsUtil';

await writeJsonFile(path, data); // creates parent dir, writes JSON with 2-space indent
```

- Always check for existence of files before operations (e.g., `fs.existsSync()`)

### Adding New Configuration Options

When adding a new user-customizable option:

1. **package.json**: Add to `contributes.configuration.properties`
2. **src/interface.ts**: Add property to `Configuration` interface with a proper union type
3. **src/validation.ts**: If enum-valued, add to the `ALLOWED` array so `validateConfig()` can catch typos

The type system (union types + `never` exhaustiveness checks) handles the rest — no manual 5-place checklist. If the option has variant-specific dispatching, add the branch to the relevant dispatcher.

### Color Palette Structure

Colors are defined in `src/palette/`:

- `src/palette/dark/background/{soft,medium,hard}.ts` - Dark variant backgrounds
- `src/palette/dark/foreground.ts` - Dark foreground colors
- `src/palette/light/background/{soft,medium,hard}.ts` - Light variant backgrounds
- `src/palette/light/foreground.ts` - Light foreground colors
- `src/palette/realms/` - 8 realm palettes (Asgard, Vanaheim, Alfheim, Svartalfheim, Nidavellir, Jotunheim, Muspelheim, Helheim)
- `src/palette/index.ts` - Palette retrieval logic

Each palette exports a `Palette` interface with colors like `bg0`, `bg1`, `fg`, `red`, `orange`, `yellow`, `green`, `aqua`, `blue`, `purple`, and their dim variants.

### VS Code Extension Specifics

- **Entry Points**: `src/index-client.ts` (desktop), `src/index-web.ts` (web)
- **Activation**: Uses `onStartupFinished` activation event
- **Theme Contributions**: Defined in `package.json` under `contributes.themes`
- **Configuration Access**: Use `workspace.getConfiguration("ravenwood")`

### Key Files Reference

| File                         | Purpose                                                      |
| ---------------------------- | ------------------------------------------------------------ |
| `src/utils.ts`               | Core utility class for config detection and theme generation |
| `src/themeData.ts`           | Pure ThemeData builder (shared by runtime + build-time)      |
| `src/validation.ts`          | Pure validateConfig() — checks enum values, no vscode dep   |
| `src/fsUtil.ts`              | Shared writeJsonFile() — used by utils.ts and generateThemes  |
| `src/interface.ts`           | TypeScript interfaces + union types (Configuration, Palette) |
| `src/hook/generateThemes.ts` | Build-time theme generation script                           |
| `src/palette/index.ts`       | Color palette retrieval                                      |
| `src/workbench/index.ts`     | Workbench style dispatcher                                   |
| `src/workbench/base.ts`      | Shared base token map + highContrast flag overlay            |
| `src/workbench/common.ts`    | Selection / cursor / diagnostic / variant color helpers      |
| `src/syntax/index.ts`        | Syntax highlighting dispatcher                               |
| `src/syntax/rules.ts`        | Canonical SYNTAX_RULES array + buildSyntax() — single source |
| `src/semantic.ts`            | Semantic token highlighting rules                            |
| `package.json`               | Extension manifest and npm scripts                           |

### Workflow Checklist

Before submitting changes:

1. Run `npm run compile` to verify build succeeds
2. Run `npm run lint` to check for linting errors
3. Verify theme JSON files are correctly generated in `themes/`
4. Test the extension manually if possible

### Development Tips

- Keep palette definitions separate from logic
- Ensure both dark and light variants are updated together
- Test with different configuration combinations (contrast levels, workbench styles)
