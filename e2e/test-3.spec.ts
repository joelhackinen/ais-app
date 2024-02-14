import { test, expect } from '@playwright/test';

test('test invalid dates to have borders colored red', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await page.getByLabel('From:').click();
  await page.getByPlaceholder('18-09-1998').click();
  await page.getByPlaceholder('18-09-1998').fill('29-02-2023');
  await expect(page.getByPlaceholder('18-09-1998')).toHaveCSS('border-color', 'rgb(239, 68, 68)');
});