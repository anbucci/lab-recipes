import RecipeManager from './recipeManager'
import UIManager from './uiManager'

// Initialize the application
async function initializeApp() {
  // Create recipe manager and load recipes
  const recipeManager = new RecipeManager()
  await recipeManager.loadRecipes()

  // Create UI manager and initialize
  const uiManager = new UIManager(recipeManager)
  uiManager.init()
}

// Start immediately or when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}
