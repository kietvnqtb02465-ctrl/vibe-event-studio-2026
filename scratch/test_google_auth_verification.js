const { chromium } = require('../e2e_tests/node_modules/playwright');
const path = require('path');

const watchdog = setTimeout(() => {
  console.error('[WATCHDOG] Script exceeded timeout 50s. Exiting.');
  process.exit(1);
}, 50000);
watchdog.unref();

(async () => {
  let browser = null;
  try {
    console.log('=== STARTING OFFICIAL GOOGLE AUTH & REGISTRATION VERIFICATION ===');
    try {
      browser = await chromium.launch({ channel: 'msedge', headless: true });
    } catch {
      browser = await chromium.launch({ headless: true });
    }

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });

    const page = await context.newPage();

    page.on('console', msg => {
      const txt = msg.text();
      if (!txt.includes('tailwindcss') && !txt.includes('autocomplete')) {
        console.log('BROWSER LOG:', txt);
      }
    });
    page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

    // Clear any previous stored auth in localStorage before starting
    await page.addInitScript(() => {
      localStorage.removeItem('vibe_organizer_user');
      sessionStorage.removeItem('vibe_organizer_user');
      localStorage.removeItem('vibe_active_view');
      // Override navigator.webdriver to false to simulate a real user browser session
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    console.log('1. Navigating to http://localhost:8888/index.html as fresh visitor...');
    await page.goto('http://localhost:8888/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Verify Google Identity Services (GIS) script is loaded
    const isGsiPresent = await page.evaluate(() => {
      const script = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
      return !!script;
    });
    console.log('Google Identity Services (GIS) SDK script present in DOM:', isGsiPresent);
    if (!isGsiPresent) throw new Error('Missing Google Identity Services script in DOM!');

    const modal = page.locator('#modal-google-auth');
    const isModalVisible = await modal.isVisible();
    console.log('Initial Google Auth Modal visible on entry:', isModalVisible);

    if (!isModalVisible) {
      console.log('Clicking "Soạn Thảo (Builder)" button to trigger Google Auth guard...');
      await page.click('#nav-btn-builder');
      await page.waitForTimeout(400);
    }

    // Take screenshot of Google Auth & Registration Modal (Tab Login)
    const modalShotPath = 'C:/Users/PC/.gemini/antigravity/brain/97e0a779-d1a4-4ccc-a9b4-935089a6ae9e/google_auth_official_modal.png';
    await page.screenshot({ path: modalShotPath, fullPage: false });
    console.log('Saved Google Auth Modal screenshot to:', modalShotPath);

    // Test 2: Switch to "Đăng Ký Ban Tổ Chức" Tab
    console.log('2. Switching to "Đăng Ký Ban Tổ Chức" Tab...');
    await page.click('#tab-btn-google-register');
    await page.waitForTimeout(300);

    const isRegPanelVisible = await page.locator('#panel-google-register').isVisible();
    console.log('Registration panel visible:', isRegPanelVisible);
    if (!isRegPanelVisible) throw new Error('Registration panel should be visible after clicking tab!');

    // Test 3: Validation on Registration Form with invalid non-gmail
    console.log('3. Testing registration validation with non-gmail...');
    await page.fill('#google-reg-name', 'Trần Văn Bình');
    await page.fill('#google-reg-email', 'binh.tran@yahoo.com');
    await page.fill('#google-reg-pass', '123456');
    await page.click('#panel-google-register button[type="submit"]');
    await page.waitForTimeout(300);

    const regErr = await page.locator('#google-auth-err').innerText();
    console.log('Validation error on non-gmail registration:', regErr);
    if (!regErr.includes('gmail.com')) {
      throw new Error('Expected Gmail validation error during registration!');
    }

    // Test 4: Register with valid official Gmail
    console.log('4. Registering new organizer with valid official Gmail...');
    await page.fill('#google-reg-email', 'binh.tran.fpt@gmail.com');
    await page.fill('#google-reg-org', 'FPT Polytechnic Studio');
    await page.fill('#google-reg-phone', '0988776655');
    await page.fill('#google-reg-pass', 'binh2026');
    await page.click('#panel-google-register button[type="submit"]');
    await page.waitForTimeout(600);

    // Verify modal closed & builder opened
    const isModalClosedAfterReg = !(await modal.isVisible());
    const isBuilderVisibleAfterReg = await page.locator('#view-builder').isVisible();
    const badgeNameAfterReg = await page.locator('#header-user-name').innerText();
    console.log('Registration Success -> Modal closed:', isModalClosedAfterReg, '| Builder visible:', isBuilderVisibleAfterReg, '| Badge Name:', badgeNameAfterReg);
    if (!isModalClosedAfterReg || !isBuilderVisibleAfterReg || !badgeNameAfterReg.includes('Bình')) {
      throw new Error('Failed to register and authenticate new organizer!');
    }

    // Take screenshot of authenticated builder with registered user
    const regShotPath = 'C:/Users/PC/.gemini/antigravity/brain/97e0a779-d1a4-4ccc-a9b4-935089a6ae9e/registered_organizer_builder.png';
    await page.screenshot({ path: regShotPath, fullPage: false });
    console.log('Saved registered organizer screenshot to:', regShotPath);

    // Test 5: Logout
    console.log('5. Logging out...');
    await page.click('#header-user-badge button[title*="Đăng xuất"]');
    await page.waitForTimeout(400);

    // Test 6: Login with newly registered organizer account in Tab Login
    console.log('6. Logging in with registered organizer account...');
    await page.click('#btn-header-login');
    await page.waitForTimeout(300);

    // Fill wrong password
    await page.fill('#google-auth-custom-email', 'binh.tran.fpt@gmail.com');
    await page.fill('#google-login-pass', 'wrong_pass');
    await page.click('#panel-google-login button[type="submit"]');
    await page.waitForTimeout(300);

    const passErr = await page.locator('#google-auth-err').innerText();
    console.log('Wrong password error:', passErr);
    if (!passErr.includes('Mật khẩu')) throw new Error('Expected wrong password error!');

    // Fill correct password
    await page.fill('#google-login-pass', 'binh2026');
    await page.click('#panel-google-login button[type="submit"]');
    await page.waitForTimeout(600);

    const isLoginSuccess = await page.locator('#view-builder').isVisible();
    console.log('Login with registered account success:', isLoginSuccess);
    if (!isLoginSuccess) throw new Error('Failed to log in with correct registered account credentials!');

    // Test 7: Verify Google Official Credential handler (simulating JWT response)
    console.log('7. Testing official Google JWT token decoding and credential response handler...');
    await page.evaluate(() => {
      // Create a mock Google JWT ID token with valid structure (header.payload.signature)
      const payload = {
        iss: "https://accounts.google.com",
        sub: "118234908123984719283",
        email: "official.google.user@gmail.com",
        email_verified: true,
        name: "Google Official Verified",
        picture: "https://lh3.googleusercontent.com/a/mock-official-avatar"
      };
      const b64Payload = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const fakeJwt = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.${b64Payload}.mock_sig`;

      handleGoogleCredentialResponse({ credential: fakeJwt });
    });
    await page.waitForTimeout(500);

    const gisBadgeName = await page.locator('#header-user-name').innerText();
    const storedUser = await page.evaluate(() => JSON.parse(localStorage.getItem('vibe_organizer_user')));
    console.log('Official Google Credential Handler Success -> Badge Name:', gisBadgeName, '| Provider:', storedUser.provider);
    if (!storedUser || !storedUser.provider.includes('Official GIS')) {
      throw new Error('Google Credential response did not record official GIS provider!');
    }

    console.log('=== ALL OFFICIAL GOOGLE AUTH & REGISTRATION TESTS PASSED! ===');
  } catch (err) {
    console.error('[TEST FAILURE]:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    process.exit(process.exitCode || 0);
  }
})();
