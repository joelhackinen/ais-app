import { test, expect } from '@playwright/test';

test('test dates from future capped to today', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await page.getByLabel('To:').click();
  await page.locator('#to-date').click();
  await page.locator('#to-date').fill('01-01-3000');
  await expect(page.locator('#to-date')).toHaveValue('15-02-2024');
});