import { test, expect } from '@playwright/test';

test('test data fetching', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await page.locator('#search-button').click();
  await expect(page.getByRole('status').nth(0)).toContainText('results found');
});