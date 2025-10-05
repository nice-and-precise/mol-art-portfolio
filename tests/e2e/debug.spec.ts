/**
 * Debug test to verify baseURL configuration
 */

import { test, expect } from '@playwright/test';

test('debug baseURL', async ({ page }) => {
  console.log('Test 1: Navigating to empty string (should use baseURL)');
  await page.goto('');

  const url = page.url();
  console.log('Current URL:', url);

  const title = await page.title();
  console.log('Page title:', title);

  console.log('\nTest 2: Navigating to relative path "gallery"');
  await page.goto('gallery');
  const url2 = page.url();
  console.log('Current URL:', url2);

  const title2 = await page.title();
  console.log('Page title 2:', title2);

  expect(title).toContain('Mol_Art');
  expect(title2).toContain('Mol_Art');
});
