const fs = require('fs');
const dark = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html.dark.bak', 'utf8');
const missing = ['preview-timer-date-display', 'btn-submit-reg', 'attendee-search', 'btn-export-csv-modal', 'attendees-table-body', 'attendees-empty-state', 'ai-key-container'];
missing.forEach(id => {
  const match = dark.match(new RegExp('.{0,80}id=["\']' + id + '["\'].{0,80}', 's'));
  console.log('ID:', id, '->', match ? match[0].replace(/\n/g, ' ') : 'NOT FOUND');
});
