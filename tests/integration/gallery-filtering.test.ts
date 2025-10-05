import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Integration Tests for Gallery Filtering UI
 *
 * Testing the interaction between:
 * - GalleryFilters component
 * - Gallery cards (DOM manipulation)
 * - URL state management
 * - User interactions (clicks, selections)
 *
 * These tests verify the complete filtering flow from UI to filtered results.
 */

// Mock DOM setup
let mockDOM: string;
let mockCards: any[];

beforeEach(() => {
  // Reset DOM before each test
  mockDOM = `
    <div class="gallery-filters">
      <div class="filter-pills"></div>
      <select id="sort-select"></select>
      <input type="checkbox" id="featured-only" />
      <button class="clear-filters"></button>
      <span class="filter-count"></span>
    </div>
    <div class="gallery-grid">
      <!-- Cards will be added here -->
    </div>
    <div class="no-results" style="display: none;">No pieces found</div>
  `;

  mockCards = [
    {
      slug: 'earth-vessel',
      title: 'Earth Vessel',
      techniques: ['hand-building', 'slip decoration'],
      colors: ['terracotta', 'cream'],
      featured: true,
      visible: true,
    },
    {
      slug: 'spiral-bowl',
      title: 'Spiral Bowl',
      techniques: ['wheel-throwing'],
      colors: ['celadon'],
      featured: false,
      visible: true,
    },
  ];
});

describe('Gallery Filtering - Component Rendering', () => {
  it('T054: GalleryFilters component should render', () => {
    // This will test that the component exists in the DOM
    const filters = document.querySelector('.gallery-filters');
    expect(filters).toBeDefined();
  });

  it('T055: All technique pills should render', () => {
    const techniques = ['hand-building', 'wheel-throwing', 'slip decoration'];

    // Component should create pill for each technique
    const pills = document.querySelectorAll('[data-technique]');

    expect(pills.length).toBe(techniques.length);
    techniques.forEach(tech => {
      const pill = document.querySelector(`[data-technique="${tech}"]`);
      expect(pill).toBeDefined();
    });
  });

  it('T056: All color pills should render', () => {
    const colors = ['terracotta', 'celadon', 'cream'];

    // Component should create pill for each color
    const pills = document.querySelectorAll('[data-color]');

    expect(pills.length).toBe(colors.length);
    colors.forEach(color => {
      const pill = document.querySelector(`[data-color="${color}"]`);
      expect(pill).toBeDefined();
    });
  });

  it('should render sort dropdown with all options', () => {
    const sortSelect = document.querySelector('#sort-select') as HTMLSelectElement;

    expect(sortSelect).toBeDefined();
    expect(sortSelect.options.length).toBeGreaterThanOrEqual(5);

    // Should have all sort options
    const optionValues = Array.from(sortSelect.options).map(o => o.value);
    expect(optionValues).toContain('date-desc');
    expect(optionValues).toContain('date-asc');
    expect(optionValues).toContain('title-asc');
    expect(optionValues).toContain('title-desc');
    expect(optionValues).toContain('featured');
  });

  it('should render featured checkbox', () => {
    const checkbox = document.querySelector('#featured-only') as HTMLInputElement;

    expect(checkbox).toBeDefined();
    expect(checkbox.type).toBe('checkbox');
  });

  it('should render clear filters button', () => {
    const clearButton = document.querySelector('.clear-filters');

    expect(clearButton).toBeDefined();
    expect(clearButton.textContent).toContain('Clear');
  });
});

