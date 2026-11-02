const fs = require('fs');
const html = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/scratch/preview_section.html', 'utf8');

html.split('\n').forEach((l, idx) => {
  if (l.includes('#07090e') || l.includes('text-white') || l.includes('text-transparent')) {
    console.log(`${idx + 1}: ${l.trim()}`);
  }
});
