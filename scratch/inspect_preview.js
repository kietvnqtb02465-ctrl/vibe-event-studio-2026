const fs = require('fs');
const content = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html', 'utf8');
const start = content.indexOf('id="view-preview"');
const end = content.indexOf('id="modal-ticket"', start);
console.log('Preview section length:', end - start);
fs.writeFileSync('D:/code/vibe_coding_landing_page_builder/scratch/preview_section.html', content.substring(start, end));
console.log('Wrote preview section to scratch/preview_section.html');