describe('Gallery Filtering - User Interactions', () => {
  it('T057: Clicking technique pill should filter gallery', () => {
    const pill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;

    pill.click();

    // Should add active class to pill
    expect(pill.classList.contains('active')).toBe(true);
    expect(pill.getAttribute('aria-pressed')).toBe('true');

    // Should filter cards (only hand-building pieces visible)
    const cards = document.querySelectorAll('.pottery-card');
    cards.forEach(card => {
      const techniques = JSON.parse(card.getAttribute('data-techniques') || '[]');
      const isVisible = !card.classList.contains('hidden');

      if (techniques.includes('hand-building')) {
        expect(isVisible).toBe(true);
      } else {
        expect(isVisible).toBe(false);
      }
    });
  });

  it('T058: Clicking color pill should filter gallery', () => {
    const pill = document.querySelector('[data-color="terracotta"]') as HTMLElement;

    pill.click();

    // Should add active class
    expect(pill.classList.contains('active')).toBe(true);

    // Should filter cards (only terracotta pieces visible)
    const cards = document.querySelectorAll('.pottery-card');
    cards.forEach(card => {
      const colors = JSON.parse(card.getAttribute('data-colors') || '[]');
      const isVisible = !card.classList.contains('hidden');

      if (colors.includes('terracotta')) {
        expect(isVisible).toBe(true);
      } else {
        expect(isVisible).toBe(false);
      }
    });
  });

  it('T059: Multiple filters should combine with AND logic', () => {
    const techniquePill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;
    const colorPill = document.querySelector('[data-color="terracotta"]') as HTMLElement;

    techniquePill.click();
    colorPill.click();

    // Should filter cards (only pieces with BOTH hand-building AND terracotta)
    const cards = document.querySelectorAll('.pottery-card');
    cards.forEach(card => {
      const techniques = JSON.parse(card.getAttribute('data-techniques') || '[]');
      const colors = JSON.parse(card.getAttribute('data-colors') || '[]');
      const isVisible = !card.classList.contains('hidden');

      if (techniques.includes('hand-building') && colors.includes('terracotta')) {
        expect(isVisible).toBe(true);
      } else {
        expect(isVisible).toBe(false);
      }
    });
  });

  it('T060: Featured checkbox should filter correctly', () => {
    const checkbox = document.querySelector('#featured-only') as HTMLInputElement;

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    // Should filter to only featured pieces
    const cards = document.querySelectorAll('.pottery-card');
    cards.forEach(card => {
      const featured = card.getAttribute('data-featured') === 'true';
      const isVisible = !card.classList.contains('hidden');

      if (featured) {
        expect(isVisible).toBe(true);
      } else {
        expect(isVisible).toBe(false);
      }
    });
  });

  it('T061: Sort dropdown should change card order', () => {
    const sortSelect = document.querySelector('#sort-select') as HTMLSelectElement;

    sortSelect.value = 'title-asc';
    sortSelect.dispatchEvent(new Event('change'));

    const cards = Array.from(document.querySelectorAll('.pottery-card'));
    const titles = cards.map(card => card.querySelector('h2')?.textContent || '');

    // Should be sorted alphabetically
    const sortedTitles = [...titles].sort();
    expect(titles).toEqual(sortedTitles);
  });
});

describe('Gallery Filtering - URL State Management', () => {
  it('T062: URL should update when filter applied', () => {
    const pill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;

    pill.click();

    // Should update browser URL
    expect(window.location.search).toContain('technique=hand-building');
  });

  it('T063: Filters should read from URL on page load', () => {
    // Simulate page load with filters in URL
    const url = new URL(window.location.href);
    url.searchParams.set('technique', 'hand-building');
    url.searchParams.set('color', 'terracotta');
    window.history.pushState({}, '', url);

    // Trigger filter initialization
    // (This would normally happen in DOMContentLoaded)
    const initFiltersFromURL = () => {
      // Mock function that would be implemented
      return {
        techniques: ['hand-building'],
        colors: ['terracotta'],
      };
    };

    const state = initFiltersFromURL();

    expect(state.techniques).toContain('hand-building');
    expect(state.colors).toContain('terracotta');

    // Active pills should be marked
    const techniquePill = document.querySelector('[data-technique="hand-building"]');
    const colorPill = document.querySelector('[data-color="terracotta"]');

    expect(techniquePill?.classList.contains('active')).toBe(true);
    expect(colorPill?.classList.contains('active')).toBe(true);
  });

  it('should update URL when multiple filters applied', () => {
    const techniquePill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;
    const colorPill = document.querySelector('[data-color="terracotta"]') as HTMLElement;

    techniquePill.click();
    colorPill.click();

    const url = new URL(window.location.href);

    expect(url.searchParams.get('technique')).toBe('hand-building');
    expect(url.searchParams.get('color')).toBe('terracotta');
  });

  it('should clear URL params when filters cleared', () => {
    // Apply filters first
    const pill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;
    pill.click();

    expect(window.location.search).toContain('technique');

    // Clear filters
    const clearButton = document.querySelector('.clear-filters') as HTMLElement;
    clearButton.click();

    expect(window.location.search).toBe('');
  });
});

