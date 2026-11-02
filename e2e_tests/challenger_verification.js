const { chromium } = require('playwright');
const path = require('path');
const { startServer } = require('./server');

// Timeout safety: 90 seconds
const timeoutTimer = setTimeout(() => {
  console.error('\n[CHALLENGER WATCHDOG] Exceeded 90s budget. Forcing exit.');
  process.exit(1);
}, 90000);
timeoutTimer.unref();

async function runEmpiricalAudit() {
  console.log('======================================================================');
  console.log('   CHALLENGER 2: EMPIRICAL RESPONSIVE & BROWSER STABILITY AUDIT       ');
  console.log('======================================================================');

  let server = null;
  let browser = null;
  const auditReport = {
    desktop_1920: {},
    desktop_1440: {},
    mobile_390: {},
    console_audit: {
      errors: [],
      warnings: [],
      exceptions: []
    },
    interactions: {},
    verdict: 'PENDING'
  };

  try {
    console.log('[DEBUG] Step 1: Starting static HTTP server...');
    // Use random high port to avoid conflict
    const testPort = 3000 + Math.floor(Math.random() * 2000) + 1000;
    server = await startServer(testPort);
    console.log(`[DEBUG] Step 1 Done: Test server launched at: ${server.url}`);

    console.log('[DEBUG] Step 2: Launching Edge browser...');
    browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--no-sandbox', '--disable-gpu'] });
    console.log('[DEBUG] Step 2 Done: Browser launched.');

    console.log('[DEBUG] Step 3: Creating page context...');
    const context = await browser.newContext({
      locale: 'vi-VN',
      timezoneId: 'Asia/Ho_Chi_Minh'
    });

    const page = await context.newPage();
    console.log('[DEBUG] Step 3 Done: New page created.');

    // Listen to console and errors
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        auditReport.console_audit.errors.push(text);
        console.error(`  [CONSOLE ERROR] ${text}`);
      } else if (type === 'warning') {
        auditReport.console_audit.warnings.push(text);
      }
    });

    page.on('pageerror', err => {
      auditReport.console_audit.exceptions.push(err.message);
      console.error(`  [PAGE EXCEPTION] ${err.message}`);
    });

    console.log(`[DEBUG] Step 4: Navigating to ${server.url}...`);
    await page.goto(server.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log('[DEBUG] Step 4 Done: DOMContentLoaded triggered.');

    console.log('[DEBUG] Step 5: Waiting for EventStudio and DOM elements...');
    await page.waitForFunction(() => typeof EventStudio !== 'undefined' && !!document.getElementById('builder-title'), { timeout: 10000 });
    console.log('[DEBUG] Step 5 Done: Page loaded successfully.');

    // -------------------------------------------------------------------------
    // TEST 1: DESKTOP STUDIO MODE (1920x1080)
    // -------------------------------------------------------------------------
    console.log('\n--- 1. Testing Desktop Studio Mode (1920x1080) ---');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.evaluate(() => switchView('split'));
    await page.waitForTimeout(200);

    const desk1920Metrics = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const studioContainer = document.getElementById('studio-container');
      const builder = document.getElementById('view-builder');
      const preview = document.getElementById('view-preview');
      const header = document.querySelector('header');

      const builderRect = builder.getBoundingClientRect();
      const previewRect = preview.getBoundingClientRect();

      return {
        hasHorizontalOverflow: docWidth > winWidth,
        docWidth,
        winWidth,
        overflowDelta: docWidth - winWidth,
        isSplitMode: studioContainer.classList.contains('studio-split-mode'),
        builderVisible: !builder.classList.contains('hidden'),
        previewVisible: !preview.classList.contains('hidden'),
        builderWidth: builderRect.width,
        previewWidth: previewRect.width,
        isDualPaneSideBySide: previewRect.left >= (builderRect.right - 50) && builderRect.top < previewRect.bottom,
        headerSticky: window.getComputedStyle(header).position === 'sticky'
      };
    });

    console.log('1920x1080 Metrics:', desk1920Metrics);
    auditReport.desktop_1920 = desk1920Metrics;

    // -------------------------------------------------------------------------
    // TEST 2: DESKTOP STUDIO MODE (1440x900)
    // -------------------------------------------------------------------------
    console.log('\n--- 2. Testing Desktop Studio Mode (1440x900) ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => switchView('split'));
    await page.waitForTimeout(200);

    const desk1440Metrics = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const builder = document.getElementById('view-builder');
      const preview = document.getElementById('view-preview');

      const builderRect = builder.getBoundingClientRect();
      const previewRect = preview.getBoundingClientRect();

      return {
        hasHorizontalOverflow: docWidth > winWidth,
        docWidth,
        winWidth,
        overflowDelta: docWidth - winWidth,
        builderWidth: builderRect.width,
        previewWidth: previewRect.width,
        isDualPaneSideBySide: previewRect.left >= (builderRect.right - 50)
      };
    });

    console.log('1440x900 Metrics:', desk1440Metrics);
    auditReport.desktop_1440 = desk1440Metrics;

    // -------------------------------------------------------------------------
    // TEST 3: MOBILE MODE (390px iPhone viewport)
    // -------------------------------------------------------------------------
    console.log('\n--- 3. Testing Mobile Mode (390x844 iPhone Viewport) ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);

    const mobileInitial = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const splitBtn = document.getElementById('nav-btn-split');
      const splitComputed = window.getComputedStyle(splitBtn).display;

      return {
        hasHorizontalOverflow: docWidth > winWidth,
        docWidth,
        winWidth,
        splitButtonHiddenOnMobile: splitComputed === 'none'
      };
    });
    console.log('Mobile Initial:', mobileInitial);

    // Switch to Builder on mobile
    console.log('  Testing capsule switch to Builder on Mobile...');
    await page.click('#nav-btn-builder');
    await page.waitForTimeout(150);

    const mobileBuilderMetrics = await page.evaluate(() => {
      const builder = document.getElementById('view-builder');
      const preview = document.getElementById('view-preview');
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;

      const inputs = Array.from(builder.querySelectorAll('input, select, textarea'));
      const overflowingInputs = inputs.filter(inp => inp.getBoundingClientRect().right > winWidth + 2).map(inp => inp.id);

      return {
        builderVisible: !builder.classList.contains('hidden'),
        previewHidden: preview.classList.contains('hidden'),
        hasHorizontalOverflow: docWidth > winWidth,
        docWidth,
        overflowingInputsCount: overflowingInputs.length,
        overflowingInputs
      };
    });
    console.log('Mobile Builder Metrics:', mobileBuilderMetrics);

    // Switch to Live Preview on mobile
    console.log('  Testing capsule switch to Preview on Mobile...');
    await page.click('#nav-btn-preview');
    await page.waitForTimeout(150);

    const mobilePreviewMetrics = await page.evaluate(() => {
      const builder = document.getElementById('view-builder');
      const preview = document.getElementById('view-preview');
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;

      const speakerSection = document.getElementById('speaker-section');
      const countdownSection = document.getElementById('countdown-section');
      const registerSection = document.getElementById('register-section');

      return {
        previewVisible: !preview.classList.contains('hidden'),
        builderHidden: builder.classList.contains('hidden'),
        hasHorizontalOverflow: docWidth > winWidth,
        docWidth,
        speakerWidth: speakerSection ? speakerSection.getBoundingClientRect().width : null,
        countdownWidth: countdownSection ? countdownSection.getBoundingClientRect().width : null,
        registerWidth: registerSection ? registerSection.getBoundingClientRect().width : null
      };
    });
    console.log('Mobile Preview Metrics:', mobilePreviewMetrics);

    // Test Registration Modal on Mobile (390px)
    console.log('  Testing Ticket Registration Modal on Mobile (390px)...');
    await page.fill('#reg-name', 'Nguyễn Văn Test');
    await page.fill('#reg-email', 'test.mobile@gmail.com');
    await page.fill('#reg-phone', '0912345678');
    await page.fill('#reg-org', 'FPT Mobile Testing');
    await page.click('#form-registration button[type="submit"]');
    await page.waitForTimeout(500);

    const mobileModalMetrics = await page.evaluate(() => {
      const modalTicket = document.getElementById('modal-ticket');
      const modalBox = modalTicket.querySelector('.modal-content, .relative.w-full, div.rounded-3xl');
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const modalVisible = !modalTicket.classList.contains('hidden');
      const boxRect = modalBox ? modalBox.getBoundingClientRect() : null;
      const qrContainer = document.getElementById('ticket-qrcode-container');

      return {
        modalVisible,
        hasHorizontalOverflow: docWidth > winWidth,
        modalBoxWidth: boxRect ? boxRect.width : null,
        modalFitsViewport: boxRect ? boxRect.right <= winWidth + 5 : false,
        qrCodeRendered: qrContainer && qrContainer.children.length > 0
      };
    });
    console.log('Mobile Modal Metrics:', mobileModalMetrics);

    // Test Ticket Modal Close Button - Check if 'X' button is clickable or intercepted
    console.log('  Testing Ticket Modal close button accessibility...');
    const isXButtonIntercepted = await page.evaluate(() => {
      const btn = document.querySelector('#modal-ticket button[onclick*="closeModal"]');
      if (!btn) return false;
      const rect = btn.getBoundingClientRect();
      const elAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return elAtPoint !== btn && !btn.contains(elAtPoint);
    });
    console.log(`  Is 'X' close button intercepted by overlay header? ${isXButtonIntercepted ? 'YES (DEFECT DETECTED)' : 'NO'}`);
    mobileModalMetrics.xButtonIntercepted = isXButtonIntercepted;

    // Dismiss modal via Escape key (standard accessible way)
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    auditReport.mobile_390 = {
      initial: mobileInitial,
      builder: mobileBuilderMetrics,
      preview: mobilePreviewMetrics,
      modal: mobileModalMetrics
    };

    // -------------------------------------------------------------------------
    // TEST 4: INTERACTION & WORKFLOW INTEGRITY
    // -------------------------------------------------------------------------
    console.log('\n--- 4. Testing Core Interactive Workflows ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.click('#nav-btn-split');

    // 4.1 Preset Selection
    console.log('  Testing Preset Selection (Career Fair)...');
    await page.click('#btn-preset-menu');
    await page.click('button[onclick*="loadPreset(\'career_fair\')"]');
    await page.waitForTimeout(150);
    const titleVal = await page.inputValue('#builder-title');
    const previewBrand = await page.textContent('#preview-nav-brand');
    console.log(`  Loaded Title: "${titleVal}", Preview Brand: "${previewBrand}"`);

    // 4.2 AI Synthesis Button & Toast
    console.log('  Testing AI Synthesis button & Toast...');
    await page.click('button[onclick="triggerMagicAI()"]');
    await page.waitForSelector('#toast-container > div', { timeout: 3000 });
    await page.waitForTimeout(100);
    const toastText = await page.textContent('#toast-container');
    console.log(`  Toast Container text: "${toastText.trim()}"`);

    // 4.3 Check Reset Event Modal & Execution
    console.log('  Testing Reset Event workflow...');
    await page.click('button[onclick="openModal(\'modal-reset\')"]');
    await page.waitForSelector('#modal-reset:not(.hidden)');
    console.log('  Reset modal opened successfully.');
    await page.click('#modal-reset button[onclick="confirmResetEvent()"]');
    await page.waitForTimeout(200);
    const resetTitle = await page.inputValue('#builder-title');
    const attendeeCount = await page.textContent('#header-attendee-count');
    console.log(`  Post-reset Title: "${resetTitle}", Attendee count: "${attendeeCount}"`);

    // 4.4 Check Contractual Requirement: #btn-new-event ID
    const hasBtnNewEvent = await page.$('#btn-new-event');
    console.log(`  Does #btn-new-event exist in DOM? ${hasBtnNewEvent !== null ? 'YES' : 'NO (Missing contract ID)'}`);
    auditReport.interactions.hasBtnNewEventId = hasBtnNewEvent !== null;

    auditReport.interactions.preset = { titleVal, previewBrand };
    auditReport.interactions.toastAfterAI = toastText.trim();
    auditReport.interactions.reset = { resetTitle, attendeeCount };

    // Console Error Verification
    console.log('\n--- 5. Final Console & Error Summary ---');
    console.log(`  Console Errors: ${auditReport.console_audit.errors.length}`);
    console.log(`  Page Exceptions: ${auditReport.console_audit.exceptions.length}`);
    console.log(`  Console Warnings: ${auditReport.console_audit.warnings.length}`);

    // Determine Verdict
    const hasFatalLayoutIssues = 
      desk1920Metrics.hasHorizontalOverflow ||
      desk1440Metrics.hasHorizontalOverflow ||
      mobileBuilderMetrics.hasHorizontalOverflow ||
      mobilePreviewMetrics.hasHorizontalOverflow;

    const hasFatalConsoleErrors = 
      auditReport.console_audit.errors.length > 0 || 
      auditReport.console_audit.exceptions.length > 0;

    if (hasFatalLayoutIssues || hasFatalConsoleErrors) {
      auditReport.verdict = 'REQUEST_CHANGES';
    } else {
      auditReport.verdict = 'APPROVE';
    }

    console.log(`\n======================================================================`);
    console.log(`   EMPIRICAL CHALLENGER VERDICT: ${auditReport.verdict}`);
    console.log(`======================================================================\n`);

  } catch (err) {
    console.error('[AUDIT FATAL ERROR]', err);
    auditReport.verdict = 'REQUEST_CHANGES';
    auditReport.fatalError = err.message;
  } finally {
    if (browser) await browser.close();
    if (server) await server.close();
    console.log('AUDIT_JSON_RESULT_START');
    console.log(JSON.stringify(auditReport, null, 2));
    console.log('AUDIT_JSON_RESULT_END');
    process.exit(0);
  }
}

runEmpiricalAudit();
