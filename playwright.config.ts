import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './scripts/browser',
  fullyParallel: true,
  workers: 2,
  timeout: 60000,
  use: { baseURL: 'http://127.0.0.1:4321' },
  webServer: { command: 'npm run preview -- --port 4321', port: 4321, reuseExistingServer: !process.env.CI },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
    { name: 'mobile-webkit', use: { ...devices['iPhone 13'] } },
  ],
});
