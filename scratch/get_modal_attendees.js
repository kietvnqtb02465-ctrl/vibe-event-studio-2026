const fs = require('fs');
const dark = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html.dark.bak', 'utf8');
const start = dark.indexOf('id="modal-attendees"');
if (start !== -1) {
  console.log(dark.substring(start, start + 2500));
}
