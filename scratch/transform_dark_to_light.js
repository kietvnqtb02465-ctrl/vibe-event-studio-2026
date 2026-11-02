const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'index.html.dark.bak');
const dstPath = path.join(__dirname, '..', 'index.html');

let content = fs.readFileSync(srcPath, 'utf8');

// --- 1. CSS & Style Overhaul ---
const darkStyleStart = content.indexOf('<style>');
const darkStyleEnd = content.indexOf('</style>', darkStyleStart);

const lightStyle = `<style>
    :root {
      --bg-canvas: #f8fafc;
      --bg-surface: #ffffff;
      --bg-subtle: #f1f5f9;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --border-subtle: #e2e8f0;
      --accent-primary: #0f172a;
      --accent-blue: #2563eb;
      --accent-indigo: #4f46e5;
      --accent-emerald: #059669;
      --accent-amber: #d97706;
      --accent-rose: #e11d48;
    }

    body {
      background-color: #f8fafc;
      color: #0f172a;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      overflow-x: hidden;
      min-height: 100vh;
      background-image: 
        radial-gradient(at 10% 10%, rgba(224, 231, 255, 0.5) 0px, transparent 50%),
        radial-gradient(at 90% 10%, rgba(207, 250, 254, 0.45) 0px, transparent 50%),
        radial-gradient(at 50% 90%, rgba(243, 232, 255, 0.35) 0px, transparent 50%);
      background-attachment: fixed;
    }

    h1, h2, h3, h4, h5, h6, .font-heading {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto !important;
      }
    }

    /* Ambient Subtle Daylight Atmosphere (Replaces dark neon glow) */
    .ambient-glow-1 {
      position: fixed;
      top: -10%;
      left: 10%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(219, 234, 254, 0.45) 0%, transparent 68%);
      filter: blur(100px);
      pointer-events: none;
      z-index: 0;
    }

    .ambient-glow-2 {
      position: fixed;
      top: 40%;
      right: 5%;
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, rgba(224, 231, 255, 0.4) 0%, transparent 70%);
      filter: blur(110px);
      pointer-events: none;
      z-index: 0;
    }

    .ambient-glow-3 {
      position: fixed;
      bottom: 0%;
      left: 20%;
      width: 650px;
      height: 650px;
      background: radial-gradient(circle, rgba(241, 245, 249, 0.5) 0%, transparent 72%);
      filter: blur(120px);
      pointer-events: none;
      z-index: 0;
    }

    /* Clean Crystalline Light Glass Panels */
    .luminous-panel, .glass-panel {
      background: rgba(255, 255, 255, 0.90);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 10px 25px -5px rgba(0, 0, 0, 0.03);
    }

    /* Clean Modern Light Cards */
    .luminous-card, .glass-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.85);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 4px 16px -2px rgba(0, 0, 0, 0.02);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .luminous-card:hover, .glass-card:hover {
      transform: translateY(-2px);
      border-color: rgba(203, 213, 225, 0.95);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 16px 32px -4px rgba(0, 0, 0, 0.05);
    }

    /* Modern Light Input Fields */
    .luminous-input, .glass-input {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #0f172a;
      transition: all 0.2s ease;
    }

    .luminous-input:focus, .glass-input:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
    }

    /* Responsive Dual-Pane Studio Layout */
    @media (min-width: 1280px) {
      .studio-split-mode {
        display: grid !important;
        grid-template-columns: 5fr 7fr !important;
        gap: 1.75rem !important;
        align-items: start !important;
      }
      .studio-split-mode #view-builder {
        display: block !important;
        position: sticky !important;
        top: 75px !important;
        max-height: calc(100vh - 95px) !important;
        overflow-y: auto !important;
        padding-right: 0.5rem !important;
      }
      .studio-split-mode #view-preview {
        display: block !important;
      }
    }

    /* Custom Sleek Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    /* Perforated Divider for Boarding Pass Ticket */
    .perforated-line {
      border-bottom: 2px dashed #cbd5e1;
      position: relative;
    }
    .perforated-line::before, .perforated-line::after {
      content: '';
      position: absolute;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #f8fafc;
      border-radius: 50%;
      border: 1px solid #e2e8f0;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
    }
    .perforated-line::before {
      left: -22px;
    }
    .perforated-line::after {
      right: -22px;
    }

    /* Print Styles for E-Ticket */
    @media print {
      body * {
        visibility: hidden;
      }
      #modal-ticket, #modal-ticket * {
        visibility: visible;
      }
      #modal-ticket {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background: white !important;
        color: black !important;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>`;

