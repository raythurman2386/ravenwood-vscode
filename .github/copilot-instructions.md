# Ravenwood VS Code Theme - AI Agent Instructions

## Project Overview

Ravenwood is a dynamic VS Code theme extension featuring emerald forest colors. Themes are generated at **build-time** (default config) and **runtime** (when users change settings), not statically defined.

## Architecture

### Theme Generation Flow

```
User Config → getPalette() → getWorkbench() + getSyntax() + getSemantic() → JSON files
```

- **Build-time**: [src/hook/generateThemes.ts](src/hook/generateThemes.ts) creates default `themes/*.json` with hardcoded config
- **Runtime**: [src/utils.ts](src/utils.ts) regenerates themes when VS Code config changes (via `activate()` in [src/index-client.ts](src/index-client.ts))
- **Dual Entry**: Desktop uses `index-client.ts`, web uses `index-web.ts` (same activation logic)

### Modular Color System

- **Palettes**: [src/palette/](src/palette/) organized by `{dark,light}/{foreground,background/{soft,medium,hard}}.ts`
- **Workbench**: [src/workbench/](src/workbench/) has `material.ts`, `flat.ts`, `highContrast.ts` variants
- **Syntax**: [src/syntax/](src/syntax/) chooses between `default.ts` or `italic.ts` based on config
- **Semantic**: [src/semantic.ts](src/semantic.ts) defines semantic token colors

## Critical Workflows

### Build & Package

```bash
npm run compile        # Clean + TypeScript + generate default themes (required before testing)
npm run compile:ts     # TypeScript only
npm run compile:themes # Run dist/hook/generateThemes.js to create themes/*.json
npm run package        # Create .vsix (reverts themes/ after packaging)
```

**Important**: `compile:themes` runs the **compiled** `dist/hook/generateThemes.js`, not the source file.

### Linting

```bash
npm run lint           # ESLint check
# Pre-commit: lint-staged auto-fixes *.ts with ESLint, *.{js,mjs,json,md} with Prettier
```

### Testing

**No automated tests exist**. Manual testing only:
```bash
npm run browser        # Launch VS Code web for testing
# Or press F5 in VS Code to debug extension
```

## Code Conventions

### File Structure (REQUIRED)

Every TypeScript file must include:

1. **Copyright header** (see existing files)
2. **Vim fold markers** around function bodies:
   ```typescript
   function example() { // {{{
     // body
   } // }}}
   // vim: fdm=marker fmr={{{,}}}:
   ```

### Typing & Naming

- **Always** use explicit types for parameters and return values
- **camelCase**: functions, variables (`getWorkbench`, `darkPath`)
- **PascalCase**: classes, interfaces (`Utils`, `Configuration`, `Palette`)
- **kebab-case**: source files (`generateThemes.ts`, `index-client.ts`)

### Error Handling

Use Promise-based file operations with proper rejection:
```typescript
return new Promise((resolve, reject) => {
  fs.writeFile(path, data, (err) => err ? reject(err) : resolve("Success"));
});
```

## Adding Configuration Options

**5-step process** (documented in [src/interface.ts](src/interface.ts)):

1. Add property to `contributes.configuration.properties` in [package.json](package.json)
2. Add to `Configuration` interface in [src/interface.ts](src/interface.ts)
3. Update `getConfiguration()` in [src/utils.ts](src/utils.ts) to read the setting
4. Update `isDefaultConfiguration()` in [src/utils.ts](src/utils.ts) to check default value
5. Add default value in [src/hook/generateThemes.ts](src/hook/generateThemes.ts) config object

## Integration Points

- **VS Code Config**: `workspace.getConfiguration("ravenwood")` reads user settings
- **Activation**: `onStartupFinished` event triggers theme regeneration on first install with non-default config
- **Config Watcher**: `workspace.onDidChangeConfiguration()` regenerates themes on settings change
- **File Writes**: Themes written to `themes/ravenwood-{dark,light}.json` (relative to extension root)

## Key Files Reference

| File | Purpose |
|------|---------|
| [src/utils.ts](src/utils.ts) | Config detection, theme regeneration, newly-installed check |
| [src/interface.ts](src/interface.ts) | `Configuration` and `Palette` TypeScript interfaces |
| [src/palette/index.ts](src/palette/index.ts) | `getPalette(config, variant)` - selects colors by contrast level |
| [src/workbench/index.ts](src/workbench/index.ts) | `getWorkbench(config, variant)` - selects workbench style |
| [src/syntax/index.ts](src/syntax/index.ts) | `getSyntax(config, variant)` - syntax highlighting rules |
| [src/hook/generateThemes.ts](src/hook/generateThemes.ts) | Build-time theme generator (standalone script) |

## Common Pitfalls

1. **Don't edit `themes/*.json` directly** - they're generated files
2. **Both dark and light variants must be updated together** - they share the same config structure
3. **Run `npm run compile` after TS changes** - `compile:themes` needs the compiled hook script
4. **Check build output** - theme generation errors may be silent, verify `themes/*.json` exist
