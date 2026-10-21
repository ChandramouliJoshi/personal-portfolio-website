# Project File Structure

```text
my-portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── preact.svg
│   ├── components/
│   │   ├── ParticlesCanvas.jsx
│   │   ├── ProjectSection.css
│   │   └── ProjectSection.jsx
│   ├── App.jsx
│   ├── app.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── file struct.md
```

## Key Files

- `src/main.jsx` — React entry point; mounts `App` and loads global styles.
- `src/App.jsx` — Main portfolio layout, navigation, hero, About, Skills, Contact, and footer.
- `src/app.css` — Component and page styling, responsive layouts, and project card/filter styles.
- `src/index.css` — Global styles, Tailwind directives, typography, and reduced-motion defaults.
- `src/components/ParticlesCanvas.jsx` — Interactive canvas particle background used by the hero.
- `src/components/ProjectSection.jsx` — Central project data, category filters, and reusable project cards.
- `src/components/ProjectSection.css` — Present but currently empty; project styles are in `src/app.css`.
- `index.html` — Vite HTML entry document and page metadata.
- `package.json` / `package-lock.json` — Project scripts and dependency declarations / lockfile.
- `vite.config.js` — Vite configuration.
- `tailwind.config.js` / `postcss.config.js` — Tailwind CSS and PostCSS configuration.

Generated directories such as `node_modules/` and `dist/` are omitted from this overview.
