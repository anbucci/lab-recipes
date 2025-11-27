/**
 * Recipe Manager - Handles recipe data and operations
 */

class RecipeManager {
  constructor() {
    this.recipes = [];
  }

  async loadRecipes() {
    try {
      const response = await fetch('recipes.json');
      if (!response.ok) throw new Error('Failed to load recipes');
      this.recipes = await response.json();
      console.log('Recipes loaded successfully:', this.recipes.length, 'recipes');
    } catch (error) {
      console.error('Error loading recipes:', error);
      this.recipes = [];
    }
  }

  getRecipeById(id) {
    return this.recipes.find((r) => r.id === id);
  }

  getRecipesByCategory(category) {
    return this.recipes.filter((r) => r.category === category);
  }

  getCategories() {
    const cats = new Set(this.recipes.map((r) => r.category));
    return Array.from(cats).sort();
  }

  getAllRecipes() {
    return this.recipes;
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RecipeManager;
}
