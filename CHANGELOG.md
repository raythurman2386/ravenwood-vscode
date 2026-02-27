# Changelog

All notable changes to this project will be documented in this file.

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
