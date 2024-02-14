import { test, expect } from '@playwright/test';

test('test data fetching', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await expect(page.getByRole('main')).toContainText('No results found');
  await page.locator('#searchButton').click();
  await expect(page.getByRole('status').nth(0)).toContainText('216 results found');
});