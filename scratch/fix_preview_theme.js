const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Preview Nav
html = html.replace(
  'class="border-b border-slate-100 bg-[#07090e]/85 backdrop-blur-2xl sticky top-[65px] z-30 transition-all"',
  'class="border-b border-slate-200 bg-white/90 backdrop-blur-xl sticky top-[65px] z-30 transition-all shadow-xs"'
);
html = html.replace(
  'class="flex items-center gap-2.5 text-white font-extrabold text-sm sm:text-base font-heading group"',
  'class="flex items-center gap-2.5 text-slate-900 font-extrabold text-sm sm:text-base font-heading group"'
);
html = html.replace(
  /class="flex items-center gap-6 text-xs font-semibold text-slate-300"/g,
  'class="flex items-center gap-6 text-xs font-semibold text-slate-600"'
);
html = html.replace(
  /class="hover:text-white transition-colors"/g,
  'class="hover:text-slate-900 transition-colors"'
);

// 2. Hero Section
html = html.replace(
  'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200 tracking-tight leading-tight max-w-4xl mx-auto font-heading',
  'text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto font-heading'
);
html = html.replace(
  'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-white tracking-wide font-heading',
  'text-blue-600 tracking-wide font-heading font-bold'
);
html = html.replace(
  'class="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed font-normal"',
  'class="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-normal"'
);

// Early bird perk banner in hero:
html = html.replace(
  'class="font-extrabold text-amber-300 uppercase tracking-wider"',
  'class="font-extrabold text-amber-900 uppercase tracking-wider"'
);
html = html.replace(
  'class="text-slate-200 font-semibold ml-1"',
  'class="text-amber-800 font-semibold ml-1"'
);

// Hero CTAs:
html = html.replace(
  'class="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-base shadow-2xl shadow-indigo-500/30 transition-all transform hover:scale-[1.03] active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer"',
  'class="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer"'
);
html = html.replace(
  'class="px-7 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/[0.25] text-white font-semibold text-base backdrop-blur-xl transition-all inline-flex items-center gap-2.5 cursor-pointer"',
  'class="px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm shadow-xs transition-all inline-flex items-center gap-2.5 cursor-pointer"'
);

// Progress bar track:
html = html.replace(
  'class="w-full bg-[#07090e]/80 rounded-full h-3 overflow-hidden p-0.5 border border-white/[0.06]"',
  'class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-200"'
);

// 3. Countdown Section
html = html.replace(
  /<div class="bg-\[#07090e\]\/80 border border-slate-100 hover:border-indigo-500\/30 rounded-2xl p-3 sm:p-5 text-center shadow-lg transition-all backdrop-blur-xl group">/g,
  '<div class="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">'
);
html = html.replace(
  /<div id="timer-(days|hours|mins|secs)" class="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-mono tabular-nums tracking-tight">/g,
  '<div id="timer-$1" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">'
);
html = html.replace(
  /<div class="text-\[10px\] sm:text-xs uppercase tracking-widest text-indigo-400 font-bold mt-1\.5">(Ngày|Giờ|Phút|Giây)<\/div>/g,
  '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">$1</div>'
);

// 4. Benefits Section Titles:
html = html.replace(
  /<h3 class="text-lg font-bold text-white mb-2 font-heading">/g,
  '<h3 class="text-lg font-bold text-slate-900 mb-2 font-heading">'
);

// 5. Agenda Timeline:
html = html.replace(
  /<h4 class="text-base sm:text-lg font-bold text-white mt-2 font-heading">/g,
  '<h4 class="text-base sm:text-lg font-bold text-slate-900 mt-2 font-heading">'
);
html = html.replace(
  /class="absolute left-4 sm:left-1\/2 -translate-x-1\/2 w-8 h-8 rounded-full bg-\[#07090e\] border-2 border-[a-z]+-400 flex items-center justify-center text-[a-z]+-400 text-xs shadow-lg shadow-[a-z0-9/]+ z-10"/g,
  'class="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 text-xs shadow-sm z-10"'
);

// 6. Speaker Cards:
html = html.replace(
  /<h3 id="preview-speaker-name" class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">/g,
  '<h3 id="preview-speaker-name" class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">'
);
html = html.replace(
  /<h3 class="text-xl font-bold text-white group-hover:text-(emerald|purple)-300 transition-colors font-heading">/g,
  '<h3 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">'
);

// 7. Registration Section:
html = html.replace(
  '<h2 class="text-2xl sm:text-3xl font-extrabold text-white font-heading">',
  '<h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">'
);
html = html.replace(
  'class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-lg mx-auto"',
  'class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-lg mx-auto"'
);
html = html.replace(
  /class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1\.5"/g,
  'class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"'
);
html = html.replace(
  'class="w-full mt-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer"',
  'class="w-full mt-4 py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-sm transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer"'
);

// 8. Footer:
html = html.replace(
  'class="border-t border-slate-100 bg-[#07090e]/90 backdrop-blur-xl py-12 px-4 sm:px-6 text-center text-xs text-slate-400"',
  'class="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 text-center text-xs text-slate-500"'
);
html = html.replace(
  'class="flex items-center justify-center gap-2 text-white font-bold text-sm font-heading"',
  'class="flex items-center justify-center gap-2 text-slate-900 font-bold text-sm font-heading"'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully patched preview section to pristine light theme!');
