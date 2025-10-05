import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Unit Tests for Gallery Filtering & Sorting Logic
 *
 * Testing the core logic for:
 * - Parsing URL parameters to FilterState
 * - Filtering pieces by technique, color, featured status
 * - Sorting pieces by various criteria
 * - Updating URLs with filter state
 *
 * These tests verify the filtering/sorting logic independent of DOM manipulation.
 */

// Types that will be implemented in src/scripts/gallery-filters.ts
interface FilterState {
  techniques: string[];
  colors: string[];
  featured: boolean | null;
  sort: SortOption;
}

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'featured';

interface PieceData {
  slug: string;
  title: string;
  date: Date;
  techniques: string[];
  colors: string[];
  featured: boolean;
}

// Mock implementations - these will be replaced with actual imports
const parseURLParams = (url: string): FilterState => {
  throw new Error('Not implemented');
};

const filterPieces = (pieces: PieceData[], state: FilterState): PieceData[] => {
  throw new Error('Not implemented');
};

const sortPieces = (pieces: PieceData[], sort: SortOption): PieceData[] => {
  throw new Error('Not implemented');
};

const buildURLString = (state: FilterState): string => {
  throw new Error('Not implemented');
};

const getUniqueValues = (pieces: PieceData[], field: 'techniques' | 'colors'): string[] => {
  throw new Error('Not implemented');
};

// Mock data for testing
const mockPieces: PieceData[] = [
  {
    slug: 'earth-vessel',
    title: 'Earth Vessel',
    date: new Date('2025-03-15'),
    techniques: ['hand-building', 'slip decoration', 'reduction firing'],
    colors: ['terracotta', 'cream', 'rust'],
    featured: true,
  },
  {
    slug: 'spiral-bowl',
    title: 'Spiral Bowl',
    date: new Date('2025-02-10'),
    techniques: ['wheel-throwing', 'carving'],
    colors: ['celadon', 'cream'],
    featured: false,
  },
  {
    slug: 'textured-vase',
    title: 'Textured Vase',
    date: new Date('2025-04-01'),
    techniques: ['hand-building', 'texture stamping'],
    colors: ['terracotta', 'black'],
    featured: true,
  },
  {
    slug: 'azure-plate',
    title: 'Azure Plate',
    date: new Date('2025-01-20'),
    techniques: ['wheel-throwing', 'glazing'],
    colors: ['blue', 'white'],
    featured: false,
  },
];

describe('Gallery Filters - URL Parsing', () => {
  it('T002: should parse URL params to FilterState', () => {
    const url = '?technique=hand-building&color=terracotta&featured=true&sort=date-desc';
    const state = parseURLParams(url);

    expect(state.techniques).toEqual(['hand-building']);
    expect(state.colors).toEqual(['terracotta']);
    expect(state.featured).toBe(true);
    expect(state.sort).toBe('date-desc');
  });

  it('should parse multiple techniques from URL', () => {
    const url = '?technique=hand-building&technique=wheel-throwing';
    const state = parseURLParams(url);

    expect(state.techniques).toEqual(['hand-building', 'wheel-throwing']);
  });

  it('should parse multiple colors from URL', () => {
    const url = '?color=terracotta&color=celadon';
    const state = parseURLParams(url);

    expect(state.colors).toEqual(['terracotta', 'celadon']);
  });

  it('should default to empty filters when no params', () => {
    const url = '';
    const state = parseURLParams(url);

    expect(state.techniques).toEqual([]);
    expect(state.colors).toEqual([]);
    expect(state.featured).toBeNull();
    expect(state.sort).toBe('date-desc'); // Default sort
  });

  it('should handle featured=false correctly', () => {
    const url = '?featured=false';
    const state = parseURLParams(url);

    expect(state.featured).toBeNull(); // False means show all (not filtering by featured)
  });
});

