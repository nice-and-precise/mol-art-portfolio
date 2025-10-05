/**
 * Gallery Filtering & Sorting Logic
 *
 * Provides functions for filtering and sorting pottery pieces in the gallery.
 * Manages URL state for shareable/bookmarkable filtered views.
 *
 * Following Article I: Simplicity - No libraries, vanilla TypeScript only.
 */

export interface FilterState {
  techniques: string[];
  colors: string[];
  featured: boolean | null;
  sort: SortOption;
}

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'featured';

export interface PieceData {
  slug: string;
  title: string;
  date: Date;
  techniques: string[];
  colors: string[];
  featured: boolean;
}

/**
 * Parse URL query parameters into FilterState
 */
export function parseURLParams(url: string): FilterState {
  const params = new URLSearchParams(url.startsWith('?') ? url : `?${url}`);

  // Get all technique params (can be multiple)
  const techniques = params.getAll('technique');

  // Get all color params (can be multiple)
  const colors = params.getAll('color');

  // Get featured param (null = show all, true = featured only)
  const featuredParam = params.get('featured');
  const featured = featuredParam === 'true' ? true : null;

  // Get sort param (default to date-desc)
  const sort = (params.get('sort') as SortOption) || 'date-desc';

  return {
    techniques,
    colors,
    featured,
    sort,
  };
}

/**
 * Filter pieces based on FilterState
 * Multiple filters use AND logic (piece must match ALL selected filters)
 */
export function filterPieces(pieces: PieceData[], state: FilterState): PieceData[] {
  return pieces.filter(piece => {
    // Check techniques (piece must have ALL selected techniques)
    if (state.techniques.length > 0) {
      const hasAllTechniques = state.techniques.every(tech =>
        piece.techniques.includes(tech)
      );
      if (!hasAllTechniques) return false;
    }

    // Check colors (piece must have ALL selected colors)
    if (state.colors.length > 0) {
      const hasAllColors = state.colors.every(color =>
        piece.colors.includes(color)
      );
      if (!hasAllColors) return false;
    }

    // Check featured status
    if (state.featured === true && !piece.featured) {
      return false;
    }

    // Piece passed all filters
    return true;
  });
}

/**
 * Sort pieces based on SortOption
 */
export function sortPieces(pieces: PieceData[], sort: SortOption): PieceData[] {
  const sorted = [...pieces]; // Don't mutate original array

  switch (sort) {
    case 'date-desc':
      return sorted.sort((a, b) => b.date.getTime() - a.date.getTime());

    case 'date-asc':
      return sorted.sort((a, b) => a.date.getTime() - b.date.getTime());

    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case 'featured':
      // Featured first, then sort by date descending within each group
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Both same featured status, sort by date desc
        return b.date.getTime() - a.date.getTime();
      });

    default:
      return sorted;
  }
}

/**
 * Build URL query string from FilterState
 * Omits default values to keep URLs clean
 */
