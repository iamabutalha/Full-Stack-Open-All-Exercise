import { test, expect } from "@playwright/test";

test.describe("Blog App", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Abutalha",
        username: "talha",
        password: "talha",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
  });

  test.describe("login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("talha");
      await page.getByTestId("password").fill("talha");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("AbuTalha logged")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("hello wrong");
      await page.getByTestId("password").fill("hello worng");
      await page.getByRole("button", { name: "login" }).click();

      const errorDiv = page.locator(".error");
      await expect(
        page.getByText("Username or password invalid")
      ).toBeVisible();
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(165, 0, 0)");
    });
  });

  test.describe("When Login", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("talha");
      await page.getByTestId("password").fill("talha");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "create blog" }).click();
      await page.getByTestId("title").fill("This is a test blog");
      await page.getByTestId("author").fill("Ada loveLace");
      await page.getByTestId("url").fill("https://google.com");
      await page.getByRole("button", { name: "create" }).click();

      const addedDiv = page.locator(".added");

      await expect(
        addedDiv.getByText(
          "a new blog This is a test blog was added by Ada loveLace"
        )
      ).toBeVisible();
    });
  });

  test.describe("a blog can be liked", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("talha");
      await page.getByTestId("password").fill("talha");
      await page.getByRole("button", { name: "login" }).click();

      await page.getByRole("button", { name: "create blog" }).click();
      await page.getByTestId("title").fill("This is a test blog");
      await page.getByTestId("author").fill("Ada loveLace");
      await page.getByTestId("url").fill("https://google.com");
      await page.getByRole("button", { name: "create" }).click();
    });

    test("likes increase when likes button is clicked", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("Likes 1")).toBeVisible();
    });
  });

  test.describe("a blog can be deleted", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("talha");
      await page.getByTestId("password").fill("talha");
      await page.getByRole("button", { name: "login" }).click();

      await page.getByRole("button", { name: "create blog" }).click();
      await page.getByTestId("title").fill("This is a test blog");
      await page.getByTestId("author").fill("Ada loveLace");
      await page.getByTestId("url").fill("https://google.com");
      await page.getByRole("button", { name: "create" }).click();

      await page.getByRole("button", { name: "view" }).click();
    });

    test("a blog can be removed", async ({ page }) => {
      let blogContainer = page.locator(".container");

      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toBe(
          "Do you want to delete blog This is a test blog by Ada loveLace"
        );
        await dialog.accept();
      });

      await page.getByRole("button", { name: "remove" }).click();

      await expect(
        blogContainer.getByText("This is a test blog")
      ).not.toBeVisible();
    });
  });

  test.describe("Most likes blog will be at the top", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("talha");
      await page.getByTestId("password").fill("talha");
      await page.getByRole("button", { name: "login" }).click();

      await page.getByRole("button", { name: "create blog" }).click();
      await page.getByTestId("title").fill("This is a test blog");
      await page.getByTestId("author").fill("Ada loveLace");
      await page.getByTestId("url").fill("https://google.com");
      await page.getByRole("button", { name: "create" }).click();

      await page.getByRole("button", { name: "create blog" }).click();
      await page.getByTestId("title").fill("Playwright tests");
      await page.getByTestId("author").fill("playwright");
      await page.getByTestId("url").fill("https://google.com");
      await page.getByRole("button", { name: "create" }).click();
    });
    test("blog with most likes will be at the top", async ({ page }) => {
      const parentDiv = page
        .locator("div.container", { hasText: "Playwright tests" })
        .first();
      await parentDiv.getByRole("button", { name: "view" }).click();
      await parentDiv.getByRole("button", { name: "like" }).click();

      await page.waitForTimeout(500);
      const blogs = await page.locator(".container").allTextContents();
      expect(blogs[0]).toContain("Playwright tests");
    });
  });
});
