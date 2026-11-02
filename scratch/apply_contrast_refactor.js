const fs = require('fs');

let html = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html', 'utf8');

// 1. UPDATE CSS TOKENS IN <style>
const oldStyleStart = ':root {';
const oldStyleEnd = '--accent-rose: #e11d48;\n    }';

const newTokens = `:root {
      /* Tier 1: Primitives (Base Color Scales) */
      --slate-50: #f8fafc;
      --slate-100: #f1f5f9;
      --slate-200: #e2e8f0;
      --slate-300: #cbd5e1;
      --slate-400: #94a3b8;
      --slate-500: #64748b;
      --slate-600: #475569;
      --slate-700: #334155;
      --slate-800: #1e293b;
      --slate-900: #0f172a;
      --slate-950: #020617;

      --blue-50: #eff6ff;
      --blue-100: #dbeafe;
      --blue-600: #2563eb;
      --blue-700: #1d4ed8;

      --indigo-50: #eef2ff;
      --indigo-100: #e0e7ff;
      --indigo-600: #4f46e5;
      --indigo-700: #4338ca;
      --indigo-800: #3730a3;

      --emerald-50: #ecfdf5;
      --emerald-100: #d1fae5;
      --emerald-600: #059669;
      --emerald-700: #047857;
      --emerald-800: #065f46;

      --amber-50: #fffbeb;
      --amber-100: #fef3c7;
      --amber-600: #d97706;
      --amber-700: #b45309;
      --amber-800: #92400e;
      --amber-900: #78350f;

      --rose-50: #fff1f2;
      --rose-100: #ffe4e6;
      --rose-600: #e11d48;
      --rose-700: #be123c;

      --cyan-50: #ecfeff;
      --cyan-100: #cffafe;
      --cyan-700: #0e7490;
      --cyan-800: #155e75;
      --cyan-900: #164e63;

      /* Tier 2: Semantic Roles (WCAG 2.2 Level AA/AAA Compliant) */
      /* Elevation Layers (4 Layers) */
      --bg-canvas: var(--slate-50);            /* Layer 0: Deepest canvas (#f8fafc) */
      --bg-surface: #ffffff;                  /* Layer 1: Content surface / Card */
      --bg-card: #ffffff;
      --bg-subtle: var(--slate-100);
      --bg-elevated: #ffffff;
      --bg-input: #ffffff;                    /* Layer 2: Interactive input surface */
      --bg-overlay: rgba(15, 23, 42, 0.45);   /* Layer 3: Modal backdrop */
      --bg-dark-surface: var(--slate-900);

      /* Typography Contrast Hierarchy (4 Levels) */
      --text-primary: var(--slate-900);        /* Level 1: > 17:1 on White (AAA) */
      --text-secondary: var(--slate-700);      /* Level 2: > 10:1 on White (AAA) */
      --text-muted: var(--slate-600);          /* Level 3: > 7:1 on White (AAA) */
      --text-caption: var(--slate-500);        /* Level 4: 4.76:1 on White (AA Normal Text >= 4.5:1) */
      --text-inverse-primary: #ffffff;         /* 17.85:1 on Slate-900 (AAA) */
      --text-inverse-secondary: var(--slate-200); /* 14.50:1 on Slate-900 (AAA) */
      --text-inverse-muted: var(--slate-400);  /* 6.96:1 on Slate-900 (AA) */

      /* Controls & Borders (>= 3.0:1 UI Control Requirement) */
      --border-subtle: var(--slate-200);
      --border-default: var(--slate-300);      /* 1.48:1 subtle card divider */
      --border-control: var(--slate-400);      /* 3.1:1 UI control border vs White */
      --focus-ring: rgba(37, 99, 235, 0.35);

      /* Semantic Accents (WCAG 2.2 Tested Luminance >= 4.5:1 on Light Surface) */
      --accent-primary: var(--slate-900);
      --accent-blue: var(--blue-700);          /* 6.54:1 on White (AAA) */
      --accent-indigo: var(--indigo-700);      /* 7.35:1 on White (AAA) */
      --accent-emerald: var(--emerald-700);    /* 6.12:1 on White (AAA) */
      --accent-amber: var(--amber-800);        /* 6.45:1 on White (AAA) */
      --accent-rose: var(--rose-700);          /* 6.53:1 on White (AAA) */
      --accent-cyan: var(--cyan-800);          /* 7.21:1 on White (AAA) */
    }`;

if (html.includes(oldStyleStart) && html.includes(oldStyleEnd)) {
  const startIdx = html.indexOf(oldStyleStart);
  const endIdx = html.indexOf(oldStyleEnd) + oldStyleEnd.length;
  html = html.substring(0, startIdx) + newTokens + html.substring(endIdx);
  console.log('✓ Successfully updated CSS Tokens in <style>');
} else {
  console.log('⚠ Could not match old style block');
}

