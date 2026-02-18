# Ravenwood VS Code Theme - Project Context

Ravenwood is a refined forest theme for Visual Studio Code, inspired by the Everforest color scheme. It is characterized by deeper, more saturated emerald greens and a modular architecture that allows for dynamic theme generation based on user settings.

## Project Overview

- **Purpose:** Provide a vibrant and eye-friendly emerald forest theme for VS Code.
- **Main Technologies:** TypeScript, Node.js, VS Code Extension API.
- **Key Feature:** Dynamic theme generation. Unlike static themes, Ravenwood regenerates its JSON theme files at runtime when users change specific configurations (e.g., contrast, workbench style, italics).

## Architecture

The project is structured to separate color palettes from UI and syntax rules:

- `src/palette/`: Contains color definitions for `dark` and `light` variants, subdivided by contrast levels (`hard`, `medium`, `soft`).
- `src/workbench/`: Defines workbench (UI) colors, supporting different styles like `material`, `flat`, and `high-contrast`.
- `src/syntax/`: Defines syntax highlighting rules, including optional italics for keywords and comments.
- `src/semantic/`: Defines semantic highlighting rules.
- `src/utils.ts`: Core utility class for reading VS Code configuration, detecting changes, and generating theme JSON files.
- `src/hook/generateThemes.ts`: A build-time script used to generate the initial/default theme files in the `themes/` directory.
- `themes/`: Contains the generated `ravenwood-dark.json` and `ravenwood-light.json` files. These files are updated by the extension at runtime.

## Building and Development

### Key Commands

- `npm run compile`: Cleans the `dist` folder, compiles TypeScript, and generates the default themes. This is the primary build command.
- `npm run compile:ts`: Compiles TypeScript source files.
- `npm run compile:themes`: Executes the theme generation hook (`dist/hook/generateThemes.js`).
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run clean`: Removes the `dist` directory and packaged `.vsix` files.
- `npm run package`: Packages the extension into a `.vsix` file using `vsce`.

### Development Workflow

1.  **Adding Configurations:** To add a new user-customizable option:
    - Update `contributes.configuration` in `package.json`.
    - Add the property to the `Configuration` interface in `src/interface.ts`.
    - Update `Utils.getConfiguration()` and `Utils.isDefaultConfiguration()` in `src/utils.ts`.
    - Update `src/hook/generateThemes.ts` to include the default for the new option.
2.  **Modifying Colors:** Colors are managed in `src/palette/`. Changes there will propagate through `src/workbench/` and `src/syntax/`.
3.  **Code Style:**
    - The codebase uses `vim` fold markers (`{{{` and `}}}`) for organization.
    - Strict typing is enforced via TypeScript.
    - Linting and formatting are handled by ESLint and Prettier (via `lint-staged`).

## Contribution Guidelines

- Follow existing modular patterns when adding new syntax or workbench rules.
- Ensure that changes to the theme logic are reflected in both the build-time hook and the runtime utility class.
- Always run `npm run compile` and `npm run lint` before submitting changes.
