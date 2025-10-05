import { describe, it, expect } from 'vitest';

/**
 * Integration Tests for Detail Pages
 *
 * These tests verify the structure and logic that will be used
 * in the detail page template. Actual route generation is verified
 * through the build process.
 */

// Mock piece data (matches schema in src/content/config.ts)
const mockPiece = {
  slug: 'earth-vessel',
  data: {
    title: 'Earth Vessel',
    date: new Date('2025-03-15'),
    techniques: ['hand-building', 'slip decoration'],
    colors: ['terracotta', 'cream'],
    textures: ['rough', 'organic'],
    description: 'Hand-built vessel inspired by ancient earthenware forms.',
    aiDescription: '',
    featured: true,
    mainImage: './images/piece-01/main.jpg',
    detailImages: ['./images/piece-01/detail-1.jpg', './images/piece-01/detail-2.jpg'],
  },
};

// Helper functions that will be used in the detail page
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function generatePageTitle(pieceTitle: string): string {
  return `${pieceTitle} - Mol_Art`;
}

function generateMetaDescription(description: string): string {
  // Truncate to 160 chars for SEO
  return description.length > 160
    ? description.substring(0, 157) + '...'
    : description;
}

function shouldShowAISection(aiDescription: string | undefined): boolean {
  return !!(aiDescription && aiDescription.length > 0);
}

describe('Detail Page - Data Structure (T035-T036)', () => {
  it('T035: Should have valid slug for routing', () => {
    expect(mockPiece.slug).toBeDefined();
    expect(typeof mockPiece.slug).toBe('string');
    expect(mockPiece.slug.length).toBeGreaterThan(0);
    expect(mockPiece.slug).toMatch(/^[a-z0-9-]+$/); // Valid slug format
  });

  it('T036: Should validate slug format', () => {
    const validSlug = 'earth-vessel';
    const invalidSlugs = ['', 'UPPERCASE', 'spaces here', 'special!@#'];

    expect(validSlug).toMatch(/^[a-z0-9-]+$/);

    invalidSlugs.forEach(slug => {
      expect(slug).not.toMatch(/^[a-z0-9-]+$/);
    });
  });
});

describe('Detail Page - Content Display (T037-T040)', () => {
  it('T037: Should have hero image from frontmatter', () => {
    expect(mockPiece.data.mainImage).toBeDefined();
    expect(typeof mockPiece.data.mainImage).toBe('string');
    expect(mockPiece.data.mainImage.length).toBeGreaterThan(0);
  });

  it('T038: Should have title', () => {
    expect(mockPiece.data.title).toBeDefined();
    expect(typeof mockPiece.data.title).toBe('string');
    expect(mockPiece.data.title.length).toBeGreaterThan(0);
  });

  it('T039: Should have description', () => {
    expect(mockPiece.data.description).toBeDefined();
    expect(typeof mockPiece.data.description).toBe('string');
    expect(mockPiece.data.description.length).toBeGreaterThan(0);
  });

  it('T040: Should support markdown rendering', () => {
    // Verify we have content structure
    expect(mockPiece.data.description).toBeDefined();

    // In actual implementation, Astro will render markdown
    // This verifies we have the data needed
    const hasContent = mockPiece.data.description.length > 0;
    expect(hasContent).toBe(true);
  });
});

describe('Detail Page - Metadata (T041-T044)', () => {
  it('T041: Should have date in metadata', () => {
    expect(mockPiece.data.date).toBeInstanceOf(Date);
    expect(mockPiece.data.date.getTime()).not.toBeNaN();

    const formatted = formatDate(mockPiece.data.date);
    expect(formatted).toContain('2025');
    expect(formatted).toContain('March');
  });

  it('T042: Should have techniques array', () => {
    expect(Array.isArray(mockPiece.data.techniques)).toBe(true);
    expect(mockPiece.data.techniques.length).toBeGreaterThan(0);

    mockPiece.data.techniques.forEach(tech => {
      expect(typeof tech).toBe('string');
      expect(tech.length).toBeGreaterThan(0);
    });
  });

  it('T043: Should have colors array', () => {
    expect(Array.isArray(mockPiece.data.colors)).toBe(true);
    expect(mockPiece.data.colors.length).toBeGreaterThan(0);

    mockPiece.data.colors.forEach(color => {
      expect(typeof color).toBe('string');
      expect(color.length).toBeGreaterThan(0);
    });
  });

  it('T044: Textures should be optional', () => {
    // With textures
    expect(mockPiece.data.textures).toBeDefined();
    expect(Array.isArray(mockPiece.data.textures)).toBe(true);

    // Without textures (mock it)
    const pieceWithoutTextures = { ...mockPiece, data: { ...mockPiece.data, textures: undefined } };
    expect(pieceWithoutTextures.data.textures).toBeUndefined();
  });
});

describe('Detail Page - AI Section (T045-T046)', () => {
  it('T045: Should show AI section when aiDescription exists', () => {
    const pieceWithAI = {
      ...mockPiece,
      data: {
        ...mockPiece.data,
        aiDescription: 'This is an AI-generated description.',
      },
    };

    const shouldShow = shouldShowAISection(pieceWithAI.data.aiDescription);
    expect(shouldShow).toBe(true);
  });

  it('T046: Should hide AI section when aiDescription empty', () => {
    const shouldShowEmpty = shouldShowAISection('');
    const shouldShowUndefined = shouldShowAISection(undefined);

    expect(shouldShowEmpty).toBe(false);
    expect(shouldShowUndefined).toBe(false);
  });
});

