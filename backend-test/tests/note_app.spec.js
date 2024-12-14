import { test, expect } from "@playwright/test";
import { loginWith, createNote } from "./helper.js";

test.describe("Note app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Superuser",
        username: "root1",
        password: "root1",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locater = await page.getByText("Notes");
    await expect(locater).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science University of Helsinki 2024"
      )
    ).toBeVisible();
  });

  test("user can login", async ({ page }) => {
    await loginWith(page, "root1", "root1");
    await expect(page.getByText("Superuser logged-in")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();
    await page.getByTestId("username").fill("wrong");
    await page.getByTestId("password").fill("wrong");
    await page.getByRole("button", { name: "login" }).click();

    const errorDiv = page.locator(".error");
    await expect(errorDiv).toContainText("wrong credientials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(page.getByText("SuperUser loggedIn")).not.toBeVisible();
  });

  test.describe("when logged In", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "root1", "root1");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright");
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    test.describe("and serval notes exists", () => {
      test.beforeEach(async ({ page }) => {
        await createNote(page, "first note", true);
        await createNote(page, "second note", true);
        await createNote(page, "third note", true);

        await page.getByRole("button", { name: "show all" }).click();
      });

      test("importance can be changed", async ({ page }) => {
        await page.pause();
        const otherNoteText = await page.getByText("second note");
        const otherNoteElement = await otherNoteText.locator("..");

        await otherNoteElement
          .getByRole("button", { name: "make not important" })
          .click();
        await expect(
          otherNoteElement.getByText("make important")
        ).toBeVisible();
      });
    });
  });
});