content = content.substring(0, darkStyleStart) + lightStyle + content.substring(darkStyleEnd + 8);

// --- 2. Remove AI-Slop & Robot Text in HTML ---
content = content.replace(/1-Click Smart Builder Studio/g, 'Studio Soạn Thảo Sự Kiện');
content = content.replace(/AI Synthesis Engine/g, 'Hệ Thống Bản Thảo Thông Minh');
content = content.replace(/100% Offline AI/g, 'Mẫu Chuẩn AIDA');
content = content.replace(/AI Sinh Nội Dung \(Magic\)/g, 'Gợi Ý Nội Dung (AIDA)');
content = content.replace(/Cấu hình AI API Key/g, 'Cài Đặt Cấu Hình');
content = content.replace(/Cấu Hình AI Synthesis Engine/g, 'Cài Đặt Cấu Hình Sự Kiện');
content = content.replace(/<i class="fa-solid fa-robot text-indigo-400"><\/i>/g, '<i class="fa-solid fa-sliders text-blue-600"></i>');

// Top header background and borders:
content = content.replace(
  'class="sticky top-0 z-40 backdrop-blur-2xl bg-[#07090e]/90 border-b border-white/10 transition-all"',
  'class="sticky top-0 z-40 backdrop-blur-xl bg-white/85 border-b border-slate-200/80 transition-all shadow-xs"'
);

// Top header logo box:
content = content.replace(
  'class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 border border-white/20"',
  'class="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs"'
);
content = content.replace(
  '<span class="font-black text-white text-base tracking-tight font-heading">VIBE EVENT STUDIO</span>',
  '<span class="font-black text-slate-900 text-base tracking-tight font-heading">VIBE EVENT STUDIO</span>'
);
content = content.replace(
  '<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">Đề Số 8</span>',
  '<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hidden sm:inline-block">Đề Số 8</span>'
);
content = content.replace(
  '<strong class="text-slate-200">Vũ Nguyễn Quốc Kiệt</strong>',
  '<strong class="text-slate-800">Vũ Nguyễn Quốc Kiệt</strong>'
);
content = content.replace(
  '<span class="text-indigo-400 font-mono font-semibold">(TB02465)</span>',
  '<span class="text-slate-600 font-mono font-medium">(TB02465)</span>'
);
content = content.replace(
  '<span class="hidden md:inline text-slate-300">Vibe-Coding 2026 - FPT Polytechnic</span>',
  '<span class="hidden md:inline text-slate-600">Vibe-Coding 2026 - FPT Polytechnic</span>'
);

// Capsule switcher box:
content = content.replace(
  '<div class="bg-slate-900/90 p-1.5 rounded-full border border-white/15 shadow-inner inline-flex items-center gap-1 backdrop-blur-xl">',
  '<div class="bg-slate-100 p-1 rounded-full border border-slate-200/90 shadow-inner inline-flex items-center gap-1">'
);
content = content.replace(
  'id="nav-btn-split" onclick="switchView(\'split\')" class="hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/30"',
  'id="nav-btn-split" onclick="switchView(\'split\')" class="hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 bg-slate-900 text-white shadow-xs"'
);

