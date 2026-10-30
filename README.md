# Hadi Fouani — Portfolio

Personal portfolio for AI, machine learning, and computer science, hosted on GitHub Pages.

## Project structure

```text
index.html     Content, projects, research interests, readings, and navigation
style.css      Responsive layout, dark/light themes, and animations
script.js      Appearance, project filters, scroll/click motion, and navigation
assets/        Per aspera ad astra logo/favicon and future images (see assets/README.md)
```

Open `index.html` in a browser to preview locally. No build or dependencies required.

The design combines a midnight-blue research notebook aesthetic, blue and mint accents,
a paired study track, three grouped interests, a compact career timeline, and generous
typography in the overview. Dark is the first-visit default.
The study track includes engineering degrees at Télécom Paris and USJ, plus M2/MPRI
at IP Paris. The career timeline shows the internship start years: 2023, 2026, 2026.
The sun, moon, and monitor buttons select Light, Dark, and System and remember the choice when storage is
available. Set `data-theme` on `<html>` to change the first-visit default, or remove it
to use the system preference. Saved visitor preferences take precedence.

Edit content in `index.html`, theme tokens at the top of `style.css`, and interactions
in `script.js`. Navigation follows scrolling. The layout adapts to a compact top
navigation on mobile and respects reduced-motion preferences.
The sidebar arrow switches between the full sidebar and an icon rail on desktop;
the choice is saved locally. On mobile the arrow hides or shows the navigation rows.
Projects can be filtered by topic; native expandable details work without JavaScript. Scroll reveals,
reading progress, click ripples, and hover responses are progressive enhancements.
Reduced motion disables visual animation.

The approved "Per aspera ad astra" logo is used for both the brand and browser favicon.
`assets/logo-astra-dark.svg` uses off-white (#f0f3f8) and mint (#9de4cf).
`assets/logo-astra-light.svg` uses navy (#172334) and deep teal (#216e60).
Both are transparent, self-contained SVGs using the original PNG silhouette as an
alpha mask to preserve its exact shape. `applyTheme()` switches both the brand and
favicon, including when the system preference changes in System mode.
The winding ascent and star symbolize perseverance and aspiration. Hover over
the brand for the motto.
Navigation uses matching SVG line icons with centered labels between icons and numbers.
The contact section links only to LinkedIn; GitHub remains a code link in the sidebar.
No email address or phone number is embedded
in the page. The supplied CV was used for content, not copied to public assets.

## Content awaiting personal details

- Meme understanding: ongoing; a TODO is included for details when the project is ready.
- Devoteam/LEXIA: AI Researcher Intern in the RESEARCH team, Future of Work axis.
- Research interests: refine the current directions and questions to match your priorities.
- Background: confirm current degree and employment status before changing the dates.

## Edit readings

Find `id="readings"` in `index.html`. Each book or paper is one clearly spaced
`<article class="reading-entry">` block. Duplicate or delete a block to add or
remove a reading. Edit its category, title (`<cite>`), optional author, and description
(`p`). The six entries include your five selections and the TOL paper from your CV.
Descriptions are brief topic labels, not claims that you finished a reading.
