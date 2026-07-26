# Ravenwood

[!["Buy Me A Coffee"](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/raythurman)

Ravenwood is a refined emerald forest theme for Visual Studio Code, based on the [Everforest](https://github.com/sainnhe/everforest) color scheme. It features deeper, more saturated emerald greens and richer backgrounds, designed for a comfortable and pleasant coding experience.

## Features

- **Emerald Palette:** A custom-tuned set of greens and aquas for a more vibrant forest feel.
- **Deep Contrast:** Slightly darker backgrounds to make the emerald tones pop.
- **Eye Protection:** Maintains the original eye-friendly design of Everforest.
- **Customizable:** Supports multiple contrast levels, workbench styles, cursor colors, selection colors, and italic options.
- **Semantic Tokens:** Built-in LSP semantic token support for Go, TypeScript, JavaScript, Python, Rust, Java, C#, C++, and Elm.
- **Syntax Coverage:** 35+ languages with TextMate scope rules, including Rust, Go, Python, Swift, SQL, TypeScript, GraphQL, Dart, SASS/SCSS, Perl, LaTeX, and more.
- **Full Workbench Color Coverage:** 100% of official VS Code workbench theme color keys (910/910) — every UI surface themed, from command center and editor borders to terminal symbol icons and SCM graph.
- **Dynamic Regeneration:** Theme files regenerate automatically when configuration changes — no reload required.
- **Realm Themes:** 8 additional static themes inspired by Norse cosmology — Asgard, Vanaheim, Alfheim, Svartalfheim, Nidavellir, Jotunheim, Muspelheim, and Helheim. Each realm is a fixed artistic statement with its own color identity, generated at build time alongside the base Dark/Light themes.

## Requirements

- Visual Studio Code **1.95.0** or newer.

## Installation

1. Open **Extensions** side bar panel in Visual Studio Code. `View` -> `Extensions`
2. Search for `Ravenwood`
3. Click **Install**
4. Click **Reload**
5. File -> Preferences -> Color Theme -> **Ravenwood Dark** (or **Ravenwood Light**, or any of the 8 realm themes: **Ravenwood Asgard**, **Ravenwood Vanaheim**, **Ravenwood Alfheim**, **Ravenwood Svartalfheim**, **Ravenwood Nidavellir**, **Ravenwood Jotunheim**, **Ravenwood Muspelheim**, **Ravenwood Helheim**)

## Configuration

Ravenwood exposes 12 configuration options under the `ravenwood.*` namespace. All options are optional; defaults match the shipped theme.

- `ravenwood.darkContrast` / `ravenwood.lightContrast` — Background contrast (`soft` / `medium` / `hard`).
- `ravenwood.darkWorkbench` / `ravenwood.lightWorkbench` — Workbench style (`material` / `flat` / `high-contrast`).
- `ravenwood.darkCursor` / `ravenwood.lightCursor` — Cursor color (`white`/`black` + the 7 palette hues).
- `ravenwood.darkSelection` / `ravenwood.lightSelection` — Selection background color (`grey` + the 7 palette hues).
- `ravenwood.italicKeywords` — Italicize keywords (default `false`).
- `ravenwood.italicComments` — Italicize comments (default `true`).
- `ravenwood.diagnosticTextBackgroundOpacity` — Opacity of diagnostic error/warning/info backgrounds (`0%` / `12.5%` / `25%` / `37.5%` / `50%`).
- `ravenwood.highContrast` — Add an extra border around UI items to increase contrast (default `false`).

See [CONFIGURATION.md](CONFIGURATION.md) for the full reference with allowed values, defaults, and example `settings.json` snippets.

## Build

Contributors can build the extension from source:

```bash
npm install
npm run compile      # cleans dist, compiles TS, regenerates themes/*.json
npm run package      # produces a .vsix for publishing or side-loading
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and [ARCHITECTURE.md](ARCHITECTURE.md) for a walkthrough of the source layout.

## Contributing

Contributions are welcome! Whether it's a bug report, a feature request, or feedback on the colors — all feedback is appreciated. Check out [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Credits

- Based on [Everforest](https://github.com/sainnhe/everforest) by [sainnhe](https://github.com/sainnhe).

## License

[MIT](LICENSE)