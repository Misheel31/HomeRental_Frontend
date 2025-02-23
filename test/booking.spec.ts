import { expect, test } from "@playwright/test";

test.describe("Booking Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("username", "testUser");
    });

    await page.route("**/api/property/properties/123", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          _id: "123",
          title: "Luxury Villa",
          pricePerNight: 200,
        }),
      });
    });

    await page.goto("http://localhost:5173/booking/123");
    await page.waitForLoadState("networkidle");
  });

  test("should display price details correctly", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Complete your booking");
    await expect(page.locator("text=Price per night: $200")).toBeVisible();
  });

  test("should calculate total price correctly", async ({ page }) => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split("T")[0];

    const checkInInput = page.locator('input[type="date"]').first();
    const checkOutInput = page.locator('input[type="date"]').nth(1);

    console.log("Waiting for check-in input...");
    await checkInInput.waitFor({ state: "visible", timeout: 10000 }); 

    console.log("Filling check-in date...");
    await checkInInput.fill(today);

    console.log("Waiting for check-out input...");
    await checkOutInput.waitFor({ state: "visible", timeout: 10000 });

    console.log("Filling check-out date...");
    await checkOutInput.fill(tomorrowString);

    await expect(page.locator("text=Total Price: $200")).toBeVisible();
  });

  test('should submit the booking form successfully', async ({ page }) => {
    test.setTimeout(60000);
  
    const propertyId = '12345'; 
    const propertyData = {
      pricePerNight: '100',
    };
  
    await page.route('**/api/property/properties/12345', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(propertyData),
      });
    });
  
    await page.route('**/api/booking/create', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    });
  
    await page.goto(`http://localhost:5173/booking/${propertyId}`);
  
    await page.waitForLoadState('networkidle', { timeout: 60000 });
  
    await page.waitForSelector('input[type="date"]#startDate', { timeout: 60000 });
  
    await page.fill('input[type="date"]#startDate', '2025-03-01');
    await page.fill('input[type="date"]#endDate', '2025-03-05');
    await page.fill('input[type="number"]#guests', '2');
  
    await page.click('button[type="submit"]');
  
    await expect(page.locator('text=Booking confirmed!')).toBeVisible({ timeout: 60000 });
  });
});