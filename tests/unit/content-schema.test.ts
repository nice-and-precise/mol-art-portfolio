import { describe, it, expect } from 'vitest';
import { z } from 'zod';

/**
 * Content Schema Validation Tests
 *
 * These tests verify that the Zod schema for pottery pieces correctly validates
 * frontmatter according to the specification in data-model.md.
 *
 * Requirements tested:
 * - Article II (Content as Data): Markdown content with validated schema
 * - All required fields must be present
 * - Date coercion from string to Date object
 * - Array fields must have at least 1 item
 * - Optional fields have correct defaults
 */

describe('Pottery Content Schema', () => {
  // This will be the actual schema from src/content/config.ts
  // For now, we define the expected schema structure
  const potterySchema = z.object({
    title: z.string(),
    date: z.coerce.date(),
    techniques: z.array(z.string()).min(1),
    colors: z.array(z.string()).min(1),
    textures: z.array(z.string()).optional(),
    description: z.string(),
    aiDescription: z.string().optional().default(''),
    featured: z.boolean().default(false),
    mainImage: z.string(),
    detailImages: z.array(z.string()).optional().default([]),
  });

  describe('Valid Frontmatter', () => {
    it('should validate complete frontmatter with all fields', () => {
      const validData = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: ['hand-building', 'slip decoration'],
        colors: ['terracotta', 'cream'],
        textures: ['rough', 'organic'],
        description: 'A hand-built vessel inspired by ancient forms.',
        aiDescription: 'This earthen vessel speaks to...',
        featured: true,
        mainImage: './images/piece-01/main.jpg',
        detailImages: ['./images/piece-01/detail-01.jpg'],
      };

      const result = potterySchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Earth Vessel');
        expect(result.data.date).toBeInstanceOf(Date);
        expect(result.data.techniques).toHaveLength(2);
      }
    });

    it('should validate minimal frontmatter with only required fields', () => {
      const minimalData = {
        title: 'Simple Bowl',
        date: '2025-03-15',
        techniques: ['wheel-throwing'],
        colors: ['white'],
        description: 'A simple white bowl.',
        mainImage: './images/piece-02/main.jpg',
      };

      const result = potterySchema.safeParse(minimalData);
      expect(result.success).toBe(true);
      if (result.success) {
        // Verify default values applied
        expect(result.data.aiDescription).toBe('');
        expect(result.data.featured).toBe(false);
        expect(result.data.detailImages).toEqual([]);
        expect(result.data.textures).toBeUndefined();
      }
    });

    it('should coerce date string to Date object', () => {
      const data = {
        title: 'Test Piece',
        date: '2025-10-04',
        techniques: ['hand-building'],
        colors: ['blue'],
        description: 'Test description',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.date).toBeInstanceOf(Date);
        expect(result.data.date.getFullYear()).toBe(2025);
        expect(result.data.date.getMonth()).toBe(9); // October (0-indexed)
        expect(result.data.date.getDate()).toBe(4);
      }
    });

    it('should accept ISO 8601 date with time', () => {
      const data = {
        title: 'Test Piece',
        date: '2025-10-04T14:30:00Z',
        techniques: ['hand-building'],
        colors: ['blue'],
        description: 'Test description',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.date).toBeInstanceOf(Date);
      }
    });
  });

  describe('Missing Required Fields', () => {
    it('should reject frontmatter missing title', () => {
      const invalidData = {
        // title missing
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('title');
      }
    });

    it('should reject frontmatter missing date', () => {
      const invalidData = {
        title: 'Earth Vessel',
        // date missing
        techniques: ['hand-building'],
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('date');
      }
    });

    it('should reject frontmatter missing techniques', () => {
      const invalidData = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        // techniques missing
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('techniques');
      }
    });

    it('should reject frontmatter missing colors', () => {
      const invalidData = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: ['hand-building'],
        // colors missing
        description: 'A vessel',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('colors');
      }
    });

    it('should reject frontmatter missing description', () => {
      const invalidData = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: ['terracotta'],
        // description missing
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('description');
      }
    });

    it('should reject frontmatter missing mainImage', () => {
      const invalidData = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: ['terracotta'],
        description: 'A vessel',
        // mainImage missing
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('mainImage');
      }
    });
  });

  describe('Array Field Validation', () => {
    it('should reject empty techniques array', () => {
      const invalidData = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: [], // Empty array
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        const techniqueError = result.error.issues.find(
          issue => issue.path.includes('techniques')
        );
        expect(techniqueError).toBeDefined();
        expect(techniqueError?.message).toContain('at least 1');
      }
    });

    it('should reject empty colors array', () => {
      const invalidData = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: [], // Empty array
        description: 'A vessel',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        const colorError = result.error.issues.find(
          issue => issue.path.includes('colors')
        );
        expect(colorError).toBeDefined();
        expect(colorError?.message).toContain('at least 1');
      }
    });

    it('should accept multiple techniques', () => {
      const data = {
        title: 'Complex Piece',
        date: '2025-03-15',
        techniques: [
          'hand-building',
          'slip decoration',
          'sgraffito',
          'reduction firing'
        ],
        colors: ['terracotta'],
        description: 'A complex piece',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.techniques).toHaveLength(4);
      }
    });

    it('should accept empty detailImages array as optional', () => {
      const data = {
        title: 'Simple Piece',
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: ['white'],
        description: 'A simple piece',
        mainImage: './test.jpg',
        detailImages: [],
      };

      const result = potterySchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.detailImages).toEqual([]);
      }
    });
  });

  describe('Invalid Data Types', () => {
    it('should reject invalid date format', () => {
      const invalidData = {
        title: 'Earth Vessel',
        date: 'not-a-date',
        techniques: ['hand-building'],
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject non-boolean featured field', () => {
      const invalidData = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
        featured: 'yes', // Should be boolean
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        const featuredError = result.error.issues.find(
          issue => issue.path.includes('featured')
        );
        expect(featuredError).toBeDefined();
      }
    });

    it('should reject non-array techniques field', () => {
      const invalidData = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: 'hand-building', // Should be array
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject non-string title field', () => {
      const invalidData = {
        title: 123, // Should be string
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
      };

      const result = potterySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Default Values', () => {
    it('should apply default empty string to aiDescription', () => {
      const data = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
        // aiDescription omitted
      };

      const result = potterySchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.aiDescription).toBe('');
      }
    });

    it('should apply default false to featured', () => {
      const data = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
        // featured omitted
      };

      const result = potterySchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.featured).toBe(false);
      }
    });

    it('should apply default empty array to detailImages', () => {
      const data = {
        title: 'Earth Vessel',
        date: '2025-03-15',
        techniques: ['hand-building'],
        colors: ['terracotta'],
        description: 'A vessel',
        mainImage: './test.jpg',
        // detailImages omitted
      };

      const result = potterySchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.detailImages).toEqual([]);
      }
    });
  });
});
