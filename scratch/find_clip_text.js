const fs = require('fs');
const content = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html', 'utf8');
const matches = content.match(/text-transparent bg-clip-text[^\"]+/g);
console.log('Matches of text-transparent:', matches);
