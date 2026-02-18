# Changelog

All notable changes to this project will be documented in this file.

## [0.1.5] - 2026-02-18

### Added

- **Go Syntax Highlighting**: Added comprehensive syntax support for the Go programming language, including specific colors for keywords (`go`, `chan`, `map`), types, functions, and packages to match the Ravenwood palette.

### Changed

- Bumped version to supersede marketplace conflicts.

## [0.1.4] - 2026-02-18

### Fixed

- **Critical Visual Bug**: Resolved a syntax error in `scrollbarSlider.background` that caused the scrollbar to appear red in dark mode.
- **Light Mode Consistency**: Unified the panel and editor background colors in light mode to remove distracting contrast blocks.

### Changed

- Refactored `src/workbench/common.ts` to improve maintainability of variant-specific logic.

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