describe('Gallery Filters - Filtering Logic', () => {
  it('T003: should filter by single technique', () => {
    const state: FilterState = {
      techniques: ['hand-building'],
      colors: [],
      featured: null,
      sort: 'date-desc',
    };

    const filtered = filterPieces(mockPieces, state);

    expect(filtered).toHaveLength(2); // earth-vessel, textured-vase
    expect(filtered.map(p => p.slug)).toContain('earth-vessel');
    expect(filtered.map(p => p.slug)).toContain('textured-vase');
  });

  it('T004: should filter by multiple techniques (AND logic)', () => {
    const state: FilterState = {
      techniques: ['hand-building', 'slip decoration'],
      colors: [],
      featured: null,
      sort: 'date-desc',
    };

    const filtered = filterPieces(mockPieces, state);

    // Only earth-vessel has BOTH hand-building AND slip decoration
    expect(filtered).toHaveLength(1);
    expect(filtered[0].slug).toBe('earth-vessel');
  });

  it('T005: should filter by single color', () => {
    const state: FilterState = {
      techniques: [],
      colors: ['terracotta'],
      featured: null,
      sort: 'date-desc',
    };

    const filtered = filterPieces(mockPieces, state);

    expect(filtered).toHaveLength(2); // earth-vessel, textured-vase
    expect(filtered.map(p => p.slug)).toContain('earth-vessel');
    expect(filtered.map(p => p.slug)).toContain('textured-vase');
  });

  it('T006: should filter by multiple colors (AND logic)', () => {
    const state: FilterState = {
      techniques: [],
      colors: ['terracotta', 'cream'],
      featured: null,
      sort: 'date-desc',
    };

    const filtered = filterPieces(mockPieces, state);

    // Only earth-vessel has BOTH terracotta AND cream
    expect(filtered).toHaveLength(1);
    expect(filtered[0].slug).toBe('earth-vessel');
  });

  it('T007: should filter by technique AND color combined', () => {
    const state: FilterState = {
      techniques: ['hand-building'],
      colors: ['terracotta'],
      featured: null,
      sort: 'date-desc',
    };

    const filtered = filterPieces(mockPieces, state);

    // Both earth-vessel and textured-vase have hand-building + terracotta
    expect(filtered).toHaveLength(2);
    expect(filtered.map(p => p.slug)).toContain('earth-vessel');
    expect(filtered.map(p => p.slug)).toContain('textured-vase');
  });

  it('T008: should filter by featured status', () => {
    const state: FilterState = {
      techniques: [],
      colors: [],
      featured: true,
      sort: 'date-desc',
    };

    const filtered = filterPieces(mockPieces, state);

    expect(filtered).toHaveLength(2); // earth-vessel, textured-vase
    expect(filtered.every(p => p.featured)).toBe(true);
  });

  it('T009: should clear all filters and return all pieces', () => {
    const state: FilterState = {
      techniques: [],
      colors: [],
      featured: null,
      sort: 'date-desc',
    };

    const filtered = filterPieces(mockPieces, state);

    expect(filtered).toHaveLength(4); // All pieces
  });

  it('T017: should return all pieces when filters are empty', () => {
    const state: FilterState = {
      techniques: [],
      colors: [],
      featured: null,
      sort: 'date-desc',
    };

    const filtered = filterPieces(mockPieces, state);

    expect(filtered).toEqual(mockPieces);
  });

  it('T018: should return empty array when no matches', () => {
    const state: FilterState = {
      techniques: ['nonexistent-technique'],
      colors: [],
      featured: null,
      sort: 'date-desc',
    };

    const filtered = filterPieces(mockPieces, state);

    expect(filtered).toHaveLength(0);
  });
});

describe('Gallery Filters - Sorting Logic', () => {
  it('T010: should sort by date descending (newest first)', () => {
    const sorted = sortPieces([...mockPieces], 'date-desc');

    expect(sorted[0].slug).toBe('textured-vase'); // 2025-04-01
    expect(sorted[1].slug).toBe('earth-vessel');  // 2025-03-15
    expect(sorted[2].slug).toBe('spiral-bowl');   // 2025-02-10
    expect(sorted[3].slug).toBe('azure-plate');   // 2025-01-20
  });

  it('T011: should sort by date ascending (oldest first)', () => {
    const sorted = sortPieces([...mockPieces], 'date-asc');

    expect(sorted[0].slug).toBe('azure-plate');   // 2025-01-20
    expect(sorted[1].slug).toBe('spiral-bowl');   // 2025-02-10
    expect(sorted[2].slug).toBe('earth-vessel');  // 2025-03-15
    expect(sorted[3].slug).toBe('textured-vase'); // 2025-04-01
  });

  it('T012: should sort by title A-Z', () => {
    const sorted = sortPieces([...mockPieces], 'title-asc');

    expect(sorted[0].title).toBe('Azure Plate');
    expect(sorted[1].title).toBe('Earth Vessel');
    expect(sorted[2].title).toBe('Spiral Bowl');
    expect(sorted[3].title).toBe('Textured Vase');
  });

  it('T013: should sort by title Z-A', () => {
    const sorted = sortPieces([...mockPieces], 'title-desc');

    expect(sorted[0].title).toBe('Textured Vase');
    expect(sorted[1].title).toBe('Spiral Bowl');
    expect(sorted[2].title).toBe('Earth Vessel');
    expect(sorted[3].title).toBe('Azure Plate');
  });

  it('T014: should sort by featured first, then by date desc', () => {
    const sorted = sortPieces([...mockPieces], 'featured');

    // Featured pieces first
    expect(sorted[0].featured).toBe(true);
    expect(sorted[1].featured).toBe(true);
    // Then non-featured
    expect(sorted[2].featured).toBe(false);
    expect(sorted[3].featured).toBe(false);

    // Within featured, newest first (textured-vase before earth-vessel)
    expect(sorted[0].slug).toBe('textured-vase'); // Featured + newest
    expect(sorted[1].slug).toBe('earth-vessel');  // Featured + older
  });
});

