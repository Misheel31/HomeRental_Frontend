import { expect, test } from '@playwright/test';

test.describe('Create Property Form',()=>{
    test.beforeEach(async({page})=>{
        await page.goto('http://localhost:5173/createProperty');
    });

    test('should fill and submit the property form', async({page})=>{
        await page.fill('#title', 'Test Property');
        await page.fill('#description', 'A beautiful property for rent');
        await page.fill('#location', 'Downtown');
        await page.fill('#pricePerNight', '150');
        await page.fill('#bedCount', '4');
        await page.fill('#bedroomCount', '4');
        await page.check('#available');
        const fileChooser = await page.waitForSelector('input[type=file]');
        await fileChooser.setInputFiles('C:/Users/Asus/Documents/web-rentify/backend/property_images/image1.avif');
        await page.fill('#amenities', 'WiFi, Pool, parking');
        await page.fill('#type', 'Test Property');
        await page.fill('#bathroomCount', '3');
        await page.fill('#guestCount', '6');
        await page.fill('#city', 'New York');
        await page.fill('#state', 'NY');
        await page.fill('#country', 'USA');

        await page.click('button[type= submit]');

        await page.waitForTimeout(3000);
        await expect(page.locator('text= Create Property')).toBeVisible();
    })
})