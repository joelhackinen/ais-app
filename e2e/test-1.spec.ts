import { test, expect } from '@playwright/test';

test('test landing page render', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await expect(page.getByRole('main')).toContainText('No results found');
});

