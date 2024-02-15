import { test, expect } from '@playwright/test';

test('test invalid dates to have borders colored red', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await page.getByLabel('From:').click();
  await page.locator('#from-date').click();
  await page.locator('#from-date').fill('29-02-2023');
  await expect(page.locator('#from-date')).toHaveCSS('border-color', 'rgb(239, 68, 68)');
});