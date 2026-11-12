import { defineConfig } from '@playwright/test'
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:5173'
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL,
    launchOptions: {
      executablePath:
        process.env.CHROMIUM_PATH ||
        (process.platform === 'win32' ? undefined : '/usr/bin/chromium'),
      args: ['--no-sandbox'],
    },
  },
  webServer: {
    command: 'npm run dev -- --port 5173',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  reporter: 'list',
})
