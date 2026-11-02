const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8888/index.html');
  await page.evaluate(() => {
    localStorage.setItem('vibe_attendees', JSON.stringify([
      {
        ticketCode: 'VIBE-2026-E331E1',
        fullName: 'v kiet',
        email: 'kietvnqtb02465@gmail.com',
        phone: '0311111111',
        organization: '11111111111',
        registeredAt: '2026-11-01 20:46:01'
      }
    ]));
    location.reload();
  });
  
  await page.waitForTimeout(1000);
  
  // Try registering with same email
  await page.fill('#reg-name', 'Nguyen Van A');
  await page.fill('#reg-email', 'kietvnqtb02465@gmail.com');
  await page.fill('#reg-phone', '0912345678');
  await page.fill('#reg-org', 'Polytechnic');
  
  await page.click('button[type="submit"]');
  await page.waitForTimeout(400);

  // Check 1: Ticket modal MUST be hidden
  const isTicketHidden = await page.$eval('#modal-ticket', el => el.classList.contains('hidden'));
  console.log('Ticket modal hidden:', isTicketHidden);

  // Check 2: Inline error on email MUST be visible
  const emailErr = await page.$eval('#err-reg-email', el => el.textContent.trim());
  console.log('Email inline error text:', emailErr);

  // Check 3: Toast text
  const toastText = await page.evaluate(() => document.querySelector('#toast-container')?.textContent?.trim());
  console.log('Toast notification text:', toastText);

  // Check 4: Attendee count remains 1
  const count = await page.evaluate(() => JSON.parse(localStorage.getItem('vibe_attendees') || '[]').length);
  console.log('Attendee count:', count);

  // Take screenshot of duplicate error on form
  await page.screenshot({ path: 'C:/Users/PC/.gemini/antigravity/brain/97e0a779-d1a4-4ccc-a9b4-935089a6ae9e/duplicate_error_clean.png' });
  console.log('Screenshot saved!');

  await browser.close();
  process.exit(0);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