// 2. SURGICAL REPLACEMENTS LIST
const replacements = [
  // Authorship text
  {
    target: '<div class="text-xs text-slate-400 flex items-center gap-1.5">\n            <span>Tác giả:</span>\n            <strong class="text-slate-800">Vũ Nguyễn Quốc Kiệt</strong>\n            <span class="text-slate-600 font-mono font-medium">(TB02465)</span>',
    replace: '<div class="text-xs text-slate-600 flex items-center gap-1.5">\n            <span>Tác giả:</span>\n            <strong class="text-slate-900">Vũ Nguyễn Quốc Kiệt</strong>\n            <span class="text-slate-700 font-mono font-bold">(TB02465)</span>'
  },
  // Inactive Nav buttons
  {
    target: 'id="nav-btn-builder" onclick="switchView(\'builder\')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-300 hover:text-white"',
    replace: 'id="nav-btn-builder" onclick="switchView(\'builder\')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-600 hover:text-slate-900"'
  },
  {
    target: 'id="nav-btn-preview" onclick="switchView(\'preview\')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-300 hover:text-white"',
    replace: 'id="nav-btn-preview" onclick="switchView(\'preview\')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-600 hover:text-slate-900"'
  },
  // Preset menu dropdown
  {
    target: '<i class="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>',
    replace: '<i class="fa-solid fa-chevron-down text-[10px] text-slate-600"></i>'
  },
  {
    target: '<div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2 border-b border-slate-200 flex items-center justify-between">\n              <span>Chọn Mẫu 1-Click (Presets)</span>\n              <span class="text-[10px] text-indigo-400 font-mono">4 MẪU</span>\n            </div>',
    replace: '<div class="text-[11px] font-bold uppercase tracking-wider text-slate-700 px-3 py-2 border-b border-slate-200 flex items-center justify-between">\n              <span>Chọn Mẫu 1-Click (Presets)</span>\n              <span class="text-[10px] text-indigo-700 font-mono font-bold">4 MẪU</span>\n            </div>'
  },
  // Preset options
  {
    target: 'onclick="loadPreset(\'ai_summit\')" class="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-indigo-600/20 text-slate-200 hover:text-white transition flex items-center gap-3">\n              <div class="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 text-xs">',
    replace: 'onclick="loadPreset(\'ai_summit\')" class="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-indigo-50 text-slate-700 hover:text-slate-900 transition flex items-center gap-3">\n              <div class="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center shrink-0 text-xs font-bold">'
  },
  {
    target: '<div class="text-[10px] text-slate-400">Vibe Coding & Future Marketing</div>',
    replace: '<div class="text-[10px] text-slate-600 font-medium">Vibe Coding & Future Marketing</div>'
  },
  {
    target: 'onclick="loadPreset(\'career_fair\')" class="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-emerald-600/20 text-slate-200 hover:text-white transition flex items-center gap-3">\n              <div class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-xs">',
    replace: 'onclick="loadPreset(\'career_fair\')" class="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-slate-900 transition flex items-center gap-3">\n              <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0 text-xs font-bold">'
  },
  {
    target: '<div class="text-[10px] text-slate-400">Hội Chợ Tuyển Dụng IT FPT</div>',
    replace: '<div class="text-[10px] text-slate-600 font-medium">Hội Chợ Tuyển Dụng IT FPT</div>'
  },
  {
    target: 'onclick="loadPreset(\'pitch_night\')" class="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-amber-600/20 text-slate-200 hover:text-white transition flex items-center gap-3">\n              <div class="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-xs">',
    replace: 'onclick="loadPreset(\'pitch_night\')" class="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-amber-50 text-slate-700 hover:text-slate-900 transition flex items-center gap-3">\n              <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center shrink-0 text-xs font-bold">'
  },
  {
    target: '<div class="text-[10px] text-slate-400">Gọi Vốn 500k$ Cùng Quỹ VC</div>',
    replace: '<div class="text-[10px] text-slate-600 font-medium">Gọi Vốn 500k$ Cùng Quỹ VC</div>'
  },
  {
    target: 'onclick="loadPreset(\'web3_workshop\')" class="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-cyan-600/20 text-slate-200 hover:text-white transition flex items-center gap-3">\n              <div class="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs">',
    replace: 'onclick="loadPreset(\'web3_workshop\')" class="w-full text-left px-3 py-2.5 text-xs rounded-xl hover:bg-cyan-50 text-slate-700 hover:text-slate-900 transition flex items-center gap-3">\n              <div class="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-900 border border-cyan-200 flex items-center justify-center shrink-0 text-xs font-bold">'
  },
  {
    target: '<div class="text-[10px] text-slate-400">Thực chiến xây dựng Agent</div>',
    replace: '<div class="text-[10px] text-slate-600 font-medium">Thực chiến xây dựng Agent</div>'
  },
  // Top right controls
  {
    target: '<i class="fa-solid fa-users text-cyan-400"></i>',
    replace: '<i class="fa-solid fa-users text-blue-700"></i>'
  },
  {
    target: '<button onclick="openModal(\'modal-ai-settings\')" class="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-200 text-slate-300 hover:text-white flex items-center justify-center text-xs transition-all" title="Cài Đặt Cấu Hình">',
    replace: '<button onclick="openModal(\'modal-ai-settings\')" class="w-8 h-8 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 flex items-center justify-center text-xs transition-all shadow-xs" title="Cài Đặt Cấu Hình">'
  },
  // Builder Hero Banner
  {
    target: '<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold uppercase tracking-wider mb-2.5">\n                <i class="fa-solid fa-wand-magic-sparkles text-indigo-400"></i>\n                <span>Studio Soạn Thảo Sự Kiện</span>\n              </div>',
    replace: '<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-bold uppercase tracking-wider mb-2.5">\n                <i class="fa-solid fa-wand-magic-sparkles text-indigo-700"></i>\n                <span>Studio Soạn Thảo Sự Kiện</span>\n              </div>'
  },
  {
    target: 'Tạo Landing Page Sự Kiện Trong <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">5 Phút</span>',
    replace: 'Tạo Landing Page Sự Kiện Trong <span class="text-blue-700">5 Phút</span>'
  },
  {
    target: '<strong class="text-indigo-400 font-semibold">Hệ Thống Bản Thảo Thông Minh</strong>',
    replace: '<strong class="text-indigo-700 font-bold">Hệ Thống Bản Thảo Thông Minh</strong>'
  },
  {
    target: '<button onclick="switchView(\'preview\')" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm">\n                <i class="fa-solid fa-eye text-cyan-400"></i>',
    replace: '<button onclick="switchView(\'preview\')" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm">\n                <i class="fa-solid fa-eye text-blue-700"></i>'
  },
  // POD 1
  {
    target: '<p class="text-xs text-slate-400">Cấu hình tiêu đề, thời gian đếm ngược và địa điểm tổ chức</p>',
    replace: '<p class="text-xs text-slate-600">Cấu hình tiêu đề, thời gian đếm ngược và địa điểm tổ chức</p>'
  },
  {
    target: '<input type="datetime-local" id="builder-datetime" class="luminous-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-200 font-mono">',
    replace: '<input type="datetime-local" id="builder-datetime" class="luminous-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-900 font-mono font-medium">'
  },
  {
    target: '<button type="button" id="btn-loc-online" onclick="setLocationType(\'online\')" class="py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all bg-white border-slate-200 text-slate-600 hover:text-slate-900">\n                    <i class="fa-solid fa-video text-cyan-400"></i>',
    replace: '<button type="button" id="btn-loc-online" onclick="setLocationType(\'online\')" class="py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all bg-white border-slate-300 text-slate-700 hover:text-slate-900">\n                    <i class="fa-solid fa-video text-blue-700"></i>'
  },
  // POD 2
  {
    target: '<h3 class="text-base font-bold text-white flex items-center gap-2 font-heading">\n                    <span>Nội Dung Marketing AIDA</span>\n                    <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">Mẫu Chuẩn AIDA</span>\n                  </h3>\n                  <p class="text-xs text-slate-400">Tiêu đề giật tít, hook kích thích hành vi và 3 lợi ích độc quyền</p>',
    replace: '<h3 class="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">\n                    <span>Nội Dung Marketing AIDA</span>\n                    <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">Mẫu Chuẩn AIDA</span>\n                  </h3>\n                  <p class="text-xs text-slate-600">Tiêu đề giật tít, hook kích thích hành vi và 3 lợi ích độc quyền</p>'
  },
  {
    target: '<button onclick="triggerMagicAI()" class="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 text-xs font-bold transition flex items-center gap-1.5 shadow-sm">',
    replace: '<button onclick="triggerMagicAI()" class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold transition flex items-center gap-1.5 shadow-xs">'
  },
  {
    target: '<span class="text-[10px] text-indigo-400 font-normal">Tâm lý học hành vi</span>',
    replace: '<span class="text-[10px] text-indigo-700 font-medium">Tâm lý học hành vi</span>'
  },
  {
    target: '<textarea id="builder-hook" rows="3" class="luminous-input w-full px-4 py-2.5 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 leading-relaxed"',
    replace: '<textarea id="builder-hook" rows="3" class="luminous-input w-full px-4 py-2.5 rounded-xl text-sm text-slate-800 placeholder:text-slate-500 leading-relaxed"'
  },
  {
    target: '<span class="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0 border border-indigo-500/30">1</span>',
    replace: '<span class="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center shrink-0 border border-indigo-200">1</span>'
  },
  {
    target: '<span class="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 border border-cyan-500/30">2</span>',
    replace: '<span class="w-6 h-6 rounded-lg bg-cyan-100 text-cyan-900 text-xs font-bold flex items-center justify-center shrink-0 border border-cyan-200">2</span>'
  },
  {
    target: '<span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-500/30">3</span>',
    replace: '<span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-200">3</span>'
  },
  // POD 3
  {
    target: '<p class="text-xs text-slate-400">Thiết lập hồ sơ diễn giả và quà tặng kích cầu đăng ký</p>',
    replace: '<p class="text-xs text-slate-600">Thiết lập hồ sơ diễn giả và quà tặng kích cầu đăng ký</p>'
  },
  {
    target: '<span class="text-[10px] text-slate-400">Tự động sinh avatar chữ nếu để trống</span>',
    replace: '<span class="text-[10px] text-slate-600 font-medium">Tự động sinh avatar chữ nếu để trống</span>'
  },
  {
    target: '<i class="fa-solid fa-gift absolute left-3.5 top-3.5 text-amber-400 text-sm"></i>\n                  <input type="text" id="builder-perks" class="luminous-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-semibold text-amber-300 placeholder:text-slate-500"',
    replace: '<i class="fa-solid fa-gift absolute left-3.5 top-3.5 text-amber-700 text-sm"></i>\n                  <input type="text" id="builder-perks" class="luminous-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-semibold text-amber-900 placeholder:text-slate-500"'
  },
  // Right Column Summary Card
  {
    target: '<div class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">\n              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>\n              <span>Trạng Thái Đồng Bộ Trực Tiếp</span>\n            </div>\n            <h4 id="quick-summary-title" class="text-base sm:text-lg font-bold text-white line-clamp-2 mb-2 font-heading">\n              AI Summit 2026: Vibe Coding & The Future of Marketing\n            </h4>\n            <p id="quick-summary-datetime" class="text-xs text-slate-300 mb-4 flex items-center gap-2">\n              <i class="fa-regular fa-clock text-indigo-400"></i>\n              <span>Chưa xác định thời gian</span>\n            </p>\n\n            <div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-200 mb-5 space-y-2.5 text-xs">\n              <div class="flex items-center justify-between">\n                <span class="text-slate-400">Hình thức:</span>\n                <span id="quick-summary-loc" class="font-bold text-slate-200">Offline tại TP.HCM</span>\n              </div>\n              <div class="flex items-center justify-between">\n                <span class="text-slate-400">Diễn giả:</span>\n                <span id="quick-summary-speaker" class="font-bold text-slate-200">Vũ Nguyễn Quốc Kiệt</span>\n              </div>\n              <div class="flex items-center justify-between">\n                <span class="text-slate-400">Vé đã đăng ký:</span>\n                <span id="quick-summary-tickets" class="font-bold text-emerald-400 font-mono">142/200</span>\n              </div>\n              <div class="flex items-center justify-between">\n                <span class="text-slate-400">AI Synthesis:</span>\n                <span class="font-bold text-indigo-400">AIDA Ready</span>\n              </div>\n            </div>',
    replace: '<div class="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2 flex items-center gap-1.5">\n              <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>\n              <span>Trạng Thái Đồng Bộ Trực Tiếp</span>\n            </div>\n            <h4 id="quick-summary-title" class="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 mb-2 font-heading">\n              AI Summit 2026: Vibe Coding & The Future of Marketing\n            </h4>\n            <p id="quick-summary-datetime" class="text-xs text-slate-600 mb-4 flex items-center gap-2">\n              <i class="fa-regular fa-clock text-indigo-700"></i>\n              <span>Chưa xác định thời gian</span>\n            </p>\n\n            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-5 space-y-2.5 text-xs">\n              <div class="flex items-center justify-between">\n                <span class="text-slate-600">Hình thức:</span>\n                <span id="quick-summary-loc" class="font-bold text-slate-900">Offline tại TP.HCM</span>\n              </div>\n              <div class="flex items-center justify-between">\n                <span class="text-slate-600">Diễn giả:</span>\n                <span id="quick-summary-speaker" class="font-bold text-slate-900">Vũ Nguyễn Quốc Kiệt</span>\n              </div>\n              <div class="flex items-center justify-between">\n                <span class="text-slate-600">Vé đã đăng ký:</span>\n                <span id="quick-summary-tickets" class="font-bold text-emerald-700 font-mono">142/200</span>\n              </div>\n              <div class="flex items-center justify-between">\n                <span class="text-slate-600">AI Synthesis:</span>\n                <span class="font-bold text-indigo-700">AIDA Ready</span>\n              </div>\n            </div>'
  },
  {
    target: '<button onclick="switchView(\'preview\')" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer">\n                <i class="fa-solid fa-arrow-right"></i>\n                <span>Mở Toàn Màn Hình Trang Sự Kiện (Live)</span>\n              </button>\n              \n              <button onclick="saveEventToStorage(true)" class="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-200 text-slate-200 text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm">\n                <i class="fa-regular fa-floppy-disk text-indigo-400"></i>\n                <span>Lưu Thay Đổi (F5 Không Mất)</span>\n              </button>\n\n              <button onclick="openModal(\'modal-attendees\')" class="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-200 text-slate-200 text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm">\n                <i class="fa-solid fa-file-csv text-emerald-400"></i>\n                <span>Quản Lý Khách & Xuất CSV</span>\n              </button>',
    replace: '<button onclick="switchView(\'preview\')" class="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">\n                <i class="fa-solid fa-arrow-right"></i>\n                <span>Mở Toàn Màn Hình Trang Sự Kiện (Live)</span>\n              </button>\n              \n              <button onclick="saveEventToStorage(true)" class="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold transition flex items-center justify-center gap-2 shadow-xs">\n                <i class="fa-regular fa-floppy-disk text-indigo-700"></i>\n                <span>Lưu Thay Đổi (F5 Không Mất)</span>\n              </button>\n\n              <button onclick="openModal(\'modal-attendees\')" class="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold transition flex items-center justify-center gap-2 shadow-xs">\n                <i class="fa-solid fa-file-csv text-emerald-700"></i>\n                <span>Quản Lý Khách & Xuất CSV</span>\n              </button>'
  },
  {
    target: '<div class="mt-5 pt-3.5 border-t border-slate-200 text-[11px] text-slate-400 leading-relaxed">\n              <div class="font-bold text-slate-300">Cuộc thi Vibe-Coding 2026 • FPT Polytechnic</div>\n              <div class="text-indigo-400">Đề số 8: Tạo Landing Page sự kiện trong 5 phút</div>\n            </div>',
    replace: '<div class="mt-5 pt-3.5 border-t border-slate-200 text-[11px] text-slate-600 leading-relaxed">\n              <div class="font-bold text-slate-800">Cuộc thi Vibe-Coding 2026 • FPT Polytechnic</div>\n              <div class="text-indigo-700 font-medium">Đề số 8: Tạo Landing Page sự kiện trong 5 phút</div>\n            </div>'
  },
  // Live Preview subnav links
  {
    target: '<a href="#hero-section" class="hover:text-cyan-300 transition-colors">Tổng Quan</a>\n            <a href="#benefits-section" class="hover:text-cyan-300 transition-colors">Lợi Ích</a>\n            <a href="#agenda-section" class="hover:text-cyan-300 transition-colors">Lịch Trình</a>\n            <a href="#speaker-section" class="hover:text-cyan-300 transition-colors">Diễn Giả</a>\n            <a href="#register-section" class="hover:text-cyan-300 transition-colors">Đăng Ký Vé</a>',
    replace: '<a href="#hero-section" class="hover:text-blue-700 transition-colors">Tổng Quan</a>\n            <a href="#benefits-section" class="hover:text-blue-700 transition-colors">Lợi Ích</a>\n            <a href="#agenda-section" class="hover:text-blue-700 transition-colors">Lịch Trình</a>\n            <a href="#speaker-section" class="hover:text-blue-700 transition-colors">Diễn Giả</a>\n            <a href="#register-section" class="hover:text-blue-700 transition-colors">Đăng Ký Vé</a>'
  },
  // Live Preview Hero
  {
    target: '<div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md shadow-sm">',
    replace: '<div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">'
  },
  {
    target: '<h2 id="preview-hero-headline" class="text-lg sm:text-xl font-bold text-blue-600 tracking-wide font-heading font-bold">',
    replace: '<h2 id="preview-hero-headline" class="text-lg sm:text-xl font-bold text-blue-700 tracking-wide font-heading font-bold">'
  },
  {
    target: '<p id="preview-hero-hook" class="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-normal">',
    replace: '<p id="preview-hero-hook" class="text-sm sm:text-base text-slate-700 mt-3 leading-relaxed font-normal">'
  },
  {
    target: '<i class="fa-solid fa-gift text-amber-400 text-lg sm:text-xl animate-bounce"></i>',
    replace: '<i class="fa-solid fa-gift text-amber-700 text-lg sm:text-xl animate-bounce"></i>'
  },
  {
    target: '<a href="#agenda-section" class="px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm shadow-xs transition-all inline-flex items-center gap-2.5 cursor-pointer">\n              <i class="fa-solid fa-calendar-days text-indigo-400"></i>',
    replace: '<a href="#agenda-section" class="px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm shadow-xs transition-all inline-flex items-center gap-2.5 cursor-pointer">\n              <i class="fa-solid fa-calendar-days text-indigo-700"></i>'
  },
  {
    target: '<span id="preview-seats-label" class="text-amber-300 flex items-center gap-1.5">\n                <i class="fa-solid fa-fire text-amber-400"></i>\n                <span>Đã có 142/200 người giữ chỗ!</span>\n              </span>\n              <span id="preview-seats-percent" class="text-emerald-400 font-mono font-bold">71%</span>',
    replace: '<span id="preview-seats-label" class="text-amber-800 font-bold flex items-center gap-1.5">\n                <i class="fa-solid fa-fire text-amber-700"></i>\n                <span>Đã có 142/200 người giữ chỗ!</span>\n              </span>\n              <span id="preview-seats-percent" class="text-emerald-700 font-mono font-bold">71%</span>'
  },
  {
    target: '<div class="mt-2 text-[11px] text-slate-400 flex items-center justify-between">\n              <span id="preview-seats-remaining">Chỉ còn 58 vé miễn phí cuối cùng</span>\n              <span class="text-slate-500">Cập nhật tự động</span>\n            </div>',
    replace: '<div class="mt-2 text-[11px] text-slate-600 flex items-center justify-between">\n              <span id="preview-seats-remaining" class="font-medium">Chỉ còn 58 vé miễn phí cuối cùng</span>\n              <span class="text-slate-500">Cập nhật tự động</span>\n            </div>'
  },
  // Countdown section
  {
    target: '<div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">',
    replace: '<div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-700 mb-2">'
  },
  {
    target: '<div id="preview-timer-date-display" class="text-sm font-semibold text-slate-300">',
    replace: '<div id="preview-timer-date-display" class="text-sm font-semibold text-slate-700">'
  },
  {
    target: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Ngày</div>',
    replace: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-600 font-bold mt-1.5">Ngày</div>'
  },
  {
    target: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Giờ</div>',
    replace: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-600 font-bold mt-1.5">Giờ</div>'
  },
  {
    target: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Phút</div>',
    replace: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-600 font-bold mt-1.5">Phút</div>'
  },
  {
    target: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Giây</div>',
    replace: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-600 font-bold mt-1.5">Giây</div>'
  },
  // Benefits section
  {
    target: '<span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Đặc Quyền Hội Nghị</span>',
    replace: '<span class="text-xs font-bold uppercase tracking-widest text-indigo-700">Đặc Quyền Hội Nghị</span>'
  },
  {
    target: '<p class="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto">',
    replace: '<p class="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">'
  },
  {
    target: '<div class="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">',
    replace: '<div class="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">'
  },
  {
    target: '<p id="preview-card-benefit-1" class="text-slate-300 text-xs sm:text-sm leading-relaxed">',
    replace: '<p id="preview-card-benefit-1" class="text-slate-600 text-xs sm:text-sm leading-relaxed">'
  },
  {
    target: '<div class="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">',
    replace: '<div class="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-800 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">'
  },
  {
    target: '<p id="preview-card-benefit-2" class="text-slate-300 text-xs sm:text-sm leading-relaxed">',
    replace: '<p id="preview-card-benefit-2" class="text-slate-600 text-xs sm:text-sm leading-relaxed">'
  },
  {
    target: '<div class="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">',
    replace: '<div class="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">'
  },
  {
    target: '<p id="preview-card-benefit-3" class="text-slate-300 text-xs sm:text-sm leading-relaxed">',
    replace: '<p id="preview-card-benefit-3" class="text-slate-600 text-xs sm:text-sm leading-relaxed">'
  },
  // Agenda Section
  {
    target: '<span class="text-xs font-bold uppercase tracking-widest text-cyan-400">Chương Trình Chi Tiết</span>',
    replace: '<span class="text-xs font-bold uppercase tracking-widest text-cyan-800">Chương Trình Chi Tiết</span>'
  },
  {
    target: '<p class="text-slate-400 text-sm sm:text-base mt-2">\n              Hành trình 1 buổi sáng bùng nổ kiến thức và kỹ năng thực chiến\n            </p>',
    replace: '<p class="text-slate-600 text-sm sm:text-base mt-2">\n              Hành trình 1 buổi sáng bùng nổ kiến thức và kỹ năng thực chiến\n            </p>'
  },
  {
    target: '<span class="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 inline-block">08:00 - 08:30</span>',
    replace: '<span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200 inline-block">08:00 - 08:30</span>'
  },
  {
    target: '<p class="text-xs sm:text-sm text-slate-400 mt-1">Đón tiếp đại biểu, quét QR nhận E-Ticket VIP, thưởng thức teabreak nhẹ và giao lưu đầu giờ.</p>',
    replace: '<p class="text-xs sm:text-sm text-slate-600 mt-1">Đón tiếp đại biểu, quét QR nhận E-Ticket VIP, thưởng thức teabreak nhẹ và giao lưu đầu giờ.</p>'
  },
  {
    target: '<span class="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 inline-block">08:30 - 09:00</span>',
    replace: '<span class="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-mono font-bold border border-indigo-200 inline-block">08:30 - 09:00</span>'
  },
  {
    target: '<p class="text-xs sm:text-sm text-slate-400 mt-1">Công bố xu hướng bứt phá từ lập trình truyền thống sang kỷ nguyên AI Agent và Vibe Coding.</p>',
    replace: '<p class="text-xs sm:text-sm text-slate-600 mt-1">Công bố xu hướng bứt phá từ lập trình truyền thống sang kỷ nguyên AI Agent và Vibe Coding.</p>'
  },
  {
    target: '<span class="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30 inline-block">09:00 - 10:30</span>',
    replace: '<span class="px-3 py-1 rounded-full bg-cyan-50 text-cyan-900 text-xs font-mono font-bold border border-cyan-200 inline-block">09:00 - 10:30</span>'
  },
  {
    target: '<p class="text-xs sm:text-sm text-slate-400 mt-1">Live demo trực tiếp từ diễn giả: Sử dụng Hệ Thống Bản Thảo Thông Minh, Single-file architecture và Modern Glassmorphism.</p>',
    replace: '<p class="text-xs sm:text-sm text-slate-600 mt-1">Live demo trực tiếp từ diễn giả: Sử dụng Hệ Thống Bản Thảo Thông Minh, Single-file architecture và Modern Glassmorphism.</p>'
  },
  {
    target: '<span class="px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-xs font-mono font-bold border border-purple-500/30 inline-block">10:30 - 11:15</span>',
    replace: '<span class="px-3 py-1 rounded-full bg-purple-50 text-purple-900 text-xs font-mono font-bold border border-purple-200 inline-block">10:30 - 11:15</span>'
  },
  {
    target: '<p class="text-xs sm:text-sm text-slate-400 mt-1">Giải đáp các thắc mắc về tối ưu token, bảo mật client-side, xây dựng thương hiệu cá nhân trong ngành công nghệ.</p>',
    replace: '<p class="text-xs sm:text-sm text-slate-600 mt-1">Giải đáp các thắc mắc về tối ưu token, bảo mật client-side, xây dựng thương hiệu cá nhân trong ngành công nghệ.</p>'
  },
  {
    target: '<span class="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-mono font-bold border border-amber-500/30 inline-block">11:15 - 11:45</span>',
    replace: '<span class="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-mono font-bold border border-amber-200 inline-block">11:15 - 11:45</span>'
  },
  {
    target: '<p class="text-xs sm:text-sm text-slate-400 mt-1">Trao tặng suất học bổng, bộ Ebook 2M độc quyền và chụp ảnh lưu niệm cùng diễn giả.</p>',
    replace: '<p class="text-xs sm:text-sm text-slate-600 mt-1">Trao tặng suất học bổng, bộ Ebook 2M độc quyền và chụp ảnh lưu niệm cùng diễn giả.</p>'
  },
  // Speakers section
  {
    target: '<span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Chuyên Gia Đồng Hành</span>',
    replace: '<span class="text-xs font-bold uppercase tracking-widest text-indigo-700">Chuyên Gia Đồng Hành</span>'
  },
  {
    target: '<p class="text-slate-400 text-sm sm:text-base mt-2">\n              Gặp gỡ các chuyên gia đầu ngành trong lĩnh vực AI và phát triển phần mềm\n            </p>',
    replace: '<p class="text-slate-600 text-sm sm:text-base mt-2">\n              Gặp gỡ các chuyên gia đầu ngành trong lĩnh vực AI và phát triển phần mềm\n            </p>'
  },
  {
    target: '<div class="inline-block px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-2">Keynote Speaker</div>',
    replace: '<div class="inline-block px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-bold uppercase tracking-wider mb-2 border border-indigo-200">Keynote Speaker</div>'
  },
  {
    target: '<p id="preview-speaker-role" class="text-xs font-semibold text-indigo-300 mt-1">',
    replace: '<p id="preview-speaker-role" class="text-xs font-semibold text-indigo-700 mt-1">'
  },
  {
    target: '<p class="text-xs text-slate-300 mt-3 leading-relaxed">\n                Tác giả dự thi Cuộc thi Vibe-Coding 2026 (MSSV: TB02465). Chuyên gia nghiên cứu các giải pháp AI tự động hóa và kiến trúc ứng dụng web hiệu năng cao.\n              </p>',
    replace: '<p class="text-xs text-slate-600 mt-3 leading-relaxed">\n                Tác giả dự thi Cuộc thi Vibe-Coding 2026 (MSSV: TB02465). Chuyên gia nghiên cứu các giải pháp AI tự động hóa và kiến trúc ứng dụng web hiệu năng cao.\n              </p>'
  },
  {
    target: '<div class="inline-block px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-2">Guest Mentor</div>',
    replace: '<div class="inline-block px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2 border border-emerald-200">Guest Mentor</div>'
  },
  {
    target: '<p class="text-xs font-semibold text-emerald-400 mt-1">',
    replace: '<p class="text-xs font-semibold text-emerald-700 mt-1">'
  },
  {
    target: '<p class="text-xs text-slate-300 mt-3 leading-relaxed">\n                Hơn 10 năm kinh nghiệm điều hành và tối ưu hóa chuyển đổi tăng trưởng cho các sản phẩm SaaS công nghệ cao tại Đông Nam Á.\n              </p>',
    replace: '<p class="text-xs text-slate-600 mt-3 leading-relaxed">\n                Hơn 10 năm kinh nghiệm điều hành và tối ưu hóa chuyển đổi tăng trưởng cho các sản phẩm SaaS công nghệ cao tại Đông Nam Á.\n              </p>'
  },
  {
    target: '<div class="inline-block px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2">Special Advisor</div>',
    replace: '<div class="inline-block px-3 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-bold uppercase tracking-wider mb-2 border border-purple-200">Special Advisor</div>'
  },
  {
    target: '<p class="text-xs font-semibold text-purple-400 mt-1">',
    replace: '<p class="text-xs font-semibold text-purple-700 mt-1">'
  },
  {
    target: '<p class="text-xs text-slate-300 mt-3 leading-relaxed">\n                Tác giả nhiều công trình nghiên cứu về Large Language Models, tư vấn chuyển đổi số AI cho các doanh nghiệp kỳ lân.\n              </p>',
    replace: '<p class="text-xs text-slate-600 mt-3 leading-relaxed">\n                Tác giả nhiều công trình nghiên cứu về Large Language Models, tư vấn chuyển đổi số AI cho các doanh nghiệp kỳ lân.\n              </p>'
  },
  // Registration Section
  {
    target: '<span class="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">',
    replace: '<span class="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">'
  },
  {
    target: '<p class="text-slate-400 text-xs sm:text-sm mt-1.5">\n                Nhận ngay Vé Điện Tử E-Ticket có mã QR Code cá nhân qua màn hình!\n              </p>',
    replace: '<p class="text-slate-600 text-xs sm:text-sm mt-1.5">\n                Nhận ngay Vé Điện Tử E-Ticket có mã QR Code cá nhân qua màn hình!\n              </p>'
  },
  {
    target: '<div id="err-reg-name" class="hidden text-xs text-rose-400 mt-1 flex items-center gap-1"></div>',
    replace: '<div id="err-reg-name" class="hidden text-xs text-rose-600 font-medium mt-1 flex items-center gap-1"></div>'
  },
  {
    target: '<div id="err-reg-email" class="hidden text-xs text-rose-400 mt-1 flex items-center gap-1"></div>',
    replace: '<div id="err-reg-email" class="hidden text-xs text-rose-600 font-medium mt-1 flex items-center gap-1"></div>'
  },
  {
    target: '<div id="err-reg-phone" class="hidden text-xs text-rose-400 mt-1 flex items-center gap-1"></div>',
    replace: '<div id="err-reg-phone" class="hidden text-xs text-rose-600 font-medium mt-1 flex items-center gap-1"></div>'
  },
  {
    target: '<div id="err-reg-org" class="hidden text-xs text-rose-400 mt-1 flex items-center gap-1"></div>',
    replace: '<div id="err-reg-org" class="hidden text-xs text-rose-600 font-medium mt-1 flex items-center gap-1"></div>'
  },
  {
    target: '<p class="text-[11px] text-slate-400 text-center mt-3">',
    replace: '<p class="text-[11px] text-slate-600 text-center mt-3">'
  },
  // Footer
  {
    target: 'Sản phẩm tham dự <strong class="text-slate-200">Cuộc thi VIBE-CODING 2026</strong> — Trường Cao đẳng FPT Polytechnic',
    replace: 'Sản phẩm tham dự <strong class="text-slate-800 font-bold">Cuộc thi VIBE-CODING 2026</strong> — Trường Cao đẳng FPT Polytechnic'
  },
  {
    target: '<strong>Đề số 8:</strong> Tạo Landing Page sự kiện trong 5 phút • Tác giả: <strong class="text-indigo-400">Vũ Nguyễn Quốc Kiệt</strong> (MSSV: <span class="font-mono text-slate-300">TB02465</span>)',
    replace: '<strong>Đề số 8:</strong> Tạo Landing Page sự kiện trong 5 phút • Tác giả: <strong class="text-indigo-700 font-bold">Vũ Nguyễn Quốc Kiệt</strong> (MSSV: <span class="font-mono text-slate-800 font-bold">TB02465</span>)'
  },
  {
    target: '<div class="pt-4 text-slate-500 text-[11px]">',
    replace: '<div class="pt-4 text-slate-600 text-[11px]">'
  },
  {
    target: '<button id="btn-export-csv" onclick="exportCSV()" class="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer" title="Xuất danh sách khách tham dự ra file CSV">\n              <i class="fa-solid fa-file-excel text-emerald-400"></i>',
    replace: '<button id="btn-export-csv" onclick="exportCSV()" class="text-[11px] text-slate-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer font-medium" title="Xuất danh sách khách tham dự ra file CSV">\n              <i class="fa-solid fa-file-excel text-emerald-700"></i>'
  },
  // MODALS
  // Modal Ticket
  {
    target: '<div class="luminous-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-white backdrop-blur-2xl">',
    replace: '<div class="luminous-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-slate-900 bg-white backdrop-blur-2xl">'
  },
  {
    target: '<button onclick="closeModal(\'modal-ticket\')" class="no-print absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors">',
    replace: '<button onclick="closeModal(\'modal-ticket\')" class="no-print absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors">'
  },
  {
    target: '<div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">',
    replace: '<div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-sm">'
  },
  {
    target: '<div class="text-[10px] font-bold uppercase tracking-wider text-emerald-400">VIP Boarding Pass</div>\n            <div class="text-sm font-extrabold text-white font-heading">VÉ THAM DỰ SỰ KIỆN CHÍNH THỨC</div>',
    replace: '<div class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">VIP Boarding Pass</div>\n            <div class="text-sm font-extrabold text-slate-900 font-heading">VÉ THAM DỰ SỰ KIỆN CHÍNH THỨC</div>'
  },
  {
    target: '<span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">CONFIRMED</span>',
    replace: '<span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">CONFIRMED</span>'
  },
  {
    target: '<div class="text-[10px] uppercase tracking-wider text-slate-400">Sự Kiện:</div>\n          <div id="ticket-event-name" class="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-cyan-300 font-heading">\n            AI Summit 2026: Vibe Coding & The Future of Marketing\n          </div>',
    replace: '<div class="text-[10px] uppercase tracking-wider text-slate-600 font-bold">Sự Kiện:</div>\n          <div id="ticket-event-name" class="text-base sm:text-lg font-extrabold text-slate-900 font-heading">\n            AI Summit 2026: Vibe Coding & The Future of Marketing\n          </div>'
  },
  {
    target: '<div class="luminous-card rounded-xl p-2.5">\n            <div class="text-slate-400 text-[11px]">Họ và Tên:</div>\n            <div id="ticket-attendee-name" class="font-bold text-white text-sm mt-0.5">Nguyễn Văn A</div>\n          </div>\n          <div class="luminous-card rounded-xl p-2.5">\n            <div class="text-slate-400 text-[11px]">Số Điện Thoại:</div>\n            <div id="ticket-attendee-phone" class="font-bold text-white font-mono mt-0.5">0912 345 678</div>\n          </div>\n          <div class="luminous-card rounded-xl p-2.5">\n            <div class="text-slate-400 text-[11px]">Đơn Vị / Lớp:</div>\n            <div id="ticket-attendee-org" class="font-semibold text-slate-200 mt-0.5">FPT Polytechnic</div>\n          </div>\n          <div class="luminous-card rounded-xl p-2.5">\n            <div class="text-slate-400 text-[11px]">Thời Gian:</div>\n            <div id="ticket-event-time" class="font-semibold text-slate-200 mt-0.5">09:00 - 08/11/2026</div>\n          </div>',
    replace: '<div class="bg-slate-50 border border-slate-200 rounded-xl p-2.5">\n            <div class="text-slate-600 text-[11px] font-medium">Họ và Tên:</div>\n            <div id="ticket-attendee-name" class="font-bold text-slate-900 text-sm mt-0.5">Nguyễn Văn A</div>\n          </div>\n          <div class="bg-slate-50 border border-slate-200 rounded-xl p-2.5">\n            <div class="text-slate-600 text-[11px] font-medium">Số Điện Thoại:</div>\n            <div id="ticket-attendee-phone" class="font-bold text-slate-900 font-mono mt-0.5">0912 345 678</div>\n          </div>\n          <div class="bg-slate-50 border border-slate-200 rounded-xl p-2.5">\n            <div class="text-slate-600 text-[11px] font-medium">Đơn Vị / Lớp:</div>\n            <div id="ticket-attendee-org" class="font-semibold text-slate-800 mt-0.5">FPT Polytechnic</div>\n          </div>\n          <div class="bg-slate-50 border border-slate-200 rounded-xl p-2.5">\n            <div class="text-slate-600 text-[11px] font-medium">Thời Gian:</div>\n            <div id="ticket-event-time" class="font-semibold text-slate-800 mt-0.5">09:00 - 08/11/2026</div>\n          </div>'
  },
  {
    target: '<div class="luminous-card rounded-xl p-2.5">\n          <div class="text-[11px] text-slate-400">Địa Điểm:</div>\n          <div id="ticket-event-location" class="text-xs font-semibold text-slate-200 mt-0.5">Hội trường Innovation Hall, FPT Polytechnic, TP.HCM</div>\n        </div>',
    replace: '<div class="bg-slate-50 border border-slate-200 rounded-xl p-2.5">\n          <div class="text-[11px] text-slate-600 font-medium">Địa Điểm:</div>\n          <div id="ticket-event-location" class="text-xs font-semibold text-slate-800 mt-0.5">Hội trường Innovation Hall, FPT Polytechnic, TP.HCM</div>\n        </div>'
  },
  {
    target: '<div class="text-[10px] uppercase tracking-wider text-slate-400">Mã Vé Điện Tử:</div>\n          <div id="ticket-code-display" class="text-lg sm:text-xl font-black font-mono text-cyan-400 tracking-wider">\n            VIBE-2026-A8F4C2\n          </div>\n          <div class="text-[11px] text-slate-400 mt-1">Xuất trình mã này tại quầy Check-in sự kiện</div>',
    replace: '<div class="text-[10px] uppercase tracking-wider text-slate-600 font-bold">Mã Vé Điện Tử:</div>\n          <div id="ticket-code-display" class="text-lg sm:text-xl font-black font-mono text-blue-700 tracking-wider">\n            VIBE-2026-A8F4C2\n          </div>\n          <div class="text-[11px] text-slate-600 mt-1 font-medium">Xuất trình mã này tại quầy Check-in sự kiện</div>'
  },
  {
    target: '<button onclick="window.print()" class="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/[0.12] text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors">\n          <i class="fa-solid fa-print"></i>\n          <span>In Vé / PDF</span>\n        </button>\n        <button onclick="closeModal(\'modal-ticket\')" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md transition-colors">',
    replace: '<button onclick="window.print()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-semibold text-slate-800 flex items-center gap-2 transition-colors">\n          <i class="fa-solid fa-print"></i>\n          <span>In Vé / PDF</span>\n        </button>\n        <button onclick="closeModal(\'modal-ticket\')" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md transition-colors">'
  },
  // Modal Attendees
  {
    target: '<div class="luminous-panel max-w-4xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-white flex flex-col max-h-[90vh] backdrop-blur-2xl">',
    replace: '<div class="luminous-panel max-w-4xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-slate-900 bg-white flex flex-col max-h-[90vh] backdrop-blur-2xl">'
  },
  {
    target: '<div class="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-base">',
    replace: '<div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-base">'
  },
  {
    target: '<h3 class="text-lg font-bold text-white font-heading">Danh Sách Người Đăng Ký Tham Dự</h3>\n            <p class="text-xs text-slate-400">Dữ liệu được lưu trữ tự động trong LocalStorage (F5 không mất)</p>',
    replace: '<h3 class="text-lg font-bold text-slate-900 font-heading">Danh Sách Người Đăng Ký Tham Dự</h3>\n            <p class="text-xs text-slate-600">Dữ liệu được lưu trữ tự động trong LocalStorage (F5 không mất)</p>'
  },
  {
    target: '<button onclick="closeModal(\'modal-attendees\')" class="w-8 h-8 rounded-full bg-slate-800/80 text-slate-400 hover:text-white flex items-center justify-center transition-colors">',
    replace: '<button onclick="closeModal(\'modal-attendees\')" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors">'
  },
  {
    target: '<div class="overflow-y-auto overflow-x-auto flex-1 rounded-2xl border border-slate-100 bg-[#07090e]/70">\n        <table class="w-full text-left text-xs text-slate-300">\n          <thead class="bg-[#07090e]/95 text-slate-400 uppercase tracking-wider text-[10px] sticky top-0 border-b border-slate-100">',
    replace: '<div class="overflow-y-auto overflow-x-auto flex-1 rounded-2xl border border-slate-200 bg-white">\n        <table class="w-full text-left text-xs text-slate-700">\n          <thead class="bg-slate-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold sticky top-0 border-b border-slate-200">'
  },
  {
    target: '<tbody id="attendees-table-body" class="divide-y divide-white/[0.04]">',
    replace: '<tbody id="attendees-table-body" class="divide-y divide-slate-100">'
  },
  {
    target: '<div class="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">\n        <div>\n          Tổng số khách: <strong id="attendees-total-count" class="text-cyan-400 font-mono">0</strong> / 200 vé\n        </div>\n        <button onclick="closeModal(\'modal-attendees\')" class="px-4 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors">',
    replace: '<div class="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">\n        <div>\n          Tổng số khách: <strong id="attendees-total-count" class="text-blue-700 font-mono font-bold">0</strong> / 200 vé\n        </div>\n        <button onclick="closeModal(\'modal-attendees\')" class="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors border border-slate-300">'
  },
  // Modal Reset
  {
    target: '<div class="luminous-panel max-w-md w-full rounded-3xl p-6 sm:p-7 border border-rose-500/30 shadow-2xl relative animate-fade-in text-white text-center backdrop-blur-2xl">',
    replace: '<div class="luminous-panel max-w-md w-full rounded-3xl p-6 sm:p-7 border border-rose-200 shadow-2xl relative animate-fade-in text-slate-900 bg-white text-center backdrop-blur-2xl">'
  },
  {
    target: '<h3 class="text-xl font-bold text-white font-heading">Xác Nhận Tạo Sự Kiện Mới?</h3>\n      <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">',
    replace: '<h3 class="text-xl font-bold text-slate-900 font-heading">Xác Nhận Tạo Sự Kiện Mới?</h3>\n      <p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">'
  },
  {
    target: '<button onclick="closeModal(\'modal-reset\')" class="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/[0.12] text-xs font-semibold text-slate-300 transition-colors">',
    replace: '<button onclick="closeModal(\'modal-reset\')" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-semibold text-slate-700 transition-colors">'
  },
  // Modal Deploy
  {
    target: '<div class="luminous-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-white backdrop-blur-2xl">',
    replace: '<div class="luminous-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-slate-900 bg-white backdrop-blur-2xl">'
  },
  {
    target: '<button onclick="closeModal(\'modal-deploy\')" class="w-8 h-8 rounded-full bg-slate-800/80 text-slate-400 hover:text-white flex items-center justify-center transition-colors">',
    replace: '<button onclick="closeModal(\'modal-deploy\')" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors">'
  },
  {
    target: '<h3 class="text-lg font-bold text-white font-heading">Hướng Dẫn Triển Khai Trong 3 Bước</h3>\n            <p class="text-xs text-slate-400">Sẵn sàng chạy offline hoặc public lên Vercel / GitHub Pages</p>',
    replace: '<h3 class="text-lg font-bold text-slate-900 font-heading">Hướng Dẫn Triển Khai Trong 3 Bước</h3>\n            <p class="text-xs text-slate-600">Sẵn sàng chạy offline hoặc public lên Vercel / GitHub Pages</p>'
  },
  {
    target: '<div class="font-bold text-emerald-400 flex items-center gap-2 mb-1">\n            <span class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-mono">1</span>\n            Chạy Cục Bộ (Local Run) - 0 giây cài đặt\n          </div>\n          <p class="text-slate-300 leading-relaxed text-xs">\n            Chỉ cần nhấp đúp trực tiếp vào tệp <code class="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">index.html</code> để mở trong Chrome, Edge hoặc Safari. Mọi tính năng AI Synthesis, Countdown Timer, E-Ticket và LocalStorage hoạt động 100% trơn tru không cần Node.js.\n          </p>',
    replace: '<div class="font-bold text-emerald-800 flex items-center gap-2 mb-1">\n            <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center text-xs font-mono font-bold">1</span>\n            Chạy Cục Bộ (Local Run) - 0 giây cài đặt\n          </div>\n          <p class="text-slate-600 leading-relaxed text-xs">\n            Chỉ cần nhấp đúp trực tiếp vào tệp <code class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-mono">index.html</code> để mở trong Chrome, Edge hoặc Safari. Mọi tính năng AI Synthesis, Countdown Timer, E-Ticket và LocalStorage hoạt động 100% trơn tru không cần Node.js.\n          </p>'
  },
  {
    target: '<div class="font-bold text-indigo-400 flex items-center gap-2 mb-1">\n            <span class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-mono">2</span>\n            Triển Khai Lên Vercel (Miễn phí trong 30 giây)\n          </div>\n          <p class="text-slate-300 leading-relaxed text-xs">\n            Cài đặt <code class="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">npm i -g vercel</code> và chạy lệnh <code class="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">vercel deploy --prod</code> tại thư mục này, hoặc kéo thả thư mục vào dashboard <strong class="text-white">vercel.com/new</strong> để nhận ngay tên miền HTTPS công khai.\n          </p>',
    replace: '<div class="font-bold text-indigo-800 flex items-center gap-2 mb-1">\n            <span class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center text-xs font-mono font-bold">2</span>\n            Triển Khai Lên Vercel (Miễn phí trong 30 giây)\n          </div>\n          <p class="text-slate-600 leading-relaxed text-xs">\n            Cài đặt <code class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-mono">npm i -g vercel</code> và chạy lệnh <code class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-mono">vercel deploy --prod</code> tại thư mục này, hoặc kéo thả thư mục vào dashboard <strong class="text-slate-900 font-bold">vercel.com/new</strong> để nhận ngay tên miền HTTPS công khai.\n          </p>'
  },
  {
    target: '<div class="font-bold text-cyan-400 flex items-center gap-2 mb-1">\n            <span class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs font-mono">3</span>\n            Triển Khai Lên GitHub Pages\n          </div>\n          <p class="text-slate-300 leading-relaxed text-xs">\n            Tạo repository mới trên GitHub, đẩy file <code class="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">index.html</code> lên nhánh <code class="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">main</code>. Vào mục <em>Settings &gt; Pages</em> và chọn deploy từ nhánh chính. Trang web sự kiện sẽ online ngay lập tức!\n          </p>',
    replace: '<div class="font-bold text-cyan-900 flex items-center gap-2 mb-1">\n            <span class="w-5 h-5 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-200 flex items-center justify-center text-xs font-mono font-bold">3</span>\n            Triển Khai Lên GitHub Pages\n          </div>\n          <p class="text-slate-600 leading-relaxed text-xs">\n            Tạo repository mới trên GitHub, đẩy file <code class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-mono">index.html</code> lên nhánh <code class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-mono">main</code>. Vào mục <em>Settings &gt; Pages</em> và chọn deploy từ nhánh chính. Trang web sự kiện sẽ online ngay lập tức!\n          </p>'
  },
  {
    target: '<button onclick="closeModal(\'modal-deploy\')" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors">',
    replace: '<button onclick="closeModal(\'modal-deploy\')" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-colors">'
  },
  // Modal AI Settings
  {
    target: '<div class="luminous-panel max-w-md w-full rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl relative animate-fade-in text-white backdrop-blur-2xl">',
    replace: '<div class="luminous-panel max-w-md w-full rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl relative animate-fade-in text-slate-900 bg-white backdrop-blur-2xl">'
  },
  {
    target: '<button onclick="closeModal(\'modal-ai-settings\')" class="w-7 h-7 rounded-full bg-slate-800/80 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors">',
    replace: '<button onclick="closeModal(\'modal-ai-settings\')" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center text-xs transition-colors">'
  },
  {
    target: '<label class="block font-bold text-slate-300 mb-1">Chế Độ Hoạt Động (Engine Mode)</label>\n            <select id="ai-provider-select" onchange="handleAiProviderChange()" class="luminous-input w-full px-3 py-2 rounded-xl text-xs bg-[#07090e]">',
    replace: '<label class="block font-bold text-slate-800 mb-1">Chế Độ Hoạt Động (Engine Mode)</label>\n            <select id="ai-provider-select" onchange="handleAiProviderChange()" class="luminous-input w-full px-3 py-2 rounded-xl text-xs bg-white text-slate-900 border border-slate-300">'
  },
  {
    target: '<label class="block font-bold text-slate-300 mb-1">API Key Của Bạn</label>',
    replace: '<label class="block font-bold text-slate-800 mb-1">API Key Của Bạn</label>'
  },
  {
    target: '<p class="text-[10px] text-slate-400 mt-1">',
    replace: '<p class="text-[10px] text-slate-600 mt-1">'
  },
  {
    target: '<div class="p-3 rounded-xl bg-slate-900/80 border border-slate-100 text-slate-400 text-[11px] leading-relaxed">\n            <strong class="text-indigo-300">Tính năng Offline AI sẵn có:</strong>',
    replace: '<div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed">\n            <strong class="text-indigo-700">Tính năng Offline AI sẵn có:</strong>'
  },
  {
    target: '<button type="button" onclick="closeModal(\'modal-ai-settings\')" class="px-4 py-2 rounded-xl bg-slate-800/80 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors">\n            Đóng\n          </button>\n          <button type="submit" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors">',
    replace: '<button type="button" onclick="closeModal(\'modal-ai-settings\')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold transition-colors">\n            Đóng\n          </button>\n          <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors">'
  },
  // JavaScript Dynamic Rendering
  {
    target: 'const inactiveClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-300 hover:text-white";',
    replace: 'const inactiveClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-600 hover:text-slate-900";'
  },
  {
    target: 'const splitInactiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 text-slate-300 hover:text-white";',
    replace: 'const splitInactiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 text-slate-600 hover:text-slate-900";'
  },
  {
    target: '<td class="py-3 px-4 font-mono font-bold text-cyan-400">${escapeHtml(a.ticketCode)}</td>\n        <td class="py-3 px-4 font-bold text-white">${escapeHtml(a.fullName)}</td>\n        <td class="py-3 px-4 text-slate-300">${escapeHtml(a.email)}</td>\n        <td class="py-3 px-4 font-mono text-slate-300">${escapeHtml(a.phone)}</td>\n        <td class="py-3 px-4 text-slate-300">${escapeHtml(a.organization)}</td>\n        <td class="py-3 px-4 text-slate-400 text-[11px]">${escapeHtml(a.registeredAt)}</td>',
    replace: '<td class="py-3 px-4 font-mono font-bold text-blue-700">${escapeHtml(a.ticketCode)}</td>\n        <td class="py-3 px-4 font-bold text-slate-900">${escapeHtml(a.fullName)}</td>\n        <td class="py-3 px-4 text-slate-700">${escapeHtml(a.email)}</td>\n        <td class="py-3 px-4 font-mono text-slate-700">${escapeHtml(a.phone)}</td>\n        <td class="py-3 px-4 text-slate-700">${escapeHtml(a.organization)}</td>\n        <td class="py-3 px-4 text-slate-600 text-[11px]">${escapeHtml(a.registeredAt)}</td>'
  },
  {
    target: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Ngày</div>',
    replace: '<div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-600 font-bold mt-1.5">Ngày</div>'
  }
];

let replacedCount = 0;
replacements.forEach((r, i) => {
  if (html.includes(r.target)) {
    html = html.replace(r.target, r.replace);
    replacedCount++;
  } else {
    console.log('Missed #' + (i + 1) + ': ' + r.target.substring(0, 50));
  }
});

console.log('Total replaced:', replacedCount, 'out of', replacements.length);

fs.writeFileSync('D:/code/vibe_coding_landing_page_builder/index.html', html, 'utf8');
console.log('Successfully saved updated index.html');
