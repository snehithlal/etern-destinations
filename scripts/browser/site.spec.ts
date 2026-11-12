import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('pages load with images, no overflow and no accessibility violations', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of ['/', '/cottage/', '/gallery/', '/explore/', '/contact/', '/privacy/']) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const images = page.locator('main img:not(dialog img)');
    for (const image of await images.all()) { await image.scrollIntoViewIfNeeded(); await expect(image).toHaveJSProperty('complete', true); expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0); }
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('gallery filters and lightbox work with keyboard and restore focus', async ({ page }) => {
  await page.goto('/gallery/');
  await page.getByRole('button', { name: 'The stay' }).click();
  await expect(page.locator('.gallery-grid figure:visible')).toHaveCount(2);
  const first = page.locator('.gallery-open:visible').first();
  await first.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  const oldCaption = await page.locator('#lightbox-caption').textContent();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#lightbox-caption')).not.toHaveText(oldCaption!);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(first).toBeFocused();
  await page.getByRole('button', { name: 'All moments' }).click();
  await expect(page.locator('.gallery-grid figure:visible')).toHaveCount(6);
});

test('mobile navigation opens and closes using Escape', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'));
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).not.toBeVisible();
  await menu.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Gallery' }).click();
  await expect(page).toHaveURL(/\/gallery\//);
});

test('core property content works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/cottage/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Gallery', exact: true }).first()).toBeVisible();
  await context.close();
});
