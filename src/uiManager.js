/**
 * UI Manager - Handles all UI interactions and rendering
 */

const CATEGORY_META = {
  'Growth Media': {
    label: 'Growth Media',
    shortLabel: 'Media',
    icon: 'flask',
    priority: 10,
  },
  Buffers: {
    label: 'Buffers',
    shortLabel: 'Buffers',
    icon: 'droplet',
    priority: 20,
  },
  Electrophysiology: {
    label: 'Electrophysiology',
    shortLabel: 'Ephys',
    icon: 'waveform',
    priority: 30,
  },
  Stainings: {
    label: 'Stainings',
    shortLabel: 'Stains',
    icon: 'spark',
    priority: 40,
  },
}

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
    this.isCategoryPanelOpen = false
    this.visibleCategoryCount = 5
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
    const categories = this.getSortedCategories()

    console.log('Populating recipes. Categories found:', categories)
    console.log('Total recipes:', this.recipeManager.getAllRecipes().length)

    if (categories.length === 0) {
      this.recipeSelect.innerHTML = '<option>No recipes available</option>'
      return
    }

    // default select first category
    if (!this.selectedCategory || !categories.includes(this.selectedCategory)) {
      this.selectedCategory = categories[0]
    }

    // Activate the selected category and populate recipes
    this.selectCategory(this.selectedCategory)
  }

  getSortedCategories() {
    return this.recipeManager
      .getCategories()
      .sort((a, b) => {
        const metaA = this.getCategoryMeta(a)
        const metaB = this.getCategoryMeta(b)

        if (metaA.priority !== metaB.priority) {
          return metaA.priority - metaB.priority
        }

        return metaA.label.localeCompare(metaB.label)
      })
  }

  getCategoryMeta(category) {
    const meta = CATEGORY_META[category]

    if (meta) {
      return meta
    }

    return {
      label: category,
      shortLabel: category,
      icon: 'lab',
      priority: 1000,
    }
  }

  renderCategoryNavigation() {
    const categories = this.getSortedCategories()
    const visibleCategories = categories.slice(0, this.visibleCategoryCount)
    const overflowCategories = categories.slice(this.visibleCategoryCount)
    const isOverflowActive = overflowCategories.includes(this.selectedCategory)

    this.categoryTabs.innerHTML = ''

    const nav = document.createElement('div')
    nav.className = 'space-y-3'

    const row = document.createElement('div')
    row.className = 'flex flex-wrap gap-2'
    row.setAttribute('aria-label', 'Recipe categories')

    visibleCategories.forEach((category) => {
      const meta = this.getCategoryMeta(category)
      row.appendChild(
        this.createCategoryButton({
          label: meta.shortLabel,
          fullLabel: meta.label,
          icon: meta.icon,
          active: this.selectedCategory === category,
          onClick: () => this.selectCategory(category),
        }),
      )
    })

    if (overflowCategories.length > 0) {
      row.appendChild(
        this.createCategoryButton({
          label: 'More',
          fullLabel: 'More categories',
          icon: 'more',
          active: this.isCategoryPanelOpen || isOverflowActive,
          expanded: this.isCategoryPanelOpen,
          controls: 'categoryOverflowPanel',
          onClick: () => this.toggleCategoryPanel(),
        }),
      )
    }

    nav.appendChild(row)

    if (overflowCategories.length > 0 && this.isCategoryPanelOpen) {
      const panel = document.createElement('div')
      panel.id = 'categoryOverflowPanel'
      panel.className = 'grid grid-cols-2 gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 sm:grid-cols-3'

      categories.forEach((category) => {
        const meta = this.getCategoryMeta(category)
        panel.appendChild(
          this.createCategoryButton({
            label: meta.label,
            fullLabel: meta.label,
            icon: meta.icon,
            active: this.selectedCategory === category,
            block: true,
            onClick: () => this.selectCategory(category),
          }),
        )
      })

      nav.appendChild(panel)
    }

    this.categoryTabs.appendChild(nav)
  }

  createCategoryButton({
    label,
    fullLabel,
    icon,
    active = false,
    expanded = false,
    controls = null,
    block = false,
    onClick,
  }) {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = [
      'inline-flex min-h-11 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      block ? 'w-full justify-start rounded-2xl' : 'max-w-full',
      active
        ? 'border-blue-500 bg-blue-500 text-white shadow-sm'
        : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-100',
    ].join(' ')
    button.setAttribute('aria-pressed', active ? 'true' : 'false')
    button.title = fullLabel

    if (controls) {
      button.setAttribute('aria-controls', controls)
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false')
    }

    const iconSpan = document.createElement('span')
    iconSpan.className = 'h-5 w-5 shrink-0'
    iconSpan.setAttribute('aria-hidden', 'true')
    iconSpan.innerHTML = this.getIconSvg(icon)

    const labelSpan = document.createElement('span')
    labelSpan.className = block ? 'truncate text-left' : 'max-w-24 truncate'
    labelSpan.textContent = label

    button.appendChild(iconSpan)
    button.appendChild(labelSpan)
    button.addEventListener('click', onClick)

    return button
  }

  getIconSvg(icon) {
    const icons = {
      flask:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 3v5.2L5.7 16a3 3 0 0 0 2.7 4h7.2a3 3 0 0 0 2.7-4L14 8.2V3"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 3h6"/><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 14h7"/></svg>',
      droplet:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3.5c3.4 4.2 5.5 7 5.5 10a5.5 5.5 0 1 1-11 0c0-3 2.1-5.8 5.5-10Z"/></svg>',
      waveform:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2 12h4l2.2-5 3.6 10 2.8-6H22"/></svg>',
      spark:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Zm14-1 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></svg>',
      more:
        '<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>',
      lab:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3h6"/><path stroke-linecap="round" stroke-linejoin="round" d="M10 3v6l-5 8a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 17l-5-8V3"/><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 14h7"/></svg>',
    }

    return icons[icon] || icons.lab
  }

  toggleCategoryPanel() {
    this.isCategoryPanelOpen = !this.isCategoryPanelOpen
    this.renderCategoryNavigation()
  }

  selectCategory(category) {
    if (!category) return

    this.selectedCategory = category
    this.isCategoryPanelOpen = false
    this.renderCategoryNavigation()
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

  getComponentTarget(comp) {
    if (typeof comp.fraction === 'number') {
      return (comp.fraction * 100).toFixed(2) + ' %'
    }

    if (typeof comp.amountPerLiter === 'number' && comp.unit) {
      return comp.amountPerLiter.toFixed(2) + ' ' + comp.unit + '/L'
    }

    return 'Manual'
  }

  getComponentAmount(comp, totalVol) {
    if (typeof comp.fraction === 'number') {
      return this.formatVolume(comp.fraction * totalVol)
    }

    if (typeof comp.amountPerLiter === 'number' && comp.unit) {
      const scaledAmount = comp.amountPerLiter * (totalVol / 1000)
      return scaledAmount.toFixed(2) + ' ' + comp.unit
    }

    return '-'
  }

  formatVolume(volumeMl) {
    if (volumeMl < 1) {
      return (volumeMl * 1000).toFixed(0) + ' uL'
    }

    return volumeMl.toFixed(2) + ' mL'
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
      fracCell.textContent = this.getComponentTarget(comp)
      fracCell.className = 'px-4 py-3 text-gray-600'

      const volCell = document.createElement('td')
      volCell.textContent = this.getComponentAmount(comp, totalVol)
      volCell.className = 'px-4 py-3 font-semibold text-gray-900'

      row.appendChild(nameCell)
      row.appendChild(fracCell)
      row.appendChild(volCell)
      this.componentsTableBody.appendChild(row)
    })
  }
}
