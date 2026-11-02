const fs = require('fs');
let html = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html', 'utf8');

// 1. Update DOMContentLoaded view init
const oldInit = `      // Initialize view mode based on screen width
      if (window.innerWidth >= 1280) {
        switchView('split');
      } else {
        switchView('builder');
      }`;

const newInit = `      // Check URL query param: ?view=builder or ?view=split
      const urlParams = new URLSearchParams(window.location.search);
      const requestedView = urlParams.get('view') || urlParams.get('mode');
      if (requestedView === 'split' || requestedView === 'builder') {
        switchView(requestedView);
      } else {
        // Default for all visitors, judges, and attendees: 100% Full-Width Live Event Landing Page
        switchView('preview');
      }`;

if (html.includes(oldInit)) {
  html = html.replace(oldInit, newInit);
  console.log('✓ Updated DOMContentLoaded default to preview');
} else {
  console.log('⚠ Could not match oldInit');
}

// 2. Update initial nav button classes so preview is active
const oldNav = `<button id="nav-btn-split" onclick="switchView('split')" class="hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 bg-slate-900 text-white shadow-xs" title="Chế độ Studio xem song song 2 cột">
            <i class="fa-solid fa-table-columns text-xs"></i>
            <span>Studio Dual-Pane</span>
          </button>
          <button id="nav-btn-builder" onclick="switchView('builder')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <i class="fa-solid fa-sliders text-xs"></i>
            <span>Soạn Thảo (Builder)</span>
          </button>
          <button id="nav-btn-preview" onclick="switchView('preview')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <i class="fa-solid fa-eye text-xs"></i>
            <span>Trang Sự Kiện (Live)</span>
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>`;

const newNav = `<button id="nav-btn-split" onclick="switchView('split')" class="hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 text-slate-600 hover:text-slate-900" title="Chế độ Studio xem song song 2 cột">
            <i class="fa-solid fa-table-columns text-xs"></i>
            <span>Studio Dual-Pane</span>
          </button>
          <button id="nav-btn-builder" onclick="switchView('builder')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <i class="fa-solid fa-sliders text-xs"></i>
            <span>Soạn Thảo (Builder)</span>
          </button>
          <button id="nav-btn-preview" onclick="switchView('preview')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 bg-slate-900 text-white shadow-xs">
            <i class="fa-solid fa-eye text-xs"></i>
            <span>Trang Sự Kiện (Live)</span>
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>`;

if (html.includes(oldNav)) {
  html = html.replace(oldNav, newNav);
  console.log('✓ Updated nav buttons to reflect preview active by default');
} else {
  console.log('⚠ Could not match oldNav');
}

// 3. Update main container and view classes in HTML
html = html.replace('id="studio-container" class="studio-split-mode"', 'id="studio-container" class=""');
html = html.replace('id="view-builder" class="w-full space-y-6"', 'id="view-builder" class="w-full space-y-6 hidden"');
html = html.replace('id="view-preview" class="hidden"', 'id="view-preview" class=""');

fs.writeFileSync('D:/code/vibe_coding_landing_page_builder/index.html', html, 'utf8');
console.log('✓ Successfully saved index.html with default full-width Landing Page');
