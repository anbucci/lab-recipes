# Lab Recipes Calculator

A lightweight PWA (Progressive Web App) for calculating ingredient volumes for lab media formulations. Works offline on mobile and desktop.

## Features

- 🧪 **Recipe Management** - Define recipes in `data/recipes.json`
- 🔢 **Volume Calculator** - Automatically calculates component volumes based on total volume
- 📊 **Category Organization** - Recipes organized by categories
- 📱 **PWA Support** - Install as standalone app, works offline
- 🎨 **Tailwind CSS** - Clean, modern UI
- ⚡ **Vite** - Fast build system with development server. Packs all into a single html file.

## Getting Started

### Install dependencies

```bash
pnpm install 
```

Installs dependencies - **Only needed the first time the projet is set up**, or if the folder `node_modules` is deleted.

### Development

```bash 
pnpm dev
```
Runs the dev server at `http://localhost:5173` with live browser refresh. UI updates automatically when a change is saved, no need to refreah the browser.

### Build

```bash
pnpm build
```
Generates single-file HTML in `dist/` folder

### Deploy to GitHub Pages

The repository includes a GitHub Actions workflow that builds and publishes `dist/` to GitHub Pages on push to `main` (or via manual dispatch). Push to `main` or trigger the workflow in Actions to deploy. The site will be available at `https://<your-username>.github.io/<repo>/` once the deployment completes.



## Project Structure

```
index.html             Main entry point
src/
  ├── main.js         App initialization
  ├── recipeManager.js Recipe data management
  ├── uiManager.js     UI rendering
  └── style.css       Tailwind styles
data/
  └── recipes.json    Recipe configuration
package.json          Dependencies and scripts
vite.config.js        Vite configuration
tailwind.config.js    Tailwind configuration
```

## Adding Recipes

Edit `recipes.json` to add recipes:

```json
{
  "id": "unique_id",
  "name": "Recipe Name",
  "category": "Category Name",
  "components": [
    { "name": "Component A", "fraction": 0.5 },
    { "name": "Component B", "fraction": 0.5 }
  ]
}
```

Fractions are automatically normalized to sum to 1.0.
