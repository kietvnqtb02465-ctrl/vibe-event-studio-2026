const { chromium } = require('playwright');
const path = require('path');

let activeBrowser = null;

async function getBrowser() {
  if (!activeBrowser) {
    try {
      activeBrowser = await chromium.launch({ channel: 'msedge', headless: true });
    } catch {
      // Fallback to bundled or chrome
      try {
        activeBrowser = await chromium.launch({ channel: 'chrome', headless: true });
      } catch {
        activeBrowser = await chromium.launch({ headless: true });
      }
    }
  }
  return activeBrowser;
}

async function closeBrowser() {
  if (activeBrowser) {
    await activeBrowser.close();
    activeBrowser = null;
  }
}

async function createTestPage(baseUrl, options = {}) {
  const browser = await getBrowser();
  const context = await browser.newContext({
    viewport: options.viewport || { width: 1440, height: 900 },
    locale: 'vi-VN',
    timezoneId: 'Asia/Ho_Chi_Minh'
  });

  const page = await context.newPage();
  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });

  const targetUrl = baseUrl || `file:///${path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/')}`;
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof EventStudio !== 'undefined' && !!document.getElementById('builder-title'), { timeout: 10000 });

  return {
    page,
    context,
    consoleMessages,
    pageErrors,
    cleanup: async () => {
      await page.close();
      await context.close();
    }
  };
}

function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`Assertion failed: Expected "${expected}" but got "${actual}". ${message}`);
  }
}

function assertTrue(condition, message = '') {
  if (!condition) {
    throw new Error(`Assertion failed: Expected truthy value. ${message}`);
  }
}

function assertFalse(condition, message = '') {
  if (condition) {
    throw new Error(`Assertion failed: Expected falsy value. ${message}`);
  }
}

function assertContains(haystack, needle, message = '') {
  if (typeof haystack !== 'string' || !haystack.includes(needle)) {
    throw new Error(`Assertion failed: Expected "${haystack}" to contain "${needle}". ${message}`);
  }
}

function assertMatches(string, regex, message = '') {
  if (!regex.test(string)) {
    throw new Error(`Assertion failed: String "${string}" did not match regex ${regex}. ${message}`);
  }
}

function assertZeroConsoleErrors(pageErrors, consoleMessages, message = '') {
  const severeErrors = pageErrors.concat(
    consoleMessages
      .filter(m => m.type === 'error' && !m.text.includes('favicon.ico'))
      .map(m => m.text)
  );
  if (severeErrors.length > 0) {
    throw new Error(`Found unexpected console errors: [${severeErrors.join('; ')}]. ${message}`);
  }
}

module.exports = {
  getBrowser,
  closeBrowser,
  createTestPage,
  assertEqual,
  assertTrue,
  assertFalse,
  assertContains,
  assertMatches,
  assertZeroConsoleErrors
};
