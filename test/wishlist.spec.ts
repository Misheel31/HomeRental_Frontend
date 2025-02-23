import { expect, test } from "@playwright/test";

test.describe("Wishlist Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("username", "testUser");
    });

    await page.route("**/api/wishlist/testUser", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            _id: "123",
            title: "Luxury Apartment",
            location: "New York, USA",
            pricePerNight: 150,
            image: "luxury-apartment.jpg",
          },
        ]),
      });
    });

    await page.goto("http://localhost:5173/wishlist");
  });

  test("should display wishlist items", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Your Wishlist");

    await expect(page.locator("text=Luxury Apartment")).toBeVisible();
    await expect(page.locator("text=New York, USA")).toBeVisible();
    await expect(page.locator("text=Price per Night: $150")).toBeVisible();

    await expect(page.locator("img")).toHaveAttribute(
      "src",
      "http://localhost:3000/property_images/luxury-apartment.jpg"
    );
  });

  test("should handle empty wishlist", async ({ page }) => {
    await page.route("**/api/wishlist/testUser", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    await page.reload();
    await expect(page.locator("text=Your wishlist is empty.")).toBeVisible();
  });

  test("should remove an item from the wishlist", async ({ page }) => {
    await page.route("**/api/wishlist/123", async (route) => {
      await route.fulfill({ status: 200 });
    });

    await page.click("button:has-text('Remove')");

    await expect(page.locator("text=Luxury Apartment")).not.toBeVisible();
  });
});
