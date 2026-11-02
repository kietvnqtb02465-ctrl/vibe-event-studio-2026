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
  
  // Check builder summary card initial text
  const initialBuilderCardTickets = await page.evaluate(() => document.getElementById('quick-summary-tickets')?.textContent);
  console.log('Builder Pod 4 tickets before:', initialBuilderCardTickets);

  // Click the new 1-Click button on form
  const oneClickBtn = await page.waitForSelector('button[onclick*="addSampleAttendeeDirectly"]');
  await oneClickBtn.click();
  await page.waitForTimeout(500);

  // Check builder summary card text after
  const afterBuilderCardTickets = await page.evaluate(() => document.getElementById('quick-summary-tickets')?.textContent);
  console.log('Builder Pod 4 tickets after 1-click button:', afterBuilderCardTickets);

  // Check attendee count in localStorage
  const countAfter = await page.evaluate(() => JSON.parse(localStorage.getItem('vibe_attendees') || '[]').length);
  console.log('LocalStorage attendee count:', countAfter);

  // Take screenshot of open ticket
  await page.screenshot({ path: 'C:/Users/PC/.gemini/antigravity/brain/97e0a779-d1a4-4ccc-a9b4-935089a6ae9e/test_new_ticket_verified.png' });
  console.log('Verified screenshot saved!');

  await browser.close();
  process.exit(0);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
