import { expect, test } from '@playwright/test';

test.describe('Update Property Form', () => {
  test('should update property successfully', async ({ page }) => {
    await page.route('**/api/property/properties/*', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          title: 'Test Property',
          description: 'A beautiful property',
          location: 'Test Location',
          image: 'image.jpg',
          pricePerNight: 100,
          available: true,
          bedCount: 2,
          bedroomCount: 1,
          city: 'Test City',
          state: 'Test State',
          country: 'Test Country',
          guestCount: 4,
        }),
      });
    });

    await page.goto('http://localhost:5173/AdminManageProperty/67b0b88273499119c7ba6ecd');

    await expect(page.locator('form')).toBeVisible();

    await page.fill('input[name="title"]', 'Updated Property Title');
    await page.fill('textarea[name="description"]', 'Updated Property Description');
    await page.fill('input[name="location"]', 'Updated Location');
    await page.fill('input[name="pricePerNight"]', '150');
    await page.fill('input[name="bedCount"]', '3');
    await page.fill('input[name="bedroomCount"]', '2');
    await page.fill('input[name="guestCount"]', '5');
    await page.fill('input[name="category"]', 'Updated Category');

    const inputFile = await page.locator('input[type="file"]');
    await inputFile.setInputFiles('C:/Users/Asus/Documents/web-rentify/backend/property_images/image1.avif');

    await page.selectOption('select[name="available"]', 'true');

    await page.click('button[type="submit"]');

    });

  test('should show error on failed update', async ({ page }) => {
    await page.route('**/api/property/properties/*', (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    await page.goto('http://localhost:5173/AdminManageProperty/67b0b88273499119c7ba6ecd');

    await expect(page.locator('form')).toBeVisible();

    await page.fill('input[name="title"]', 'Updated Property Title');
    await page.fill('textarea[name="description"]', 'Updated Property Description');
    await page.fill('input[name="location"]', 'Updated Location');
    await page.fill('input[name="pricePerNight"]', '150');
    await page.fill('input[name="bedCount"]', '3');
    await page.fill('input[name="bedroomCount"]', '2');
    await page.fill('input[name="guestCount"]', '5');
    
    const inputFile = await page.locator('input[type="file"]');
    await inputFile.setInputFiles('C:/Users/Asus/Documents/web-rentify/backend/property_images/image1.avif');

    await page.selectOption('select[name="available"]', 'true');

    await page.click('button[type="submit"]');

  });
});
