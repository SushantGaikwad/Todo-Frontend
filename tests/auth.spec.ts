import { test, expect } from "@playwright/test";
import { login, signup, cleanupTestData } from "./helpers";

const TEST_EMAIL = `test-${Date.now()}@example.com`;
const TEST_PASSWORD = "password123";
const API_URL = process.env.VITE_API_URL || "http://localhost:3001/api";

test.describe("Authentication", () => {
  test.afterEach(async () => {
    await cleanupTestData(TEST_EMAIL, API_URL);
  });

  test("should sign up successfully with matching passwords", async ({
    page,
  }) => {
    await signup(page, TEST_EMAIL, TEST_PASSWORD, TEST_PASSWORD);
    await expect(page).toHaveURL("/dashboard");
    await expect(page.locator("h1")).toHaveText("Todo Dashboard");
  });

  test("should fail signup with mismatched passwords", async ({ page }) => {
    await signup(page, TEST_EMAIL, TEST_PASSWORD, "wrongpassword");
    await expect(page.getByText("Passwords do not match")).toBeVisible();
    await expect(page).toHaveURL("/signup");
  });

  test("should fail signup with existing email", async ({ page }) => {
    await signup(page, TEST_EMAIL, TEST_PASSWORD, TEST_PASSWORD);
    await page.goto("/signup");
    await signup(page, TEST_EMAIL, TEST_PASSWORD, TEST_PASSWORD);
    await expect(page.getByText(/User already exists/)).toBeVisible();
    await expect(page).toHaveURL("/signup");
  });

  test("should log in successfully", async ({ page }) => {
    await signup(page, TEST_EMAIL, TEST_PASSWORD, TEST_PASSWORD);
    await page.goto("/");
    await login(page, TEST_EMAIL, TEST_PASSWORD);
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toHaveText("Todo Dashboard");
  });

  test("should fail login with invalid credentials", async ({ page }) => {
    await login(page, TEST_EMAIL, "wrongpassword");
    await expect(page.getByText(/Invalid credentials/)).toBeVisible();
    await expect(page).toHaveURL("/");
  });

  test("should log out successfully", async ({ page }) => {
    await signup(page, TEST_EMAIL, TEST_PASSWORD, TEST_PASSWORD);
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Logged out successfully")).toBeVisible();
  });

  test("should redirect to login when accessing protected route unauthenticated", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
  });

  test("should navigate from login to signup", async ({ page }) => {
    await page.goto("/");
    await page.click('a:has-text("Sign Up")');
    await expect(page).toHaveURL("/signup");
  });

  test("should navigate from signup to login", async ({ page }) => {
    await page.goto("/signup");
    await page.click('a:has-text("Login")');
    await expect(page).toHaveURL("/");
  });
});
