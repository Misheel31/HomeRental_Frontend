import { expect, test } from "@playwright/test";
test.describe("Admin page test", ()=>{
    test.beforeEach(async({page})=>{
        await page.goto("http://localhost:5173/admin");
    });

    test("should display a list of properties", async({page})=>{
        await page.waitForSelector(".property-card");

        const propertyCards = await page.$$(".property-card");
        expect(propertyCards.length).toBeGreaterThan(0);
    });

    test("should display property images correctly", async({page})=>{
        await page.waitForSelector(".property-card");

        const firstImage = await page.$(".property-image img");

        const src = await firstImage?.getAttribute("src");
        expect(src).not.toBeNull();
        expect(src).toContain("http://localhost:3000/property_images/");
    });

    test("should delete a property when a delete button is clicked", async({page})=>{
        await page.waitForSelector(".property-card");

        const initialProperties = await page.$$(".property-card");
        const initialCount = initialProperties.length;
        expect(initialCount).toBeGreaterThan(0);

        await page.click(".property-card:first-child .bg-red-500");
        await page.waitForTimeout(100);

        const updateProperties = await page.$$(".property-card");
        expect(updateProperties.length).toBe(initialCount-1);
    });

    test("should navigate to edit page when edit button is clicked", async({page})=>{
        await page.waitForSelector(".property-card");
        await page.click(".property-card:first-child .bg-blue-500");

        await expect(page).toHaveURL(/\/AdminManageProperty\/\w+/);
    })
})