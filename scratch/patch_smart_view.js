const fs = require('fs');
let html = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html', 'utf8');

// 1. In switchView, persist active view to localStorage
const oldSwitchViewStart = 'function switchView(view) {\n      EventStudio.currentView = view;';
const newSwitchViewStart = 'function switchView(view) {\n      EventStudio.currentView = view;\n      try { localStorage.setItem(\'vibe_active_view\', view); } catch (e) {}';

if (html.includes(oldSwitchViewStart)) {
  html = html.replace(oldSwitchViewStart, newSwitchViewStart);
  console.log('✓ Added persistence to switchView');
} else {
  console.log('⚠ Could not match oldSwitchViewStart');
}

// 2. In DOMContentLoaded, check urlParam -> savedView -> fallback 'preview'
const oldDomInit = `      // Check URL query param: ?view=builder or ?view=split
      const urlParams = new URLSearchParams(window.location.search);
      const requestedView = urlParams.get('view') || urlParams.get('mode');
      if (requestedView === 'split' || requestedView === 'builder') {
        switchView(requestedView);
      } else {
        // Default for all visitors, judges, and attendees: 100% Full-Width Live Event Landing Page
        switchView('preview');
      }`;

const newDomInit = `      // Check URL query param -> localStorage savedView -> default 'preview'
      const urlParams = new URLSearchParams(window.location.search);
      const requestedView = urlParams.get('view') || urlParams.get('mode');
      const savedView = localStorage.getItem('vibe_active_view');

      if (requestedView === 'split' || requestedView === 'builder' || requestedView === 'preview') {
        switchView(requestedView);
      } else if (savedView === 'split' || savedView === 'builder' || savedView === 'preview') {
        switchView(savedView);
      } else {
        // Default for all visitors, judges, and attendees: 100% Full-Width Live Event Landing Page
        switchView('preview');
      }`;

if (html.includes(oldDomInit)) {
  html = html.replace(oldDomInit, newDomInit);
  console.log('✓ Updated DOMContentLoaded with savedView fallback');
} else {
  console.log('⚠ Could not match oldDomInit');
}

fs.writeFileSync('D:/code/vibe_coding_landing_page_builder/index.html', html, 'utf8');
console.log('✓ Successfully written to index.html');