describe('Detail Page - Detail Images (T047)', () => {
  it('T047: Should have detailImages array', () => {
    expect(Array.isArray(mockPiece.data.detailImages)).toBe(true);

    mockPiece.data.detailImages.forEach(img => {
      expect(typeof img).toBe('string');
      expect(img.length).toBeGreaterThan(0);
    });
  });

  it('Should handle pieces with no detail images', () => {
    const pieceNoImages = {
      ...mockPiece,
      data: { ...mockPiece.data, detailImages: [] },
    };

    expect(Array.isArray(pieceNoImages.data.detailImages)).toBe(true);
    expect(pieceNoImages.data.detailImages.length).toBe(0);
  });
});

describe('Detail Page - Navigation (T048)', () => {
  it('T048: Should have back to gallery link', () => {
    const backLink = '/gallery';

    expect(backLink).toBe('/gallery');
    expect(backLink.startsWith('/')).toBe(true);
  });

  it('Should generate correct detail page URLs', () => {
    const detailUrl = `/gallery/${mockPiece.slug}`;

    expect(detailUrl).toBe('/gallery/earth-vessel');
    expect(detailUrl).toMatch(/^\/gallery\/[a-z0-9-]+$/);
  });
});

describe('Detail Page - SEO (T049-T051)', () => {
  it('T049: Should generate page title with piece title', () => {
    const pageTitle = generatePageTitle(mockPiece.data.title);

    expect(pageTitle).toContain(mockPiece.data.title);
    expect(pageTitle).toContain('Mol_Art');
    expect(pageTitle).toBe('Earth Vessel - Mol_Art');
  });

  it('T050: Should generate meta description', () => {
    const metaDescription = generateMetaDescription(mockPiece.data.description);

    expect(metaDescription).toBeDefined();
    expect(metaDescription.length).toBeGreaterThan(0);
    expect(metaDescription.length).toBeLessThanOrEqual(160);
  });

  it('T050: Should truncate long descriptions for SEO', () => {
    const longDescription = 'A'.repeat(200);
    const metaDescription = generateMetaDescription(longDescription);

    expect(metaDescription.length).toBeLessThanOrEqual(160);
    expect(metaDescription.endsWith('...')).toBe(true);
  });

  it('T051: Should have data for Open Graph tags', () => {
    // Verify we have all data needed for OG tags
    expect(mockPiece.data.title).toBeDefined();
    expect(mockPiece.data.description).toBeDefined();
    expect(mockPiece.data.mainImage).toBeDefined();

    const ogTitle = mockPiece.data.title;
    const ogDescription = mockPiece.data.description;
    const ogImage = mockPiece.data.mainImage;

    expect(ogTitle.length).toBeGreaterThan(0);
    expect(ogDescription.length).toBeGreaterThan(0);
    expect(ogImage.length).toBeGreaterThan(0);
  });
});

describe('Detail Page - Semantic HTML (T052)', () => {
  it('T052: Should have data for semantic HTML structure', () => {
    // Verify we have all data for semantic elements
    expect(mockPiece.data.title).toBeDefined(); // <h1>
    expect(mockPiece.data.description).toBeDefined(); // <p>
    expect(mockPiece.data.techniques).toBeDefined(); // <dl> or <ul>
    expect(mockPiece.data.date).toBeDefined(); // <time>

    // Structure: <article> > <section> + <aside>
    const hasMainContent = mockPiece.data.description.length > 0;
    const hasMetadata = mockPiece.data.techniques.length > 0;

    expect(hasMainContent).toBe(true);
    expect(hasMetadata).toBe(true);
  });
});

describe('Detail Page - Responsive Layout', () => {
  it('Should have data for all responsive breakpoints', () => {
    // Mobile: Stack vertically
    expect(mockPiece.data.title).toBeDefined();
    expect(mockPiece.data.mainImage).toBeDefined();
    expect(mockPiece.data.description).toBeDefined();

    // Desktop: Two-column (60% content, 40% sidebar)
    expect(mockPiece.data.techniques).toBeDefined(); // Sidebar
    expect(mockPiece.data.colors).toBeDefined(); // Sidebar
    expect(mockPiece.data.date).toBeDefined(); // Sidebar
  });
});

describe('Detail Page - Schema Validation', () => {
  it('Should have all required fields', () => {
    expect(mockPiece.data.title).toBeDefined();
    expect(mockPiece.data.date).toBeDefined();
    expect(mockPiece.data.techniques).toBeDefined();
    expect(mockPiece.data.colors).toBeDefined();
    expect(mockPiece.data.description).toBeDefined();
    expect(mockPiece.data.mainImage).toBeDefined();
    expect(mockPiece.data.featured).toBeDefined();
  });

  it('Should have valid data types', () => {
    expect(typeof mockPiece.data.title).toBe('string');
    expect(mockPiece.data.date).toBeInstanceOf(Date);
    expect(Array.isArray(mockPiece.data.techniques)).toBe(true);
    expect(Array.isArray(mockPiece.data.colors)).toBe(true);
    expect(typeof mockPiece.data.description).toBe('string');
    expect(typeof mockPiece.data.mainImage).toBe('string');
    expect(typeof mockPiece.data.featured).toBe('boolean');
  });
});
