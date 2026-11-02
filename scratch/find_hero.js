const fs = require('fs');
const content = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('id="preview-hero-title"')) {
    console.log(lines.slice(Math.max(0, idx - 10), idx + 25).join('\n'));
  }
});
