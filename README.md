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

### Deploy to iCloud

```bash
pnpm deploy:icloud
```
Builds and syncs the app to iCloud Drive (`~/Library/Mobile Documents/com~apple~CloudDocs/Lab/`)

### Build

```bash
pnpm build
```
Generates single-file HTML in `dist/` folder

### Deploy to GitHub Pages (via GitHub Actions)

This project includes a GitHub Actions workflow that builds the app and publishes the `dist/` folder to the `gh-pages` branch. The workflow triggers automatically on push to `main` and can also be run manually from the Actions tab.

Steps to enable GitHub Pages for this repo:

1. Push this repository to GitHub (if not already pushed).
2. In the repository Settings → Pages, set the source to the `gh-pages` branch (the workflow will create/update this branch).
3. (Optional) Under Pages, set a custom domain or leave the default `https://<your-org-or-username>.github.io/<repo>/`.

To trigger a deployment manually from your machine:

```bash
pnpm build
# then push changes to trigger the workflow
git add -A && git commit -m "Update site" && git push
```

The workflow will run and publish the `dist/` folder to the `gh-pages` branch.


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
