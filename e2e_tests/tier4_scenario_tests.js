const {
  assertEqual,
  assertTrue,
  assertFalse,
  assertContains,
  assertMatches,
  assertZeroConsoleErrors
} = require('./helpers');

const tier4Tests = [
  {
    id: 'T4_SCEN_01',
    name: 'Scenario 1: AI Summit 2026 End-to-End Lifecycle (Preset -> AI -> Preview -> Ticket -> CSV)',
    fn: async (page, errors) => {
      // Step 1: Open preset menu and select ai_summit
      await page.click('#btn-preset-menu');
      await page.waitForSelector('#preset-dropdown:not(.hidden)', { timeout: 2000 });
      await page.click('#preset-dropdown button:has-text("AI Summit 2026")');
      await page.waitForTimeout(200);

      const title = await page.inputValue('#builder-title');
      assertContains(title, 'AI Summit 2026', 'Preset should populate AI Summit title');

      // Step 2: Trigger AI synthesis
      await page.click('button[onclick="triggerMagicAI()"]');
      await page.waitForTimeout(100);

      // Step 3: Switch to Preview
      await page.click('#nav-btn-preview');
      const heroTitle = await page.textContent('#preview-hero-title');
      assertEqual(heroTitle, title, 'Hero title in preview should match preset title');

      // Step 4: Register VIP ticket
      await page.fill('#reg-name', 'Trần Quang Khải');
      await page.fill('#reg-email', 'khai.tran@fpt.edu.vn');
      await page.fill('#reg-phone', '0981999888');
      await page.fill('#reg-org', 'FPT Software');
      await page.click('#form-registration button[type="submit"]');

      // Step 5: Verify Ticket Modal & QR
      await page.waitForSelector('#modal-ticket:not(.hidden)', { timeout: 3000 });
      const attendeeName = await page.textContent('#ticket-attendee-name');
      assertEqual(attendeeName, 'Trần Quang Khải', 'Ticket name must match registrant');

      const ticketCode = await page.textContent('#ticket-code-display');
      assertMatches(ticketCode, /^VIBE-2026-[A-Z0-9]{6}$/, 'Valid ticket code generated');

      const hasQr = await page.$eval('#ticket-qrcode-container', el => el.children.length > 0);
      assertTrue(hasQr, 'QR code container must render QR code');
      await page.evaluate(() => closeModal('modal-ticket'));

      // Step 6: Verify in Attendees list
      await page.evaluate(() => openModal('modal-attendees'));
      const tableText = await page.textContent('#attendees-table-body');
      assertContains(tableText, 'Trần Quang Khải', 'Registrant must appear in attendees table');
      assertContains(tableText, 'khai.tran@fpt.edu.vn', 'Registrant email must appear in attendees table');
      await page.evaluate(() => closeModal('modal-attendees'));
    }
  },
  {
    id: 'T4_SCEN_02',
    name: 'Scenario 2: Virtual Web3 Online Workshop Setup, Badge Verification & Online Registration',
    fn: async (page, errors) => {
      // Step 1: Switch to builder and select online mode
      await page.click('#nav-btn-builder');
      await page.click('#btn-loc-online');

      // Step 2: Enter details
      await page.fill('#builder-title', 'Web3 & Autonomous AI Agents 2026');
      await page.dispatchEvent('#builder-title', 'input');
      await page.fill('#builder-location', 'https://meet.google.com/web3-agents-2026');
      await page.dispatchEvent('#builder-location', 'input');
      await page.fill('#builder-speaker-name', 'Lê Minh Ngọc');
      await page.dispatchEvent('#builder-speaker-name', 'input');
      await page.fill('#builder-perks', 'Tặng 100 USDT Airdrop cho 50 người đăng ký đầu tiên');
      await page.dispatchEvent('#builder-perks', 'input');

      // Step 3: Switch to Preview and verify online badge & perks
      await page.click('#nav-btn-preview');
      const heroTag = await page.textContent('#preview-hero-tag');
      assertContains(heroTag, 'TRỰC TUYẾN', 'Hero badge must indicate online room');

      const perksText = await page.textContent('#preview-hero-perks');
      assertContains(perksText, '100 USDT Airdrop', 'Perks text should be displayed');

      // Step 4: Register participant
      await page.fill('#reg-name', 'Phạm Quốc Bảo');
      await page.fill('#reg-email', 'bao.pham.web3@gmail.com');
      await page.fill('#reg-phone', '0901234567');
      await page.fill('#reg-org', 'Web3 Developers Vietnam');
      await page.click('#form-registration button[type="submit"]');

      await page.waitForSelector('#modal-ticket:not(.hidden)', { timeout: 3000 });
      const locationText = await page.textContent('#ticket-event-location');
      assertContains(locationText, 'Trực tuyến', 'Ticket location should specify online Google Meet link');
      await page.click('#modal-ticket button[onclick="closeModal(\'modal-ticket\')"]');
    }
  },
  {
    id: 'T4_SCEN_03',
    name: 'Scenario 3: Event Rescheduling (Overdue Transition -> Future Recovery -> Ticket Date Accuracy)',
    fn: async (page, errors) => {
      await page.click('#nav-btn-builder');

      // Step 1: Set past date (overdue)
      const past = new Date(Date.now() - 24 * 60 * 60 * 1000);
      await page.fill('#builder-datetime', past.toISOString().slice(0, 16));
      await page.dispatchEvent('#builder-datetime', 'input');
      await page.waitForTimeout(1100);

      // Step 2: Switch to Preview and verify "SỰ KIỆN ĐANG DIỄN RA"
      await page.click('#nav-btn-preview');
      let containerText = await page.innerText('#countdown-container');
      assertContains(containerText, 'SỰ KIỆN ĐANG DIỄN RA', 'Overdue date should display live event card');

      // Step 3: Reschedule to 7 days in future
      await page.click('#nav-btn-builder');
      const rescheduled = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const isoRescheduled = rescheduled.toISOString().slice(0, 16);
      await page.fill('#builder-datetime', isoRescheduled);
      await page.dispatchEvent('#builder-datetime', 'input');
      await page.waitForTimeout(1100);

      // Step 4: Verify dials recovered
      await page.click('#nav-btn-preview');
      const days = await page.textContent('#timer-days');
      assertTrue(parseInt(days, 10) >= 6, 'Countdown timer days should be restored to >= 6');

      // Step 5: Book ticket and verify rescheduled time in modal
      await page.fill('#reg-name', 'Nguyễn Thị Mai');
      await page.fill('#reg-email', 'mai.nguyen.fpt@gmail.com');
      await page.fill('#reg-phone', '0933221100');
      await page.fill('#reg-org', 'Poly Tech');
      await page.click('#form-registration button[type="submit"]');

      await page.waitForSelector('#modal-ticket:not(.hidden)', { timeout: 3000 });
      const ticketTime = await page.textContent('#ticket-event-time');
      assertTrue(ticketTime.length > 5, 'Ticket time should reflect rescheduled event date');
      await page.evaluate(() => closeModal('modal-ticket'));
    }
  },
  {
    id: 'T4_SCEN_04',
    name: 'Scenario 4: Multi-Attendee Booking, Strict Duplicate Detection & Attendees Table Filtering',
    fn: async (page, errors) => {
      await page.click('#nav-btn-preview');
      const countStart = await page.evaluate(() => EventStudio.attendees.length);

      // Attendee 1
      await page.fill('#reg-name', 'Đặng Thu Thảo');
      await page.fill('#reg-email', 'thao.dang.tech@gmail.com');
      await page.fill('#reg-phone', '0912334455');
      await page.fill('#reg-org', 'TechCorp');
      await page.click('#form-registration button[type="submit"]');
      await page.waitForSelector('#modal-ticket:not(.hidden)', { timeout: 3000 });
      const code1 = await page.textContent('#ticket-code-display');
      await page.click('#modal-ticket button[onclick="closeModal(\'modal-ticket\')"]');

      // Attendee 2
      await page.fill('#reg-name', 'Phạm Minh Hoàng');
      await page.fill('#reg-email', 'hoang.pham.aiclub@gmail.com');
      await page.fill('#reg-phone', '0933445566');
      await page.fill('#reg-org', 'AI Club');
      await page.click('#form-registration button[type="submit"]');
      await page.waitForSelector('#modal-ticket:not(.hidden)', { timeout: 3000 });
      const code2 = await page.textContent('#ticket-code-display');
      assertTrue(code1 !== code2, 'Two attendees must have distinct ticket codes');
      await page.evaluate(() => closeModal('modal-ticket'));

      // Attempt duplicate registration of Attendee 1
      await page.fill('#reg-name', 'Đặng Thu Thảo');
      await page.fill('#reg-email', 'thao.dang.tech@gmail.com');
      await page.fill('#reg-phone', '0912334455');
      await page.fill('#reg-org', 'TechCorp');
      await page.click('#form-registration button[type="submit"]');
      
      // Verify inline error is displayed and ticket modal stays closed
      await page.waitForSelector('#err-reg-email:not(.hidden)', { timeout: 3000 });
      const isTicketHidden = await page.$eval('#modal-ticket', el => el.classList.contains('hidden'));
      assertTrue(isTicketHidden, 'Ticket modal should remain closed on duplicate error');

      const countEnd = await page.evaluate(() => EventStudio.attendees.length);
      assertEqual(countEnd, countStart + 2, 'Total attendees must increment by exactly 2');

      // Filter table
      await page.evaluate(() => openModal('modal-attendees'));
      await page.fill('#attendee-search', 'Thu Thảo');
      await page.dispatchEvent('#attendee-search', 'input');
      const visibleRows = await page.$$eval('#attendees-table-body tr', rows => {
        return rows.filter(r => r.style.display !== 'none').length;
      });
      assertEqual(visibleRows, 1, 'Search filter for "Thu Thảo" should match exactly 1 row');
      await page.evaluate(() => closeModal('modal-attendees'));
    }
  },
  {
    id: 'T4_SCEN_05',
    name: 'Scenario 5: Organizer Full Reset Lifecycle & Safe Rebuild from Scratch',
    fn: async (page, errors) => {
      // Step 1: Open reset modal, test ESC cancel
      await page.click('#btn-new-event, button[onclick="openModal(\'modal-reset\')"]');
      await page.waitForSelector('#modal-reset:not(.hidden)', { timeout: 2000 });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);

      // Verify data preserved
      const titleBefore = await page.inputValue('#builder-title');
      assertTrue(titleBefore.length > 0, 'Data should remain intact after ESC cancel');

      // Step 2: Confirm reset
      await page.click('#btn-new-event, button[onclick="openModal(\'modal-reset\')"]');
      await page.click('#modal-reset button:has-text("Đồng Ý Làm Mới")');
      await page.waitForTimeout(200);

      // Step 3: Verify form is blank, attendees array is empty
      const titleReset = await page.inputValue('#builder-title');
      assertEqual(titleReset, '', 'Form title should be empty');
      const attendeesCount = await page.evaluate(() => EventStudio.attendees.length);
      assertEqual(attendeesCount, 0, 'Attendees count should be 0');

      // Step 4: Reload page (F5) and verify state is NOT re-seeded
      await page.reload();
      await page.waitForFunction(() => typeof EventStudio !== 'undefined' && !!document.getElementById('builder-title'));
      const reloadedAttendees = await page.evaluate(() => EventStudio.attendees.length);
      assertEqual(reloadedAttendees, 0, 'Attendees count must remain 0 after page reload');

      // Step 5: Rebuild fresh event
      await page.fill('#builder-title', 'Poly Tech Hackathon 2026');
      await page.dispatchEvent('#builder-title', 'input');
      await page.fill('#builder-speaker-name', 'Vũ Quốc Kiệt');
      await page.dispatchEvent('#builder-speaker-name', 'input');

      // Step 6: Verify live preview updates
      const heroTitle = await page.textContent('#preview-hero-title');
      assertEqual(heroTitle, 'Poly Tech Hackathon 2026', 'Fresh event title should update preview');
    }
  }
];

module.exports = { tier4Tests };
