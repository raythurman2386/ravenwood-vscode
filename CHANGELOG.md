# Changelog

All notable changes to this project will be documented in this file.

## [0.3.4] - 2026-07-23

### Fixed
- semantic: add semantic token rules for F# (#26) (#87)
- use gh release create --generate-notes instead of custom script
- create GitHub Releases on tag push (was publishing to marketplaces only)
- syntax: expand GraphQL TextMate scopes (currently 6 rules) (#79) (#86)
- syntax: expand SASS/SCSS TextMate scopes (currently 5 rules) (#80) (#85)

### Other
- test: add 81-test suite (structural, palette, sync, scope-safety, build-combos) + wire into CI
- docs: pass — remove colorblind statement, fix outdated toolchain refs, update language coverage

## [0.3.3] - 2026-07-22

### Added
- add .agents/skills/ravenwood for cross-agent context + dependency audit in nightly release

### Other
- docs: reference .agents/skills/ravenwood in AGENTS.md

## [0.3.2] - 2026-07-22

### Fixed
- semantic: add semantic token rules for Elm (#31) (#81)

### Other
- ci: remove sensitive comment from nightly release workflow
- ci: use RELEASE_TOKEN (PAT) for nightly release merge and push
- ci: fix nightly release — use PR merge with admin bypass for branch protection
- ci: add nightly release workflow — auto version bump, changelog, tag

## [0.3.1] - 2026-07-21

### Added

- **Semantic Token Expansion**: Added LSP semantic token mappings for **Java** (11 tokens: class, interface, enum, enumMember, namespace, typeParameter, function, method, parameter, variable, property), **C#** (11 tokens: same set), and **C++** (12 tokens: class, struct, enum, enumMember, namespace, typeParameter, function, method, parameter, variable, field). Expanded **Python** from 3 to 10 tokens (added function, method, parameter, variable, decorator, enumMember, namespace). Expanded **Go** from 8 to 11 tokens (added field, constant, typeParameter).
- **Syntax Rule Expansion**: Expanded TextMate rules for 7 previously thin-coverage languages: **CoffeeScript** (1→6 rules), **Perl** (1→6), **Elm** (2→8), **Lua** (2→7), **OCaml** (3→8), **Julia** (4→7), and **Tmux** (1→6). Both `default.ts` and `italic.ts` updated in sync.
- **Dart Sample**: Added `samples/dart.dart` covering classes, enums, generics, annotations, and string interpolation — the only language with syntax rules but no sample file.

## [0.3.0] - 2026-07-21

### Added

- **Documentation Pass**: Added `CONFIGURATION.md` (full reference for all 12 settings) and `ARCHITECTURE.md` (module layout, runtime regeneration flow, build-time hook, palette/workbench/syntax walkthrough). Refreshed `README.md` with the 4 previously-missing config options (`darkSelection`, `lightSelection`, `diagnosticTextBackgroundOpacity`, `highContrast`), a requirements note, and a build section. Added JSDoc to every exported function, class, method, and interface in `src/`.
- **Rust Syntax Expansion**: Expanded Rust TextMate rules from 5 to 9 rules (added functions, macros, lifetimes, types/struct/enum/trait names, `Self`, generic type parameters, constants, control flow keywords, operators). Expanded Rust LSP semantic tokens from 3 to 15 tokens (added `struct`, `enum`, `trait`, `typeAlias`, `function`, `method`, `parameter`, `variable`, `field`, `constant`, `lifetime`, `module`), scoped to `:rust` to match the Go/TS/Python pattern.
- **Python Syntax Expansion**: Added f-string interpolation, magic/dunder methods, decorator names, type hints, explicit control-flow keywords, and operators. Grew from 4 to 8 rules.
- **Swift Syntax Expansion**: Added explicit keywords, storage types/operators, type names, functions, class/constant coverage. Grew from 2 to 7 rules.
- **SQL Syntax Expansion**: Added explicit keywords (CREATE/DROP/ALTER/control), all SQL functions (not just aggregates), table/column names, type names, and variables. Grew from 2 to 5 rules.
- **Go Generics**: Added `entity.name.type.parameter.go` and `entity.name.type.generic.go` to the Go type rule so post-Go-1.18 generic type parameters render consistently with named types.

### Changed

- **Toolchain Modernization**: Upgraded to TypeScript 7.0.2 (native compiler) and bumped `engines.vscode` to `^1.95.0`. Replaced the `eslint` + `typescript-eslint` + `prettier` stack with **Biome 2.5.x** (Rust-based, single tool for lint + format) because `typescript-eslint` v8 does not support TS 7 and TS 7 ships no programmatic API. Husky upgraded to 9.1.7 (the `prepare` script now runs `husky` instead of `husky install`). `tsconfig.json` now uses `target`/`lib` `es2022`, `strict: true`, `skipLibCheck: true`, and an explicit `types: ["node"]`.
- **Workbench Refactor**: Extracted the ~95% shared token map from `material.ts`/`flat.ts`/`highContrast.ts` into a new `src/workbench/base.ts`. Each style file is now a thin wrapper that calls `getBaseWorkbenchTokens()` and spreads its specific overrides. The `highContrast` config flag overlay is shared via `applyHighContrastFlag()`.
- **Build-Time Deduplication**: Removed the duplicated `Utils` class from `src/hook/generateThemes.ts`. Both runtime and build-time now share a single pure `getThemeData()` helper in the new `src/themeData.ts`.
- **Variant Validation**: Variant-dispatching functions (`getPalette`, `getWorkbench`, `getSelectionColors`, `getCursorColor`, `getWorkbenchVariantColors`) now throw on unknown variants instead of silently falling back to light.
- **Palette Type Safety**: Each palette export file is annotated `satisfies Partial<Palette>` so misspelled keys fail at compile time.
- **Explicit Return Types**: All exported functions and methods across `src/` now have explicit return-type annotations.

### Fixed

- **Invalid Theme Colors**: Removed stray `}` characters inside template literals in `flat.ts` (`editorMarkerNavigation{Error,Warning,Info}.background`) and `highContrast.ts` (same three plus `chat.requestBorder`). These produced invalid hex values like `#da636280}` that VS Code would reject.
- **Unhandled Async**: `index-client.ts` now awaits theme regeneration and surfaces errors via `window.showErrorMessage`. The `onDidChangeConfiguration` subscription is pushed into `context.subscriptions` (was leaked previously). `activate()` now accepts an `ExtensionContext`.
- **isNewlyInstalled Race**: `Utils.isNewlyInstalled()` is now `async` and awaits the flag-file write before returning, preventing repeated "newly installed" triggers.
- **italicComments Default**: `getSyntax()` now defaults `italicComments ?? true`, matching the documented default when the config is unset.
- **tokenColors Typing**: `ThemeData.tokenColors` is now typed `SyntaxRule[]` instead of `unknown[]`.
- **Dead Syntax Rule**: Removed the "TypeScript blue" rule in `default.ts`/`italic.ts` whose `entity.name.type.module.ts` scope shadowed the earlier "TypeScript white" rule. Also removed the dead "TSX white" rule shadowed by "TSX blue" for the same `.tsx` scope.
- **Misnamed Syntax Rules**: "Scala grey"/"Scala red" (on `.groovy` scopes) renamed to "Groovy grey"/"Groovy red". "PHP blue" (on `.cpp` scopes) renamed to "C++ blue" and relocated from the PHP section to the C++ section.
- **Overbroad Scala Scope**: The "Scala yellow" rule used the generic `entity.name.class` scope (no `.scala` suffix), which overrode class colors for ALL languages. Fixed to `entity.name.class.scala`.
- **Italic-Mode Go Regression**: Restored the missing `Go orange`/`Go yellow`/`Go green` rules in `italic.ts`. Previously Go type names rendered blue in italic mode but yellow in default mode due to the missing `Go yellow` rule.
- **Modeline Typo**: Fixed `fmr={{{{,}}}}:` → `fmr={{{,}}}:` in `highContrast.ts`.

## [0.2.2] - 2026-02-26

### Added

- **Go Semantic Tokens**: Added semantic token support for Go including namespace, type, struct, interface, function, method, variable, and parameter tokens.

### Changed

- **Background Colors**: Fixed inconsistent bg0/bg1/bg values in dark/medium palette - all three were identical (#1a1f1c) and are now distinct (#141814, #1a1f1c, #222822).
- **Theme Generation**: Fixed async/await bug in generateThemes.ts where Promise.all was not being awaited, causing potential race conditions.
- **Type Safety**: Added ThemeData and SyntaxRule interfaces for improved TypeScript type safety.

### Fixed

- **Code Quality**: Standardized file header format across all TypeScript source files.

## [0.2.0] - 2026-02-18

### Changed

- **Major Theme Refresh**: Upgraded to 0.2.0 to mark significant visual improvements and codebase refactoring.
- **Go Syntax Highlighting**: Added comprehensive syntax support for the Go programming language, including specific colors for keywords (`go`, `chan`, `map`), types, functions, and packages to match the Ravenwood palette.
- **Light Mode Consistency**: Unified the panel and editor background colors in light mode to remove distracting contrast blocks.
- **Workbench Architecture**: Modularized workbench logic for better maintainability.

### Fixed

- **Critical Visual Bug**: Resolved a syntax error in `scrollbarSlider.background` that caused the scrollbar to appear red in dark mode.
- **Build Process**: Resolved build pipeline issues and cleaned up version history.

## [0.1.3] - 2026-02-18

### Added

- Modular workbench architecture: centralized shared UI logic (selection, cursor, and diagnostic colors) in `src/workbench/common.ts` for better maintainability.

### Changed

- Refined the "Ravenwood Emerald" palette:
  - Deepened dark backgrounds for a more immersive forest feel.
  - Saturated dark mode foregrounds (Green, Yellow, Aqua, Blue, Purple) for better "pop".
  - Deepened light mode colors to improve cohesion and readability.
- Standardized workbench UI:
  - Updated Checkbox, Dropdown, and Widget backgrounds to use consistent palette steps.
  - Improved input validation contrast for the light variant.
- Removed the reload prompt: The extension now updates the theme dynamically and silently when configuration changes are detected, providing a more seamless experience.
- Updated project description and metadata.

### Fixed

- Fixed critical syntax errors in workbench template strings that resulted in invalid color values.
- Restored and corrected async theme generation logic in utility classes.

## [0.1.2] - 2026-02-17

### Added

- Added custom logo to the extension
- Added icon field to package.json for marketplace display
- Added files array to properly include logo in package

## [0.1.1] - 2026-02-17

### Changed

- Optimized light theme colors for better visibility:
  - Darkened foreground colors by ~30% for improved readability
  - Darkened grey UI colors by ~25% for better contrast
  - Applied changes across all light theme variants (soft, medium, hard)

### Fixed

- Updated copyright email addresses from `i@sainnhe.dev` to `support@raythurman.dev`
- Fixed workflow artifact names from `everforest` to `ravenwood`

## [0.1.0] - 2026-02-16

### Added

- Initial release of Ravenwood.
- Custom "Ravenwood Emerald" color palette.
- Deepened dark background contrast.
- Forked and rebranded from Everforest.
