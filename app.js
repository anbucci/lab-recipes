/**
 * App Initialization - Main entry point
 */

// Initialize the application
async function initializeApp() {
  // Create recipe manager and load recipes
  const recipeManager = new RecipeManager();
  await recipeManager.loadRecipes();

  // Create UI manager and initialize
  const uiManager = new UIManager(recipeManager);
  uiManager.init();

  // Register service worker for PWA support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .catch((err) => console.log('Service Worker registration failed:', err));
  }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
