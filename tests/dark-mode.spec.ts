import { test, expect } from "@playwright/test";
import { cleanupTestData, login, signup } from "./helpers";

const TEST_EMAIL = `test-${Date.now()}@example.com`;
const TEST_PASSWORD = "password123";
const API_URL = process.env.VITE_API_URL || "http://localhost:3001/api";

test.describe("Dark Mode", () => {
  test.beforeEach(async ({ page }) => {
    await signup(page, TEST_EMAIL, TEST_PASSWORD, TEST_PASSWORD);
  });
  test.afterEach(async () => {
    await cleanupTestData(TEST_EMAIL, API_URL);
  });

  test("should toggle dark mode on dashboard", async ({ page }) => {
    // Verify light mode by default
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    // Toggle to dark mode
    await page.click('button:has-text("Switch to Dark Mode")');
    await expect(page.locator("html")).toHaveClass(/dark/);

    await expect(
      page.locator('button:has-text("Switch to Light Mode")')
    ).toBeVisible();

    // Toggle back to light mode
    await page.click('button:has-text("Switch to Light Mode")');
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("should persist dark mode across reloads", async ({ page }) => {
    await page.click('button:has-text("Switch to Dark Mode")');
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.click('button:has-text("Switch to Light Mode")');
    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("should apply dark mode on login page", async ({ page }) => {
    await page.click('button:has-text("Switch to Dark Mode")');
    await page.click('button:has-text("Logout")');
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(
      page.locator("div").filter({ hasText: "Sign Up" }).nth(1)
    ).toHaveClass(/dark:bg-gray-900/);
  });

  test("should apply dark mode on signup page", async ({ page }) => {
    await page.click('button:has-text("Switch to Dark Mode")');
    await page.click('button:has-text("Logout")');
    await page.goto("/signup");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(
      page.locator("div").filter({ hasText: "Sign Up" }).nth(1)
    ).toHaveClass(/dark:bg-gray-900/);
  });
});
