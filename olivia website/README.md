# Olivia Ahn — Portfolio Website

## File Structure

```
olivia-ahn-portfolio/
│
├── index.html              ← Main page (hero + about + projects grid)
│
├── css/
│   └── style.css           ← All styles (global, header, hero, grid, product, cart)
│
├── js/
│   ├── data.js             ← ⭐ YOUR CONTENT — edit this to update projects & info
│   ├── cart.js             ← Shared cart state (sessionStorage)
│   ├── index.js            ← Main page logic
│   ├── project.js          ← Product/project detail page logic
│   └── cart-page.js        ← Shopping cart page logic
│
└── pages/
    ├── project.html        ← Project detail page template
    └── cart.html           ← Shopping bag / checkout page
```

---

## Quick Start (VS Code)

1. Open the `olivia-ahn-portfolio` folder in VS Code.
2. Install the **Live Server** extension (ritwickdey.liveserver).
3. Right-click `index.html` → **Open with Live Server**.
4. Your site opens at `http://127.0.0.1:5500`.

> ⚠️ You must use a local server (like Live Server) because the pages
> share JavaScript files via relative paths. Opening `index.html` directly
> as a `file://` URL may cause issues with navigating to sub-pages.

---

## Customizing Your Content

### 1. Personal info & links
Open `js/data.js` and update the `PERSONAL_INFO` object at the top:

```js
const PERSONAL_INFO = {
  name: "Olivia Ahn",
  title: "Software Engineer",
  email: "your@email.com",          // ← your real email
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  instagram: "https://instagram.com/yourhandle",
};
```

### 2. Adding / editing projects
Each project in `js/data.js` looks like this:

```js
{
  id: 1,                            // ← must be unique
  title: "Project Name",
  subtitle: "Category / Tech",
  date: "MM/DD/YYYY",               // ← shown as "$ MM/DD/YYYY"
  description: "Your paragraph...",
  image: null,                      // ← or "assets/project1.jpg"
  links: [
    { icon: "github",   label: "GitHub",    url: "https://github.com/..." },
    { icon: "external", label: "Live Demo", url: "https://..." },
    { icon: "figma",    label: "Figma",     url: "https://..." },
  ],
},
```

Supported icon types: `"github"`, `"external"`, `"figma"`.

### 3. Adding project images
- Create an `assets/` folder inside `olivia-ahn-portfolio/`.
- Drop your images in there (e.g. `assets/project1.jpg`).
- In `data.js`, set `image: "assets/project1.jpg"` (relative to `index.html`).

### 4. About me text
Open `index.html` and find the `<p>` tag inside `.about-body` — replace the placeholder bio.

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Main | `/index.html` | Hero, About, Projects grid |
| Project | `/pages/project.html?id=1` | Project detail (change id) |
| Cart | `/pages/cart.html` | Saved projects + email checkout |

---

## Notes
- The "Add to Bag" / shopping cart uses `sessionStorage`, so it resets when the browser tab is closed. This is intentional — recruiters start fresh each visit.
- The "Check Out" button opens the visitor's mail client with a pre-filled email addressed to you.
- The projects grid is flexible — add as many entries to `PROJECTS` in `data.js` as you like. A "Coming Soon" card always appears at the end automatically.
