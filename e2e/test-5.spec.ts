import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await page.getByLabel('To:').click();
  await page.getByText('10').click();

  await page.locator('#root').locator('#to-trash').click();
  await expect(page.getByLabel('To:').locator('span')).toContainText('Pick end time');
});