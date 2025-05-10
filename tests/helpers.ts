import { Page } from "@playwright/test";
import axios from "axios";

export async function login(page: Page, email: string, password: string) {
  await page.goto("/");
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
}

export async function signup(
  page: Page,
  email: string,
  password: string,
  confirmPassword: string
) {
  await page.goto("/signup");
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"] >> nth=0', password);
  await page.fill('input[type="password"] >> nth=1', confirmPassword);
  await page.click('button[type="submit"]');
}

export async function cleanupTestData(email: string, apiUrl: string) {
  try {
    await axios.delete(`${apiUrl}/api/test/cleanup`, {
      data: { email },
      withCredentials: true,
    });
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
}

export async function createTestTodo(
  page: Page,
  title: string,
  description: string,
  dueDate: string
) {
  await page.fill('input[placeholder="Title"]', title);
  await page.fill('textarea[placeholder="Description"]', description);
  await page.fill('input[type="date"]', dueDate);
  await page.click('button:has-text("Add Todo")');
}
