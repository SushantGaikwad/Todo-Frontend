import { test, expect } from "@playwright/test";
import { login, signup, cleanupTestData, createTestTodo } from "./helpers";

const TEST_EMAIL = `test-${Date.now()}@example.com`;
const TEST_PASSWORD = "password123";
const API_URL = process.env.VITE_API_URL || "http://localhost:5000/api";

test.describe("Todo Management", () => {
  test.beforeEach(async ({ page }) => {
    await signup(page, TEST_EMAIL, TEST_PASSWORD, TEST_PASSWORD);
  });

  test.afterEach(async () => {
    await cleanupTestData(TEST_EMAIL, API_URL);
  });

  test("should create a todo", async ({ page }) => {
    await createTestTodo(page, "Test Todo", "Test Description", "2025-12-31");
    await expect(page.getByText("Todo created successfully")).toBeVisible();
    await expect(page.locator('h3:has-text("Test Todo")')).toBeVisible();
  });

  test("should update a todo", async ({ page }) => {
    await createTestTodo(page, "Test Todo", "Test Description", "2025-12-31");
    await page.click('button:has-text("Edit")');
    await page.fill('input[value="Test Todo"]', "Updated Todo");
    const descLocator = `//textarea[normalize-space()='Test Description']`;
    await page.fill(descLocator, "Updated Description");
    const dateLocator = `//input[@value='2025-12-31']`;
    await page.fill(dateLocator, "2026-01-01");
    const dropOption = `//select[@class='w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-2']`;
    await page.selectOption(dropOption, "completed");
    await page.click('button:has-text("Save")');
    await expect(page.getByText("Todo updated successfully")).toBeVisible();
    await expect(page.locator('h3:has-text("Updated Todo")')).toBeVisible();
    await expect(page.locator("text=Updated Description")).toBeVisible();
    await expect(page.locator("text=Status: completed")).toBeVisible();
  });

  test("should delete a todo", async ({ page }) => {
    await createTestTodo(page, "Test Todo", "Test Description", "2025-12-31");
    await page.click('button:has-text("Delete")');
    await expect(page.getByText("Todo deleted successfully")).toBeVisible();
    await expect(page.locator('h3:has-text("Test Todo")')).not.toBeVisible();
  });

  test("should filter todos by status", async ({ page }) => {
    await createTestTodo(
      page,
      "Pending Todo",
      "Test Description",
      "2025-12-31"
    );
    await createTestTodo(
      page,
      "Completed Todo",
      "Test Description",
      "2025-12-31"
    );
    await page.click('button:has-text("Edit") >> nth=1');
    const dropOption = `//select[@class='w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 mb-2']`;
    await page.selectOption(dropOption, "completed");
    await page.click('button:has-text("Save")');

    const selectAll = `//select[@class='p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600']`;
    await page.selectOption(selectAll, "pending");
    await expect(
      page.locator('h3:has-text("Completed Todo")')
    ).not.toBeVisible();
    await expect(page.locator('h3:has-text("Pending Todo")')).toBeVisible();

    await page.selectOption(selectAll, "completed");
    await expect(page.locator('h3:has-text("Pending Todo")')).not.toBeVisible();
    await expect(page.locator('h3:has-text("Completed Todo")')).toBeVisible();

    await page.selectOption(selectAll, "all");
    await expect(page.locator('h3:has-text("Pending Todo")')).toBeVisible();
    await expect(page.locator('h3:has-text("Completed Todo")')).toBeVisible();
  });

  test("should display empty todo list", async ({ page }) => {
    await expect(page.locator("h3")).not.toBeVisible();
  });
});
