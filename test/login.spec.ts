import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login');

        page.on('response', response => {
            console.log(`Response: ${response.url()} - ${response.status()}`);
        });

        page.on('console', log => console.log(`Console: ${log.text()}`));

    });

    test('should login successfully with valid admin credentials', async ({ page }) => {
        await page.fill('input[type="email"]', 'admin@gmail.com');
        await page.fill('input[type="password"]', 'AdminPassword');
        await page.click('button[type="submit"]');

        await page.waitForURL('http://localhost:5173/admin', { timeout: 60000 });
        await expect(page).toHaveURL('http://localhost:5173/admin');
    });

    test('should login successfully with a valid user', async ({ page }) => {
        await page.fill('input[type="email"]', 'abc@gmail.com');
        await page.fill('input[type="password"]', '123456789');
        await page.click('button[type="submit"]');

        await page.waitForURL('http://localhost:5173/home', { timeout: 60000 });
        await expect(page).toHaveURL('http://localhost:5173/home');
    });

    test('should show error for invalid credentials', async ({ page }) => {
        await page.fill('input[type="email"]', 'wronguser@gmail.com');
        await page.fill('input[type="password"]', 'WrongPassword');
        await page.click('button[type="submit"]');

        const errorMessage = page.locator('p.text-red-500');
        await errorMessage.waitFor();
        await expect(errorMessage).toHaveText('User not found');
    });

    test('should show validation error if email is empty', async ({ page }) => {
        await page.evaluate(() => {
            document.querySelector('input[type="email"]')?.removeAttribute('required');
        });
    
        await page.fill('input[type="password"]', 'somePassword');
        await page.click('button[type="submit"]');
    
        const emailErrorMessage = page.locator('p.text-red-500');
        await emailErrorMessage.waitFor();
        await expect(emailErrorMessage).toHaveText('User not found');
    });
    
    test('should show validation error if password is empty', async ({ page }) => {
        await page.evaluate(() => {
            document.querySelector('input[type="password"]')?.removeAttribute('required');
        });
    
        await page.fill('input[type="email"]', 'admin@gmail.com');
        await page.click('button[type="submit"]');
    
        const passwordErrorMessage = page.locator('p.text-red-500');
        await passwordErrorMessage.waitFor();
        await expect(passwordErrorMessage).toHaveText('Invalid password');
    });
    

    test('should display loading state while logging in', async ({ page }) => {
        await page.fill('input[type="email"]', 'admin@gmail.com');
        await page.fill('input[type="password"]', 'AdminPassword');
        await page.click('button[type="submit"]');

        const loadingSpinner = page.locator('button[type="submit"] svg.animate-spin');
        await expect(loadingSpinner).toBeVisible();
    });

    test('should navigate to register page when clicking "Create account"', async ({ page }) => {
        await page.click('text=Create account');
        await page.waitForURL('http://localhost:5173/register');
        await expect(page).toHaveURL('http://localhost:5173/register');
    });

    test('should navigate to forgot password page', async ({ page }) => {
        await page.click('text=Forgot password?');
        await page.waitForURL('http://localhost:5173/forgotpassword');
        await expect(page).toHaveURL('http://localhost:5173/forgotpassword');
    });
});
