import { expect, test } from '@playwright/test';

test.describe('Profile Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("authToken", "test-token");
    });

    await page.goto('http://localhost:5173/profile'); 
  });

  test('should display the profile form with existing username', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Edit Profile');

    const usernameInput = page.locator('input[type="text"]');
    await expect(usernameInput).toBeVisible();
  });

  test('should allow updating the username', async ({ page }) => {
    const usernameInput = page.locator('input[type="text"]');
    
    await usernameInput.fill('');
    await usernameInput.fill('NewUsername123');

    await expect(usernameInput).toHaveValue('NewUsername123');
  });

  test('should submit the profile update form and show success message', async ({ page }) => {
    await page.route('**/api/user/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: "Profile updated successfully!" }),
      });
    });

    await page.fill('input[type="text"]', 'UpdatedUsername');
    await page.fill('input[type="email"]', 'newemail@example.com');
    await page.fill('input[type="password"]', 'newpassword');

    await page.click('button:has-text("Update Profile")');

    await expect(page.locator('text=Profile updated successfully!')).toBeVisible();
  });

  test('should show error message when API fails', async ({ page }) => {
    await page.route('**/api/user/**', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ message: "Failed to update profile." }),
      });
    });

    await page.fill('input[type="text"]', 'InvalidUsername');

    await page.click('button:has-text("Update Profile")');

    await expect(page.locator('text=Failed to update profile.')).toBeVisible();
  });

  test('should disable button and show loading state while submitting', async ({ page }) => {
    await page.route('**/api/user/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: "Profile updated successfully!" }),
      });
    });

    await page.click('button:has-text("Update Profile")');

      });

});
