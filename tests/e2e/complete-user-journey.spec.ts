/**
 * E2E Test: Complete User Journey (Happy Path)
 *
 * Tests the full user experience from homepage → gallery → filters
 * → detail page → lightbox → back navigation
 *
 * Following SDD Phase 2: Test Creation
 * Based on spec.md Scenario 1
 */

import { test, expect } from '@playwright/test';

test.describe('Complete User Journey', () => {
  test('should allow user to browse, filter, view details, and use lightbox', async ({ page }) => {
    // Step 1: Navigate to gallery page
    await test.step('Load gallery page', async () => {
      await page.goto('gallery');
      await expect(page).toHaveTitle(/Gallery.*Mol_Art/);
      await page.waitForURL('**/gallery', { timeout: 10000 });

      // Verify pottery cards displayed
      const cards = page.locator('.pottery-card');
      await expect(cards.first()).toBeVisible();

      // Verify filter controls
      const filterSection = page.locator('.gallery-filters, [data-filter]');
      await expect(filterSection).toBeVisible();
    });

    // Step 2: Apply filter - Technique
    await test.step('Filter by technique: hand-building', async () => {
      const handBuildingPill = page.locator('[data-technique="hand-building"]');
      await handBuildingPill.click();

      // Verify pill is active
      await expect(handBuildingPill).toHaveAttribute('aria-pressed', 'true');

      // Verify URL contains filter
      await expect(page).toHaveURL(/technique=hand-building/);

      // Verify filter count
      const filterCount = page.locator('.filter-count');
      await expect(filterCount).toContainText('1');
    });

    // Step 4: Add second filter - Color
    await test.step('Filter by color: terracotta', async () => {
      const terracottaPill = page.locator('[data-color="terracotta"]');
      await terracottaPill.click();

      // Verify URL has both filters
      await expect(page).toHaveURL(/technique=hand-building/);
      await expect(page).toHaveURL(/color=terracotta/);

      // Verify filter count updated
      const filterCount = page.locator('.filter-count');
      await expect(filterCount).toContainText('2');
    });

    // Step 5: Sort results
    await test.step('Sort by Title A-Z', async () => {
      const sortSelect = page.locator('#sort-select, select[name="sort"]');
      await sortSelect.selectOption('title-asc');

      // Verify URL includes sort
      await expect(page).toHaveURL(/sort=title-asc/);
    });

    // Step 6: Click pottery piece to view details
    await test.step('Navigate to detail page', async () => {
      const firstCard = page.locator('.pottery-card').first();
      await firstCard.click();

      // Wait for navigation
      await page.waitForURL('**/gallery/*');

      // Verify detail page loaded
      const pageTitle = await page.title();
      expect(pageTitle).toContain('Mol_Art');

      // Verify hero image
      const heroImage = page.locator('.hero-image, .hero-section img');
      await expect(heroImage).toBeVisible();

      // Verify title
      const title = page.locator('h1');
      await expect(title).toBeVisible();

      // Verify metadata sidebar
      const metadata = page.locator('.metadata-card, .piece-metadata');
      await expect(metadata).toBeVisible();
    });

    // Step 7: Scroll to image gallery
    await test.step('Find image gallery section', async () => {
      const galleryHeading = page.locator('text=/Image Gallery|Detail Shots/i');
      await galleryHeading.scrollIntoViewIfNeeded();
      await expect(galleryHeading).toBeVisible();

      // Verify thumbnails
      const thumbnails = page.locator('.thumbnail-button, .thumbnail');
      const count = await thumbnails.count();
      expect(count).toBeGreaterThan(0);
    });

    // Step 8: Open lightbox
    await test.step('Click thumbnail to open lightbox', async () => {
      const secondThumbnail = page.locator('.thumbnail-button, .thumbnail').nth(1);
      await secondThumbnail.click();

      // Verify lightbox opened
      const lightbox = page.locator('.lightbox');
      await expect(lightbox).toHaveClass(/active/);

      // Verify lightbox elements
      await expect(page.locator('.lightbox-image')).toBeVisible();
      await expect(page.locator('.lightbox-close')).toBeVisible();
      await expect(page.locator('.lightbox-counter')).toBeVisible();
    });

    // Step 9: Navigate in lightbox - Next
    await test.step('Navigate to next image in lightbox', async () => {
      const counterBefore = await page.locator('.lightbox-counter').textContent();

      // Click next button (or use arrow key)
      const nextButton = page.locator('.lightbox-next, button:has-text("Next")');
      if (await nextButton.count() > 0) {
        await nextButton.click();
      } else {
        // Fallback to arrow key
        await page.keyboard.press('ArrowRight');
      }

      // Wait for counter to change
      await page.waitForFunction(
        (before) => {
          const counter = document.querySelector('.lightbox-counter');
          return counter && counter.textContent !== before;
        },
        counterBefore,
        { timeout: 2000 }
      );

      const counterAfter = await page.locator('.lightbox-counter').textContent();
      expect(counterAfter).not.toBe(counterBefore);
    });

    // Step 10: Navigate in lightbox - Previous
    await test.step('Navigate to previous image in lightbox', async () => {
      const counterBefore = await page.locator('.lightbox-counter').textContent();

      // Click previous button (or use arrow key)
      const prevButton = page.locator('.lightbox-prev, button:has-text("Prev")');
      if (await prevButton.count() > 0) {
        await prevButton.click();
      } else {
        // Fallback to arrow key
        await page.keyboard.press('ArrowLeft');
      }

      // Wait for counter to change
      await page.waitForFunction(
        (before) => {
          const counter = document.querySelector('.lightbox-counter');
          return counter && counter.textContent !== before;
        },
        counterBefore,
        { timeout: 2000 }
      );

      const counterAfter = await page.locator('.lightbox-counter').textContent();
      expect(counterAfter).not.toBe(counterBefore);
    });

    // Step 11: Close lightbox
    await test.step('Close lightbox with ESC key', async () => {
      await page.keyboard.press('Escape');

      // Verify lightbox closed
      const lightbox = page.locator('.lightbox');
      await expect(lightbox).not.toHaveClass(/active/);
    });

    // Step 12: Navigate back to gallery
    await test.step('Click Back to Gallery link', async () => {
      const backLink = page.locator('text=/Back to Gallery/i');
      await backLink.click();

      // Verify back on gallery page
      await page.waitForURL('**/gallery*');

      // Verify filters still applied
      await expect(page).toHaveURL(/technique=hand-building/);
      await expect(page).toHaveURL(/color=terracotta/);
    });

    // Step 13: Clear filters
    await test.step('Clear all filters', async () => {
      const clearButton = page.locator('.clear-filters, button:has-text("Clear")');
      await clearButton.click();

      // Verify URL has no filter params
      const url = page.url();
      expect(url).not.toContain('technique=');
      expect(url).not.toContain('color=');

      // Verify no active pills
      const activePills = page.locator('[aria-pressed="true"]');
      const count = await activePills.count();
      expect(count).toBe(0);
    });
  });

  test('should maintain filters after browser back button', async ({ page }) => {
    await test.step('Apply filters and navigate', async () => {
      await page.goto('gallery');

      // Apply filter
      const techniquePill = page.locator('[data-technique]').first();
      await techniquePill.click();

      // Navigate to detail
      const card = page.locator('.pottery-card').first();
      await card.click();
      await page.waitForURL('**/gallery/*');
    });

    await test.step('Use browser back button', async () => {
      await page.goBack();

      // Verify filter preserved
      await page.waitForURL('**/gallery*');
      const activePill = page.locator('[aria-pressed="true"]');
      await expect(activePill).toBeVisible();
    });
  });

  test('should support direct URL access to detail page', async ({ page }) => {
    await test.step('Navigate directly to detail page', async () => {
      await page.goto('gallery/piece-01-earth-vessel');

      // Verify page loads
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('.hero-image, .hero-section img')).toBeVisible();
    });
  });
});
