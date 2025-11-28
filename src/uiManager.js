/**
 * UI Manager - Handles all UI interactions and rendering
 */

export default class UIManager {
  constructor(recipeManager) {
    this.recipeManager = recipeManager

    // DOM Elements
    this.recipeSelect = document.getElementById('recipeSelect')
    this.categoryTabs = document.getElementById('categoryTabs')
    this.totalVolumeInput = document.getElementById('totalVolume')
    this.componentsTableBody = document.querySelector('#componentsTable tbody')
    this.emptyState = document.getElementById('emptyState')
    this.selectedCategory = null
  }

  init() {
    this.setupEventListeners()
    this.populateRecipeSelect()
    this.updateTable()
  }

  setupEventListeners() {
    this.recipeSelect.addEventListener('change', () => this.onRecipeChange())
    this.totalVolumeInput.addEventListener('input', () => this.updateTable())
  }

  populateRecipeSelect() {
    this.recipeSelect.innerHTML = ''
    this.categoryTabs.innerHTML = ''
    const categories = this.recipeManager.getCategories()

    console.log('Populating recipes. Categories found:', categories)
    console.log('Total recipes:', this.recipeManager.getAllRecipes().length)

    if (categories.length === 0) {
      this.recipeSelect.innerHTML = '<option>No recipes available</option>'
      return
    }

    // Create tabs for categories
    categories.forEach((category, idx) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.textContent = category
      btn.className = 'px-3 py-1 rounded-md text-sm border border-transparent bg-white text-gray-900 hover:bg-gray-100'
      btn.addEventListener('click', () => {
        this.selectCategory(category, btn)
      })
      this.categoryTabs.appendChild(btn)

      // default select first category
      if (idx === 0 && !this.selectedCategory) {
        this.selectedCategory = category
      }
    })

    // Activate the selected category and populate recipes
    this.selectCategory(this.selectedCategory)
  }

  selectCategory(category, clickedButton) {
    if (!category) return
    // update active tab styles
    Array.from(this.categoryTabs.children).forEach((el) => {
      if (el === clickedButton || (clickedButton == null && el.textContent === category)) {
        el.className = 'px-3 py-1 rounded-md text-sm border bg-blue-500 text-white'
      } else {
        el.className = 'px-3 py-1 rounded-md text-sm border border-transparent bg-white text-gray-900 hover:bg-gray-100'
      }
    })

    this.selectedCategory = category
    this.recipeSelect.innerHTML = ''
    const recipes = this.recipeManager.getRecipesByCategory(category)
    if (recipes.length === 0) {
      this.recipeSelect.innerHTML = '<option>No recipes available</option>'
      return
    }
    recipes.forEach((recipe) => {
      const option = document.createElement('option')
      option.value = recipe.id
      option.textContent = recipe.name
      this.recipeSelect.appendChild(option)
    })

    // Set first recipe for this category
    this.recipeSelect.value = recipes[0].id
    // Trigger table update for the newly selected recipe
    this.updateTable()
  }

  onRecipeChange() {
    this.updateTable()
  }

  updateTable() {
    const recipeId = this.recipeSelect.value
    const recipe = this.recipeManager.getRecipeById(recipeId)
    const totalVol = parseFloat(this.totalVolumeInput.value) || 0

    this.componentsTableBody.innerHTML = ''

    if (!recipe || totalVol <= 0) {
      this.emptyState.style.display = 'block'
      return
    }

    this.emptyState.style.display = 'none'

    recipe.components.forEach((comp) => {
      const row = document.createElement('tr')
      row.className = 'border-b border-gray-200 hover:bg-gray-50'

      const nameCell = document.createElement('td')
      nameCell.textContent = comp.name
      nameCell.className = 'px-4 py-3 text-gray-900'

      const fracCell = document.createElement('td')
      fracCell.textContent = (comp.fraction * 100).toFixed(2) + ' %'
      fracCell.className = 'px-4 py-3 text-gray-600'

      const volCell = document.createElement('td')
      const vol = comp.fraction * totalVol
      volCell.textContent = vol.toFixed(2)
      volCell.className = 'px-4 py-3 font-semibold text-gray-900'

      row.appendChild(nameCell)
      row.appendChild(fracCell)
      row.appendChild(volCell)
      this.componentsTableBody.appendChild(row)
    })
  }
}
