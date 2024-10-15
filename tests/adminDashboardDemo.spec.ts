import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://admin-dashboard-demo-umber.vercel.app");
});

test.describe("Admin Dashboard Demo", () => {
  test("should display the admin dashboard", async ({ page }) => {
    // Logo
    await expect(
      page.getByRole("link", { name: "Lorem Picsum Corp" })
    ).toBeVisible();

    // Users Header
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

    // Search
    await expect(
      page.getByRole("textbox", { name: "Search users..." })
    ).toBeVisible();

    // Users Table
    await expect(
      page.getByRole("cell", { name: "Name", exact: true })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Email" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Username" })).toBeVisible();
  });

  test("should filter users by search", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search users..." }).fill("Luigi");
    await page.getByRole("textbox", { name: "Search users..." }).press("Enter");

    const filteredRows = page.locator("table > tbody > tr");
    await expect(filteredRows).toHaveCount(1);
    await expect(filteredRows.filter({ hasText: "Luigi" })).toBeVisible();
  });

  test("should edit the username of a user when the edit button is clicked and the form is filled out", async ({
    page,
  }) => {
    const luigiRow = page.locator("table > tbody > tr").filter({
      hasText: "Luigi",
    });

    await luigiRow.getByRole("button", { name: "Edit" }).click();

    await page.getByRole("textbox", { name: "Username" }).fill("Luigi456");

    await page.getByRole("button", { name: "Save Changes" }).click();

    await page.getByRole("button", { name: "Close" }).click();

    await expect(
      luigiRow.getByRole("cell", { name: "Luigi456" })
    ).toBeVisible();
  });
});
