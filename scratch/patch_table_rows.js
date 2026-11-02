const fs = require('fs');
let html = fs.readFileSync('D:/code/vibe_coding_landing_page_builder/index.html', 'utf8');

const target = `        const tr = document.createElement('tr');
        tr.className = 'hover:bg-white/5 transition';
        tr.innerHTML = \`
          <td class="py-3 px-4 font-mono font-bold text-cyan-400">\${escapeHtml(a.ticketCode)}</td>
          <td class="py-3 px-4 font-bold text-white">\${escapeHtml(a.fullName)}</td>
          <td class="py-3 px-4 text-slate-300">\${escapeHtml(a.email)}</td>
          <td class="py-3 px-4 font-mono text-slate-300">\${escapeHtml(a.phone)}</td>
          <td class="py-3 px-4 text-slate-300">\${escapeHtml(a.organization)}</td>
          <td class="py-3 px-4 text-slate-400 text-[11px]">\${escapeHtml(a.registeredAt)}</td>
        \`;`;

const replace = `        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition border-b border-slate-100';
        tr.innerHTML = \`
          <td class="py-3 px-4 font-mono font-bold text-blue-700">\${escapeHtml(a.ticketCode)}</td>
          <td class="py-3 px-4 font-bold text-slate-900">\${escapeHtml(a.fullName)}</td>
          <td class="py-3 px-4 text-slate-700 font-medium">\${escapeHtml(a.email)}</td>
          <td class="py-3 px-4 font-mono text-slate-700">\${escapeHtml(a.phone)}</td>
          <td class="py-3 px-4 text-slate-700">\${escapeHtml(a.organization)}</td>
          <td class="py-3 px-4 text-slate-600 text-[11px]">\${escapeHtml(a.registeredAt)}</td>
        \`;`;

if (html.includes(target)) {
  html = html.replace(target, replace);
  fs.writeFileSync('D:/code/vibe_coding_landing_page_builder/index.html', html, 'utf8');
  console.log('✓ Successfully patched renderAttendeesTable table row colors');
} else {
  console.log('⚠ Target not matched');
}
