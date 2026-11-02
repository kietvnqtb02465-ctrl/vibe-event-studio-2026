const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(path.join(__dirname, 'script_processed.js'), 'utf8');

const htmlTop = `<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vibe Event Studio | Landing Page Builder & E-Ticket Platform - Cuộc Thi Vibe-Coding 2026</title>
  
  <!-- Contest & Authorship Metadata -->
  <meta name="author" content="Vũ Nguyễn Quốc Kiệt (MSSV: TB02465)">
  <meta name="description" content="Sản phẩm dự thi Cuộc thi Vibe-Coding 2026 (FPT Polytechnic) - Đề số 8: Tạo Landing Page sự kiện trong 5 phút. Tác giả: Vũ Nguyễn Quốc Kiệt (TB02465).">
  <meta name="contest" content="VIBE-CODING 2026 - TRƯỜNG CAO ĐẲNG FPT POLYTECHNIC">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">

  <!-- CDNs: Google Fonts, FontAwesome, Tailwind CSS, Canvas Confetti, QRCode.js -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <!-- Tailwind CSS 3.4 JIT CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              canvas: '#f8fafc',
              surface: '#ffffff',
              subtle: '#f1f5f9',
              dark: '#0f172a',
              primary: '#0f172a',
              blue: '#2563eb',
              indigo: '#4f46e5',
              emerald: '#059669',
              amber: '#d97706',
              rose: '#e11d48'
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            body: ['"Inter"', 'system-ui', 'sans-serif'],
            mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
          }
        }
      }
    }
  </script>

  <!-- Canvas Confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <!-- QRCode.js CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

  <!-- Clean, Luminous, Modern Light Aesthetic Styles -->
  <style>
    :root {
      --bg-canvas: #f8fafc;
      --bg-surface: #ffffff;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --border-subtle: #e2e8f0;
      --accent-primary: #0f172a;
      --accent-blue: #2563eb;
    }

    body {
      background-color: #f8fafc;
      color: #0f172a;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      overflow-x: hidden;
      min-height: 100vh;
      background-image: 
        radial-gradient(at 10% 10%, rgba(224, 231, 255, 0.45) 0px, transparent 50%),
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
  </style>
</head>

<body class="selection:bg-blue-600 selection:text-white min-h-screen relative">
  <!-- Subtle Ambient Atmosphere -->
  <div class="ambient-glow-1"></div>
  <div class="ambient-glow-2"></div>
  <div class="ambient-glow-3"></div>

  <!-- ========================================================================= -->
  <!-- TOP HEADER & DUAL-VIEW FLOATING CAPSULE SWITCHER (R4, R6) -->
  <!-- ========================================================================= -->
  <header class="sticky top-0 z-40 backdrop-blur-xl bg-white/85 border-b border-slate-200/80 transition-all shadow-xs">
    <div class="max-w-[1720px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
      
      <!-- Left: Logo & Contest Authorship Badge -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
          <i class="fa-solid fa-layer-group text-base"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-900 text-base tracking-tight font-heading">VIBE EVENT STUDIO</span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hidden sm:inline-block">Đề Số 8</span>
          </div>
          <div class="text-xs text-slate-500 flex items-center gap-1.5">
            <span>Tác giả:</span>
            <strong class="text-slate-800">Vũ Nguyễn Quốc Kiệt</strong>
            <span class="text-slate-600 font-mono font-medium">(TB02465)</span>
            <span class="hidden md:inline text-slate-400">•</span>
            <span class="hidden md:inline text-slate-600">Vibe-Coding 2026 - FPT Polytechnic</span>
          </div>
        </div>
      </div>

      <!-- Center: Segmented Capsule Switcher (Dual-Pane Studio <-> Builder <-> Live Preview) -->
      <div class="flex items-center justify-center w-full sm:w-auto order-3 sm:order-2">
        <div class="bg-slate-100 p-1 rounded-full border border-slate-200/90 shadow-inner inline-flex items-center gap-1">
          <button id="nav-btn-split" onclick="switchView('split')" class="hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 bg-slate-900 text-white shadow-xs" title="Chế độ Studio xem song song 2 cột">
            <i class="fa-solid fa-table-columns text-xs"></i>
            <span>Studio Dual-Pane</span>
          </button>
          <button id="nav-btn-builder" onclick="switchView('builder')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <i class="fa-solid fa-sliders text-xs"></i>
            <span>Soạn Thảo (Builder)</span>
          </button>
          <button id="nav-btn-preview" onclick="switchView('preview')" class="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <i class="fa-solid fa-eye text-xs"></i>
            <span>Trang Sự Kiện (Live)</span>
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>
        </div>
      </div>

      <!-- Right: Quick Action Controls -->
      <div class="flex items-center gap-2 order-2 sm:order-3">
        <!-- Preset Selector Dropdown -->
        <div class="relative">
          <button id="btn-preset-menu" onclick="togglePresetMenu()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2 transition-all shadow-xs">
            <i class="fa-solid fa-bookmark text-blue-600"></i>
            <span class="hidden md:inline">Mẫu Sự Kiện</span>
            <i class="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
          </button>
          <div id="preset-dropdown" class="hidden absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2 border-b border-slate-100 flex items-center justify-between">
              <span>Kho Mẫu Sự Kiện Thực Tế</span>
              <span class="text-[10px] lowercase text-slate-400">4 mẫu</span>
            </div>
            
            <button onclick="loadPreset('ai_summit')" class="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start gap-2.5 transition text-xs border border-transparent hover:border-slate-200 mt-1">
              <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold">
                <i class="fa-solid fa-bolt"></i>
              </div>
              <div>
                <div class="font-bold text-slate-800">AI Summit 2026</div>
                <div class="text-[10px] text-slate-500">Vibe Coding & The Future of Marketing</div>
              </div>
            </button>

            <button onclick="loadPreset('career_fair')" class="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start gap-2.5 transition text-xs border border-transparent hover:border-slate-200 mt-1">
              <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">
                <i class="fa-solid fa-briefcase"></i>
              </div>
              <div>
                <div class="font-bold text-slate-800">Tech Career Day 2026</div>
                <div class="text-[10px] text-slate-500">Kết nối việc làm IT & Doanh nghiệp</div>
              </div>
            </button>

            <button onclick="loadPreset('pitch_night')" class="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start gap-2.5 transition text-xs border border-transparent hover:border-slate-200 mt-1">
              <div class="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-xs font-bold">
                <i class="fa-solid fa-rocket"></i>
              </div>
              <div>
                <div class="font-bold text-slate-800">Startup Pitch Night 2026</div>
                <div class="text-[10px] text-slate-500">Đấu trường gọi vốn 500,000$ VC</div>
              </div>
            </button>

            <button onclick="loadPreset('web3_agent')" class="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start gap-2.5 transition text-xs border border-transparent hover:border-slate-200 mt-1">
              <div class="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 text-xs font-bold">
                <i class="fa-solid fa-cube"></i>
              </div>
              <div>
                <div class="font-bold text-slate-800">Web3 & AI Agent Hands-on</div>
                <div class="text-[10px] text-slate-500">Thực chiến xây dựng Agent</div>
              </div>
            </button>
          </div>
        </div>

        <!-- View Attendees Button -->
        <button onclick="openModal('modal-attendees')" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all shadow-xs" title="Xem danh sách người đã đăng ký">
          <i class="fa-solid fa-users text-slate-500"></i>
          <span class="hidden md:inline">Khách</span>
          <span id="header-attendee-count" class="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-800 text-[10px] font-mono font-bold">0</span>
        </button>

        <!-- New Event Reset Button -->
        <button id="btn-new-event" onclick="openModal('modal-reset')" class="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-1.5 transition-all" title="Tạo sự kiện mới (Reset)">
          <i class="fa-solid fa-rotate-left"></i>
          <span class="hidden lg:inline">Tạo Mới</span>
        </button>

        <!-- Deploy Guide Button -->
        <button onclick="openModal('modal-deploy')" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all" title="Hướng dẫn triển khai">
          <i class="fa-solid fa-cloud-arrow-up"></i>
          <span class="hidden lg:inline">Deploy</span>
        </button>

        <!-- AI Key Settings -->
        <button onclick="openModal('modal-ai-settings')" class="w-8 h-8 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center text-xs transition-all shadow-xs" title="Cấu hình nâng cao">
          <i class="fa-solid fa-gear"></i>
        </button>
      </div>

    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- MAIN APPLICATION CONTAINER -->
  <!-- ========================================================================= -->
  <main class="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 py-6">
    <div id="studio-container" class="studio-split-mode">

      <!-- ======================================================================= -->
      <!-- VIEW A: SMART EVENT BUILDER (INSPECTOR PANE) (R2, R3) -->
      <!-- ======================================================================= -->
      <div id="view-builder" class="w-full space-y-6">
        
        <!-- Builder Hero Banner -->
        <div class="luminous-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-2.5">
                <i class="fa-solid fa-pen-ruler text-slate-500"></i>
                <span>Trình Thiết Kế Landing Page Sự Kiện</span>
              </div>
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight font-heading">
                Tạo Landing Page Sự Kiện Trong <span class="text-blue-600">5 Phút</span>
              </h1>
              <p class="text-slate-600 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                Nhập thông tin sự kiện hoặc sử dụng tính năng <strong class="text-slate-900 font-semibold">gợi ý bản thảo tự động</strong> theo chuẩn AIDA. Mọi thay đổi đồng bộ tức thì sang bản xem trước!
              </p>
            </div>
            <div class="flex flex-wrap items-center gap-2.5 shrink-0">
              <button onclick="triggerMagicAI()" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer">
                <i class="fa-solid fa-pen-nib text-blue-400 text-xs"></i>
                <span>Gợi Ý Bản Thảo (AIDA)</span>
              </button>
              <button onclick="switchView('preview')" class="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-xs">
                <i class="fa-solid fa-eye text-slate-600"></i>
                <span>Xem Trước</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Builder Form Container -->
        <div class="space-y-6">
        
          <!-- POD 1: Basic Event Info & Date/Time -->
          <div class="luminous-panel rounded-3xl p-5 sm:p-6">
            <div class="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200">1</div>
              <div>
                <h3 class="text-base font-bold text-slate-900 font-heading">Thông Tin Sự Kiện & Thời Gian (Giờ G)</h3>
                <p class="text-xs text-slate-500">Cấu hình tiêu đề, thời gian đếm ngược và địa điểm tổ chức</p>
              </div>
            </div>

            <div class="space-y-4">
              <!-- Event Title -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Tên Sự Kiện <span class="text-rose-500">*</span></label>
                <div class="relative">
                  <i class="fa-solid fa-heading absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
                  <input type="text" id="builder-title" class="luminous-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-semibold placeholder:text-slate-400" placeholder="VD: AI Summit 2026: Vibe Coding & The Future of Marketing">
                </div>
              </div>

              <!-- Date & Time Picker + Quota Seats -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Giờ G Bắt Đầu (Countdown) <span class="text-rose-500">*</span></label>
                  <div class="relative">
                    <i class="fa-regular fa-clock absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
                    <input type="datetime-local" id="builder-datetime" class="luminous-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-800 font-mono">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Tổng Số Lượng Vé Giữ Chỗ</label>
                  <div class="relative">
                    <i class="fa-solid fa-ticket absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
                    <input type="number" id="builder-seats" min="10" max="5000" class="luminous-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-semibold font-mono" placeholder="200">
                  </div>
                </div>
              </div>

              <!-- Location Type & Details -->
              <div class="pt-1">
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Hình Thức Tổ Chức</label>
                <div class="grid grid-cols-2 gap-3 mb-3">
                  <button type="button" id="btn-loc-offline" onclick="setLocationType('offline')" class="py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all bg-slate-900 border-slate-900 text-white shadow-xs">
                    <i class="fa-solid fa-building text-slate-300"></i>
                    <span>Offline (Địa điểm thực)</span>
                  </button>
                  <button type="button" id="btn-loc-online" onclick="setLocationType('online')" class="py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all bg-white border-slate-200 text-slate-600 hover:text-slate-900">
                    <i class="fa-solid fa-video text-blue-600"></i>
                    <span>Online (Zoom/Meet)</span>
                  </button>
                </div>

                <div class="relative">
                  <i id="loc-icon" class="fa-solid fa-location-dot absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
                  <input type="text" id="builder-location" class="luminous-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder:text-slate-400" placeholder="Hội trường Innovation Hall, FPT Polytechnic, TP.HCM">
                </div>
              </div>
            </div>
          </div>

          <!-- POD 2: AIDA Content Drafting -->
          <div class="luminous-panel rounded-3xl p-5 sm:p-6">
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200">2</div>
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-base font-bold text-slate-900 font-heading">Nội Dung Truyền Thông Chuẩn AIDA</h3>
                    <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">Chuẩn AIDA</span>
                  </div>
                  <p class="text-xs text-slate-500">Tiêu đề thu hút, đoạn bối cảnh gợi mở và 3 lợi ích độc quyền</p>
                </div>
              </div>
              <button onclick="triggerMagicAI()" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs">
                <i class="fa-solid fa-rotate text-xs"></i>
                <span class="hidden sm:inline">Gợi ý lại</span>
              </button>
            </div>

            <div class="space-y-4">
              <!-- Attention Headline -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Headline Thu Hút (Attention)</span>
                  <span class="text-[10px] text-slate-500 font-normal">Tâm lý học hành vi</span>
                </label>
                <input type="text" id="builder-headline" class="luminous-input w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400" placeholder="VD: Bùng Nổ Vibe Coding 2026: Làm Chủ Kỷ Nguyên Trí Tuệ Nhân Tạo Trong 5 Phút!">
              </div>

              <!-- Interest & Desire Hook -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Đoạn Mô Tả Bối Cảnh (Hook & Problem Statement)</label>
                <textarea id="builder-hook" rows="3" class="luminous-input w-full px-4 py-2.5 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 leading-relaxed" placeholder="85% quy trình lập trình và tiếp thị đang được tự động hóa. Đừng để mình trở thành người đứng ngoài cuộc cách mạng công nghệ lớn nhất thập kỷ..."></textarea>
              </div>

              <!-- 3 Exclusive Benefits (Action) -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">3 Lợi Ích Độc Quyền Dành Cho Người Tham Dự (Action)</label>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 border border-blue-200">1</span>
                    <input type="text" id="builder-benefit-1" class="luminous-input w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm" placeholder="Lợi ích 1...">
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-200">2</span>
                    <input type="text" id="builder-benefit-2" class="luminous-input w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm" placeholder="Lợi ích 2...">
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0 border border-purple-200">3</span>
                    <input type="text" id="builder-benefit-3" class="luminous-input w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm" placeholder="Lợi ích 3...">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- POD 3: Speaker Profile & Early Bird Perks -->
          <div class="luminous-panel rounded-3xl p-5 sm:p-6">
            <div class="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200">3</div>
              <div>
                <h3 class="text-base font-bold text-slate-900 font-heading">Diễn Giả Chính & Ưu Đãi Đăng Ký Sớm</h3>
                <p class="text-xs text-slate-500">Thiết lập hồ sơ diễn giả và quà tặng kích cầu đăng ký</p>
              </div>
            </div>

            <div class="space-y-4">
              <!-- Speaker Name & Role -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Tên Diễn Giả Chính <span class="text-rose-500">*</span></label>
                  <input type="text" id="builder-speaker-name" class="luminous-input w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-900" placeholder="Vũ Nguyễn Quốc Kiệt">
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Chức Danh / Đơn Vị</label>
                  <input type="text" id="builder-speaker-role" class="luminous-input w-full px-4 py-2.5 rounded-xl text-sm text-slate-900" placeholder="Senior AI Engineer & Tech Lead, VibeLab">
                </div>
              </div>

              <!-- Speaker Avatar URL with Live Circle Preview -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Link Ảnh Đại Diện (Avatar URL)</label>
                <div class="flex items-center gap-3">
                  <div id="builder-avatar-preview" class="w-11 h-11 rounded-xl bg-slate-100 border border-slate-300 overflow-hidden flex items-center justify-center text-slate-600 font-bold text-sm shrink-0 shadow-xs">
                    VK
                  </div>
                  <input type="url" id="builder-speaker-avatar" class="luminous-input w-full px-4 py-2.5 rounded-xl text-sm text-slate-900 placeholder:text-slate-400" placeholder="https://images.unsplash.com/...">
                </div>
              </div>

              <!-- Early Bird Perks -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Quà Tặng / Ưu Đãi Đăng Ký Sớm (Early Bird)</label>
                <div class="relative">
                  <i class="fa-solid fa-gift absolute left-3.5 top-3.5 text-amber-500 text-xs"></i>
                  <input type="text" id="builder-perks" class="luminous-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400" placeholder="VD: Giảm 50% vé VIP + Tặng Ebook Vibe Coding độc quyền trị giá 2.000.000đ">
                </div>
              </div>
            </div>
          </div>

          <!-- POD 4: Agenda Timeline Builder -->
          <div class="luminous-panel rounded-3xl p-5 sm:p-6">
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200">4</div>
                <div>
                  <h3 class="text-base font-bold text-slate-900 font-heading">Lịch Trình Sự Kiện (Agenda Timeline)</h3>
                  <p class="text-xs text-slate-500">Các mốc thời gian chi tiết trong buổi sự kiện</p>
                </div>
              </div>
              <span class="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">5 mốc</span>
            </div>

            <div class="space-y-3">
              <!-- Item 1 -->
              <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                <div class="flex items-center gap-2">
                  <input type="text" id="agenda-time-1" class="luminous-input w-28 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold" value="08:30 - 09:00">
                  <input type="text" id="agenda-title-1" class="luminous-input flex-1 px-3 py-1.5 rounded-lg text-xs font-bold" value="Đón Tiếp Khách Mời &amp; Check-in Mã QR">
                </div>
                <input type="text" id="agenda-desc-1" class="luminous-input w-full px-3 py-1.5 rounded-lg text-[11px]" value="Khách mời quét mã QR vé điện tử tại bàn lễ tân, nhận bộ quà tặng Welcome Kit.">
              </div>

              <!-- Item 2 -->
              <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                <div class="flex items-center gap-2">
                  <input type="text" id="agenda-time-2" class="luminous-input w-28 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold" value="09:00 - 09:30">
                  <input type="text" id="agenda-title-2" class="luminous-input flex-1 px-3 py-1.5 rounded-lg text-xs font-bold" value="Khai Mạc &amp; Phát Biểu Định Hướng">
                </div>
                <input type="text" id="agenda-desc-2" class="luminous-input w-full px-3 py-1.5 rounded-lg text-[11px]" value="Đại diện Ban Tổ chức FPT Polytechnic chia sẻ về tầm nhìn số hóa và xu hướng tiếp thị 2026.">
              </div>

              <!-- Item 3 -->
              <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                <div class="flex items-center gap-2">
                  <input type="text" id="agenda-time-3" class="luminous-input w-28 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold" value="09:30 - 10:30">
                  <input type="text" id="agenda-title-3" class="luminous-input flex-1 px-3 py-1.5 rounded-lg text-xs font-bold" value="Keynote: Xây Dựng Ứng Dụng &amp; Tự Động Hóa Thực Chiến">
                </div>
                <input type="text" id="agenda-desc-3" class="luminous-input w-full px-3 py-1.5 rounded-lg text-[11px]" value="Trình diễn trực tiếp quy trình tạo landing page và hệ thống đăng ký tự động trong 5 phút.">
              </div>

              <!-- Item 4 -->
              <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                <div class="flex items-center gap-2">
                  <input type="text" id="agenda-time-4" class="luminous-input w-28 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold" value="10:30 - 11:15">
                  <input type="text" id="agenda-title-4" class="luminous-input flex-1 px-3 py-1.5 rounded-lg text-xs font-bold" value="Tọa Đàm &amp; Hỏi Đáp Trực Tiếp (Q&amp;A)">
                </div>
                <input type="text" id="agenda-desc-4" class="luminous-input w-full px-3 py-1.5 rounded-lg text-[11px]" value="Giải đáp các thắc mắc về tối ưu công cụ, triển khai thực tế và cơ hội nghề nghiệp.">
              </div>

              <!-- Item 5 -->
              <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                <div class="flex items-center gap-2">
                  <input type="text" id="agenda-time-5" class="luminous-input w-28 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold" value="11:15 - 11:45">
                  <input type="text" id="agenda-title-5" class="luminous-input flex-1 px-3 py-1.5 rounded-lg text-xs font-bold" value="Bốc Thăm Quà Tặng Ebook &amp; Bế Mạc">
                </div>
                <input type="text" id="agenda-desc-5" class="luminous-input w-full px-3 py-1.5 rounded-lg text-[11px]" value="Trao tặng suất học bổng, bộ Ebook độc quyền và chụp ảnh lưu niệm cùng diễn giả.">
              </div>
            </div>
          </div>

          <!-- POD 5: Live Summary Box -->
          <div class="luminous-panel rounded-3xl p-5 sm:p-6">
            <h3 class="text-sm font-bold text-slate-900 font-heading mb-3 flex items-center justify-between">
              <span>Bảng Tóm Tắt Trạng Thái</span>
              <span class="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Đồng bộ tự động
              </span>
            </h3>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-500">Tiêu đề:</div>
                <div id="quick-summary-title" class="font-bold text-slate-800 truncate mt-0.5">AI Summit 2026</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-500">Diễn giả:</div>
                <div id="quick-summary-speaker" class="font-bold text-slate-800 truncate mt-0.5">Vũ Nguyễn Quốc Kiệt</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-500">Địa điểm:</div>
                <div id="quick-summary-loc" class="font-bold text-slate-800 truncate mt-0.5">Innovation Hall</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-500">Vé đã đăng ký:</div>
                <div id="quick-summary-tickets" class="font-bold text-slate-800 font-mono mt-0.5">0/200</div>
              </div>
            </div>
            <div id="quick-summary-datetime" class="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2">
              <i class="fa-regular fa-clock text-blue-600"></i>
              <span>Chưa thiết lập giờ G</span>
            </div>
          </div>

        </div>
      </div>

      <!-- ======================================================================= -->
      <!-- VIEW B: LIVE RENDERED LANDING PAGE (R4) -->
      <!-- ======================================================================= -->
      <div id="view-preview" class="w-full">
        <div class="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden relative">

          <!-- 1. LANDING PAGE STICKY HEADER -->
          <nav class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-3.5 flex items-center justify-between">
            <div class="flex items-center gap-2 font-black text-slate-900 tracking-tight font-heading text-sm sm:text-base">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span id="preview-nav-brand">AI Summit 2026</span>
            </div>
            
            <div class="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
              <a href="#hero-section" class="hover:text-slate-900 transition-colors">Tổng Quan</a>
              <a href="#benefits-section" class="hover:text-slate-900 transition-colors">Lợi Ích</a>
              <a href="#agenda-section" class="hover:text-slate-900 transition-colors">Lịch Trình</a>
              <a href="#speaker-section" class="hover:text-slate-900 transition-colors">Diễn Giả</a>
              <a href="#register-section" class="hover:text-slate-900 transition-colors">Đăng Ký Vé</a>
            </div>

            <a href="#register-section" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
              <i class="fa-solid fa-ticket text-xs"></i>
              <span>Giữ Chỗ Ngay</span>
            </a>
          </nav>

          <!-- 2. HERO SECTION -->
          <section id="hero-section" class="py-16 sm:py-24 px-4 sm:px-8 text-center relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white">
            <div class="max-w-4xl mx-auto relative z-10">
              
              <!-- Location & Category Tag -->
              <div class="inline-block mb-4">
                <span id="preview-hero-tag" class="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-bold inline-flex items-center gap-2 shadow-2xs">
                  🔴 TRỰC TIẾP TẠI TP. HỒ CHÍ MINH // SỰ KIỆN ĐỈNH CAO 2026
                </span>
              </div>

              <!-- Main Event Title -->
              <h1 id="preview-hero-title" class="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-heading leading-[1.15]">
                AI Summit 2026: Vibe Coding & The Future of Marketing
              </h1>

              <!-- Attention Headline -->
              <h2 id="preview-hero-headline" class="text-lg sm:text-xl font-bold text-blue-600 mt-4 max-w-3xl mx-auto">
                Bùng Nổ Vibe Coding 2026: Làm Chủ Kỷ Nguyên Trí Tuệ Nhân Tạo Trong 5 Phút!
              </h2>

              <!-- Hook & Description -->
              <p id="preview-hero-hook" class="text-slate-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                85% quy trình lập trình và tiếp thị đang được tự động hóa. Đừng để mình trở thành người đứng ngoài cuộc cách mạng công nghệ lớn nhất thập kỷ. Khóa học thực chiến trang bị tư duy và công cụ bứt phá!
              </p>

              <!-- Early Bird Perks Banner -->
              <div id="preview-hero-perks-box" class="mt-6 max-w-2xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 flex items-center justify-center gap-3 shadow-2xs">
                <i class="fa-solid fa-gift text-amber-600 text-lg shrink-0"></i>
                <div class="text-xs sm:text-sm font-medium text-left">
                  <strong class="font-bold text-amber-950 uppercase tracking-wide">ƯU ĐÃI ĐĂNG KÝ SỚM:</strong>
                  <span id="preview-hero-perks">Giảm 50% vé VIP + Tặng Ebook Vibe Coding độc quyền trị giá 2.000.000đ</span>
                </div>
              </div>

              <!-- Hero CTA Buttons -->
              <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#register-section" class="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer">
                  <i class="fa-solid fa-ticket"></i>
                  <span>Đăng Ký Tham Dự Ngay</span>
                </a>
                <a href="#agenda-section" class="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm shadow-2xs transition-all flex items-center gap-2 cursor-pointer">
                  <i class="fa-regular fa-calendar-days text-slate-500"></i>
                  <span>Xem Lịch Trình</span>
                </a>
              </div>

              <!-- Realtime Ticket Progress Bar -->
              <div class="mt-10 max-w-md mx-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span id="preview-seats-label" class="flex items-center gap-1.5">
                    <i class="fa-solid fa-users text-blue-600"></i>
                    <span>Đã có 142/200 người giữ chỗ!</span>
                  </span>
                  <span id="preview-seats-percent" class="text-blue-600 font-mono">71%</span>
                </div>
                <div class="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div id="preview-seats-bar" class="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500" style="width: 71%;"></div>
                </div>
                <div class="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span id="preview-seats-remaining">Chỉ còn 58 vé miễn phí cuối cùng</span>
                  <span class="flex items-center gap-1 text-emerald-600 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Cập nhật tự động
                  </span>
                </div>
              </div>

            </div>
          </section>

          <!-- 3. LIVE COUNTDOWN TIMER SECTION -->
          <section id="countdown-section" class="py-12 px-4 sm:px-6 bg-slate-50/50 border-y border-slate-100">
            <div class="max-w-4xl mx-auto">
              <div class="luminous-panel rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-200">
                <div class="text-center mb-6">
                  <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                    <i class="fa-regular fa-clock text-blue-600"></i>
                    <span>Đếm Ngược Đến Giờ G Khai Mạc</span>
                  </div>
                  <div id="preview-countdown-date-label" class="text-sm sm:text-base font-bold text-slate-900 font-heading">
                    09:00 - Chủ Nhật, 08/11/2026
                  </div>
                </div>

                <!-- 4 Crystalline Dial Cards -->
                <div id="countdown-container">
                  <div class="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
                    <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">
                      <div id="timer-days" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">00</div>
                      <div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Ngày</div>
                    </div>
                    <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">
                      <div id="timer-hours" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">00</div>
                      <div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Giờ</div>
                    </div>
                    <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">
                      <div id="timer-mins" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">00</div>
                      <div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Phút</div>
                    </div>
                    <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">
                      <div id="timer-secs" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">00</div>
                      <div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Giây</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 4. 3 EXCLUSIVE BENEFITS (ACTION) -->
          <section id="benefits-section" class="py-16 sm:py-20 px-4 sm:px-8">
            <div class="max-w-5xl mx-auto">
              <div class="text-center mb-12">
                <span class="text-xs font-bold uppercase tracking-widest text-blue-600">Đặc Quyền Hội Nghị</span>
                <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
                  3 Giá Trị Độc Quyền Khi Tham Dự
                </h2>
                <p class="text-slate-600 text-sm sm:text-base mt-2">
                  Nội dung thực chiến, đào tạo tư duy cốt lõi và kết nối mạng lưới chuyên gia công nghệ hàng đầu
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Benefit 1 -->
                <div class="luminous-card rounded-2xl p-6 sm:p-7 relative overflow-hidden group">
                  <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-sm mb-4">
                    01
                  </div>
                  <h3 class="text-base font-bold text-slate-900 mb-2">Tư Duy &amp; Kỹ Năng Thực Chiến</h3>
                  <p id="preview-card-benefit-1" class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Nắm trọn tư duy Vibe Coding từ ý tưởng đến sản phẩm chạy thực tế chỉ trong 5 phút.
                  </p>
                </div>

                <!-- Benefit 2 -->
                <div class="luminous-card rounded-2xl p-6 sm:p-7 relative overflow-hidden group">
                  <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-sm mb-4">
                    02
                  </div>
                  <h3 class="text-base font-bold text-slate-900 mb-2">Bộ Template &amp; Mã Nguồn Mẫu</h3>
                  <p id="preview-card-benefit-2" class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Nhận bộ công cụ Template AI độc quyền và mã nguồn mẫu chuẩn quốc tế sẵn sàng áp dụng.
                  </p>
                </div>

                <!-- Benefit 3 -->
                <div class="luminous-card rounded-2xl p-6 sm:p-7 relative overflow-hidden group">
                  <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center font-bold text-sm mb-4">
                    03
                  </div>
                  <h3 class="text-base font-bold text-slate-900 mb-2">Mạng Lưới Chuyên Gia Đỉnh Cao</h3>
                  <p id="preview-card-benefit-3" class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Kết nối trực tiếp cùng chuyên gia và cộng đồng Tech Lead hàng đầu FPT Polytechnic.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- 5. AGENDA TIMELINE SECTION -->
          <section id="agenda-section" class="py-16 sm:py-20 px-4 sm:px-8 bg-slate-50/60 border-t border-slate-100">
            <div class="max-w-4xl mx-auto">
              <div class="text-center mb-12">
                <span class="text-xs font-bold uppercase tracking-widest text-blue-600">Chương Trình Chi Tiết</span>
                <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
                  Lịch Trình Sự Kiện (Agenda)
                </h2>
                <p class="text-slate-600 text-sm sm:text-base mt-2">
                  5 mốc hoạt động xuyên suốt được thiết kế mạch lạc, tối ưu thời gian tiếp thu
                </p>
              </div>

              <!-- Vertical Timeline Structure -->
              <div id="preview-agenda-list" class="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 sm:before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                
                <!-- Item 1: 08:30 - 09:00 -->
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center">
                  <div class="sm:w-1/2 sm:text-right sm:pr-8 pl-12 sm:pl-0">
                    <div class="luminous-card rounded-2xl p-4 sm:p-5 text-left sm:text-right">
                      <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200 inline-block">08:30 - 09:00</span>
                      <h4 class="text-base sm:text-lg font-bold text-slate-900 mt-2 font-heading">Đón Tiếp Khách Mời &amp; Check-in Mã QR</h4>
                      <p class="text-xs sm:text-sm text-slate-600 mt-1">Khách mời quét mã QR vé điện tử tại bàn lễ tân, nhận bộ quà tặng Welcome Kit và giao lưu kết nối ban đầu.</p>
                    </div>
                  </div>
                  <div class="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 text-xs shadow-sm z-10">
                    <i class="fa-solid fa-qrcode"></i>
                  </div>
                  <div class="hidden sm:block sm:w-1/2 sm:pl-8"></div>
                </div>

                <!-- Item 2: 09:00 - 09:30 -->
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center">
                  <div class="hidden sm:block sm:w-1/2 sm:pr-8"></div>
                  <div class="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 text-xs shadow-sm z-10">
                    <i class="fa-solid fa-microphone"></i>
                  </div>
                  <div class="sm:w-1/2 sm:pl-8 pl-12 sm:pl-8">
                    <div class="luminous-card rounded-2xl p-4 sm:p-5">
                      <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200 inline-block">09:00 - 09:30</span>
                      <h4 class="text-base sm:text-lg font-bold text-slate-900 mt-2 font-heading">Khai Mạc &amp; Phát Biểu Định Hướng</h4>
                      <p class="text-xs sm:text-sm text-slate-600 mt-1">Đại diện Ban Tổ chức FPT Polytechnic chia sẻ về tầm nhìn số hóa và xu hướng tiếp thị 2026.</p>
                    </div>
                  </div>
                </div>

                <!-- Item 3: 09:30 - 10:30 -->
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center">
                  <div class="sm:w-1/2 sm:text-right sm:pr-8 pl-12 sm:pl-0">
                    <div class="luminous-card rounded-2xl p-4 sm:p-5 text-left sm:text-right">
                      <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200 inline-block">09:30 - 10:30</span>
                      <h4 class="text-base sm:text-lg font-bold text-slate-900 mt-2 font-heading">Keynote: Xây Dựng Ứng Dụng &amp; Tự Động Hóa Thực Chiến</h4>
                      <p class="text-xs sm:text-sm text-slate-600 mt-1">Trình diễn trực tiếp quy trình tạo landing page và hệ thống đăng ký tự động trong 5 phút.</p>
                    </div>
                  </div>
                  <div class="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 text-xs shadow-sm z-10">
                    <i class="fa-solid fa-laptop-code"></i>
                  </div>
                  <div class="hidden sm:block sm:w-1/2 sm:pl-8"></div>
                </div>

                <!-- Item 4: 10:30 - 11:15 -->
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center">
                  <div class="hidden sm:block sm:w-1/2 sm:pr-8"></div>
                  <div class="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 text-xs shadow-sm z-10">
                    <i class="fa-solid fa-comments"></i>
                  </div>
                  <div class="sm:w-1/2 sm:pl-8 pl-12 sm:pl-8">
                    <div class="luminous-card rounded-2xl p-4 sm:p-5">
                      <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200 inline-block">10:30 - 11:15</span>
                      <h4 class="text-base sm:text-lg font-bold text-slate-900 mt-2 font-heading">Tọa Đàm &amp; Hỏi Đáp Trực Tiếp (Q&amp;A)</h4>
                      <p class="text-xs sm:text-sm text-slate-600 mt-1">Giải đáp các thắc mắc về tối ưu công cụ, triển khai thực tế và cơ hội nghề nghiệp.</p>
                    </div>
                  </div>
                </div>

                <!-- Item 5: 11:15 - 11:45 -->
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center">
                  <div class="sm:w-1/2 sm:text-right sm:pr-8 pl-12 sm:pl-0">
                    <div class="luminous-card rounded-2xl p-4 sm:p-5 text-left sm:text-right">
                      <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200 inline-block">11:15 - 11:45</span>
                      <h4 class="text-base sm:text-lg font-bold text-slate-900 mt-2 font-heading">Bốc Thăm Quà Tặng Ebook &amp; Bế Mạc</h4>
                      <p class="text-xs sm:text-sm text-slate-600 mt-1">Trao tặng suất học bổng, bộ Ebook độc quyền và chụp ảnh lưu niệm cùng diễn giả.</p>
                    </div>
                  </div>
                  <div class="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center text-amber-500 text-xs shadow-sm z-10">
                    <i class="fa-solid fa-trophy"></i>
                  </div>
                  <div class="hidden sm:block sm:w-1/2 sm:pl-8"></div>
                </div>
              </div>

            </div>
          </section>

          <!-- 6. SPEAKERS GRID SECTION -->
          <section id="speaker-section" class="py-16 sm:py-20 px-4 sm:px-8">
            <div class="max-w-6xl mx-auto">
              <div class="text-center mb-12">
                <span class="text-xs font-bold uppercase tracking-widest text-blue-600">Chuyên Gia Đồng Hành</span>
                <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
                  Diễn Giả Hàng Đầu (Keynote Speakers)
                </h2>
                <p class="text-slate-600 text-sm sm:text-base mt-2">
                  Gặp gỡ các chuyên gia đầu ngành trong lĩnh vực AI và phát triển phần mềm
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <!-- Main Keynote Speaker Card -->
                <div class="luminous-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden group">
                  <div class="h-1.5 w-full bg-blue-600 absolute top-0 left-0"></div>
                  
                  <!-- Avatar Container -->
                  <div id="preview-speaker-avatar-container" class="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md group-hover:scale-105 transition-transform duration-300 mb-5 relative">
                    <img id="preview-speaker-img" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Speaker" class="w-full h-full object-cover" onerror="handleSpeakerImgError()">
                    <div id="preview-speaker-letter-avatar" class="hidden w-full h-full bg-slate-900 flex items-center justify-center text-white text-3xl font-black">
                      VK
                    </div>
                  </div>

                  <div class="inline-block px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-2">Keynote Speaker</div>
                  <h3 id="preview-speaker-name" class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                    Vũ Nguyễn Quốc Kiệt
                  </h3>
                  <p id="preview-speaker-role" class="text-xs font-semibold text-blue-600 mt-1">
                    Senior AI Engineer &amp; Tech Lead, VibeLab
                  </p>
                  <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                    Tác giả dự thi Cuộc thi Vibe-Coding 2026 (MSSV: TB02465). Chuyên gia nghiên cứu các giải pháp AI tự động hóa và kiến trúc ứng dụng web hiệu năng cao.
                  </p>

                  <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-slate-400 text-sm">
                    <a href="#" class="hover:text-slate-700 transition-colors"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#" class="hover:text-slate-700 transition-colors"><i class="fa-brands fa-github"></i></a>
                    <a href="#" class="hover:text-slate-700 transition-colors"><i class="fa-solid fa-globe"></i></a>
                  </div>
                </div>

                <!-- Guest Speaker 2: Mentor / Industry Expert -->
                <div class="luminous-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden group">
                  <div class="h-1.5 w-full bg-emerald-600 absolute top-0 left-0"></div>
                  
                  <div class="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md group-hover:scale-105 transition-transform duration-300 mb-5">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Mentor" class="w-full h-full object-cover">
                  </div>

                  <div class="inline-block px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-2">Guest Mentor</div>
                  <h3 class="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors font-heading">
                    Trần Hoàng Minh
                  </h3>
                  <p class="text-xs font-semibold text-emerald-600 mt-1">
                    Head of Product &amp; Growth, FPT Tech
                  </p>
                  <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                    Cố vấn chiến lược công nghệ và phát triển sản phẩm số. Hơn 10 năm kinh nghiệm dẫn dắt các đội ngũ kỹ sư kiến tạo sản phẩm quy mô hàng triệu người dùng.
                  </p>

                  <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-slate-400 text-sm">
                    <a href="#" class="hover:text-slate-700 transition-colors"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#" class="hover:text-slate-700 transition-colors"><i class="fa-brands fa-github"></i></a>
                    <a href="#" class="hover:text-slate-700 transition-colors"><i class="fa-solid fa-globe"></i></a>
                  </div>
                </div>

                <!-- Guest Speaker 3: Tech Community Lead -->
                <div class="luminous-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden group">
                  <div class="h-1.5 w-full bg-purple-600 absolute top-0 left-0"></div>
                  
                  <div class="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md group-hover:scale-105 transition-transform duration-300 mb-5">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Speaker" class="w-full h-full object-cover">
                  </div>

                  <div class="inline-block px-3 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider mb-2">AI Architect</div>
                  <h3 class="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors font-heading">
                    Lê Thảo My
                  </h3>
                  <p class="text-xs font-semibold text-purple-600 mt-1">
                    Senior AI Solutions Architect
                  </p>
                  <p class="text-xs text-slate-600 mt-3 leading-relaxed">
                    Chuyên gia kiến trúc hệ thống dữ liệu và giải pháp AI chuyển đổi số. Diễn giả quen thuộc tại các diễn đàn công nghệ dành cho sinh viên và lập trình viên.
                  </p>

                  <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-slate-400 text-sm">
                    <a href="#" class="hover:text-slate-700 transition-colors"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#" class="hover:text-slate-700 transition-colors"><i class="fa-brands fa-github"></i></a>
                    <a href="#" class="hover:text-slate-700 transition-colors"><i class="fa-solid fa-globe"></i></a>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <!-- 7. REGISTRATION FORM & TICKET SYSTEM (R5) -->
          <section id="register-section" class="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50/70 border-t border-slate-200">
            <div class="max-w-2xl mx-auto">
              
              <div class="luminous-panel rounded-3xl p-6 sm:p-10 shadow-md">
                
                <div class="text-center mb-8">
                  <span class="text-xs font-bold uppercase tracking-widest text-blue-600">Đăng Ký Tham Dự</span>
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-heading">
                    Giữ Chỗ Vé Điện Tử (E-Ticket)
                  </h2>
                  <p class="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    Điền đầy đủ thông tin bên dưới để nhận ngay mã vé QR cá nhân hóa và giữ chỗ chính thức tại sự kiện
                  </p>
                </div>

                <!-- Registration Form -->
                <form id="form-registration" onsubmit="handleRegistrationSubmit(event)" class="space-y-4" novalidate>
                  
                  <!-- Full Name Input -->
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Họ và Tên Đầy Đủ <span class="text-rose-500">*</span>
                    </label>
                    <div class="relative">
                      <i class="fa-regular fa-user absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
                      <input type="text" id="reg-name" required class="luminous-input w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold placeholder:text-slate-400" placeholder="Nguyễn Văn An">
                    </div>
                    <span id="err-reg-name" class="hidden text-rose-500 text-xs mt-1 block"></span>
                  </div>

                  <!-- Email Input -->
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Nhận Vé &amp; Tài Liệu <span class="text-rose-500">*</span>
                    </label>
                    <div class="relative">
                      <i class="fa-regular fa-envelope absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
                      <input type="email" id="reg-email" required class="luminous-input w-full pl-10 pr-4 py-3 rounded-xl text-sm placeholder:text-slate-400" placeholder="an.nguyen@fpt.edu.vn">
                    </div>
                    <span id="err-reg-email" class="hidden text-rose-500 text-xs mt-1 block"></span>
                  </div>

                  <!-- Phone Number Input -->
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Số Điện Thoại (Zalo) <span class="text-rose-500">*</span>
                    </label>
                    <div class="relative">
                      <i class="fa-solid fa-phone absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
                      <input type="tel" id="reg-phone" required class="luminous-input w-full pl-10 pr-4 py-3 rounded-xl text-sm font-mono placeholder:text-slate-400" placeholder="0912 345 678">
                    </div>
                    <span id="err-reg-phone" class="hidden text-rose-500 text-xs mt-1 block"></span>
                  </div>

                  <!-- Organization / Class Input -->
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Đơn Vị / Trường / Lớp <span class="text-rose-500">*</span>
                    </label>
                    <div class="relative">
                      <i class="fa-solid fa-graduation-cap absolute left-3.5 top-3.5 text-slate-400 text-xs"></i>
                      <input type="text" id="reg-org" required class="luminous-input w-full pl-10 pr-4 py-3 rounded-xl text-sm placeholder:text-slate-400" placeholder="FPT Polytechnic - Lớp WD18301">
                    </div>
                    <span id="err-reg-org" class="hidden text-rose-500 text-xs mt-1 block"></span>
                  </div>

                  <!-- Submit CTA Button -->
                  <div class="pt-3">
                    <button type="submit" class="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-sm transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer">
                      <i class="fa-solid fa-ticket"></i>
                      <span>Xác Nhận Đăng Ký &amp; Nhận Vé QR</span>
                    </button>
                  </div>

                  <p class="text-[11px] text-slate-500 text-center mt-3">
                    Bằng việc nhấn đăng ký, bạn đồng ý nhận thông báo lịch trình và tài liệu sự kiện qua email/SĐT.
                  </p>
                </form>

              </div>

            </div>
          </section>

          <!-- 8. LANDING PAGE FOOTER -->
          <footer class="py-10 px-4 sm:px-8 bg-white border-t border-slate-100 text-center">
            <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div class="flex items-center gap-2 font-bold text-slate-800 font-heading">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>VIBE EVENT STUDIO • ĐỀ SỐ 8</span>
              </div>
              <div>
                Bài thi Vibe-Coding 2026 • Tác giả: <strong class="text-slate-800">Vũ Nguyễn Quốc Kiệt</strong> (MSSV: TB02465)
              </div>
              <div class="text-[11px] text-slate-400">
                FPT Polytechnic • 2026
              </div>
            </div>
          </footer>

        </div>
      </div>

    </div>
  </main>

  <!-- ========================================================================= -->
  <!-- MODALS SYSTEM (E-TICKET, ATTENDEES, RESET CONFIRMATION, DEPLOY, AI CONFIG) -->
  <!-- ========================================================================= -->

  <!-- MODAL 1: E-TICKET BOARDING PASS MODAL (R5) -->
  <div id="modal-ticket" role="dialog" aria-modal="true" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
    <div class="luminous-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-slate-900">
      
      <!-- Close button -->
      <button onclick="closeModal('modal-ticket')" class="no-print absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Ticket Header -->
      <div class="flex items-center justify-between pb-4 border-b border-slate-100 relative z-10">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold text-sm">
            <i class="fa-solid fa-ticket"></i>
          </div>
          <div>
            <div class="text-[10px] font-bold uppercase tracking-wider text-emerald-600">VIP Boarding Pass</div>
            <div class="text-sm font-extrabold text-slate-900 font-heading">VÉ THAM DỰ SỰ KIỆN CHÍNH THỨC</div>
          </div>
        </div>
        <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">CONFIRMED</span>
      </div>

      <!-- Ticket Body -->
      <div class="py-5 space-y-4 relative z-10">
        <div>
          <div class="text-[10px] uppercase tracking-wider text-slate-400">Sự Kiện:</div>
          <div id="ticket-event-name" class="text-base sm:text-lg font-bold text-slate-900 font-heading">
            AI Summit 2026: Vibe Coding & The Future of Marketing
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-xs">
          <div class="luminous-card rounded-xl p-2.5 bg-slate-50">
            <div class="text-slate-500 text-[11px]">Họ và Tên:</div>
            <div id="ticket-attendee-name" class="font-bold text-slate-900 text-sm mt-0.5">Nguyễn Văn A</div>
          </div>
          <div class="luminous-card rounded-xl p-2.5 bg-slate-50">
            <div class="text-slate-500 text-[11px]">Số Điện Thoại:</div>
            <div id="ticket-attendee-phone" class="font-bold text-slate-900 font-mono mt-0.5">0912 345 678</div>
          </div>
          <div class="luminous-card rounded-xl p-2.5 bg-slate-50">
            <div class="text-slate-500 text-[11px]">Đơn Vị / Lớp:</div>
            <div id="ticket-attendee-org" class="font-semibold text-slate-800 mt-0.5">FPT Polytechnic</div>
          </div>
          <div class="luminous-card rounded-xl p-2.5 bg-slate-50">
            <div class="text-slate-500 text-[11px]">Thời Gian:</div>
            <div id="ticket-event-time" class="font-semibold text-slate-800 mt-0.5">09:00 - 08/11/2026</div>
          </div>
        </div>

        <div class="luminous-card rounded-xl p-2.5 bg-slate-50">
          <div class="text-[11px] text-slate-500">Địa Điểm:</div>
          <div id="ticket-event-location" class="text-xs font-semibold text-slate-800 mt-0.5">Hội trường Innovation Hall, FPT Polytechnic, TP.HCM</div>
        </div>
      </div>

      <!-- Perforated Tear Line -->
      <div class="perforated-line my-2"></div>

      <!-- Ticket QR & Code Footer -->
      <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div>
          <div class="text-[10px] uppercase tracking-wider text-slate-400">Mã Vé Điện Tử:</div>
          <div id="ticket-code-display" class="text-lg sm:text-xl font-black font-mono text-blue-600 tracking-wider">
            VIBE-2026-A8F4C2
          </div>
          <div class="text-[11px] text-slate-500 mt-1">Xuất trình mã này tại quầy Check-in sự kiện</div>
        </div>

        <!-- Scannable QR Code Container -->
        <div class="p-2.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
          <div id="ticket-qrcode-container" class="w-24 h-24 flex items-center justify-center">
            <!-- QR code rendered dynamically -->
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="no-print mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3 relative z-10">
        <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2 transition-colors shadow-xs">
          <i class="fa-solid fa-print"></i>
          <span>In Vé / PDF</span>
        </button>
        <button onclick="closeModal('modal-ticket')" class="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-sm transition-colors">
          Hoàn Tất
        </button>
      </div>

    </div>
  </div>

  <!-- MODAL 2: ATTENDEES DIRECTORY & CSV EXPORT (R5) -->
  <div id="modal-attendees" role="dialog" aria-modal="true" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
    <div class="luminous-panel max-w-4xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-slate-900 flex flex-col max-h-[90vh]">
      
      <!-- Close button -->
      <button onclick="closeModal('modal-attendees')" class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Modal Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-slate-900 font-heading">Danh Sách Người Đã Giữ Chỗ</h3>
            <span id="attendees-count" class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold">0</span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">Dữ liệu được lưu trữ tự động trong localStorage trình duyệt</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-export-csv" onclick="exportAttendeesToCsv()" class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-file-excel text-emerald-400"></i>
            <span>Xuất File CSV (Excel)</span>
          </button>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="py-3 flex items-center gap-3">
        <div class="relative flex-1">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
          <input type="text" id="attendees-search" oninput="filterAttendeesList()" class="luminous-input w-full pl-9 pr-4 py-2 rounded-xl text-xs placeholder:text-slate-400" placeholder="Tìm theo tên, email, số điện thoại, mã vé...">
        </div>
        <div class="text-xs text-slate-500 shrink-0 font-mono">
          Tổng cộng: <strong id="attendees-total-count" class="text-slate-900">0</strong>
        </div>
      </div>

      <!-- Attendees Table -->
      <div class="flex-1 overflow-y-auto rounded-2xl border border-slate-200 my-2">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-slate-50 text-slate-700 uppercase tracking-wider text-[10px] font-bold sticky top-0 border-b border-slate-200">
            <tr>
              <th class="py-2.5 px-3">Mã Vé</th>
              <th class="py-2.5 px-3">Họ và Tên</th>
              <th class="py-2.5 px-3">Email</th>
              <th class="py-2.5 px-3">SĐT</th>
              <th class="py-2.5 px-3">Đơn Vị / Lớp</th>
              <th class="py-2.5 px-3">Thời Gian ĐK</th>
            </tr>
          </thead>
          <tbody id="attendees-tbody" class="divide-y divide-slate-100 text-slate-800 font-medium">
            <!-- Dynamic attendee rows -->
          </tbody>
        </table>
      </div>

      <!-- Modal Footer -->
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div>Hỗ trợ xuất định dạng UTF-8 BOM, mở trực tiếp trên Excel không lỗi font tiếng Việt.</div>
        <button onclick="closeModal('modal-attendees')" class="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition">
          Đóng
        </button>
      </div>

    </div>
  </div>

  <!-- MODAL 3: CONFIRM RESET & NEW EVENT (R6) -->
  <div id="modal-reset" role="dialog" aria-modal="true" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
    <div class="luminous-panel max-w-md w-full rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-slate-900">
      
      <div class="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-xl mb-4">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>

      <h3 class="text-lg font-bold text-slate-900 font-heading">
        Tạo Trang Mới (Reset Dữ Liệu)?
      </h3>
      <p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
        Thao tác này sẽ dọn sạch toàn bộ thông tin sự kiện hiện tại và danh sách người đăng ký để bạn bắt đầu tạo một landing page mới từ đầu.
      </p>

      <div class="mt-6 flex items-center justify-end gap-3">
        <button id="btn-cancel-reset" onclick="closeModal('modal-reset')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition">
          Hủy Bỏ
        </button>
        <button id="btn-confirm-reset" onclick="executeResetEvent()" class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-sm transition">
          Xác Nhận Reset
        </button>
      </div>

    </div>
  </div>

  <!-- MODAL 4: DEPLOYMENT GUIDE MODAL -->
  <div id="modal-deploy" role="dialog" aria-modal="true" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
    <div class="luminous-panel max-w-lg w-full rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-slate-900">
      
      <button onclick="closeModal('modal-deploy')" class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold">
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900 font-heading">Hướng Dẫn Triển Khai Miễn Phí (1 Phút)</h3>
          <p class="text-xs text-slate-500">Mã nguồn tệp đơn tự vận hành, không cần cài đặt dependencies</p>
        </div>
      </div>

      <div class="space-y-3 text-xs text-slate-600">
        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div class="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] flex items-center justify-center font-bold">1</span>
            Cách 1: Triển khai lên Vercel
          </div>
          <div>Kéo thả thư mục dự án lên GitHub repository &gt; Vào <strong class="text-slate-900">Vercel.com</strong> chọn Import &gt; Bấm <strong class="text-slate-900">Deploy</strong> để nhận link công khai.</div>
        </div>

        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div class="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] flex items-center justify-center font-bold">2</span>
            Cách 2: GitHub Pages
          </div>
          <div>Bật tính năng GitHub Pages trong Settings repo, chọn nhánh 'main' và thư mục '/root' để chạy trực tuyến.</div>
        </div>

        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div class="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] flex items-center justify-center font-bold">3</span>
            Cách 3: Mở trực tiếp trên máy tính
          </div>
          <div>Click đúp mở tệp <code class="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-mono">index.html</code> bằng trình duyệt Chrome/Edge bất kỳ lúc nào mà không cần kết nối Internet.</div>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button onclick="closeModal('modal-deploy')" class="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition">
          Đã Hiểu
        </button>
      </div>

    </div>
  </div>

  <!-- MODAL 5: ADVANCED SETTINGS MODAL -->
  <div id="modal-ai-settings" role="dialog" aria-modal="true" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
    <div class="luminous-panel max-w-md w-full rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl relative overflow-hidden animate-fade-in text-slate-900">
      
      <button onclick="closeModal('modal-ai-settings')" class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold">
          <i class="fa-solid fa-gear"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900 font-heading">Cài Đặt Cấu Hình Nâng Cao</h3>
          <p class="text-xs text-slate-500">Mặc định ứng dụng tự sinh nội dung offline 100%</p>
        </div>
      </div>

      <div class="space-y-4 text-xs">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Bộ Sinh Bản Thảo</label>
          <select id="ai-provider-select" class="luminous-input w-full px-3.5 py-2.5 rounded-xl font-semibold text-slate-800">
            <option value="client">Client-side Engine (Tự động, không cần API Key)</option>
            <option value="gemini">Google Gemini 1.5 Flash (API Key)</option>
            <option value="openai">OpenAI GPT-4o Mini (API Key)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">API Key (Tùy Chọn)</label>
          <input type="password" id="ai-api-key-input" class="luminous-input w-full px-3.5 py-2.5 rounded-xl font-mono text-slate-800 placeholder:text-slate-400" placeholder="AIzaSy... hoặc sk-...">
          <div class="text-[10px] text-slate-500 mt-1">API Key chỉ lưu trên trình duyệt của bạn (localStorage), tuyệt đối không gửi lên server trung gian.</div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-3">
        <button onclick="closeModal('modal-ai-settings')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition">
          Đóng
        </button>
        <button onclick="saveAiSettings()" class="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition">
          Lưu Cấu Hình
        </button>
      </div>

    </div>
  </div>

  <!-- TOAST NOTIFICATIONS CONTAINER -->
  <div id="toast-container" class="fixed bottom-6 right-6 z-50 space-y-2 pointer-events-none"></div>

  <!-- ========================================================================= -->
`;

const completeHtml = htmlTop + scriptContent;
fs.writeFileSync(path.join(__dirname, '..', 'index.html'), completeHtml, 'utf8');
console.log('Successfully written new light index.html! Total length:', completeHtml.length);
