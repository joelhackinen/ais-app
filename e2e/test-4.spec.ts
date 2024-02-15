import { test, expect } from '@playwright/test';

test('test date reseting', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await page.getByLabel('From:').click();
  await page.getByText('8', { exact: true }).click();
  await page.locator('#from-trash').click();
  await expect(page.getByLabel('From:').locator('span')).toContainText('Pick start time');
});