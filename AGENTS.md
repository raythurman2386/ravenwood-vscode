# AGENTS.md - Ravenwood VS Code Theme

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
npm run lint          # Run ESLint on entire codebase
```

### Testing

This project currently has **no automated tests**. Manual testing can be done using:

```bash
npm run browser       # Run VS Code in browser mode for testing
```

### Pre-commit

The project uses husky and lint-staged:

- `lint-staged` automatically runs ESLint --fix on _.ts files and Prettier on _.js, _.mjs, _.json, \*.md files
- Run `npm run prepare` to set up husky hooks (usually runs automatically on npm install)

## Code Style Guidelines

### General Architecture

- **Modular Structure**: Colors are separated into `src/palette/`, workbench rules in `src/workbench/`, syntax highlighting in `src/syntax/`, semantic tokens in `src/semantic/`
- **Dynamic Theme Generation**: Theme JSON files are regenerated at runtime when users change settings
- **Build-time vs Runtime**: `src/hook/generateThemes.ts` generates default themes at build time; `src/utils.ts` handles runtime regeneration

### File Organization

#### Vim Fold Markers

The codebase uses vim fold markers for code organization. Always use this pattern:

```typescript
function myFunction() {
  // {{{
  // function body
  // }}}
}
// vim: fdm=marker fmr={{{,}}}:
```

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

#### ESLint Integration

- ESLint is configured with TypeScript support
- Prettier is integrated via eslint-plugin-prettier
- Run `npm run lint` to check; lint-staged auto-fixes on commit

### Error Handling

- Use Promise-based async patterns for file operations
- Handle errors in callbacks with proper rejection:

```typescript
return new Promise((resolve, reject) => {
  fs.writeFile(path, JSON.stringify(data, null, 2), (err) =>
    err ? reject(err) : resolve("Success"),
  );
});
```

- Always check for existence of files before operations (e.g., `fs.existsSync()`)

### Adding New Configuration Options

When adding a new user-customizable option:

1. **package.json**: Add to `contributes.configuration.properties`
2. **src/interface.ts**: Add property to `Configuration` interface
3. **src/utils.ts**: Update `getConfiguration()` and `isDefaultConfiguration()`
4. **src/hook/generateThemes.ts**: Include default value for build-time generation

### Color Palette Structure

Colors are defined in `src/palette/`:

- `src/palette/dark/background/{soft,medium,hard}.ts` - Dark variant backgrounds
- `src/palette/dark/foreground.ts` - Dark foreground colors
- `src/palette/light/background/{soft,medium,hard}.ts` - Light variant backgrounds
- `src/palette/light/foreground.ts` - Light foreground colors
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
| `src/interface.ts`           | TypeScript interfaces for Configuration and Palette          |
| `src/hook/generateThemes.ts` | Build-time theme generation script                           |
| `src/palette/index.ts`       | Color palette retrieval                                      |
| `src/workbench/index.ts`     | Workbench color rules                                        |
| `src/syntax/index.ts`        | Syntax highlighting rules                                    |
| `src/semantic.ts`            | Semantic token highlighting rules                            |
| `package.json`               | Extension manifest and npm scripts                           |

### Workflow Checklist

Before submitting changes:

1. Run `npm run compile` to verify build succeeds
2. Run `npm run lint` to check for linting errors
3. Verify theme JSON files are correctly generated in `themes/`
4. Test the extension manually if possible

### Development Tips

- Use `vim` fold markers (`{{{` / `}}}`) to organize code within functions
- Add `// vim: fdm=marker fmr={{{,}}}:` at the end of each source file
- Keep palette definitions separate from logic
- Ensure both dark and light variants are updated together
- Test with different configuration combinations (contrast levels, workbench styles)
