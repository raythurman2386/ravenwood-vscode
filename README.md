# Ravenwood

Ravenwood is a refined forest theme for Visual Studio Code, based on the [Everforest](https://github.com/sainnhe/everforest) color scheme. It features deeper, more saturated emerald greens and richer backgrounds, designed for a comfortable and pleasant coding experience.

## Features

- **Emerald Palette:** A custom-tuned set of greens and aquas for a more vibrant forest feel.
- **Deep Contrast:** Slightly darker backgrounds to make the emerald tones pop.
- **Eye Protection:** Maintains the original eye-friendly design of Everforest.
- **Customizable:** Supports multiple contrast levels, workbench styles, cursor colors, selection colors, and italic options.
- **Semantic Tokens:** Built-in semantic token support for Go, TypeScript, JavaScript, Python, and Rust.
- **Dynamic Regeneration:** Theme files regenerate automatically when configuration changes — no reload required.

## Requirements

- Visual Studio Code **1.95.0** or newer.

## Installation

1. Open **Extensions** side bar panel in Visual Studio Code. `View` -> `Extensions`
2. Search for `Ravenwood`
3. Click **Install**
4. Click **Reload**
5. File -> Preferences -> Color Theme -> **Ravenwood Dark** (or **Ravenwood Light**)

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

Contributions are welcome! I'd love to hear from you whether it's a bug report, a feature request, or feedback on the colors.

Please note: I am quite colorblind. These colors work nicely for me, but if you notice any oddities, it's likely I just can't see them! I don't usually notice small tweaks, so if something looks "off," please reach out. Check out [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Credits

- Based on [Everforest](https://github.com/sainnhe/everforest) by [sainnhe](https://github.com/sainnhe).

## License

[MIT](LICENSE)