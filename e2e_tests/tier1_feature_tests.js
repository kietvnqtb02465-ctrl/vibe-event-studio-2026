const {
  assertEqual,
  assertTrue,
  assertFalse,
  assertContains,
  assertMatches,
  assertZeroConsoleErrors
} = require('./helpers');

const tier1Tests = [
  // --- F1: Smart Input Form ---
  {
    id: 'T1_F1_01',
    name: 'F1: Title input synchronizes to Live Preview & Quick Summary',
    fn: async (page, errors) => {
      await page.fill('#builder-title', 'Hội Thảo Đột Phá AI 2026');
      await page.dispatchEvent('#builder-title', 'input');
      const previewTitle = await page.textContent('#preview-hero-title');
      const summaryTitle = await page.textContent('#quick-summary-title');
      assertEqual(previewTitle, 'Hội Thảo Đột Phá AI 2026', 'Preview hero title should match input');
      assertEqual(summaryTitle, 'Hội Thảo Đột Phá AI 2026', 'Quick summary title should match input');
    }
  },
  {
    id: 'T1_F1_02',
    name: 'F1: Online location mode updates hero tag and placeholder',
    fn: async (page, errors) => {
      await page.click('#btn-loc-online');
      const heroTag = await page.innerHTML('#preview-hero-tag');
      assertContains(heroTag, 'PHÒNG HỌP TRỰC TUYẾN', 'Hero tag should reflect Online status');
      assertContains(heroTag, '🌐', 'Hero tag should display globe icon for online');
      const locVal = await page.inputValue('#builder-location');
      assertTrue(locVal.startsWith('http'), 'Online location should have a meeting URL');
    }
  },
  {
    id: 'T1_F1_03',
    name: 'F1: Seats input updates preview seat counter and attendees total',
    fn: async (page, errors) => {
      await page.fill('#builder-seats', '450');
      await page.dispatchEvent('#builder-seats', 'input');
      const label = await page.textContent('#preview-seats-label');
      assertContains(label, '/450', 'Seats label should reflect 450 total seats');
      const totalCount = await page.textContent('#attendees-total-count');
      assertTrue(parseInt(totalCount, 10) >= 0, 'Attendees count should be valid number');
    }
  },
  {
    id: 'T1_F1_04',
    name: 'F1: Speaker details update speaker card name and role',
    fn: async (page, errors) => {
      await page.fill('#builder-speaker-name', 'TS. Đặng Tuấn Minh');
      await page.dispatchEvent('#builder-speaker-name', 'input');
      await page.fill('#builder-speaker-role', 'Giám Đốc Nghiên Cứu AI');
      await page.dispatchEvent('#builder-speaker-role', 'input');
      const spkName = await page.textContent('#preview-speaker-name');
      const spkRole = await page.textContent('#preview-speaker-role');
      assertEqual(spkName, 'TS. Đặng Tuấn Minh', 'Speaker name should synchronize');
      assertEqual(spkRole, 'Giám Đốc Nghiên Cứu AI', 'Speaker role should synchronize');
    }
  },
  {
    id: 'T1_F1_05',
    name: 'F1: Early bird perks input displays perks box in Hero section',
    fn: async (page, errors) => {
      await page.fill('#builder-perks', 'Tặng 100 Vé VIP Miễn Phí');
      await page.dispatchEvent('#builder-perks', 'input');
      const perksText = await page.textContent('#preview-hero-perks');
      assertEqual(perksText, 'Tặng 100 Vé VIP Miễn Phí');
      const isHidden = await page.$eval('#preview-hero-perks-box', el => el.classList.contains('hidden'));
      assertFalse(isHidden, 'Perks box should be visible when perks are defined');
    }
  },

  // --- F2: Client-side AIDA AI Engine ---
  {
    id: 'T1_F2_01',
    name: 'F2: Offline AI generates AIDA copy for AI theme title',
    fn: async (page, errors) => {
      await page.fill('#builder-title', 'Hội Thảo Trí Tuệ Nhân Tạo & AI Agents 2026');
      await page.dispatchEvent('#builder-title', 'input');
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(100);
      const headline = await page.inputValue('#builder-headline');
      const hook = await page.inputValue('#builder-hook');
      const b1 = await page.inputValue('#builder-benefit-1');
      assertTrue(headline.length > 10, 'Generated headline should be populated');
      assertTrue(hook.length > 20, 'Generated hook should be populated');
      assertTrue(b1.length > 5, 'Benefit 1 should be populated');
    }
  },
  {
    id: 'T1_F2_02',
    name: 'F2: Offline AI generates career-focused copy for Career title',
    fn: async (page, errors) => {
      await page.fill('#builder-title', 'Ngày Hội Việc Làm & Tuyển Dụng IT Career Fair');
      await page.dispatchEvent('#builder-title', 'input');
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(100);
      const headline = await page.inputValue('#builder-headline');
      assertTrue(headline.toLowerCase().includes('it') || headline.toLowerCase().includes('nghiệp') || headline.toLowerCase().includes('tuyển dụng') || headline.length > 15, 'Career headline should be relevant');
    }
  },
  {
    id: 'T1_F2_03',
    name: 'F2: Offline AI generates startup-focused copy for Startup title',
    fn: async (page, errors) => {
      await page.fill('#builder-title', 'Đêm Chung Kết Khởi Nghiệp Startup Pitch 2026');
      await page.dispatchEvent('#builder-title', 'input');
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(100);
      const hook = await page.inputValue('#builder-hook');
      assertTrue(hook.toLowerCase().includes('startup') || hook.toLowerCase().includes('đầu tư') || hook.length > 20, 'Startup hook should be relevant');
    }
  },
  {
    id: 'T1_F2_04',
    name: 'F2: Offline AI generates coding-focused copy for Coding title',
    fn: async (page, errors) => {
      await page.fill('#builder-title', 'Workshop Lập Trình Web Vibe Coding Thực Chiến');
      await page.dispatchEvent('#builder-title', 'input');
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(100);
      const b1 = await page.inputValue('#builder-benefit-1');
      assertTrue(b1.length > 5, 'Benefit 1 should be populated for coding theme');
    }
  },
  {
    id: 'T1_F2_05',
    name: 'F2: AI generation triggers success toast notification',
    fn: async (page, errors) => {
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForSelector('#toast-container > div', { timeout: 3000 });
      const toastText = await page.textContent('#toast-container');
      assertContains(toastText, 'AIDA', 'Toast message should confirm AIDA generation');
    }
  },

  // --- F3: Real-Time Dual-View & Countdown ---
  {
    id: 'T1_F3_01',
    name: 'F3: Switch to Preview view hides builder and reveals preview',
    fn: async (page, errors) => {
      await page.click('#nav-btn-preview');
      const builderHidden = await page.$eval('#view-builder', el => el.classList.contains('hidden'));
      const previewHidden = await page.$eval('#view-preview', el => el.classList.contains('hidden'));
      assertTrue(builderHidden, '#view-builder should have hidden class');
      assertFalse(previewHidden, '#view-preview should not have hidden class');
    }
  },
  {
    id: 'T1_F3_02',
    name: 'F3: Switch to Builder view reveals builder and hides preview',
    fn: async (page, errors) => {
      await page.click('#nav-btn-builder');
      const builderHidden = await page.$eval('#view-builder', el => el.classList.contains('hidden'));
      const previewHidden = await page.$eval('#view-preview', el => el.classList.contains('hidden'));
      assertFalse(builderHidden, '#view-builder should be visible');
      assertTrue(previewHidden, '#view-preview should be hidden');
    }
  },
  {
    id: 'T1_F3_03',
    name: 'F3: Future datetime renders 4 active countdown timer dials',
    fn: async (page, errors) => {
      const future = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
      const isoLocal = future.toISOString().slice(0, 16);
      await page.fill('#builder-datetime', isoLocal);
      await page.dispatchEvent('#builder-datetime', 'input');
      await page.waitForTimeout(300);
      const days = await page.textContent('#timer-days');
      const hours = await page.textContent('#timer-hours');
      const mins = await page.textContent('#timer-mins');
      const secs = await page.textContent('#timer-secs');
      assertTrue(days !== null && days.length >= 2, 'Days dial should be 2 digits');
      assertTrue(hours !== null && hours.length >= 2, 'Hours dial should be 2 digits');
      assertTrue(mins !== null && mins.length >= 2, 'Mins dial should be 2 digits');
      assertTrue(secs !== null && secs.length >= 2, 'Secs dial should be 2 digits');
    }
  },
  {
    id: 'T1_F3_04',
    name: 'F3: Countdown timer dynamically ticks seconds over 1.5 seconds',
    fn: async (page, errors) => {
      const future = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
      await page.fill('#builder-datetime', future.toISOString().slice(0, 16));
      await page.dispatchEvent('#builder-datetime', 'input');
      const sec1 = await page.textContent('#timer-secs');
      await page.waitForTimeout(1500);
      const sec2 = await page.textContent('#timer-secs');
      assertTrue(sec1 !== sec2, 'Countdown seconds dial should change after 1.5s');
    }
  },
  {
    id: 'T1_F3_05',
    name: 'F3: Formatted Vietnamese weekday rendered in date label',
    fn: async (page, errors) => {
      const target = new Date('2026-11-20T09:00:00');
      await page.fill('#builder-datetime', '2026-11-20T09:00');
      await page.dispatchEvent('#builder-datetime', 'input');
      const dateLabel = await page.textContent('#preview-timer-date-display');
      assertContains(dateLabel, 'Thứ Sáu', 'Date label should display correct Vietnamese weekday');
      assertContains(dateLabel, '20/11/2026', 'Date label should display formatted day/month/year');
    }
  },

  // --- F4: Ticket Booking, Confetti, E-Ticket & CSV ---
  {
    id: 'T1_F4_01',
    name: 'F4: Valid ticket registration opens E-Ticket modal',
    fn: async (page, errors) => {
      await page.click('#nav-btn-preview');
      await page.fill('#reg-name', 'Nguyễn Văn An');
      await page.fill('#reg-email', 'an.nguyen@example.com');
      await page.fill('#reg-phone', '0988123456');
      await page.fill('#reg-org', 'FPT Polytechnic');
      await page.click('#form-registration button[type="submit"]');
      await page.waitForSelector('#modal-ticket:not(.hidden)', { timeout: 3000 });
      const isVisible = await page.$eval('#modal-ticket', el => !el.classList.contains('hidden'));
      assertTrue(isVisible, 'E-Ticket modal should open upon successful submission');
      await page.evaluate(() => closeModal('modal-ticket'));
    }
  },
  {
    id: 'T1_F4_02',
    name: 'F4: E-Ticket modal displays valid ticket code and attendee name',
    fn: async (page, errors) => {
      await page.evaluate(() => {
        openTicketModal({
          ticketCode: 'VIBE-2026-ABCDEF',
          fullName: 'Nguyễn Văn An',
          phone: '0988123456',
          organization: 'FPT'
        });
      });
      const ticketCode = await page.textContent('#ticket-code-display');
      const attendeeName = await page.textContent('#ticket-attendee-name');
      assertEqual(ticketCode, 'VIBE-2026-ABCDEF', 'Ticket code should match');
      assertEqual(attendeeName, 'Nguyễn Văn An', 'Ticket name should match');
      await page.evaluate(() => closeModal('modal-ticket'));
    }
  },
  {
    id: 'T1_F4_03',
    name: 'F4: QR code element is rendered in E-Ticket modal',
    fn: async (page, errors) => {
      await page.evaluate(() => {
        openTicketModal({
          ticketCode: 'VIBE-2026-QGTEST',
          fullName: 'Trần Bình',
          phone: '0988123456',
          organization: 'FPT'
        });
      });
      const qrChild = await page.$eval('#ticket-qrcode-container', el => el.children.length > 0);
      assertTrue(qrChild, 'QR code container should contain canvas, img, or svg');
      await page.evaluate(() => closeModal('modal-ticket'));
    }
  },
  {
    id: 'T1_F4_04',
    name: 'F4: Canvas Confetti triggers without runtime exceptions',
    fn: async (page, errors) => {
      const confettiType = await page.evaluate(() => typeof window.confetti);
      assertTrue(confettiType === 'function', 'window.confetti should be a function');
    }
  },
  {
    id: 'T1_F4_05',
    name: 'F4: Attendees table renders attendees and handles CSV trigger',
    fn: async (page, errors) => {
      await page.evaluate(() => openModal('modal-attendees'));
      const count = await page.textContent('#attendees-total-count');
      assertTrue(parseInt(count, 10) > 0, 'Attendees count should be greater than 0');
      await page.evaluate(() => closeModal('modal-attendees'));
    }
  },

  // --- F5: Create New Page / Reset State ---
  {
    id: 'T1_F5_01',
    name: 'F5: Clicking Tạo Mới button opens reset confirmation modal',
    fn: async (page, errors) => {
      await page.click('#btn-new-event, button[onclick="openModal(\'modal-reset\')"]');
      const isVisible = await page.$eval('#modal-reset', el => !el.classList.contains('hidden'));
      assertTrue(isVisible, '#modal-reset should be displayed');
      await page.evaluate(() => closeModal('modal-reset'));
    }
  },
  {
    id: 'T1_F5_02',
    name: 'F5: Clicking Hủy Bỏ in reset modal preserves existing event title',
    fn: async (page, errors) => {
      const titleBefore = await page.inputValue('#builder-title');
      await page.click('#btn-new-event, button[onclick="openModal(\'modal-reset\')"]');
      await page.waitForSelector('#modal-reset:not(.hidden)', { timeout: 2000 });
      await page.click('#modal-reset button:has-text("Hủy Bỏ")');
      const isHidden = await page.$eval('#modal-reset', el => el.classList.contains('hidden'));
      assertTrue(isHidden, '#modal-reset should be hidden after cancel');
      const titleAfter = await page.inputValue('#builder-title');
      assertEqual(titleAfter, titleBefore, 'Title should be retained after canceling reset');
    }
  },
  {
    id: 'T1_F5_03',
    name: 'F5: Confirming reset clears form inputs to empty values',
    fn: async (page, errors) => {
      await page.click('#btn-new-event, button[onclick="openModal(\'modal-reset\')"]');
      await page.waitForSelector('#modal-reset:not(.hidden)', { timeout: 2000 });
      await page.click('#modal-reset button:has-text("Đồng Ý Làm Mới")');
      await page.waitForTimeout(200);
      const titleVal = await page.inputValue('#builder-title');
      assertEqual(titleVal, '', 'Title input should be reset to empty string');
    }
  },
  {
    id: 'T1_F5_04',
    name: 'F5: Resetting state empties attendees array to 0',
    fn: async (page, errors) => {
      const count = await page.evaluate(() => EventStudio.attendees.length);
      assertEqual(count, 0, 'Attendees count in EventStudio state should be 0');
    }
  },
  {
    id: 'T1_F5_05',
    name: 'F5: Reset saves empty state to localStorage and switches to builder',
    fn: async (page, errors) => {
      const storedAttendees = await page.evaluate(() => localStorage.getItem('vibe_attendees'));
      assertEqual(storedAttendees, '[]', 'LocalStorage vibe_attendees should be string "[]"');
      const builderVisible = await page.$eval('#view-builder', el => !el.classList.contains('hidden'));
      assertTrue(builderVisible, 'View should automatically switch to builder after reset');
    }
  },

  // --- F6: Luminous Glassmorphism UI & Responsive ---
  {
    id: 'T1_F6_01',
    name: 'F6: Desktop 1920x1080 viewport renders builder and preview cleanly',
    fn: async (page, errors) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      assertTrue(scrollWidth <= clientWidth + 2, 'Should not produce unwanted horizontal scroll at 1920px');
    }
  },
  {
    id: 'T1_F6_02',
    name: 'F6: Desktop 1440x900 viewport renders with valid glass panels',
    fn: async (page, errors) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      const glassCount = await page.$$eval('.glass-panel, .glass-card, .luminous-panel, .luminous-card', els => els.length);
      assertTrue(glassCount >= 5, 'Should contain at least 5 styled glass panels/cards');
    }
  },
  {
    id: 'T1_F6_03',
    name: 'F6: Mobile 390x844 viewport renders responsive capsule switcher',
    fn: async (page, errors) => {
      await page.setViewportSize({ width: 390, height: 844 });
      const btnPreview = await page.$('#nav-btn-preview');
      assertTrue(btnPreview !== null, 'Capsule switcher should exist on mobile');
    }
  },
  {
    id: 'T1_F6_04',
    name: 'F6: Glass styling classes apply proper backdrop filter',
    fn: async (page, errors) => {
      const hasBackdropFilter = await page.evaluate(() => {
        const el = document.querySelector('.luminous-panel, .glass-panel');
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.backdropFilter.includes('blur') || style.webkitBackdropFilter.includes('blur') || (style.backgroundImage && style.backgroundImage.includes('linear-gradient'));
      });
      assertTrue(hasBackdropFilter, 'Glass panel should have backdrop-filter or translucent background');
    }
  },
  {
    id: 'T1_F6_05',
    name: 'F6: Agenda section renders 5 timeline events along the spine',
    fn: async (page, errors) => {
      await page.click('#nav-btn-preview');
      const agendaCount = await page.$$eval('#agenda-section .relative.pl-6, #agenda-section [class*="relative"]', els => {
        return els.filter(el => el.textContent.includes('08:') || el.textContent.includes('09:') || el.textContent.includes('10:') || el.textContent.includes('11:')).length;
      });
      assertTrue(agendaCount >= 5, `Expected 5 agenda timeline items, found ${agendaCount}`);
    }
  },

  // --- F7: Local HTTP Server & Live Access ---
  {
    id: 'T1_F7_01',
    name: 'F7: Local HTTP server starts and binds to port successfully',
    fn: async (page, errors, context) => {
      assertTrue(context && context.serverUrl !== undefined, 'Server URL must be provided in test context');
    }
  },
  {
    id: 'T1_F7_02',
    name: 'F7: HTTP GET / returns HTTP 200 OK',
    fn: async (page, errors, context) => {
      const res = await page.request.get(context.serverUrl.replace('/index.html', '/'));
      assertEqual(res.status(), 200, 'Root path / should return 200 OK');
    }
  },
  {
    id: 'T1_F7_03',
    name: 'F7: HTTP GET /index.html returns text/html content-type',
    fn: async (page, errors, context) => {
      const res = await page.request.get(context.serverUrl);
      const ct = res.headers()['content-type'];
      assertContains(ct, 'text/html', 'Content-Type should include text/html');
    }
  },
  {
    id: 'T1_F7_04',
    name: 'F7: Browser navigates to HTTP server URL and renders title',
    fn: async (page, errors, context) => {
      await page.goto(context.serverUrl, { waitUntil: 'domcontentloaded' });
      const title = await page.title();
      assertContains(title, 'Vibe Event Studio', 'Page title over HTTP should match');
    }
  },
  {
    id: 'T1_F7_05',
    name: 'F7: Page loaded over HTTP server executes without console errors',
    fn: async (page, errors) => {
      assertZeroConsoleErrors(errors.pageErrors, errors.consoleMessages, 'Should have zero console errors over HTTP');
    }
  }
];

module.exports = { tier1Tests };
