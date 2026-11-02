const fs = require('fs');
const html = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/scratch/preview_section.html', 'utf8');

const darkPatterns = [
  '#07090e',
  'bg-slate-900',
  'bg-slate-950',
  'bg-slate-800',
  'text-white',
  'text-slate-200',
  'text-slate-300',
  'text-slate-400',
  'border-white',
  'text-transparent'
];

darkPatterns.forEach(p => {
  const count = (html.match(new RegExp(p, 'g')) || []).length;
  console.log(p, count);
});
