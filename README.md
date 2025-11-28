# Lab Recipes Calculator

A lightweight PWA (Progressive Web App) for calculating ingredient volumes for lab media formulations. Works offline on mobile and desktop.

## Features

- 📱 **PWA Support** - Install as standalone app, works offline
- 🧪 **Recipe Management** - Define recipes in `data/recipes.json`
- 🔢 **Volume Calculator** - Automatically calculates component volumes based on total volume
- 📊 **Category Organization** - Recipes organized by categories
- 🎨 **Tailwind CSS** - Clean, modern UI
- ⚡ **Vite** - Fast build system with development server. Packs all into a single html file.

## Getting Started

### Development



```bash
pnpm install 
```
Install dependencies - **Only the first time the projet is set up**, or if the folder `node_modules` is deleted.


```bash 
pnpm dev
```
Run the dev server at `http://localhost:5173` with live browser refresh (UI updates automatically when a change is saved, no need to refreah the browser).

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


### On Mobile (iPhone)
1. Open app in Safari
2. Tap Share → Add to Home Screen
3. Opens as standalone PWA

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
