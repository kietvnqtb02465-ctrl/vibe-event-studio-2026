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

    // Clear everything
    await page.addInitScript(() => {
      localStorage.removeItem('vibe_organizer_user');
      sessionStorage.removeItem('vibe_organizer_user');
      localStorage.removeItem('vibe_registered_organizers');
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    console.log('1. Navigating to http://localhost:8888/index.html as fresh visitor...');
    await page.goto('http://localhost:8888/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    // Verify initial modal is clean
    const emailVal1 = await page.inputValue('#google-auth-custom-email');
    const passVal1 = await page.inputValue('#google-login-pass');
    const panelHtml1 = await page.innerHTML('#panel-google-login');

    console.log('2. Initial email input value:', JSON.stringify(emailVal1));
    console.log('3. Initial pass input value:', JSON.stringify(passVal1));
    console.log('4. Initial panel contains kietvnqtb02465:', panelHtml1.includes('kietvnqtb02465'));
    console.log('5. Initial panel contains any account chooser:', panelHtml1.includes('google-registered-accounts-list'));

    if (emailVal1 !== '' || passVal1 !== '') throw new Error('Inputs are not empty initially!');
    if (panelHtml1.includes('kietvnqtb02465')) throw new Error('Personal email leaked initially!');
    if (panelHtml1.includes('google-registered-accounts-list')) throw new Error('Insecure account chooser still in DOM!');

    await page.screenshot({ path: 'C:/Users/PC/.gemini/antigravity/brain/97e0a779-d1a4-4ccc-a9b4-935089a6ae9e/privacy_verified_clean_modal.png' });
    console.log('6. Saved screenshot: privacy_verified_clean_modal.png');

    // Register a new organizer
    console.log('7. Registering new organizer...');
    await page.click('#tab-btn-google-register');
    await page.waitForTimeout(300);
    await page.fill('#google-reg-name', 'Vũ Quốc Kiệt');
    await page.fill('#google-reg-email', 'kiet.organizer@gmail.com');
    await page.fill('#google-reg-pass', 'secretPass123');
    await page.click('#panel-google-register button[type="submit"]');
    await page.waitForTimeout(600);

    const isBuilderVisible = await page.isVisible('#view-builder');
    console.log('8. Registered -> Builder visible:', isBuilderVisible);
    if (!isBuilderVisible) throw new Error('Failed to reach builder after registration!');

    // LOG OUT
    console.log('9. Clicking LOGOUT button...');
    await page.click('#header-user-badge button[title*="Đăng xuất"]');
    await page.waitForTimeout(500);

    // Open login modal
    console.log('10. Opening login modal after logout...');
    await page.click('#btn-header-login');
    await page.waitForTimeout(400);

    // CRITICAL PRIVACY CHECKS AFTER LOGOUT
    const emailVal2 = await page.inputValue('#google-auth-custom-email');
    const passVal2 = await page.inputValue('#google-login-pass');
    const panelHtml2 = await page.innerHTML('#panel-google-login');

    console.log('11. [AFTER LOGOUT] email input value:', JSON.stringify(emailVal2));
    console.log('12. [AFTER LOGOUT] pass input value:', JSON.stringify(passVal2));
    console.log('13. [AFTER LOGOUT] panel contains kiet.organizer@gmail.com:', panelHtml2.includes('kiet.organizer@gmail.com'));
    console.log('14. [AFTER LOGOUT] panel contains kietvnqtb02465:', panelHtml2.includes('kietvnqtb02465'));

    if (emailVal2 !== '') throw new Error('DATA LEAK: Email field was not cleared on logout!');
    if (passVal2 !== '') throw new Error('DATA LEAK: Password field was not cleared on logout!');
    if (panelHtml2.includes('kiet.organizer@gmail.com')) throw new Error('DATA LEAK: Registered email visible in DOM after logout!');
    if (panelHtml2.includes('kietvnqtb02465')) throw new Error('DATA LEAK: Personal email visible in DOM after logout!');

    await page.screenshot({ path: 'C:/Users/PC/.gemini/antigravity/brain/97e0a779-d1a4-4ccc-a9b4-935089a6ae9e/privacy_verified_after_logout.png' });
    console.log('15. Saved screenshot: privacy_verified_after_logout.png');

    // Test password security
    console.log('16. Testing wrong password rejection...');
    await page.fill('#google-auth-custom-email', 'kiet.organizer@gmail.com');
    await page.fill('#google-login-pass', 'wrong_password');
    await page.click('#panel-google-login button[type="submit"]');
    await page.waitForTimeout(300);

    const errText = await page.innerText('#google-auth-err');
    console.log('17. Error message on wrong password:', errText);
    if (!errText.includes('không chính xác')) throw new Error('Wrong password was not rejected!');

    // Test correct login
    console.log('18. Testing correct password login...');
    await page.fill('#google-login-pass', 'secretPass123');
    await page.click('#panel-google-login button[type="submit"]');
    await page.waitForTimeout(600);

    const isBuilderVisible2 = await page.isVisible('#view-builder');
    console.log('19. Login with correct credentials -> Builder visible:', isBuilderVisible2);
    if (!isBuilderVisible2) throw new Error('Correct credentials failed to unlock builder!');

    console.log('=== PRIVACY & SECURITY AUDIT PASSED 100% WITH ZERO DATA LEAKS ===');
  } catch (err) {
    console.error('[TEST FAILURE]:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    process.exit(process.exitCode || 0);
  }
})();
