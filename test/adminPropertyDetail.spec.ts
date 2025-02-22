import { expect, test } from "@playwright/test";

test.describe('Property Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/api/property/properties', async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify([
                    {
                        _id: "67b0b88273499119c7ba6ecd",
                        title: "Test property",
                        description: "Nice and beautiful place",
                        location: "City",
                        image: "images.jpg",
                        pricePerNight: 200,
                        available: true,
                        bedCount: 1,
                        bedroomCount: 1,
                        guestCount: 1,
                        bathroomCount: 1,
                        amenities: [],
                        createdAt: "2025-02-15T15:53:38.543Z",
                        updatedAt: "2025-02-15T15:53:38.543Z",
                        __v: 0
                    }
                ]),
            });
        });

        await page.goto('http://localhost:5173/AdminManagePropertyDetails/67b0b88273499119c7ba6ecd');
        await page.waitForLoadState('networkidle'); 
    });

    test('should fetch and display properties', async ({ page }) => {
        console.log(await page.content()); 
    });

    test('should navigate to edit property page', async ({ page }) => {
        await expect(page).toHaveURL(/AdminManageProperty/);
    });

    test('should delete a property', async ({ page }) => {
        await expect(page).toHaveURL(/AdminManageProperty/id);
    });
});
