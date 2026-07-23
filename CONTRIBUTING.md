# Contributing to Ravenwood

Thank you for your interest in Ravenwood! I welcome all contributions, from bug reports and feature requests to code changes and design feedback.

## How to Contribute

### Reporting Bugs and Suggestions

- Check the [existing issues](https://github.com/raythurman2386/ravenwood-vscode/issues) to see if your feedback has already been reported.
- If not, [open a new issue](https://github.com/raythurman2386/ravenwood-vscode/issues/new) with a clear description and, if possible, screenshots.

### Development Setup

If you'd like to contribute code:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/raythurman2386/ravenwood-vscode.git
    cd ravenwood-vscode
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the build:**
    ```bash
    npm run compile
    ```
4.  **Testing changes:**
    - Open this project in VS Code.
    - Press `F5` to launch a new "Extension Development Host" window with your changes active.
    - Alternatively, use `npm run compile` and check the generated files in the `themes/` directory.

### Project Structure

The source is organized into focused modules. See [ARCHITECTURE.md](ARCHITECTURE.md) for the full layout and the runtime theme-regeneration flow. Quick map:

- `src/palette/` — color sources (backgrounds + foregrounds, per variant x contrast)
- `src/workbench/` — UI token rules (base + material/flat/highContrast overrides)
- `src/syntax/` — TextMate scope rules (default + italic variants)
- `src/semantic.ts` — LSP semantic token colors
- `src/utils.ts` — runtime config detection and regeneration
- `src/themeData.ts` — pure `ThemeData` builder shared by runtime and build-time
- `src/hook/generateThemes.ts` — build-time default theme generator
- `src/interface.ts` — TypeScript interfaces (`Configuration`, `Palette`, `ThemeData`, `SyntaxRule`)

### Linting & Formatting

The project uses **Biome 2.5.x** (Rust-based) as a single tool for both linting and formatting, replacing the previous ESLint + Prettier stack.

- `npm run lint` runs `biome check` (lint + format check).
- `npm run format` auto-formats with `biome format --write`.
- On commit, `husky` + `lint-staged` automatically run `biome check --write` on staged `.ts`, `.js`, `.mjs`, `.json`, `.jsonc`, and `.md` files.
- Type safety is enforced by `tsc --strict` (run as part of `npm run compile`).

### Submitting Pull Requests

1.  Create a new branch for your changes: `git checkout -b my-feature-branch`.
2.  Ensure your code follows the project's style: `npm run lint` and `npm run compile` must both pass.
3.  Commit your changes with clear, descriptive messages.
4.  Push your branch and open a Pull Request against the `main` branch.

## License

By contributing to Ravenwood, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).