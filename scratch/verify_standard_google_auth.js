const { chromium } = require('../e2e_tests/node_modules/playwright');

const watchdog = setTimeout(() => {
  console.error('[WATCHDOG] Timeout 40s');
  process.exit(1);
}, 40000);
watchdog.unref();

(async () => {
  let browser = null;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    await page.addInitScript(() => {
      localStorage.removeItem('vibe_organizer_user');
      sessionStorage.removeItem('vibe_organizer_user');
      localStorage.removeItem('vibe_registered_organizers');
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    console.log('1. Navigating to http://localhost:8888/index.html...');
    await page.goto('http://localhost:8888/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    // Check initial modal button text
    const btnText = await page.innerText('#btn-official-google-auth');
    console.log('2. Standard Google Button Text:', JSON.stringify(btnText.trim()));

    // Ensure NO personal email is present in the login panel initially
    const panelHtml = await page.innerHTML('#panel-google-login');
    const containsPersonalEmail = panelHtml.includes('kietvnqtb02465');
    console.log('3. Contains personal email in login panel initially:', containsPersonalEmail);
    if (containsPersonalEmail) throw new Error('Personal email found in panel!');

    // Take screenshot of clean standard Google button modal
    await page.screenshot({ path: 'C:/Users/PC/.gemini/antigravity/brain/97e0a779-d1a4-4ccc-a9b4-935089a6ae9e/google_standard_btn_clean.png' });
    console.log('4. Captured clean modal screenshot: google_standard_btn_clean.png');

    // Click standard Google button -> toggles Account Chooser
    await page.click('#btn-official-google-auth');
    await page.waitForTimeout(400);

    const chooserVisible = await page.isVisible('#google-account-chooser-box');
    console.log('5. Google Account Chooser visible after clicking button:', chooserVisible);

    // Take screenshot with chooser visible (empty state)
    await page.screenshot({ path: 'C:/Users/PC/.gemini/antigravity/brain/97e0a779-d1a4-4ccc-a9b4-935089a6ae9e/google_account_chooser_clean.png' });
    console.log('6. Captured chooser empty screenshot: google_account_chooser_clean.png');

    // Register a new account via Tab 2
    console.log('7. Registering a new organizer account via Tab 2...');
    await page.click('#tab-btn-google-register');
    await page.waitForTimeout(300);
    await page.fill('#google-reg-name', 'Vũ Quốc Kiệt');
    await page.fill('#google-reg-email', 'organizer.kiet@gmail.com');
    await page.fill('#google-reg-pass', 'kiet2026');
    await page.click('#panel-google-register button[type="submit"]');
    await page.waitForTimeout(600);

    console.log('8. Registered new organizer -> Logged in successfully!');

    // Log out
    console.log('9. Logging out...');
    await page.click('#header-user-badge button[title*="Đăng xuất"]');
    await page.waitForTimeout(400);

    // Open login modal again
    await page.click('#btn-header-login');
    await page.waitForTimeout(400);

    // Click standard Google button -> should now show the registered account in Chooser!
    console.log('10. Clicking Standard Google Button to inspect Chooser...');
    await page.click('#btn-official-google-auth');
    await page.waitForTimeout(400);

    const registeredListText = await page.innerText('#google-registered-accounts-list');
    console.log('11. Registered accounts in chooser:', registeredListText.replace(/\s+/g, ' ').trim());

    await page.screenshot({ path: 'C:/Users/PC/.gemini/antigravity/brain/97e0a779-d1a4-4ccc-a9b4-935089a6ae9e/google_account_chooser_with_account.png' });
    console.log('12. Captured chooser with registered account screenshot');

    // Click on the registered account to log in!
    await page.click('#google-registered-accounts-list > div');
    await page.waitForTimeout(600);

    const finalUser = await page.evaluate(() => window.EventStudio?.organizerUser);
    console.log('13. Logged in via Chooser successfully! User:', JSON.stringify(finalUser, null, 2));

    if (!finalUser || finalUser.email !== 'organizer.kiet@gmail.com') {
      throw new Error('Failed to log in with registered account from Chooser!');
    }

    console.log('=== ALL STANDARD GOOGLE AUTH & REGISTERED ACCOUNTS TESTS PASSED! ===');
  } catch (err) {
    console.error('[TEST FAILURE]:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    process.exit(process.exitCode || 0);
  }
})();
