# Contributing to Ravenwood

Thank you for your interest in Ravenwood! I welcome all contributions, from bug reports and feature requests to code changes and design feedback.

## A Note on Colors

Please note: I am quite colorblind. These colors work nicely for me, but if you notice any oddities, it's likely I just can't see them!

I don't usually notice small color tweaks, and while we have a great base from Everforest plus my own initial changes, I'm always open to making things better. If you feel like a color choice looks "off" or lacks contrast, please reach out so we can get things set up with better colors. Your feedback is really helpful in making this theme look great for everyone.

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

- `src/palette/` — color sources (backgrounds + foregrounds, per variant × contrast)
- `src/workbench/` — UI token rules (base + material/flat/highContrast overrides)
- `src/syntax/` — TextMate scope rules (default + italic variants)
- `src/semantic.ts` — LSP semantic token colors
- `src/utils.ts` — runtime config detection and regeneration
- `src/themeData.ts` — pure `ThemeData` builder shared by runtime and build-time
- `src/hook/generateThemes.ts` — build-time default theme generator
- `src/interface.ts` — TypeScript interfaces (`Configuration`, `Palette`, `ThemeData`, `SyntaxRule`)

### Linting & Formatting

- `npm run lint` runs `prettier --check` on `src/**/*.ts` plus `tsc --noEmit` for strict type checking.
- `npm run format` auto-formats `src/**/*.ts` with Prettier.
- On commit, `husky` + `lint-staged` automatically Prettier-format staged `.ts`, `.js`, `.mjs`, `.json`, and `.md` files.

### Submitting Pull Requests

1.  Create a new branch for your changes: `git checkout -b my-feature-branch`.
2.  Ensure your code follows the project's style: `npm run lint` and `npm run compile` must both pass.
3.  Commit your changes with clear, descriptive messages.
4.  Push your branch and open a Pull Request against the `main` branch.

## License

By contributing to Ravenwood, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).