export function buildURLString(state: FilterState): string {
  const params = new URLSearchParams();

  // Add technique params (one per technique)
  state.techniques.forEach(tech => {
    params.append('technique', tech);
  });

  // Add color params (one per color)
  state.colors.forEach(color => {
    params.append('color', color);
  });

  // Add featured param (only if true)
  if (state.featured === true) {
    params.append('featured', 'true');
  }

  // Add sort param (only if not default)
  if (state.sort !== 'date-desc') {
    params.append('sort', state.sort);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Extract unique values from pieces for a given field
 */
export function getUniqueValues(
  pieces: PieceData[],
  field: 'techniques' | 'colors'
): string[] {
  const allValues = pieces.flatMap(piece => piece[field]);
  return [...new Set(allValues)].sort();
}

/**
 * Initialize filters from URL and apply to gallery
 * Called on page load
 */
export function initializeFilters(): void {
  const state = parseURLParams(window.location.search);

  // Mark active filter pills
  state.techniques.forEach(tech => {
    const pill = document.querySelector(`[data-technique="${tech}"]`);
    if (pill) {
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
    }
  });

  state.colors.forEach(color => {
    const pill = document.querySelector(`[data-color="${color}"]`);
    if (pill) {
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
    }
  });

  // Set featured checkbox
  const featuredCheckbox = document.querySelector('#featured-only') as HTMLInputElement;
  if (featuredCheckbox && state.featured) {
    featuredCheckbox.checked = true;
  }

  // Set sort dropdown
  const sortSelect = document.querySelector('#sort-select') as HTMLSelectElement;
  if (sortSelect) {
    sortSelect.value = state.sort;
  }

  // Apply filters
  applyFilters(state);
  updateFilterCount(state);
}

/**
 * Apply filters to gallery cards (hide/show)
 */
export function applyFilters(state: FilterState): void {
  const cards = document.querySelectorAll('.pottery-card') as NodeListOf<HTMLElement>;

  // Get piece data from cards
  const pieces: PieceData[] = Array.from(cards).map(card => ({
    slug: card.getAttribute('data-piece-id') || '',
    title: card.querySelector('h2')?.textContent || '',
    date: new Date(card.getAttribute('data-date') || ''),
    techniques: JSON.parse(card.getAttribute('data-techniques') || '[]'),
    colors: JSON.parse(card.getAttribute('data-colors') || '[]'),
    featured: card.getAttribute('data-featured') === 'true',
  }));

  // Filter pieces
  const filteredPieces = filterPieces(pieces, state);
  const filteredSlugs = new Set(filteredPieces.map(p => p.slug));

  // Sort pieces
  const sortedPieces = sortPieces(filteredPieces, state.sort);

  // Hide/show cards with animation
  cards.forEach((card, index) => {
    const slug = card.getAttribute('data-piece-id');

    if (slug && filteredSlugs.has(slug)) {
      // Show card
      card.classList.remove('hidden');
      card.style.display = '';

      // Set order for sorting
      const sortIndex = sortedPieces.findIndex(p => p.slug === slug);
      card.style.order = sortIndex.toString();

      // Stagger animation
      card.style.animationDelay = `${sortIndex * 50}ms`;
    } else {
      // Hide card
      card.classList.add('hidden');
      card.style.display = 'none';
    }
  });

  // Show/hide "no results" message
  const noResults = document.querySelector('.no-results') as HTMLElement;
  if (noResults) {
    if (filteredPieces.length === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }
}

/**
 * Update filter count badge
 */
export function updateFilterCount(state: FilterState): void {
  const count = state.techniques.length + state.colors.length + (state.featured ? 1 : 0);
  const filterCount = document.querySelector('.filter-count') as HTMLElement;

  if (filterCount) {
    if (count === 0) {
      filterCount.style.display = 'none';
    } else {
      filterCount.style.display = 'inline';
      filterCount.textContent = `${count} filter${count === 1 ? '' : 's'} active`;
    }
  }
}

/**
 * Get current filter state from UI
 */
export function getCurrentState(): FilterState {
  const techniques: string[] = [];
  const colors: string[] = [];

  // Get active technique pills
  document.querySelectorAll('[data-technique].active').forEach(pill => {
    const tech = pill.getAttribute('data-technique');
    if (tech) techniques.push(tech);
  });

  // Get active color pills
  document.querySelectorAll('[data-color].active').forEach(pill => {
    const color = pill.getAttribute('data-color');
    if (color) colors.push(color);
  });

  // Get featured checkbox
  const featuredCheckbox = document.querySelector('#featured-only') as HTMLInputElement;
  const featured = featuredCheckbox?.checked ? true : null;

  // Get sort
  const sortSelect = document.querySelector('#sort-select') as HTMLSelectElement;
  const sort = (sortSelect?.value as SortOption) || 'date-desc';

  return { techniques, colors, featured, sort };
}

/**
 * Update browser URL without reload
 */
export function updateURL(state: FilterState): void {
  const url = buildURLString(state);
  const newURL = url ? `${window.location.pathname}${url}` : window.location.pathname;
  window.history.pushState({}, '', newURL);
}

/**
 * Clear all filters
 */
export function clearFilters(): void {
  // Deactivate all pills
  document.querySelectorAll('[data-technique].active, [data-color].active').forEach(pill => {
    pill.classList.remove('active');
    pill.setAttribute('aria-pressed', 'false');
  });

  // Uncheck featured checkbox
  const featuredCheckbox = document.querySelector('#featured-only') as HTMLInputElement;
  if (featuredCheckbox) {
    featuredCheckbox.checked = false;
  }

  // Reset sort to default
  const sortSelect = document.querySelector('#sort-select') as HTMLSelectElement;
  if (sortSelect) {
    sortSelect.value = 'date-desc';
  }

  // Apply empty filters
  const state: FilterState = {
    techniques: [],
    colors: [],
    featured: null,
    sort: 'date-desc',
  };

  applyFilters(state);
  updateURL(state);
  updateFilterCount(state);
}

// Initialize on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the gallery page
    if (document.querySelector('.gallery-filters')) {
      initializeFilters();

      // Set up event listeners

      // Technique pills
      document.querySelectorAll('[data-technique]').forEach(pill => {
        pill.addEventListener('click', () => {
          pill.classList.toggle('active');
          const isActive = pill.classList.contains('active');
          pill.setAttribute('aria-pressed', isActive.toString());

          const state = getCurrentState();
          applyFilters(state);
          updateURL(state);
          updateFilterCount(state);
        });
      });

      // Color pills
      document.querySelectorAll('[data-color]').forEach(pill => {
        pill.addEventListener('click', () => {
          pill.classList.toggle('active');
          const isActive = pill.classList.contains('active');
          pill.setAttribute('aria-pressed', isActive.toString());

          const state = getCurrentState();
          applyFilters(state);
          updateURL(state);
          updateFilterCount(state);
        });
      });

      // Featured checkbox
      const featuredCheckbox = document.querySelector('#featured-only');
      if (featuredCheckbox) {
        featuredCheckbox.addEventListener('change', () => {
          const state = getCurrentState();
          applyFilters(state);
          updateURL(state);
          updateFilterCount(state);
        });
      }

      // Sort dropdown
      const sortSelect = document.querySelector('#sort-select');
      if (sortSelect) {
        sortSelect.addEventListener('change', () => {
          const state = getCurrentState();
          applyFilters(state);
          updateURL(state);
          updateFilterCount(state);
        });
      }

      // Clear filters button
      const clearButton = document.querySelector('.clear-filters');
      if (clearButton) {
        clearButton.addEventListener('click', clearFilters);
      }
    }
  });
}