// Buttons on top header:
content = content.replace(/bg-slate-800\/80 hover:bg-slate-700\/80 border border-white\/10 text-xs font-semibold text-slate-200/g, 'bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs');
content = content.replace(/bg-indigo-500\/30 text-indigo-300/g, 'bg-slate-100 text-slate-800');
content = content.replace(/bg-indigo-500\/15 hover:bg-indigo-500\/25 border border-indigo-500\/30 text-xs font-semibold text-indigo-300/g, 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700');
content = content.replace(/bg-rose-500\/10 hover:bg-rose-500\/20 border border-rose-500\/30 text-xs font-semibold text-rose-300/g, 'bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700');

// Dropdown:
content = content.replace(/bg-slate-900\/95 border border-white\/15 shadow-2xl p-2 z-50 backdrop-blur-2xl/g, 'bg-white border border-slate-200 shadow-xl p-2 z-50');
content = content.replace(/hover:bg-slate-800\/70/g, 'hover:bg-slate-50');
content = content.replace(/text-slate-100/g, 'text-slate-800');

// Builder hero:
content = content.replace(/text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight font-heading/g, 'text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight font-heading');
content = content.replace(/text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed/g, 'text-slate-600 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed');
content = content.replace(/bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-500\/25/g, 'bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs');
content = content.replace(/bg-slate-800\/90 hover:bg-slate-700 border border-white\/15 text-white/g, 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700');

// Section headings in builder:
content = content.replace(/text-base font-bold text-white font-heading/g, 'text-base font-bold text-slate-900 font-heading');
content = content.replace(/text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5/g, 'text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5');
content = content.replace(/text-xs font-bold uppercase tracking-wider text-slate-300 mb-2/g, 'text-xs font-bold uppercase tracking-wider text-slate-700 mb-2');
content = content.replace(/w-7 h-7 rounded-lg bg-indigo-500\/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-500\/30/g, 'w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200');

// Location buttons:
content = content.replace(
  'bg-indigo-600/30 border-indigo-500 text-white shadow-md',
  'bg-slate-900 border-slate-900 text-white shadow-xs'
);
content = content.replace(
  'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white',
  'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
);

// Preview panel wrapper:
content = content.replace(
  /<div class="bg-\[#07090e\] rounded-3xl border border-white\/\[0\.12\] shadow-2xl overflow-hidden relative">/g,
  '<div class="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden relative">'
);

// Preview nav:
content = content.replace(
  /<nav class="sticky top-0 z-30 bg-\[#07090e\]\/90 backdrop-blur-md border-b border-white\/\[0\.08\] px-6 py-3\.5 flex items-center justify-between">/g,
  '<nav class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-3.5 flex items-center justify-between">'
);
content = content.replace(
  /<div class="flex items-center gap-2 font-black text-white tracking-tight font-heading text-sm sm:text-base">/g,
  '<div class="flex items-center gap-2 font-black text-slate-900 tracking-tight font-heading text-sm sm:text-base">'
);
content = content.replace(
  /<div class="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">/g,
  '<div class="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">'
);
content = content.replace(
  /<a href="#register-section" class="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-indigo-500\/25 transition-all flex items-center gap-1\.5 cursor-pointer">/g,
  '<a href="#register-section" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">'
);

// Hero title and hook:
content = content.replace(
  /<h1 id="preview-hero-title" class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-heading leading-\[1\.15\]">/g,
  '<h1 id="preview-hero-title" class="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-heading leading-[1.15]">'
);
content = content.replace(
  /<h2 id="preview-hero-headline" class="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-emerald-300 mt-4 max-w-3xl mx-auto">/g,
  '<h2 id="preview-hero-headline" class="text-lg sm:text-xl font-bold text-blue-600 mt-4 max-w-3xl mx-auto">'
);
content = content.replace(
  /<p id="preview-hero-hook" class="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">/g,
  '<p id="preview-hero-hook" class="text-slate-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">'
);
content = content.replace(
  /class="mt-6 max-w-2xl mx-auto p-4 rounded-2xl bg-amber-500\/10 border border-amber-500\/30 text-amber-300 flex items-center justify-center gap-3 shadow-lg shadow-amber-500\/5"/g,
  'class="mt-6 max-w-2xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 flex items-center justify-center gap-3 shadow-2xs"'
);
content = content.replace(
  /class="px-7 py-3\.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-500\/30 transition-all transform hover:scale-\[1\.02\] flex items-center gap-2 cursor-pointer"/g,
  'class="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer"'
);
content = content.replace(
  /class="px-7 py-3\.5 rounded-xl bg-slate-900\/80 hover:bg-slate-800 text-slate-200 border border-white\/15 font-semibold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"/g,
  'class="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm shadow-2xs transition-all flex items-center gap-2 cursor-pointer"'
);

// Quota bar in preview:
content = content.replace(
  /class="mt-10 max-w-md mx-auto p-4 rounded-2xl bg-slate-900\/90 border border-white\/10 shadow-inner"/g,
  'class="mt-10 max-w-md mx-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-sm"'
);
content = content.replace(/text-slate-300 mb-2/g, 'text-slate-700 mb-2');

// Countdown timer card:
content = content.replace(
  /class="luminous-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-white\/\[0\.15\]"/g,
  'class="luminous-panel rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-200"'
);
content = content.replace(
  /class="text-sm sm:text-base font-bold text-white font-heading"/g,
  'class="text-sm sm:text-base font-bold text-slate-900 font-heading"'
);
content = content.replace(
  /text-2xl sm:text-4xl font-extrabold text-white mt-2 font-heading/g,
  'text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-heading'
);
content = content.replace(
  /text-2xl sm:text-3xl font-extrabold text-white mt-1 font-heading/g,
  'text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-heading'
);

// Modals:
content = content.replace(/bg-slate-950\/80 backdrop-blur-md/g, 'bg-slate-900/40 backdrop-blur-sm');
content = content.replace(/border border-white\/\[0\.15\] shadow-2xl/g, 'border border-slate-200 shadow-2xl');
content = content.replace(/border-white\/\[0\.08\]/g, 'border-slate-100');
content = content.replace(/border-white\/10/g, 'border-slate-200');
content = content.replace(/border-white\/15/g, 'border-slate-200');

// JS adjustments:
content = content.replace(
  'const activeClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/30";',
  'const activeClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 bg-slate-900 text-white shadow-xs";'
);
content = content.replace(
  'const inactiveClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-400 hover:text-white";',
  'const inactiveClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-slate-600 hover:text-slate-900";'
);
content = content.replace(
  'const splitActiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/30";',
  'const splitActiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 bg-slate-900 text-white shadow-xs";'
);
content = content.replace(
  'const splitInactiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 items-center gap-2 text-slate-400 hover:text-white";',
  'const splitInactiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 text-slate-600 hover:text-slate-900";'
);

// renderActiveTimerBoxes update:
content = content.replace(
  /<div class="bg-\[#07090e\]\/80 border border-white\/\[0\.08\] hover:border-indigo-500\/30 rounded-2xl p-3 sm:p-5 text-center shadow-lg transition-all backdrop-blur-xl group">/g,
  '<div class="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">'
);
content = content.replace(
  /<div id="timer-days" class="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-mono tabular-nums tracking-tight">\$\{d\}<\/div>/g,
  '<div id="timer-days" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${d}</div>'
);
content = content.replace(
  /<div id="timer-hours" class="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-mono tabular-nums tracking-tight">\$\{h\}<\/div>/g,
  '<div id="timer-hours" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${h}</div>'
);
content = content.replace(
  /<div id="timer-mins" class="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-mono tabular-nums tracking-tight">\$\{m\}<\/div>/g,
  '<div id="timer-mins" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${m}</div>'
);
content = content.replace(
  /<div id="timer-secs" class="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200 font-mono tabular-nums tracking-tight">\$\{s\}<\/div>/g,
  '<div id="timer-secs" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${s}</div>'
);
content = content.replace(
  /<div class="text-\[10px\] sm:text-xs uppercase tracking-widest text-indigo-400 font-bold mt-1.5">(Ngày|Giờ|Phút|Giây)<\/div>/g,
  '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">$1</div>'
);

// Overdue Banner:
content = content.replace(
  /<div class="bg-gradient-to-r from-emerald-500\/20 via-teal-500\/20 to-emerald-500\/20 border-2 border-emerald-500\/50 rounded-2xl p-6 sm:p-8 text-center shadow-lg shadow-emerald-500\/20 backdrop-blur-xl animate-fade-in">/g,
  '<div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center shadow-xs animate-fade-in">'
);
content = content.replace(
  /<h3 class="text-2xl sm:text-3xl font-extrabold text-emerald-300 tracking-wide font-heading">/g,
  '<h3 class="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-wide font-heading">'
);
content = content.replace(
  /<p class="text-slate-300 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">/g,
  '<p class="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">'
);
content = content.replace(
  /class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500\/25 transition-all inline-flex items-center gap-2 cursor-pointer"/g,
  'class="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"'
);

// Toast in light mode:
content = content.replace(
  /bg-slate-900\/95 border border-white\/20 text-white shadow-2xl/g,
  'bg-white border border-slate-200 text-slate-900 shadow-xl'
);

// Ensure #btn-export-csv exists on export button in modal as well:
content = content.replace(
  'id="btn-export-csv-modal"',
  'id="btn-export-csv-modal" data-alt-id="btn-export-csv"'
);

fs.writeFileSync(dstPath, content, 'utf8');
console.log('Successfully transformed index.html to Light Modern Theme! Total length:', content.length);
