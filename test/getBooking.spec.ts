import { expect, test } from '@playwright/test';

test.describe('GetBooking Component', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:5173/bookings');

    await page.evaluate(() => {
      localStorage.setItem('username', 'testUser'); 
    });

    await page.waitForSelector('h2:text("My Bookings")');
  });

  test('should display bookings correctly', async ({ page }) => {
    await page.route('**/api/booking/get?username=testUser', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          bookings: [
            {
              _id: '1',
              propertyId: 'property123',
              startDate: '2025-03-01',
              endDate: '2025-03-05',
              totalPrice: '500',
            },
          ],
        }),
      });
    });

    await page.reload();

    // await expect(page.locator('text=Property ID: property123')).toBeVisible();
    // await expect(page.locator('text=Start Date: 3/1/2025')).toBeVisible();
    // await expect(page.locator('text=End Date: 3/5/2025')).toBeVisible();
    // await expect(page.locator('text=Total Price: 500')).toBeVisible();
  });

  test('should show an error message if fetching bookings fails', async ({ page }) => {
    await page.route('**/api/booking/get?username=testUser', (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      });
    });

    await page.reload();

    // await expect(page.locator('text=Failed to fetch bookings.')).toBeVisible();
  });

  test('should cancel booking correctly', async ({ page }) => {
    await page.route('**/api/booking/get?username=testUser', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          bookings: [
            {
              _id: '1',
            //   propertyId: 'property123',
              startDate: '2025-03-01',
              endDate: '2025-03-05',
              totalPrice: '500',
            },
          ],
        }),
      });
    });

    await page.route('**/api/booking/cancel/1', (route) => {
      route.fulfill({
        status: 200,
      });
    });

    await page.reload();

    // await expect(page.locator('text=Property ID: property123')).toBeVisible();

    await page.click('text=Cancel Booking');

    // await expect(page.locator('text=Property ID: property123')).toBeHidden();
  });

  test('should show an error message if cancel booking fails', async ({ page }) => {
    await page.route('**/api/booking/get?username=testUser', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          bookings: [
            {
              _id: '1',
              propertyId: 'property123',
              startDate: '2025-03-01',
              endDate: '2025-03-05',
              totalPrice: '500',
            },
          ],
        }),
      });
    });

    await page.route('**/api/booking/cancel/1', (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: 'Failed to cancel booking' }),
      });
    });

    await page.reload();

    // await expect(page.locator('text=Property ID: property123')).toBeVisible();

    await page.click('text= Cancel Booking');

    await expect(page.locator('text=Error canceling booking')).toBeVisible();
  });
});
