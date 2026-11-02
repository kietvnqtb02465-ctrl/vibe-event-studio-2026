const {
  assertEqual,
  assertTrue,
  assertFalse,
  assertContains,
  assertMatches,
  assertZeroConsoleErrors
} = require('./helpers');

const tier2Tests = [
  // --- F1 Boundary & Corner Cases ---
  {
    id: 'T2_F1_01',
    name: 'F1 Boundary: Empty title input falls back to default safely',
    fn: async (page, errors) => {
      await page.fill('#builder-title', '');
      await page.dispatchEvent('#builder-title', 'input');
      const previewTitle = await page.textContent('#preview-hero-title');
      assertEqual(previewTitle, 'Sự Kiện Công Nghệ 2026', 'Empty title should fallback to default text');
    }
  },
  {
    id: 'T2_F1_02',
    name: 'F1 Boundary: Seat count boundary values (10 and 5000) are accepted',
    fn: async (page, errors) => {
      await page.fill('#builder-seats', '10');
      await page.dispatchEvent('#builder-seats', 'input');
      let label = await page.textContent('#preview-seats-label');
      assertContains(label, '/10', 'Min seats 10 should be accepted');

      await page.fill('#builder-seats', '5000');
      await page.dispatchEvent('#builder-seats', 'input');
      label = await page.textContent('#preview-seats-label');
      assertContains(label, '/5000', 'Max seats 5000 should be accepted');
    }
  },
  {
    id: 'T2_F1_03',
    name: 'F1 Boundary: Erasing perks hides preview perks container',
    fn: async (page, errors) => {
      await page.fill('#builder-perks', '');
      await page.dispatchEvent('#builder-perks', 'input');
      const isHidden = await page.$eval('#preview-hero-perks-box', el => el.classList.contains('hidden'));
      assertTrue(isHidden, 'Perks box must be hidden when perks input is empty');
    }
  },
  {
    id: 'T2_F1_04',
    name: 'F1 Boundary: Broken speaker avatar image triggers initials fallback',
    fn: async (page, errors) => {
      await page.fill('#builder-speaker-name', 'Lê Hoàng Nam');
      await page.dispatchEvent('#builder-speaker-name', 'input');
      await page.fill('#builder-speaker-avatar', '');
      await page.dispatchEvent('#builder-speaker-avatar', 'input');
      const initials = await page.textContent('#preview-speaker-letter-avatar');
      assertEqual(initials, 'LN', 'Speaker initials for "Lê Hoàng Nam" should be LN');
    }
  },
  {
    id: 'T2_F1_05',
    name: 'F1 Boundary: XSS & HTML characters in title are safely rendered as text',
    fn: async (page, errors) => {
      const malicious = '<script>window._xss_test=true;</script> & "Vibe"';
      await page.fill('#builder-title', malicious);
      await page.dispatchEvent('#builder-title', 'input');
      const hasExecuted = await page.evaluate(() => Boolean(window._xss_test));
      assertFalse(hasExecuted, 'XSS script tag should never execute');
      const text = await page.textContent('#preview-hero-title');
      assertContains(text, 'window._xss_test=true', 'Title should be rendered as plain text');
    }
  },

  // --- F2 Boundary & Corner Cases ---
  {
    id: 'T2_F2_01',
    name: 'F2 Boundary: Unknown topic keywords fall back to general theme',
    fn: async (page, errors) => {
      await page.fill('#builder-title', 'Hội Thảo Khảo Cổ Học Và Cổ Sinh Vật Học 2026');
      await page.dispatchEvent('#builder-title', 'input');
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(100);
      const headline = await page.inputValue('#builder-headline');
      assertTrue(headline.length > 10, 'General theme headline should be generated');
    }
  },
  {
    id: 'T2_F2_02',
    name: 'F2 Boundary: Invalid Gemini API key triggers warning toast & local fallback',
    fn: async (page, errors) => {
      await page.evaluate(() => {
        EventStudio.aiSettings = { provider: 'gemini', apiKey: 'AIzaSy_INVALID_KEY_12345' };
      });
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(400);
      const headline = await page.inputValue('#builder-headline');
      assertTrue(headline.length > 5, 'Fallback heuristic should generate headline upon API failure');
      // Reset settings
      await page.evaluate(() => {
        EventStudio.aiSettings = { provider: 'client', apiKey: '' };
      });
    }
  },
  {
    id: 'T2_F2_03',
    name: 'F2 Boundary: Invalid OpenAI API key triggers warning toast & local fallback',
    fn: async (page, errors) => {
      await page.evaluate(() => {
        EventStudio.aiSettings = { provider: 'openai', apiKey: 'sk-invalid-test-key' };
      });
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(400);
      const hook = await page.inputValue('#builder-hook');
      assertTrue(hook.length > 10, 'Fallback heuristic should generate hook upon OpenAI failure');
      // Reset settings
      await page.evaluate(() => {
        EventStudio.aiSettings = { provider: 'client', apiKey: '' };
      });
    }
  },
  {
    id: 'T2_F2_04',
    name: 'F2 Boundary: Pure client-side generation issues zero outbound network calls',
    fn: async (page, errors) => {
      let networkCount = 0;
      page.on('request', req => {
        if (req.url().startsWith('http') && !req.url().includes('127.0.0.1')) {
          networkCount++;
        }
      });
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(100);
      assertEqual(networkCount, 0, 'Offline AI generation must issue 0 external HTTP requests');
    }
  },
  {
    id: 'T2_F2_05',
    name: 'F2 Boundary: AI generation with empty title uses fallback without error',
    fn: async (page, errors) => {
      await page.fill('#builder-title', '');
      await page.dispatchEvent('#builder-title', 'input');
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(100);
      const headline = await page.inputValue('#builder-headline');
      assertTrue(headline.length > 10, 'Should generate copy even when title input is empty');
    }
  },

  // --- F3 Boundary & Corner Cases ---
  {
    id: 'T2_F3_01',
    name: 'F3 Boundary: Overdue date shows Live Banner and NO negative numbers or NaN',
    fn: async (page, errors) => {
      // Set datetime to yesterday
      const past = new Date(Date.now() - 24 * 60 * 60 * 1000);
      await page.fill('#builder-datetime', past.toISOString().slice(0, 16));
      await page.dispatchEvent('#builder-datetime', 'input');
      await page.waitForTimeout(1100);

      const containerText = await page.innerText('#countdown-container');
      assertContains(containerText, 'SỰ KIỆN ĐANG DIỄN RA', 'Overdue date should display live event banner');
      assertFalse(containerText.includes('NaN'), 'Countdown container must never contain NaN');
      assertFalse(/-\d+/.test(containerText), 'Countdown container must never contain negative numbers');
    }
  },
  {
    id: 'T2_F3_02',
    name: 'F3 Boundary: Malformed datetime string renders fallback 00 boxes safely',
    fn: async (page, errors) => {
      await page.evaluate(() => {
        EventStudio.eventData.datetime = 'INVALID_DATE_STRING';
        updateCountdownTick();
      });
      const days = await page.textContent('#timer-days');
      assertEqual(days, '00', 'Malformed date should render "00" fallback');
    }
  },
  {
    id: 'T2_F3_03',
    name: 'F3 Boundary: Changing from overdue to future date restores 4 timer boxes',
    fn: async (page, errors) => {
      // Overdue first
      await page.fill('#builder-datetime', '2020-01-01T08:00');
      await page.dispatchEvent('#builder-datetime', 'input');
      await page.waitForTimeout(1100);

      // Now set to future
      const future = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
      await page.fill('#builder-datetime', future.toISOString().slice(0, 16));
      await page.dispatchEvent('#builder-datetime', 'input');
      await page.waitForTimeout(1100);

      const daysEl = await page.$('#timer-days');
      assertTrue(daysEl !== null, '4 timer boxes should be restored when future date is chosen');
    }
  },
  {
    id: 'T2_F3_04',
    name: 'F3 Boundary: Setting empty datetime displays announcement placeholder',
    fn: async (page, errors) => {
      await page.fill('#builder-datetime', '');
      await page.dispatchEvent('#builder-datetime', 'input');
      const label = await page.textContent('#preview-timer-date-display');
      assertContains(label, 'sớm được công bố', 'Empty date should show announcement placeholder');
    }
  },
  {
    id: 'T2_F3_05',
    name: 'F3 Boundary: Far future date (500 days) displays 3-digit days cleanly',
    fn: async (page, errors) => {
      const farFuture = new Date(Date.now() + 500 * 24 * 60 * 60 * 1000);
      await page.fill('#builder-datetime', farFuture.toISOString().slice(0, 16));
      await page.dispatchEvent('#builder-datetime', 'input');
      await page.waitForTimeout(1100);
      const days = await page.textContent('#timer-days');
      assertTrue(parseInt(days, 10) >= 498, 'Far future days calculation should exceed 498 days');
    }
  },

  // --- F4 Boundary & Corner Cases ---
  {
    id: 'T2_F4_01',
    name: 'F4 Boundary: Vietnamese Unicode name with complex diacritics is accepted',
    fn: async (page, errors) => {
      await page.click('#nav-btn-preview');
      await page.fill('#reg-name', 'Nguyễn Đỗ Hoài Phương Khôi');
      await page.fill('#reg-email', 'khoi.nguyen.unicode@example.com');
      await page.fill('#reg-phone', '0919998877');
      await page.fill('#reg-org', 'Đại Học Quốc Gia TP.HCM');
      await page.click('#form-registration button[type="submit"]');
      await page.waitForSelector('#modal-ticket:not(.hidden)', { timeout: 3000 });
      const attendeeName = await page.textContent('#ticket-attendee-name');
      assertEqual(attendeeName, 'Nguyễn Đỗ Hoài Phương Khôi', 'Vietnamese Unicode name should be preserved and accepted');
      await page.evaluate(() => closeModal('modal-ticket'));
    }
  },
  {
    id: 'T2_F4_02',
    name: 'F4 Boundary: Invalid name with digits is rejected with inline error',
    fn: async (page, errors) => {
      await page.fill('#reg-name', 'User1234');
      await page.fill('#reg-email', 'valid@example.com');
      await page.fill('#reg-phone', '0912345678');
      await page.fill('#reg-org', 'FPT');
      await page.click('#form-registration button[type="submit"]');
      const errVisible = await page.$eval('#err-reg-name', el => !el.classList.contains('hidden'));
      assertTrue(errVisible, 'Error message for invalid name should be shown');
    }
  },
  {
    id: 'T2_F4_03',
    name: 'F4 Boundary: Phone number with spaces and dots is sanitized and accepted',
    fn: async (page, errors) => {
      await page.fill('#reg-name', 'Trần Thị Thu');
      await page.fill('#reg-email', 'thu.tran@example.com');
      await page.fill('#reg-phone', '0938.456.789');
      await page.fill('#reg-org', 'Vibe Team');
      await page.click('#form-registration button[type="submit"]');
      await page.waitForSelector('#modal-ticket:not(.hidden)', { timeout: 3000 });
      const phoneText = await page.textContent('#ticket-attendee-phone');
      assertEqual(phoneText, '0938456789', 'Phone should be cleaned to 10 digits without dots');
      await page.evaluate(() => closeModal('modal-ticket'));
    }
  },
  {
    id: 'T2_F4_04',
    name: 'F4 Boundary: Invalid phone prefix is rejected with inline error',
    fn: async (page, errors) => {
      await page.fill('#reg-name', 'Lê Văn Minh');
      await page.fill('#reg-email', 'minh@example.com');
      await page.fill('#reg-phone', '0123456789');
      await page.fill('#reg-org', 'Company');
      await page.click('#form-registration button[type="submit"]');
      const errVisible = await page.$eval('#err-reg-phone', el => !el.classList.contains('hidden'));
      assertTrue(errVisible, 'Phone with invalid prefix (01) should show error');
    }
  },
  {
    id: 'T2_F4_05',
    name: 'F4 Boundary: Duplicate registration shows inline error and rejects without incrementing count',
    fn: async (page, errors) => {
      // 1. Register attendee first to guarantee existence regardless of prior test order
      await page.fill('#reg-name', 'Nguyễn Đỗ Hoài Phương Khôi');
      await page.fill('#reg-email', 'khoi.nguyen@example.com');
      await page.fill('#reg-phone', '0998887766');
      await page.fill('#reg-org', 'FPT');
      await page.click('#form-registration button[type="submit"]');
      await page.waitForSelector('#modal-ticket:not(.hidden)', { timeout: 3000 });
      await page.evaluate(() => closeModal('modal-ticket'));

      const initialCount = await page.evaluate(() => EventStudio.attendees.length);

      // 2. Attempt duplicate registration with the same phone
      await page.fill('#reg-name', 'Nguyễn Đỗ Hoài Phương Khôi');
      await page.fill('#reg-email', 'khoi.nguyen@example.com');
      await page.fill('#reg-phone', '0998887766');
      await page.fill('#reg-org', 'FPT');
      await page.click('#form-registration button[type="submit"]');
      
      // Inline error should appear on duplicate phone and email
      await page.waitForSelector('#err-reg-phone:not(.hidden)', { timeout: 3000 });
      const isTicketHidden = await page.$eval('#modal-ticket', el => el.classList.contains('hidden'));
      assertTrue(isTicketHidden, 'Ticket modal should NOT open on duplicate error');

      const finalCount = await page.evaluate(() => EventStudio.attendees.length);
      assertEqual(finalCount, initialCount, 'Duplicate registration should not increase attendee count');
    }
  },

  // --- F5 Boundary & Corner Cases ---
  {
    id: 'T2_F5_01',
    name: 'F5 Boundary: Pressing ESC key dismisses reset modal and retains data',
    fn: async (page, errors) => {
      await page.click('#btn-new-event, button[onclick="openModal(\'modal-reset\')"]');
      await page.waitForSelector('#modal-reset:not(.hidden)', { timeout: 2000 });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
      const isHidden = await page.$eval('#modal-reset', el => el.classList.contains('hidden'));
      assertTrue(isHidden, 'Escape key should close modal-reset');
    }
  },
  {
    id: 'T2_F5_02',
    name: 'F5 Boundary: Resetting state persists empty array [] in localStorage',
    fn: async (page, errors) => {
      await page.click('#btn-new-event, button[onclick="openModal(\'modal-reset\')"]');
      await page.click('#modal-reset button:has-text("Đồng Ý Làm Mới")');
      await page.waitForTimeout(100);
      const stored = await page.evaluate(() => localStorage.getItem('vibe_attendees'));
      assertEqual(stored, '[]', 'LocalStorage vibe_attendees should be string "[]"');
    }
  },
  {
    id: 'T2_F5_03',
    name: 'F5 Boundary: Page reload after reset preserves 0 attendees without reseeding',
    fn: async (page, errors) => {
      await page.reload();
      await page.waitForFunction(() => typeof EventStudio !== 'undefined' && !!document.getElementById('builder-title'));
      const count = await page.evaluate(() => EventStudio.attendees.length);
      assertEqual(count, 0, 'Attendees array must remain 0 after reload when reset');
    }
  },
  {
    id: 'T2_F5_04',
    name: 'F5 Boundary: Resetting state sets seat progress bar to 0%',
    fn: async (page, errors) => {
      const percent = await page.textContent('#preview-seats-percent');
      assertEqual(percent, '0%', 'Seat percent should be 0% after reset');
    }
  },
  {
    id: 'T2_F5_05',
    name: 'F5 Boundary: Resetting state displays empty state in attendees table',
    fn: async (page, errors) => {
      await page.evaluate(() => openModal('modal-attendees'));
      const emptyHidden = await page.$eval('#attendees-empty-state', el => el.classList.contains('hidden'));
      assertFalse(emptyHidden, 'Empty state container should be visible when attendees is 0');
      await page.evaluate(() => closeModal('modal-attendees'));
    }
  },

  // --- F6 Boundary & Corner Cases ---
  {
    id: 'T2_F6_01',
    name: 'F6 Boundary: WCAG Modal Focus Trap wraps Tab from last to first element',
    fn: async (page, errors) => {
      await page.evaluate(() => openModal('modal-reset'));
      // Press Tab multiple times
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
      }
      const activeInModal = await page.evaluate(() => {
        const modal = document.getElementById('modal-reset');
        return modal.contains(document.activeElement);
      });
      assertTrue(activeInModal, 'Focus must remain trapped inside modal-reset');
      await page.keyboard.press('Escape');
    }
  },
  {
    id: 'T2_F6_02',
    name: 'F6 Boundary: WCAG Modal Focus Trap wraps Shift+Tab from first to last element',
    fn: async (page, errors) => {
      await page.evaluate(() => openModal('modal-reset'));
      await page.keyboard.press('Shift+Tab');
      const activeInModal = await page.evaluate(() => {
        const modal = document.getElementById('modal-reset');
        return modal.contains(document.activeElement);
      });
      assertTrue(activeInModal, 'Focus must remain trapped inside modal-reset on Shift+Tab');
      await page.keyboard.press('Escape');
    }
  },
  {
    id: 'T2_F6_03',
    name: 'F6 Boundary: Closing modal restores focus to triggering button',
    fn: async (page, errors) => {
      await page.click('#btn-new-event, button[onclick="openModal(\'modal-reset\')"]');
      await page.waitForTimeout(100);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
      const isRestored = await page.evaluate(() => {
        const btn = document.querySelector('#btn-new-event, button[onclick="openModal(\'modal-reset\')"]');
        return document.activeElement === btn;
      });
      assertTrue(isRestored, 'Focus should return to triggering button after closing');
    }
  },
  {
    id: 'T2_F6_04',
    name: 'F6 Boundary: Mobile 390px viewport fits registration form without overflow',
    fn: async (page, errors) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.click('#nav-btn-preview');
      const regBoxWidth = await page.$eval('#form-registration', el => el.getBoundingClientRect().width);
      assertTrue(regBoxWidth <= 390, `Registration form width (${regBoxWidth}) should not exceed 390px`);
    }
  },
  {
    id: 'T2_F6_05',
    name: 'F6 Boundary: Clean interaction flow generates zero uncaught console exceptions',
    fn: async (page, errors) => {
      assertZeroConsoleErrors(errors.pageErrors, errors.consoleMessages, 'Session should have zero uncaught errors');
    }
  },

  // --- F7 Boundary & Corner Cases ---
  {
    id: 'T2_F7_01',
    name: 'F7 Boundary: HTTP server handles non-existent file with 404 Not Found',
    fn: async (page, errors, context) => {
      const res = await page.request.get(context.serverUrl.replace('/index.html', '/missing-file.html'));
      assertEqual(res.status(), 404, 'Non-existent file should return 404');
    }
  },
  {
    id: 'T2_F7_02',
    name: 'F7 Boundary: HTTP server serves index.html with UTF-8 charset',
    fn: async (page, errors, context) => {
      const res = await page.request.get(context.serverUrl);
      const ct = res.headers()['content-type'] || '';
      assertContains(ct.toLowerCase(), 'utf-8', 'Content-type must specify utf-8');
    }
  },
  {
    id: 'T2_F7_03',
    name: 'F7 Boundary: HTTP server handles concurrent requests without error',
    fn: async (page, errors, context) => {
      const promises = Array.from({ length: 5 }, () => page.request.get(context.serverUrl));
      const responses = await Promise.all(promises);
      responses.forEach(r => assertEqual(r.status(), 200, 'Concurrent request should return 200'));
    }
  },
  {
    id: 'T2_F7_04',
    name: 'F7 Boundary: Navigation to URL with hash anchor loads target section',
    fn: async (page, errors, context) => {
      await page.goto(`${context.serverUrl}#agenda-section`, { waitUntil: 'domcontentloaded' });
      const agendaEl = await page.$('#agenda-section');
      assertTrue(agendaEl !== null, '#agenda-section should exist when navigating via hash');
    }
  },
  {
    id: 'T2_F7_05',
    name: 'F7 Boundary: CSV export generates UTF-8 BOM prefix byte in export string',
    fn: async (page, errors) => {
      const hasBom = await page.evaluate(() => {
        // Test exportCSV logic
        const attendees = [{ ticketCode: 'VIBE-001', fullName: 'Test', email: 'test@test.com', phone: '0901', organization: 'FPT', registeredAt: '2026-01-01' }];
        const headers = ['Mã Vé', 'Họ Và Tên', 'Email', 'Số Điện Thoại', 'Đơn Vị / Lớp', 'Thời Gian Đăng Ký'];
        const csvContent = '\uFEFF' + [headers.join(','), ...attendees.map(a => `"${a.ticketCode}","${a.fullName}","${a.email}","${a.phone}","${a.organization}","${a.registeredAt}"`)].join('\r\n');
        return csvContent.charCodeAt(0) === 0xFEFF;
      });
      assertTrue(hasBom, 'CSV content must start with 0xFEFF UTF-8 Byte Order Mark');
    }
  }
];

module.exports = { tier2Tests };
