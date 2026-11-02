const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'index.html.dark.bak');
const dstPath = path.join(__dirname, '..', 'index.html');

let src = fs.readFileSync(srcPath, 'utf8');

// 1. Extract the <script> block starting around line 1505 to </html>
const scriptMarker = '<script>\n    /**\n     * VIBE EVENT STUDIO - CORE APPLICATION ENGINE';
let scriptIndex = src.indexOf(scriptMarker);
if (scriptIndex === -1) {
  // Try more flexible match
  const match = src.match(/<script>[\s\S]*VIBE EVENT STUDIO - CORE APPLICATION ENGINE[\s\S]*/);
  if (match) {
    scriptIndex = match.index;
  } else {
    throw new Error('Could not find script marker in source!');
  }
}

let scriptContent = src.substring(scriptIndex);

// Let's customize scriptContent for Light Mode:
// Update switchView activeClass / inactiveClass
scriptContent = scriptContent.replace(
  'const activeClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/30";',
  'const activeClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 bg-slate-900 text-white shadow-xs";'
);
scriptContent = scriptContent.replace(
  'const inactiveClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-400 hover:text-white";',
  'const inactiveClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-slate-600 hover:text-slate-900";'
);
scriptContent = scriptContent.replace(
  'const splitActiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/30";',
  'const splitActiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 bg-slate-900 text-white shadow-xs";'
);
scriptContent = scriptContent.replace(
  'const splitInactiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 items-center gap-2 text-slate-400 hover:text-white";',
  'const splitInactiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 text-slate-600 hover:text-slate-900";'
);

// Update renderActiveTimerBoxes to render clean light boxes:
scriptContent = scriptContent.replace(
  /<div class="bg-\[#07090e\]\/80 border border-white\/\[0\.08\] hover:border-indigo-500\/30 rounded-2xl p-3 sm:p-5 text-center shadow-lg transition-all backdrop-blur-xl group">/g,
  '<div class="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">'
);
scriptContent = scriptContent.replace(
  /<div id="timer-days" class="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-mono tabular-nums tracking-tight">\$\{d\}<\/div>/g,
  '<div id="timer-days" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${d}</div>'
);
scriptContent = scriptContent.replace(
  /<div id="timer-hours" class="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-mono tabular-nums tracking-tight">\$\{h\}<\/div>/g,
  '<div id="timer-hours" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${h}</div>'
);
scriptContent = scriptContent.replace(
  /<div id="timer-mins" class="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-mono tabular-nums tracking-tight">\$\{m\}<\/div>/g,
  '<div id="timer-mins" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${m}</div>'
);
scriptContent = scriptContent.replace(
  /<div id="timer-secs" class="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-mono tabular-nums tracking-tight">\$\{s\}<\/div>/g,
  '<div id="timer-secs" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${s}</div>'
);
scriptContent = scriptContent.replace(
  /<div class="text-\[10px\] sm:text-xs uppercase tracking-widest text-indigo-400 font-bold mt-1.5">(Ngày|Giờ|Phút|Giây)<\/div>/g,
  '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">$1</div>'
);

// Overdue Banner light mode:
scriptContent = scriptContent.replace(
  /<div class="bg-gradient-to-r from-emerald-500\/20 via-teal-500\/20 to-emerald-500\/20 border-2 border-emerald-500\/50 rounded-2xl p-6 sm:p-8 text-center shadow-lg shadow-emerald-500\/20 backdrop-blur-xl animate-fade-in">/g,
  '<div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center shadow-xs animate-fade-in">'
);
scriptContent = scriptContent.replace(
  /<h3 class="text-2xl sm:text-3xl font-extrabold text-emerald-300 tracking-wide font-heading">/g,
  '<h3 class="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-wide font-heading">'
);
scriptContent = scriptContent.replace(
  /<p class="text-slate-300 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">/g,
  '<p class="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">'
);
scriptContent = scriptContent.replace(
  /class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500\/25 transition-all inline-flex items-center gap-2 cursor-pointer"/g,
  'class="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"'
);

// Toast styling for Light Mode:
scriptContent = scriptContent.replace(
  /bg-slate-900\/95 border border-white\/20 text-white shadow-2xl/g,
  'bg-white border border-slate-200 text-slate-900 shadow-xl'
);

console.log('Script content processed successfully. Length:', scriptContent.length);

// Save processed script temporarily
fs.writeFileSync(path.join(__dirname, 'script_processed.js'), scriptContent);
