# Lab Recipes Calculator

A lightweight PWA (Progressive Web App) for calculating ingredient volumes for lab media formulations. Works offline on mobile and desktop.

## Features

- 📱 **PWA Support** - Install as standalone app, works offline
- 🧪 **Recipe Management** - Define recipes in `recipes.json`
- 🔢 **Volume Calculator** - Automatically calculates component volumes based on total volume
- 📊 **Category Organization** - Recipes organized by categories
- 🎨 **Tailwind CSS** - Clean, modern UI

## Getting Started

1. **Open the app**: Open `lab_calculator.html` in your browser
2. **Add recipes**: Edit `recipes.json` with your lab formulations
3. **On mobile**: Tap Share → Add to Home Screen (Safari) or Install App (Chrome)

## Project Structure

```
lab_calculator.html    Main HTML file (entry point)
app.js                 Application initialization
recipeManager.js       Recipe data management
uiManager.js           UI rendering and interactions
recipes.json           Recipe configuration
sw.js                  Service Worker (offline support)
manifest.json          PWA manifest
README.md              This file
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

## Development

No build step required! The app is vanilla JavaScript with:
- **Tailwind CSS** via CDN
- **ES6 Classes** for modules
- **Async/await** for data loading

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 14+
- Android Chrome

## License

MIT
