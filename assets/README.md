# Portfolio assets

`logo-astra-dark.svg` and `logo-astra-light.svg` are the active sidebar and favicon
variants. Both retain the transparent silhouette of `logo-per-aspera-ad-astra.png`,
embedded as an alpha mask. The dark variant is off-white/mint; the light variant is
navy/deep teal. Theme selection switches both the brand and favicon automatically.
Earlier logo concepts and the light-tile wrapper are retained but not referenced by the page.

## Internship wordmarks

Section 03 uses transparent company silhouettes, recolored through CSS masks with
the portfolio's text, mint, and accent tokens. Light, Dark, and System all use the
same local assets; no third-party requests are made by visitors.

- `devoteam.svg`: [official Devoteam vector](https://www.devoteam.com/wp-content/themes/lsac-devoteam/assets/images/logo-devoteam.svg).
- `inria.svg`: wordmark path extracted from [Inria's official logo](https://www.inria.fr/themes/custom/inria/logo/logo.svg), without its surrounding institutional lockup/background.
- `africell-group.png`: [transparent Africell wordmark from its official Gambia website](https://www.africell.gm/wp-content/uploads/2019/12/africellLogo_777x237_white.png), displayed on the Africell Group internship slide.

These are portfolio color adaptations, not official brand-color variants.

## Institution emblems

The overview places each emblem in a matching 48 × 48 transparent area before the
institution's text, with no added frames. `applyTheme` switches images marked with
`data-logo-light` and `data-logo-dark`, including the System appearance setting.

- `ip-paris-light.svg` / `ip-paris-dark.svg`: sharp black/white vector circle from the [official IP Paris horizontal web pack](https://www.ip-paris.fr/sites/default/files/Charte%20Graphique%202025/LOGOTYPE_IP-PARIS_HORIZONTAL_WEB.zip).
- `telecom-paris-light.svg` / `telecom-paris-dark.svg`: adapted official inline vector from [Télécom Paris](https://www.telecom-paris.fr/). The approved two-panel design is retained: black upper panel and light burgundy in light mode, white upper panel and dark burgundy in dark mode. Only the added external frame is removed.
- `usj-symbol.svg`: original blue, gold-grey, and white tree emblem for both themes, cropped from the [official USJ logo](https://usj.edu.lb/sites/usj/files/logos/white/FR/USJ.png). The original is retained because the recolored trial reduced its identity. Source retained as `usj.png`.

The USJ SVG embeds its source image; visitors make no remote logo requests.
