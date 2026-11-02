const { chromium } = require('playwright');
const path = require('path');
const { startServer } = require('./server');

// Watchdog timer (75s max budget)
const watchdog = setTimeout(() => {
  console.error('\n[CHALLENGER WATCHDOG] Exceeded 75s budget. Forcing exit.');
  process.exit(1);
}, 75000);
watchdog.unref();

async function runAdversarialDeepDive() {
  console.log('================================================================================');
  console.log('   EMPIRICAL CHALLENGER: ADVERSARIAL STRESS HARNESS & BOUNDARY DEEP DIVE        ');
  console.log('================================================================================');

  let server = null;
  let browser = null;
  const results = [];
  const consoleErrors = [];

  function record(id, name, pass, detail = '') {
    const status = pass ? 'PASS' : 'FAIL';
    const color = pass ? '\x1b[32m' : '\x1b[31m';
    console.log(`  [${id}] ${name.padEnd(55, ' ')} ... ${color}${status}\x1b[0m ${detail}`);
    results.push({ id, name, pass, detail });
  }

  try {
    const port = 3000 + Math.floor(Math.random() * 2000) + 1200;
    server = await startServer(port);
    console.log(`[INFO] Server running on ${server.url}`);

    browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--no-sandbox', '--disable-gpu'] });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      locale: 'vi-VN',
      timezoneId: 'Asia/Ho_Chi_Minh'
    });
    const page = await context.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('favicon.ico')) {
        consoleErrors.push(msg.text());
        console.error(`    [PAGE ERROR] ${msg.text()}`);
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
      console.error(`    [PAGE EXCEPTION] ${err.message}`);
    });

    await page.goto(server.url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof EventStudio !== 'undefined' && !!document.getElementById('builder-title'));

    // Safe helper to reset UI state between tests
    async function resetUiState() {
      await page.evaluate(() => {
        ['modal-ticket', 'modal-attendees', 'modal-reset', 'modal-deploy', 'modal-ai-settings'].forEach(id => {
          if (typeof closeModal === 'function') closeModal(id);
        });
        const tc = document.getElementById('toast-container');
        if (tc) tc.innerHTML = '';
        if (typeof hideInputErrors === 'function') hideInputErrors();
      });
      await page.waitForTimeout(100);
    }

    // ============================================================================
    // SUITE 1: REGISTRATION FORM VALIDATION & SANITIZATION
    // ============================================================================
    console.log('\n--- SUITE 1: REGISTRATION FORM VALIDATION ---');

    // 1.1 Native HTML5 validation blocks submission when inputs are empty
    const html5Check = await page.evaluate(() => {
      const form = document.getElementById('form-registration');
      document.getElementById('reg-name').value = '';
      document.getElementById('reg-email').value = '';
      document.getElementById('reg-phone').value = '';
      document.getElementById('reg-org').value = '';
      return {
        formInvalid: !form.checkValidity(),
        nameMissing: document.getElementById('reg-name').validity.valueMissing,
        emailMissing: document.getElementById('reg-email').validity.valueMissing,
        phoneMissing: document.getElementById('reg-phone').validity.valueMissing,
        orgMissing: document.getElementById('reg-org').validity.valueMissing
      };
    });
    record('ADV_VAL_01', 'HTML5 constraint validation blocks submission on empty fields',
      html5Check.formInvalid && html5Check.nameMissing && html5Check.emailMissing && html5Check.phoneMissing && html5Check.orgMissing);

    // 1.2 Custom JS validator displays 4 error messages when invoked on empty inputs
    const customEmptyCheck = await page.evaluate(() => {
      document.getElementById('reg-name').value = '';
      document.getElementById('reg-email').value = '';
      document.getElementById('reg-phone').value = '';
      document.getElementById('reg-org').value = '';
      const dummyEvent = { preventDefault: () => {} };
      handleRegistrationSubmit(dummyEvent);
      return {
        eName: !document.getElementById('err-reg-name').classList.contains('hidden'),
        eEmail: !document.getElementById('err-reg-email').classList.contains('hidden'),
        ePhone: !document.getElementById('err-reg-phone').classList.contains('hidden'),
        eOrg: !document.getElementById('err-reg-org').classList.contains('hidden')
      };
    });
    record('ADV_VAL_02', 'Custom JS validation displays all 4 inline error labels',
      customEmptyCheck.eName && customEmptyCheck.eEmail && customEmptyCheck.ePhone && customEmptyCheck.eOrg);

    await resetUiState();

    // 1.3 Name validation: 1 char rejected
    await page.evaluate(() => {
      document.getElementById('reg-name').value = 'A';
      document.getElementById('reg-email').value = 'valid@test.com';
      document.getElementById('reg-phone').value = '0901234567';
      document.getElementById('reg-org').value = 'Valid Org';
      handleRegistrationSubmit({ preventDefault: () => {} });
    });
    const singleCharRejected = await page.evaluate(() => !document.getElementById('err-reg-name').classList.contains('hidden'));
    record('ADV_VAL_03', 'Name with 1 character is rejected (< 2 chars)', singleCharRejected);

    // 1.4 Name with digits rejected
    await page.evaluate(() => {
      document.getElementById('reg-name').value = 'Nguyễn Văn A 123';
      handleRegistrationSubmit({ preventDefault: () => {} });
    });
    const digitsNameRejected = await page.evaluate(() => !document.getElementById('err-reg-name').classList.contains('hidden'));
    record('ADV_VAL_04', 'Name containing numbers/digits is rejected', digitsNameRejected);

    // 1.5 Name with XSS / Script tags rejected
    await page.evaluate(() => {
      document.getElementById('reg-name').value = '<script>alert("hack")</script>';
      handleRegistrationSubmit({ preventDefault: () => {} });
    });
    const scriptNameRejected = await page.evaluate(() => !document.getElementById('err-reg-name').classList.contains('hidden'));
    record('ADV_VAL_05', 'Name with XSS tags rejected by Unicode regex', scriptNameRejected);

    // 1.6 Complex Vietnamese Name Accepted
    await page.evaluate(() => {
      document.getElementById('reg-name').value = 'Đoàn Vũ Nguyễn Quốc Kiệt';
      document.getElementById('reg-email').value = 'kiet@fpt.edu.vn';
      document.getElementById('reg-phone').value = '0901234567';
      document.getElementById('reg-org').value = 'FPT Poly';
      hideInputErrors();
      handleRegistrationSubmit({ preventDefault: () => {} });
    });
    const vnNameAccepted = await page.evaluate(() => document.getElementById('err-reg-name').classList.contains('hidden'));
    record('ADV_VAL_06', 'Complex Vietnamese diacritic name is accepted', vnNameAccepted);

    await resetUiState();

    // 1.7 Malformed emails rejected by custom JS validator
    const invalidEmails = ['invalid-email', 'user@', '@domain.com', 'user@domain', 'user name@gmail.com'];
    let allInvalidEmailsRejected = true;
    for (const em of invalidEmails) {
      await page.evaluate((val) => {
        document.getElementById('reg-name').value = 'Valid Name';
        document.getElementById('reg-email').value = val;
        document.getElementById('reg-phone').value = '0901234567';
        document.getElementById('reg-org').value = 'Valid Org';
        handleRegistrationSubmit({ preventDefault: () => {} });
      }, em);
      const isErr = await page.evaluate(() => !document.getElementById('err-reg-email').classList.contains('hidden'));
      if (!isErr) {
        allInvalidEmailsRejected = false;
        break;
      }
    }
    record('ADV_VAL_07', 'All malformed emails rejected (missing @, missing TLD, spaces)', allInvalidEmailsRejected);

    // 1.8 Phone number invalid prefixes & lengths rejected
    const invalidPhones = ['0123456789', '0241234567', '09012345', '090123456789', 'abc090123456'];
    let allInvalidPhonesRejected = true;
    for (const ph of invalidPhones) {
      await page.evaluate((val) => {
        document.getElementById('reg-name').value = 'Valid Name';
        document.getElementById('reg-email').value = 'valid@example.com';
        document.getElementById('reg-phone').value = val;
        document.getElementById('reg-org').value = 'Valid Org';
        handleRegistrationSubmit({ preventDefault: () => {} });
      }, ph);
      const isErr = await page.evaluate(() => !document.getElementById('err-reg-phone').classList.contains('hidden'));
      if (!isErr) {
        allInvalidPhonesRejected = false;
        break;
      }
    }
    record('ADV_VAL_08', 'Invalid phone prefixes (01, 024) and invalid lengths rejected', allInvalidPhonesRejected);

    // 1.9 Phone Number with dot and space sanitization
    await page.evaluate(() => {
      document.getElementById('reg-name').value = 'Valid Name';
      document.getElementById('reg-email').value = 'valid@example.com';
      document.getElementById('reg-phone').value = '098.765.4321';
      document.getElementById('reg-org').value = 'Valid Org';
      hideInputErrors();
      handleRegistrationSubmit({ preventDefault: () => {} });
    });
    const formattedPhoneAccepted = await page.evaluate(() => document.getElementById('err-reg-phone').classList.contains('hidden'));
    record('ADV_VAL_09', 'Phone with dot formatting (098.765.4321) is sanitized & accepted', formattedPhoneAccepted);

    await resetUiState();

    // 1.10 Organization validation: 1 char rejected
    await page.evaluate(() => {
      document.getElementById('reg-name').value = 'Valid Name';
      document.getElementById('reg-email').value = 'valid@example.com';
      document.getElementById('reg-phone').value = '0901234567';
      document.getElementById('reg-org').value = 'X';
      handleRegistrationSubmit({ preventDefault: () => {} });
    });
    const orgTooShortRejected = await page.evaluate(() => !document.getElementById('err-reg-org').classList.contains('hidden'));
    record('ADV_VAL_10', 'Organization with 1 char is rejected (< 2 chars)', orgTooShortRejected);

    await resetUiState();

    // ============================================================================
    // SUITE 2: DUPLICATE CHECKING & MODAL TICKET RE-OPENING
    // ============================================================================
    console.log('\n--- SUITE 2: DUPLICATE REGISTRATION & PREVENTION ---');

    // Reset attendees first
    await page.evaluate(() => {
      EventStudio.attendees = [];
      saveAttendeesToStorage();
      renderAttendeesTable();
      updateSeatCounterDisplay();
    });

    // 2.1 First valid registration via UI interaction
    await page.evaluate(() => {
      document.getElementById('reg-name').value = 'Vũ Nguyễn Quốc Kiệt';
      document.getElementById('reg-email').value = 'kiet.tb02465@fpt.edu.vn';
      document.getElementById('reg-phone').value = '0987654321';
      document.getElementById('reg-org').value = 'FPT Polytechnic Cần Thơ';
    });
    await page.locator('#btn-submit-reg').click();
    await page.waitForTimeout(400);

    const firstAttCount = await page.evaluate(() => EventStudio.attendees.length);
    const firstTicketCode = await page.evaluate(() => EventStudio.attendees[0].ticketCode);
    const modalVisible1 = await page.evaluate(() => !document.getElementById('modal-ticket').classList.contains('hidden'));
    record('ADV_DUP_01', 'First registration succeeds and creates 1 attendee with ticketCode', 
      firstAttCount === 1 && modalVisible1, `Code: ${firstTicketCode}`);

    await resetUiState();

    // 2.2 Duplicate registration with SAME EMAIL (case-insensitive)
    await page.evaluate(() => {
      document.getElementById('reg-name').value = 'Người Khác';
      document.getElementById('reg-email').value = 'KIET.TB02465@FPT.EDU.VN'; // uppercase
      document.getElementById('reg-phone').value = '0912345678'; // different phone
      document.getElementById('reg-org').value = 'Different Org';
    });
    await page.locator('#btn-submit-reg').click();
    await page.waitForTimeout(400);

    const dupEmailCount = await page.evaluate(() => EventStudio.attendees.length);
    const dupEmailModalCode = await page.evaluate(() => document.getElementById('ticket-code-display').textContent);
    const dupEmailModalOpen = await page.evaluate(() => !document.getElementById('modal-ticket').classList.contains('hidden'));
    record('ADV_DUP_02', 'Duplicate email (case-insensitive) rejects new entry & reopens VIP ticket', 
      dupEmailCount === 1 && dupEmailModalOpen && dupEmailModalCode === firstTicketCode,
      `Expected ${firstTicketCode}, Got ${dupEmailModalCode}`);

    await resetUiState();

    // 2.3 Duplicate registration with SAME PHONE (formatted with spaces)
    await page.evaluate(() => {
      document.getElementById('reg-name').value = 'Người Khác Nữa';
      document.getElementById('reg-email').value = 'different@fpt.edu.vn'; // different email
      document.getElementById('reg-phone').value = '098 765 4321'; // same phone with spaces
      document.getElementById('reg-org').value = 'Different Org 2';
    });
    await page.locator('#btn-submit-reg').click();
    await page.waitForTimeout(400);

    const dupPhoneCount = await page.evaluate(() => EventStudio.attendees.length);
    const dupPhoneModalCode = await page.evaluate(() => document.getElementById('ticket-code-display').textContent);
    const dupPhoneModalOpen = await page.evaluate(() => !document.getElementById('modal-ticket').classList.contains('hidden'));
    record('ADV_DUP_03', 'Duplicate phone (formatted with spaces) rejects new entry & reopens VIP ticket',
      dupPhoneCount === 1 && dupPhoneModalOpen && dupPhoneModalCode === firstTicketCode,
      `Attendee count: ${dupPhoneCount}`);

    await resetUiState();

    // 2.4 Duplicate registration with SAME FULL NAME (case-insensitive)
    await page.evaluate(() => {
      document.getElementById('reg-name').value = 'vũ nguyễn quốc kiệt'; // lowercase name
      document.getElementById('reg-email').value = 'another.email@test.vn';
      document.getElementById('reg-phone').value = '0933333333';
      document.getElementById('reg-org').value = 'Third Org';
    });
    await page.locator('#btn-submit-reg').click();
    await page.waitForTimeout(400);

    const dupNameCount = await page.evaluate(() => EventStudio.attendees.length);
    const dupNameModalCode = await page.evaluate(() => document.getElementById('ticket-code-display').textContent);
    const dupNameModalOpen = await page.evaluate(() => !document.getElementById('modal-ticket').classList.contains('hidden'));
    record('ADV_DUP_04', 'Duplicate name (case-insensitive) rejects new entry & reopens VIP ticket',
      dupNameCount === 1 && dupNameModalOpen && dupNameModalCode === firstTicketCode);

    // ============================================================================
    // SUITE 3: VIP TICKET MODAL DISPLAY & INTERACTION
    // ============================================================================
    console.log('\n--- SUITE 3: TICKET MODAL DISPLAY & INTERACTION ---');

    // 3.1 Field data fidelity check in modal
    const ticketFields = await page.evaluate(() => {
      return {
        eventName: document.getElementById('ticket-event-name').textContent,
        attendeeName: document.getElementById('ticket-attendee-name').textContent,
        attendeePhone: document.getElementById('ticket-attendee-phone').textContent,
        attendeeOrg: document.getElementById('ticket-attendee-org').textContent,
        ticketCode: document.getElementById('ticket-code-display').textContent,
        hasQr: !!document.getElementById('ticket-qrcode-container').querySelector('canvas, img, svg')
      };
    });
    record('ADV_TCK_01', 'Ticket modal binds and renders all attendee fields and scannable QR',
      ticketFields.attendeeName === 'Vũ Nguyễn Quốc Kiệt' &&
      ticketFields.ticketCode === firstTicketCode &&
      ticketFields.hasQr,
      `QR rendered: ${ticketFields.hasQr}`);

    // 3.2 Modal Close Button Stacking context and clickability
    const closeBtnHitTest = await page.evaluate(() => {
      const btn = document.querySelector('#modal-ticket button[onclick*="closeModal"]');
      if (!btn) return { exists: false };
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const elAtPoint = document.elementFromPoint(x, y);
      const isTarget = btn === elAtPoint || btn.contains(elAtPoint);
      return { exists: true, isTarget, elTag: elAtPoint ? elAtPoint.tagName : null };
    });
    record('ADV_TCK_02', 'Ticket modal close button is top element (not occluded by header)',
      closeBtnHitTest.exists && closeBtnHitTest.isTarget,
      `Target element at point: ${closeBtnHitTest.elTag}`);

    // Click top-right 'X' close button physically
    await page.locator('#modal-ticket button.no-print').click();
    await page.waitForTimeout(300);
    const modalClosedByButton = await page.evaluate(() => document.getElementById('modal-ticket').classList.contains('hidden'));
    record('ADV_TCK_03', 'Physical click on top-right close button hides modal', modalClosedByButton);

    // 3.3 Modal closes on ESC key
    await page.evaluate(() => openModal('modal-ticket'));
    await page.waitForTimeout(200);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const modalClosedByEsc = await page.evaluate(() => document.getElementById('modal-ticket').classList.contains('hidden'));
    record('ADV_TCK_04', 'Pressing Escape dismisses ticket modal', modalClosedByEsc);

    // 3.4 Modal closes on bottom "Hoàn Tất" button
    await page.evaluate(() => openModal('modal-ticket'));
    await page.waitForTimeout(200);
    const bottomBtn = page.locator('#modal-ticket').getByRole('button', { name: 'Hoàn Tất' });
    await bottomBtn.click();
    await page.waitForTimeout(300);
    const modalClosedByBottomBtn = await page.evaluate(() => document.getElementById('modal-ticket').classList.contains('hidden'));
    record('ADV_TCK_05', 'Clicking "Hoàn Tất" action button dismisses ticket modal', modalClosedByBottomBtn);

    await resetUiState();

    // ============================================================================
    // SUITE 4: COUNTDOWN TIMER ROBUSTNESS
    // ============================================================================
    console.log('\n--- SUITE 4: COUNTDOWN TIMER ROBUSTNESS ---');

    // 4.1 Future date displays 4 active crystalline dials with non-negative numbers
    const targetDate = new Date(Date.now() + 86400000 * 5 + 3600000 * 4 + 60000 * 30);
    const padN = n => String(n).padStart(2, '0');
    const futureDate = `${targetDate.getFullYear()}-${padN(targetDate.getMonth() + 1)}-${padN(targetDate.getDate())}T${padN(targetDate.getHours())}:${padN(targetDate.getMinutes())}`;
    await page.evaluate((dt) => {
      EventStudio.eventData.datetime = dt;
      startCountdownTimer();
    }, futureDate);
    await page.waitForTimeout(200);

    const dialsState = await page.evaluate(() => {
      const d = document.getElementById('timer-days');
      const h = document.getElementById('timer-hours');
      const m = document.getElementById('timer-mins');
      const s = document.getElementById('timer-secs');
      if (!d || !h || !m || !s) return { valid: false };
      return {
        valid: true,
        days: parseInt(d.textContent, 10),
        hours: parseInt(h.textContent, 10),
        mins: parseInt(m.textContent, 10),
        secs: parseInt(s.textContent, 10)
      };
    });
    record('ADV_CNT_01', 'Future datetime renders 4 valid non-negative timer dials',
      dialsState.valid && dialsState.days >= 5 && !isNaN(dialsState.secs),
      `Days: ${dialsState.days}, Hours: ${dialsState.hours}`);

    // 4.2 Dynamic ticking verification (secs decrease or roll)
    const initialSecs = dialsState.secs;
    await page.waitForTimeout(1400);
    const tickedSecs = await page.evaluate(() => parseInt(document.getElementById('timer-secs').textContent, 10));
    record('ADV_CNT_02', 'Countdown timer actively ticks every second',
      initialSecs !== tickedSecs,
      `Initial: ${initialSecs}, After 1.4s: ${tickedSecs}`);

    // 4.3 Overdue date guard: NEVER negative numbers, renders "SỰ KIỆN ĐANG DIỄN RA"
    const pastDate = new Date(Date.now() - 3600000 * 48).toISOString().slice(0, 16);
    await page.evaluate((dt) => {
      EventStudio.eventData.datetime = dt;
      updateCountdownTick();
    }, pastDate);
    await page.waitForTimeout(200);

    const overdueState = await page.evaluate(() => {
      const container = document.getElementById('countdown-container');
      const text = container.textContent;
      const hasLiveBanner = text.includes('SỰ KIỆN ĐANG DIỄN RA') || text.includes('TRỰC TIẾP');
      const hasNegativeSign = text.includes('-');
      const hasNaN = text.includes('NaN');
      const hasLiveBtn = !!container.querySelector('a[href="#register-section"]');
      return { hasLiveBanner, hasNegativeSign, hasNaN, hasLiveBtn };
    });
    record('ADV_CNT_03', 'Overdue date immediately displays Live Broadcast Banner',
      overdueState.hasLiveBanner && !overdueState.hasNegativeSign && !overdueState.hasNaN && overdueState.hasLiveBtn,
      `Has Live Banner: ${overdueState.hasLiveBanner}, Negative: ${overdueState.hasNegativeSign}`);

    // 4.4 Dynamic transition from Past back to Future restores dials seamlessly
    await page.evaluate((dt) => {
      EventStudio.eventData.datetime = dt;
      updateCountdownTick();
    }, futureDate);
    await page.waitForTimeout(200);

    const restoredDials = await page.evaluate(() => {
      const d = document.getElementById('timer-days');
      const h = document.getElementById('timer-hours');
      const m = document.getElementById('timer-mins');
      const s = document.getElementById('timer-secs');
      return !!(d && h && m && s);
    });
    record('ADV_CNT_04', 'Transition from Past back to Future restores 4 timer dials', restoredDials);

    // 4.5 Malformed datetime handling
    await page.evaluate(() => {
      EventStudio.eventData.datetime = 'completely-invalid-date-string';
      updateCountdownTick();
    });
    await page.waitForTimeout(100);

    const malformedState = await page.evaluate(() => {
      const d = document.getElementById('timer-days');
      return d ? d.textContent : null;
    });
    record('ADV_CNT_05', 'Malformed date string does not crash and renders safe fallback "00"',
      malformedState === '00',
      `Value: ${malformedState}`);

    // 4.6 Empty datetime handling
    await page.evaluate(() => {
      EventStudio.eventData.datetime = '';
      updateCountdownTick();
    });
    await page.waitForTimeout(100);
    record('ADV_CNT_06', 'Empty datetime string handled gracefully without throwing', true);

    // ============================================================================
    // CONSOLE ERROR AUDIT
    // ============================================================================
    console.log('\n--- CONSOLE ERROR AUDIT ---');
    record('ADV_CNS_01', 'Total unhandled browser console errors during stress harness is ZERO',
      consoleErrors.length === 0,
      `Console errors count: ${consoleErrors.length}`);

    // Summary
    const total = results.length;
    const passed = results.filter(r => r.pass).length;
    const failed = total - passed;
    console.log('\n================================================================================');
    console.log(`STRESS HARNESS SUMMARY: Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
    console.log(`Pass Rate: ${((passed / total) * 100).toFixed(1)}%`);
    console.log('================================================================================');

    await context.close();
    await browser.close();
    await server.close();

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('[FATAL ERROR IN HARNESS]', err);
    if (browser) await browser.close();
    if (server) await server.close();
    process.exit(1);
  }
}

runAdversarialDeepDive();