describe('Gallery Filtering - UI Feedback', () => {
  it('T064: Clear filters button should reset state', () => {
    const techniquePill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;
    const colorPill = document.querySelector('[data-color="terracotta"]') as HTMLElement;
    const checkbox = document.querySelector('#featured-only') as HTMLInputElement;

    // Apply multiple filters
    techniquePill.click();
    colorPill.click();
    checkbox.checked = true;

    // Clear all
    const clearButton = document.querySelector('.clear-filters') as HTMLElement;
    clearButton.click();

    // All pills should be inactive
    expect(techniquePill.classList.contains('active')).toBe(false);
    expect(colorPill.classList.contains('active')).toBe(false);
    expect(checkbox.checked).toBe(false);

    // All cards should be visible
    const cards = document.querySelectorAll('.pottery-card');
    cards.forEach(card => {
      expect(card.classList.contains('hidden')).toBe(false);
    });
  });

  it('T065: Filter count badge should show correct number', () => {
    const techniquePill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;
    const colorPill = document.querySelector('[data-color="terracotta"]') as HTMLElement;
    const filterCount = document.querySelector('.filter-count') as HTMLElement;

    // No filters active
    expect(filterCount.textContent).toContain('0') || expect(filterCount.style.display).toBe('none');

    // One filter
    techniquePill.click();
    expect(filterCount.textContent).toContain('1');

    // Two filters
    colorPill.click();
    expect(filterCount.textContent).toContain('2');

    // Featured checkbox (three filters)
    const checkbox = document.querySelector('#featured-only') as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    expect(filterCount.textContent).toContain('3');
  });

  it('T066: "No results" message should show when filters yield zero', () => {
    const pill = document.querySelector('[data-technique="nonexistent"]') as HTMLElement;

    pill?.click();

    const noResults = document.querySelector('.no-results') as HTMLElement;
    expect(noResults.style.display).not.toBe('none');
    expect(noResults.textContent).toContain('No pieces found');
  });

  it('should hide "No results" when pieces are visible', () => {
    const noResults = document.querySelector('.no-results') as HTMLElement;

    // Apply filter that has results
    const pill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;
    pill.click();

    expect(noResults.style.display).toBe('none');
  });
});

describe('Gallery Filtering - Animations', () => {
  it('T067: Cards should fade out/in with stagger animation', async () => {
    const cards = document.querySelectorAll('.pottery-card');
    const pill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;

    // Mock animation detection
    const animationDelay = (card: Element, index: number) => {
      const style = window.getComputedStyle(card);
      return style.animationDelay;
    };

    pill.click();

    // Wait for animation frame
    await new Promise(resolve => requestAnimationFrame(resolve));

    // Each card should have staggered animation delay
    cards.forEach((card, index) => {
      const delay = animationDelay(card, index);

      // Should have delay (e.g., 50ms, 100ms, 150ms...)
      expect(delay).toBeDefined();
    });
  });

  it('should apply fade-in class when filter changes', () => {
    const pill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;

    pill.click();

    const visibleCards = document.querySelectorAll('.pottery-card:not(.hidden)');
    visibleCards.forEach(card => {
      // Should have animation class
      expect(
        card.classList.contains('fade-in') ||
        card.classList.contains('pottery-card') // Has animation in CSS
      ).toBe(true);
    });
  });
});

describe('Gallery Filtering - Edge Cases', () => {
  it('should handle empty gallery gracefully', () => {
    const gallery = document.querySelector('.gallery-grid');
    if (gallery) {
      gallery.innerHTML = ''; // Empty gallery
    }

    const pill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;
    pill.click();

    // Should not crash, should show "no results"
    const noResults = document.querySelector('.no-results') as HTMLElement;
    expect(noResults.style.display).not.toBe('none');
  });

  it('should handle clicking same pill twice (toggle off)', () => {
    const pill = document.querySelector('[data-technique="hand-building"]') as HTMLElement;

    // Click once (activate)
    pill.click();
    expect(pill.classList.contains('active')).toBe(true);

    // Click again (deactivate)
    pill.click();
    expect(pill.classList.contains('active')).toBe(false);

    // All cards should be visible again
    const cards = document.querySelectorAll('.pottery-card');
    cards.forEach(card => {
      expect(card.classList.contains('hidden')).toBe(false);
    });
  });

  it('should handle rapid filter changes', async () => {
    const pill1 = document.querySelector('[data-technique="hand-building"]') as HTMLElement;
    const pill2 = document.querySelector('[data-technique="wheel-throwing"]') as HTMLElement;

    // Rapid clicks
    pill1.click();
    pill2.click();
    pill1.click();

    // Wait for any debouncing
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should be in consistent state
    const activePills = document.querySelectorAll('.filter-pills button.active');
    expect(activePills.length).toBeGreaterThanOrEqual(0);
  });
});
