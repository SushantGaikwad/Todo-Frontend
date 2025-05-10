import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });

// Validate TEST_BASE_URL
const baseURL = process.env.TEST_BASE_URL || "http://localhost:5173";

if (!baseURL.startsWith("http://") && !baseURL.startsWith("https://")) {
  throw new Error(
    `Invalid TEST_BASE_URL: ${baseURL}. Must start with http:// or https://`
  );
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 2,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // webServer: process.env.CI
  //   ? undefined
  //   : [
  //       {
  //         command: "npm run dev",
  //         url: "http://localhost:5173",
  //         reuseExistingServer: !process.env.CI,
  //         timeout: 60_000, // Increase timeout to 60s
  //         stdout: "pipe", // Log server output for debugging
  //         stderr: "pipe",
  //       },
  //       {
  //         command: "npm run dev",
  //         url: "http://localhost:3001",
  //         reuseExistingServer: !process.env.CI,
  //         timeout: 60_000,
  //         stdout: "pipe",
  //         stderr: "pipe",
  //       },
  //     ],
});
