import recipesData from '../data/recipes.json'

/**
 * Recipe Manager - Handles recipe data and operations
 */

export default class RecipeManager {
  constructor() {
    this.recipes = []
  }

  async loadRecipes() {
    try {
      this.recipes = recipesData
      console.log('Recipes loaded successfully:', this.recipes.length, 'recipes')
    } catch (error) {
      console.error('Error loading recipes:', error)
      this.recipes = []
    }
  }

  getRecipeById(id) {
    return this.recipes.find((r) => r.id === id)
  }

  getRecipesByCategory(category) {
    return this.recipes.filter((r) => r.category === category)
  }

  getCategories() {
    const cats = new Set(this.recipes.map((r) => r.category))
    return Array.from(cats).sort()
  }

  getAllRecipes() {
    return this.recipes
  }
}