describe('Gallery Filters - URL Building', () => {
  it('T015: should generate correct query string from FilterState', () => {
    const state: FilterState = {
      techniques: ['hand-building'],
      colors: ['terracotta'],
      featured: true,
      sort: 'date-desc',
    };

    const url = buildURLString(state);

    expect(url).toContain('technique=hand-building');
    expect(url).toContain('color=terracotta');
    expect(url).toContain('featured=true');
    expect(url).toContain('sort=date-desc');
  });

  it('should generate URL with multiple techniques', () => {
    const state: FilterState = {
      techniques: ['hand-building', 'wheel-throwing'],
      colors: [],
      featured: null,
      sort: 'date-desc',
    };

    const url = buildURLString(state);

    expect(url).toContain('technique=hand-building');
    expect(url).toContain('technique=wheel-throwing');
  });

  it('should generate URL with multiple colors', () => {
    const state: FilterState = {
      techniques: [],
      colors: ['terracotta', 'celadon'],
      featured: null,
      sort: 'date-desc',
    };

    const url = buildURLString(state);

    expect(url).toContain('color=terracotta');
    expect(url).toContain('color=celadon');
  });

  it('should omit featured param when null', () => {
    const state: FilterState = {
      techniques: [],
      colors: [],
      featured: null,
      sort: 'date-desc',
    };

    const url = buildURLString(state);

    expect(url).not.toContain('featured');
  });

  it('should omit default sort from URL', () => {
    const state: FilterState = {
      techniques: [],
      colors: [],
      featured: null,
      sort: 'date-desc', // Default
    };

    const url = buildURLString(state);

    // Default sort should not be in URL (keep URLs clean)
    expect(url).not.toContain('sort') || expect(url).toBe('');
  });

  it('should return empty string when no filters active', () => {
    const state: FilterState = {
      techniques: [],
      colors: [],
      featured: null,
      sort: 'date-desc',
    };

    const url = buildURLString(state);

    expect(url).toBe('');
  });
});

describe('Gallery Filters - Helper Functions', () => {
  it('T016: should extract unique techniques from pieces', () => {
    const techniques = getUniqueValues(mockPieces, 'techniques');

    expect(techniques).toContain('hand-building');
    expect(techniques).toContain('wheel-throwing');
    expect(techniques).toContain('slip decoration');
    expect(techniques).toContain('carving');
    expect(techniques).toContain('texture stamping');
    expect(techniques).toContain('glazing');
    expect(techniques).toContain('reduction firing');

    // Should be unique (no duplicates)
    expect(new Set(techniques).size).toBe(techniques.length);
  });

  it('T016: should extract unique colors from pieces', () => {
    const colors = getUniqueValues(mockPieces, 'colors');

    expect(colors).toContain('terracotta');
    expect(colors).toContain('cream');
    expect(colors).toContain('celadon');
    expect(colors).toContain('rust');
    expect(colors).toContain('black');
    expect(colors).toContain('blue');
    expect(colors).toContain('white');

    // Should be unique (no duplicates)
    expect(new Set(colors).size).toBe(colors.length);
  });

  it('should return empty array when no pieces', () => {
    const techniques = getUniqueValues([], 'techniques');
    const colors = getUniqueValues([], 'colors');

    expect(techniques).toEqual([]);
    expect(colors).toEqual([]);
  });
});
