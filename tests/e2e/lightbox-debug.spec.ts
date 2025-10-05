/**
 * Debug test for lightbox navigation
 */

import { test, expect } from '@playwright/test';

test('lightbox navigation debug', async ({ page }) => {
  // Listen to console logs
  page.on('console', msg => {
    console.log(`BROWSER: ${msg.text()}`);
  });

  // Listen to page errors
  page.on('pageerror', error => {
    console.log(`PAGE ERROR: ${error.message}`);
  });

  // Navigate to detail page
  await page.goto('gallery/piece-01-earth-vessel');

  // Wait for gallery
  await page.waitForSelector('#image-gallery', { timeout: 10000 });

  // Click first thumbnail to open lightbox
  const firstThumb = page.locator('.thumbnail-button').first();
  await firstThumb.click();

  // Wait for lightbox
  await page.waitForSelector('.lightbox.active', { timeout: 5000 });

  // Get counter before
  const counterBefore = await page.locator('.lightbox-counter').textContent();
  console.log('Counter before:', counterBefore);

  // Try clicking next button
  const nextBtn = page.locator('.lightbox-next');
  console.log('Next button count:', await nextBtn.count());
  console.log('Next button visible:', await nextBtn.isVisible());

  await nextBtn.click();

  // Wait a bit
  await page.waitForTimeout(1000);

  // Get counter after
  const counterAfter = await page.locator('.lightbox-counter').textContent();
  console.log('Counter after:', counterAfter);

  console.log('Did counter change?', counterBefore !== counterAfter);
});
