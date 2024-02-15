import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:7800/');
  await page.getByLabel('From:').click();
  await page.getByText('8', { exact: true }).nth(0).click();
  await page.getByLabel('From:').click();
  await page.getByLabel('To:').click();
  await page.getByText('5', { exact: true }).nth(1).click();
  await page.getByLabel('To:').click();
  await page.locator('#search-button').click();
  await expect(page.getByRole('status').nth(0)).toContainText('Invalid date interval');
});