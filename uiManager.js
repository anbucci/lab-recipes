/**
 * UI Manager - Handles all UI interactions and rendering
 */

class UIManager {
  constructor(recipeManager) {
    this.recipeManager = recipeManager;

    // DOM Elements
    this.recipeSelect = document.getElementById('recipeSelect');
    this.totalVolumeInput = document.getElementById('totalVolume');
    this.componentsTableBody = document.querySelector('#componentsTable tbody');
    this.emptyState = document.getElementById('emptyState');
  }

  init() {
    this.setupEventListeners();
    this.populateRecipeSelect();
    this.updateTable();
  }

  setupEventListeners() {
    this.recipeSelect.addEventListener('change', () => this.onRecipeChange());
    this.totalVolumeInput.addEventListener('input', () => this.updateTable());
  }

  populateRecipeSelect() {
    this.recipeSelect.innerHTML = '';
    const categories = this.recipeManager.getCategories();

    console.log('Populating recipes. Categories found:', categories);
    console.log('Total recipes:', this.recipeManager.getAllRecipes().length);

    if (categories.length === 0) {
      this.recipeSelect.innerHTML = '<option>No recipes available</option>';
      return;
    }

    categories.forEach((category) => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = category;

      this.recipeManager.getRecipesByCategory(category).forEach((recipe) => {
        const option = document.createElement('option');
        option.value = recipe.id;
        option.textContent = recipe.name;
        optgroup.appendChild(option);
      });

      this.recipeSelect.appendChild(optgroup);
    });

    // Set first recipe if available
    if (this.recipeManager.getAllRecipes().length > 0) {
      this.recipeSelect.value = this.recipeManager.getAllRecipes()[0].id;
    }
  }

  onRecipeChange() {
    this.updateTable();
  }

  updateTable() {
    const recipeId = this.recipeSelect.value;
    const recipe = this.recipeManager.getRecipeById(recipeId);
    const totalVol = parseFloat(this.totalVolumeInput.value) || 0;

    this.componentsTableBody.innerHTML = '';

    if (!recipe || totalVol <= 0) {
      this.emptyState.style.display = 'block';
      return;
    }

    this.emptyState.style.display = 'none';

    recipe.components.forEach((comp) => {
      const row = document.createElement('tr');
      row.className = 'border-b border-gray-200 hover:bg-gray-50';

      const nameCell = document.createElement('td');
      nameCell.textContent = comp.name;
      nameCell.className = 'px-4 py-3 text-gray-900';

      const fracCell = document.createElement('td');
      fracCell.textContent = (comp.fraction * 100).toFixed(2) + ' %';
      fracCell.className = 'px-4 py-3 text-gray-600';

      const volCell = document.createElement('td');
      const vol = comp.fraction * totalVol;
      volCell.textContent = vol.toFixed(2);
      volCell.className = 'px-4 py-3 font-semibold text-gray-900';

      row.appendChild(nameCell);
      row.appendChild(fracCell);
      row.appendChild(volCell);
      this.componentsTableBody.appendChild(row);
    });
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UIManager;
}
