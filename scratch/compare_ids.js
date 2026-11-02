const fs = require('fs');
const dark = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html.dark.bak', 'utf8');
const light = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html', 'utf8');

const getIds = (str) => {
  const matches = str.matchAll(/id=["']([^"']+)["']/g);
  return new Set(Array.from(matches, m => m[1]));
};

const darkIds = getIds(dark);
const lightIds = getIds(light);

console.log('Total in Dark:', darkIds.size);
console.log('Total in Light:', lightIds.size);

const missing = [];
for (const id of darkIds) {
  if (!lightIds.has(id)) missing.push(id);
}
console.log('Missing IDs in Light:', missing);
