// WCAG 2.2 Relative Luminance and Contrast Calculator
function sRgbLuminance(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrast(hex1, hex2) {
  const l1 = sRgbLuminance(hex1);
  const l2 = sRgbLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const auditPairs = [
  {
    name: 'Header: Tác giả & MSSV phụ',
    bg: '#ffffff',
    oldColor: '#94a3b8', // slate-400
    newColor: '#475569', // slate-600
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Header: Nav switcher Inactive buttons',
    bg: '#f1f5f9', // slate-100
    oldColor: '#cbd5e1', // slate-300
    newColor: '#475569', // slate-600
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Preset Dropdown: Subtitle',
    bg: '#ffffff',
    oldColor: '#94a3b8', // slate-400
    newColor: '#475569', // slate-600
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Preset Dropdown: Badge 4 MẪU',
    bg: '#ffffff',
    oldColor: '#818cf8', // indigo-400
    newColor: '#4338ca', // indigo-700
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Builder: Hero Subtitle & Instruction',
    bg: '#ffffff',
    oldColor: '#94a3b8', // slate-400
    newColor: '#475569', // slate-600
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Builder: Hero Badge Text',
    bg: '#eef2ff', // indigo-50
    oldColor: '#a5b4fc', // indigo-300
    newColor: '#3730a3', // indigo-800
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Builder: Datetime input text',
    bg: '#ffffff',
    oldColor: '#e2e8f0', // slate-200
    newColor: '#0f172a', // slate-900
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Builder: Hook textarea text',
    bg: '#ffffff',
    oldColor: '#e2e8f0', // slate-200
    newColor: '#1e293b', // slate-800
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Builder: Perks input text',
    bg: '#ffffff',
    oldColor: '#fcd34d', // amber-300
    newColor: '#78350f', // amber-900
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Summary Card: Title heading',
    bg: '#ffffff',
    oldColor: '#ffffff', // white on white!
    newColor: '#0f172a', // slate-900
    wcagTarget: '3.0:1 (Heading AA)'
  },
  {
    name: 'Summary Card: Ticket quota text',
    bg: '#f8fafc', // slate-50
    oldColor: '#34d399', // emerald-400
    newColor: '#047857', // emerald-700
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Live Hero: Tagline text',
    bg: '#eef2ff', // indigo-50
    oldColor: '#a5b4fc', // indigo-300
    newColor: '#3730a3', // indigo-800
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Live Hero: AIDA Headline (H2)',
    bg: '#ffffff',
    oldColor: '#67e8f9', // cyan-300 on gradient
    newColor: '#1d4ed8', // blue-700
    wcagTarget: '3.0:1 (Heading AA)'
  },
  {
    name: 'Live Hero: AIDA Hook body',
    bg: '#ffffff',
    oldColor: '#94a3b8', // slate-400
    newColor: '#334155', // slate-700
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Live Hero: Early bird perks text',
    bg: '#fffbeb', // amber-50
    oldColor: '#fcd34d', // amber-300
    newColor: '#78350f', // amber-900
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Live Hero: Quota percentage',
    bg: '#ffffff',
    oldColor: '#34d399', // emerald-400
    newColor: '#047857', // emerald-700
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Countdown: Date label text',
    bg: '#ffffff',
    oldColor: '#cbd5e1', // slate-300
    newColor: '#334155', // slate-700
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Benefits: Card body description',
    bg: '#ffffff',
    oldColor: '#cbd5e1', // slate-300
    newColor: '#475569', // slate-600
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Agenda: Time badges text',
    bg: '#ecfdf5', // emerald-50
    oldColor: '#6ee7b7', // emerald-300
    newColor: '#065f46', // emerald-800
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Speakers: Role description',
    bg: '#ffffff',
    oldColor: '#818cf8', // indigo-400
    newColor: '#4338ca', // indigo-700
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Modal E-Ticket: Header title',
    bg: '#ffffff',
    oldColor: '#ffffff', // white on white
    newColor: '#0f172a', // slate-900
    wcagTarget: '3.0:1 (Heading AA)'
  },
  {
    name: 'Modal E-Ticket: Attendee name',
    bg: '#f8fafc', // slate-50
    oldColor: '#ffffff', // white on light
    newColor: '#0f172a', // slate-900
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Modal E-Ticket: Ticket code text',
    bg: '#ffffff',
    oldColor: '#22d3ee', // cyan-400
    newColor: '#1d4ed8', // blue-700
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Modal Attendees: Table header',
    bg: '#f8fafc', // slate-50
    oldColor: '#94a3b8', // slate-400
    newColor: '#334155', // slate-700
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Modal Attendees: Table rows',
    bg: '#ffffff',
    oldColor: '#cbd5e1', // slate-300
    newColor: '#1e293b', // slate-800
    wcagTarget: '4.5:1 (Body AA)'
  },
  {
    name: 'Footer: Contest title & Author',
    bg: '#ffffff',
    oldColor: '#e2e8f0', // slate-200
    newColor: '#1e293b', // slate-800
    wcagTarget: '4.5:1 (Body AA)'
  }
];

console.log('| Vị Trí Phần Tử | Màu Nền | Màu Cũ (Ratio Cũ) | Màu Mới (Ratio Mới) | Chuẩn WCAG 2.2 | Kết Quả |');
console.log('| :--- | :---: | :---: | :---: | :---: | :---: |');

auditPairs.forEach(p => {
  const oldRatio = contrast(p.bg, p.oldColor).toFixed(2);
  const newRatio = contrast(p.bg, p.newColor).toFixed(2);
  const pass = parseFloat(newRatio) >= 4.5 ? 'PASS (AAA/AA)' : (parseFloat(newRatio) >= 3.0 ? 'PASS (AA Large)' : 'FAIL');
  console.log(`| ${p.name} | \`${p.bg}\` | \`${p.oldColor}\` (${oldRatio}:1) | \`${p.newColor}\` (${newRatio}:1) | ${p.wcagTarget} | **${pass}** |`);
});
