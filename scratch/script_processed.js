<script>
    /**
     * VIBE EVENT STUDIO - CORE APPLICATION ENGINE
     * Cuộc thi Vibe-Coding 2026 (FPT Polytechnic) - Đề số 8
     * Tác giả: Vũ Nguyễn Quốc Kiệt (MSSV: TB02465)
     */

    // --- APPLICATION STATE MODEL ---
    const EventStudio = {
      // Current active view: 'builder' | 'preview'
      currentView: 'builder',
      
      // Event Metadata
      eventData: {
        id: 'evt_vibe_2026_001',
        title: 'AI Summit 2026: Vibe Coding & The Future of Marketing',
        datetime: '',
        locationType: 'offline', // 'offline' | 'online'
        location: 'Hội trường Innovation Hall, FPT Polytechnic, TP.HCM',
        totalSeats: 200,
        headline: 'Bùng Nổ Vibe Coding 2026: Làm Chủ Kỷ Nguyên Trí Tuệ Nhân Tạo Trong 5 Phút!',
        hook: '85% quy trình lập trình và tiếp thị đang được tự động hóa. Đừng để mình trở thành người đứng ngoài cuộc cách mạng công nghệ lớn nhất thập kỷ. Khóa học thực chiến trang bị tư duy và công cụ bứt phá!',
        benefits: [
          'Nắm trọn tư duy Vibe Coding từ ý tưởng đến sản phẩm chạy thực tế chỉ trong 5 phút.',
          'Nhận bộ công cụ Template AI độc quyền và mã nguồn mẫu chuẩn quốc tế sẵn sàng áp dụng.',
          'Kết nối trực tiếp cùng chuyên gia và cộng đồng Tech Lead hàng đầu FPT Polytechnic.'
        ],
        speaker: {
          name: 'Vũ Nguyễn Quốc Kiệt',
          role: 'Senior AI Engineer & Tech Lead, VibeLab',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          initials: 'VK'
        },
        earlyBirdPerks: 'Giảm 50% vé VIP + Tặng Ebook Vibe Coding độc quyền trị giá 2.000.000đ'
      },

      // Registered Attendees Array
      attendees: [],

      // AI Settings
      aiSettings: {
        provider: 'client', // 'client' | 'gemini' | 'openai'
        apiKey: ''
      },

      // Timer Interval ID
      countdownIntervalId: null
    };

    // --- PRESETS DICTIONARY (4 RICH TECH EVENTS) ---
    const EVENT_PRESETS = {
      ai_summit: {
        title: 'AI Summit 2026: Vibe Coding & The Future of Marketing',
        locationType: 'offline',
        location: 'Hội trường Innovation Hall, FPT Polytechnic, TP.HCM',
        totalSeats: 200,
        headline: 'Bùng Nổ Vibe Coding 2026: Làm Chủ Kỷ Nguyên Trí Tuệ Nhân Tạo Trong 5 Phút!',
        hook: '85% quy trình lập trình và tiếp thị đang được tự động hóa. Đừng để mình trở thành người đứng ngoài cuộc cách mạng công nghệ lớn nhất thập kỷ. Khóa học thực chiến trang bị tư duy và công cụ bứt phá!',
        benefits: [
          'Nắm trọn tư duy Vibe Coding từ ý tưởng đến sản phẩm chạy thực tế chỉ trong 5 phút.',
          'Nhận bộ công cụ Template AI độc quyền và mã nguồn mẫu chuẩn quốc tế sẵn sàng áp dụng.',
          'Kết nối trực tiếp cùng chuyên gia và cộng đồng Tech Lead hàng đầu FPT Polytechnic.'
        ],
        speaker: {
          name: 'Vũ Nguyễn Quốc Kiệt',
          role: 'Senior AI Engineer & Tech Lead, VibeLab',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          initials: 'VK'
        },
        earlyBirdPerks: 'Giảm 50% vé VIP + Tặng Ebook Vibe Coding độc quyền trị giá 2.000.000đ'
      },
      career_fair: {
        title: 'Tech Career Day 2026: Kết Nối Việc Làm IT & Khởi Nghiệp Công Nghệ',
        locationType: 'offline',
        location: 'Sân vận động FPT Polytechnic, Cơ sở Quang Trung, TP.HCM',
        totalSeats: 350,
        headline: 'Chinh Phục Thu Nhập Nghìn Đô: Cơ Hội Tuyển Dụng IT Lớn Nhất Năm 2026!',
        hook: 'Hơn 50 doanh nghiệp công nghệ hàng đầu đang săn đón các tài năng lập trình viên và AI Vibe Coder. Bạn đã sẵn sàng để phỏng vấn và nhận offer ngay tại sự kiện?',
        benefits: [
          'Phỏng vấn trực tiếp cùng các Tech Lead và HR Director từ các tập đoàn hàng đầu.',
          'Được sửa CV 1-1 miễn phí và định hướng lộ trình thăng tiến sự nghiệp IT.',
          'Nhận hàng ngàn phần quà công nghệ độc quyền và cơ hội nhận học bổng chuyên sâu.'
        ],
        speaker: {
          name: 'Trần Hoàng Minh',
          role: 'Head of Product & Growth, FPT Tech',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          initials: 'TM'
        },
        earlyBirdPerks: 'Ưu tiên phỏng vấn vòng Fast-track + Bộ câu hỏi phỏng vấn IT độc quyền'
      },
      pitch_night: {
        title: 'Startup Pitch Night 2026: Gọi Vốn 500,000$ Cùng Các Quỹ Đầu Tư VC',
        locationType: 'offline',
        location: 'Khách sạn Caravelle Saigon, 19 Lam Sơn, Bến Nghé, Quận 1, TP.HCM',
        totalSeats: 150,
        headline: 'Biến Ý Tưởng Thành Kỳ Lân: Đấu Trường Gọi Vốn Đỉnh Cao Của Giới Khởi Nghiệp!',
        hook: '10 startup công nghệ xuất sắc nhất sẽ trình bày trực tiếp trước hội đồng đầu tư quốc tế. Cơ hội vàng để kết nối nguồn vốn triệu đô và mở rộng quy mô kinh doanh.',
        benefits: [
          'Lắng nghe 10 bài thuyết trình gọi vốn đỉnh cao và phản biện trực tiếp từ các Shark.',
          'Gặp gỡ hơn 30 nhà đầu tư thiên thần và đại diện quỹ mạo hiểm hàng đầu.',
          'Tham dự tiệc Networking VIP và kết nối đối tác chiến lược trong ngành.'
        ],
        speaker: {
          name: 'Lê Phương Thảo',
          role: 'Chief AI Solutions Architect, InnovateAI',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          initials: 'LT'
        },
        earlyBirdPerks: 'Vé tham dự tiệc Networking Cocktail VIP cùng các nhà đầu tư'
      },
      web3_workshop: {
        title: 'Web3 & Autonomous AI Agents: Xây Dựng Ứng Dụng Phi Tập Trung',
        locationType: 'online',
        location: 'https://meet.google.com/vibe-coding-2026-summit',
        totalSeats: 500,
        headline: 'Làm Chủ Autonomous AI Agent: Kỷ Nguyên Mới Của Lập Trình Thông Minh!',
        hook: 'Sự kết hợp giữa hợp đồng thông minh Web3 và các tác tử AI tự trị đang mở ra những mô hình kinh tế số hoàn toàn mới. Khám phá cách xây dựng và triển khai từ con số 0.',
        benefits: [
          'Thực hành code trực tiếp một Autonomous AI Agent có khả năng tự động ra quyết định.',
          'Hiểu rõ kiến trúc kết nối Web3, Smart Contracts và các mô hình LLM tiên tiến.',
          'Nhận chứng chỉ NFT xác thực tham dự và tài liệu mã nguồn GitHub hoàn chỉnh.'
        ],
        speaker: {
          name: 'Vũ Nguyễn Quốc Kiệt',
          role: 'Senior AI Engineer & Tech Lead, VibeLab',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          initials: 'VK'
        },
        earlyBirdPerks: 'Nhận NFT Founder Badge độc quyền + Toàn bộ slide thuyết trình bản quyền'
      }
    };

    // --- INITIALIZATION LIFECYCLE ---
    document.addEventListener('DOMContentLoaded', () => {
      initDefaultDatetime();
      hydrateFromStorage();
      bindBuilderInputs();
      renderAllViews();
      startCountdownTimer();
      // Initialize view mode based on screen width
      if (window.innerWidth >= 1280) {
        switchView('split');
      } else {
        switchView('builder');
      }
    });

    // Preset Default Datetime: +7 Days from now at 09:00 AM
    function initDefaultDatetime() {
      if (!EventStudio.eventData.datetime) {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        d.setHours(9, 0, 0, 0);
        // Format to YYYY-MM-DDTHH:mm
        const pad = n => String(n).padStart(2, '0');
        const formatted = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
        EventStudio.eventData.datetime = formatted;
      }
    }

    // --- LOCALSTORAGE PERSISTENCE ENGINE (R5) ---
    function hydrateFromStorage() {
      // 1. Hydrate Event Metadata independently
      try {
        const storedEvent = localStorage.getItem('vibe_event_data');
        if (storedEvent) {
          const parsed = JSON.parse(storedEvent);
          if (parsed && typeof parsed === 'object') {
            EventStudio.eventData = Object.assign(EventStudio.eventData, parsed);
          }
        }
      } catch (e) {
        console.warn('LocalStorage error hydrating eventData, keeping defaults:', e);
      }

      // 2. Hydrate Attendees independently (differentiating uninitialized null vs empty [] after reset)
      try {
        const storedAttendees = localStorage.getItem('vibe_attendees');
        if (storedAttendees !== null) {
          const parsedAttendees = JSON.parse(storedAttendees);
          if (Array.isArray(parsedAttendees)) {
            EventStudio.attendees = parsedAttendees;
          } else {
            console.warn('Stored attendees is not an array, falling back to seed');
            seedInitialAttendees();
          }
        } else {
          // First-time visit (uninitialized storage): seed realistic mock attendees (142 attendees)
          seedInitialAttendees();
        }
      } catch (e) {
        console.warn('LocalStorage error hydrating attendees, falling back to seed:', e);
        seedInitialAttendees();
      }

      // 3. Hydrate AI Settings independently
      try {
        const storedAi = localStorage.getItem('vibe_ai_settings');
        if (storedAi) {
          const parsedAi = JSON.parse(storedAi);
          if (parsedAi && typeof parsedAi === 'object') {
            EventStudio.aiSettings = Object.assign(EventStudio.aiSettings, parsedAi);
          }
        }
      } catch (e) {
        console.warn('LocalStorage error hydrating aiSettings, keeping defaults:', e);
      }
    }

    function seedInitialAttendees() {
      EventStudio.attendees = [
        { ticketCode: 'VIBE-2026-A8F4C2', fullName: 'Nguyễn Văn An', email: 'an.nguyen@fpt.edu.vn', phone: '0912345678', organization: 'FPT Polytechnic TB01', registeredAt: '2026-11-01 06:15:00' },
        { ticketCode: 'VIBE-2026-B9K2M7', fullName: 'Trần Thị Bích', email: 'bich.tran@gmail.com', phone: '0987654321', organization: 'K19 Lập trình Web', registeredAt: '2026-11-01 06:18:22' },
        { ticketCode: 'VIBE-2026-C1X5P8', fullName: 'Lê Hoàng Nam', email: 'nam.le@vibelab.tech', phone: '0903112233', organization: 'VibeLab Research', registeredAt: '2026-11-01 06:20:45' }
      ];
      // Virtual count seed for realistic 142/200 progress display
      for (let i = 4; i <= 142; i++) {
        const randCode = 'VIBE-2026-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        EventStudio.attendees.push({
          ticketCode: randCode,
          fullName: `Người Tham Dự #${i}`,
          email: `attendee_${i}@fpt.edu.vn`,
          phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
          organization: 'FPT Polytechnic',
          registeredAt: '2026-11-01 06:25:00'
        });
      }
      saveAttendeesToStorage();
    }

    function saveEventToStorage(showNotice = false) {
      try {
        localStorage.setItem('vibe_event_data', JSON.stringify(EventStudio.eventData));
        if (showNotice) {
          showToast('Đã lưu thông tin sự kiện vào bộ nhớ trình duyệt!', 'success');
        }
      } catch (e) {
        console.warn('Error saving event data:', e);
      }
    }

    function saveAttendeesToStorage() {
      try {
        localStorage.setItem('vibe_attendees', JSON.stringify(EventStudio.attendees));
      } catch (e) {
        console.warn('Error saving attendees:', e);
      }
    }

    function saveAiSettings() {
      const provider = document.getElementById('ai-provider-select').value;
      const key = document.getElementById('ai-api-key-input').value.trim();
      EventStudio.aiSettings.provider = provider;
      EventStudio.aiSettings.apiKey = key;
      try {
        localStorage.setItem('vibe_ai_settings', JSON.stringify(EventStudio.aiSettings));
      } catch (e) {}
      closeModal('modal-ai-settings');
      showToast('Đã lưu cấu hình AI Synthesis Engine!', 'success');
    }

    // --- DUAL-VIEW SWITCHING CONTROLLER (R4) ---
    function switchView(view) {
      EventStudio.currentView = view;
      const studioContainer = document.getElementById('studio-container');
      const builderEl = document.getElementById('view-builder');
      const previewEl = document.getElementById('view-preview');
      const btnSplit = document.getElementById('nav-btn-split');
      const btnBuilder = document.getElementById('nav-btn-builder');
      const btnPreview = document.getElementById('nav-btn-preview');

      const activeClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 bg-slate-900 text-white shadow-xs";
      const inactiveClass = "px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 text-slate-600 hover:text-slate-900";
      const splitActiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 bg-slate-900 text-white shadow-xs";
      const splitInactiveClass = "hidden xl:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 items-center gap-2 text-slate-600 hover:text-slate-900";

      if (view === 'split') {
        if (studioContainer) studioContainer.classList.add('studio-split-mode');
        builderEl.classList.remove('hidden');
        previewEl.classList.remove('hidden');

        if (btnSplit) btnSplit.className = splitActiveClass;
        if (btnBuilder) btnBuilder.className = inactiveClass;
        if (btnPreview) btnPreview.className = inactiveClass;

        populateBuilderForm();
        renderLivePreview();
      } else if (view === 'preview') {
        if (studioContainer) studioContainer.classList.remove('studio-split-mode');
        builderEl.classList.add('hidden');
        previewEl.classList.remove('hidden');

        if (btnSplit) btnSplit.className = splitInactiveClass;
        if (btnPreview) btnPreview.className = activeClass;
        if (btnBuilder) btnBuilder.className = inactiveClass;

        renderLivePreview();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else { // 'builder'
        if (studioContainer) studioContainer.classList.remove('studio-split-mode');
        previewEl.classList.add('hidden');
        builderEl.classList.remove('hidden');

        if (btnSplit) btnSplit.className = splitInactiveClass;
        if (btnBuilder) btnBuilder.className = activeClass;
        if (btnPreview) btnPreview.className = inactiveClass;

        populateBuilderForm();
      }
    }

    // --- FORM REACTIVE BINDINGS (R2) ---
    function bindBuilderInputs() {
      const ids = [
        'builder-title', 'builder-datetime', 'builder-seats', 'builder-location',
        'builder-headline', 'builder-hook', 'builder-benefit-1', 'builder-benefit-2', 'builder-benefit-3',
        'builder-speaker-name', 'builder-speaker-role', 'builder-speaker-avatar', 'builder-perks'
      ];

      ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', () => {
          syncFormToState();
          renderLivePreview();
          saveEventToStorage(false);
        });
      });
    }

    function syncFormToState() {
      const ed = EventStudio.eventData;
      ed.title = document.getElementById('builder-title').value.trim() || 'Sự Kiện Công Nghệ 2026';
      ed.datetime = document.getElementById('builder-datetime').value;
      ed.totalSeats = parseInt(document.getElementById('builder-seats').value, 10) || 200;
      ed.location = document.getElementById('builder-location').value.trim();
      ed.headline = document.getElementById('builder-headline').value.trim();
      ed.hook = document.getElementById('builder-hook').value.trim();
      ed.benefits[0] = document.getElementById('builder-benefit-1').value.trim();
      ed.benefits[1] = document.getElementById('builder-benefit-2').value.trim();
      ed.benefits[2] = document.getElementById('builder-benefit-3').value.trim();
      ed.speaker.name = document.getElementById('builder-speaker-name').value.trim() || 'Diễn Giả';
      ed.speaker.role = document.getElementById('builder-speaker-role').value.trim();
      ed.speaker.avatar = document.getElementById('builder-speaker-avatar').value.trim();
      ed.speaker.initials = getInitials(ed.speaker.name);
      ed.earlyBirdPerks = document.getElementById('builder-perks').value.trim();

      updateAvatarPreview();
      updateQuickSummary();
    }

    function populateBuilderForm() {
      const ed = EventStudio.eventData;
      document.getElementById('builder-title').value = ed.title || '';
      document.getElementById('builder-datetime').value = ed.datetime || '';
      document.getElementById('builder-seats').value = ed.totalSeats || 200;
      document.getElementById('builder-location').value = ed.location || '';
      document.getElementById('builder-headline').value = ed.headline || '';
      document.getElementById('builder-hook').value = ed.hook || '';
      document.getElementById('builder-benefit-1').value = (ed.benefits && ed.benefits[0]) || '';
      document.getElementById('builder-benefit-2').value = (ed.benefits && ed.benefits[1]) || '';
      document.getElementById('builder-benefit-3').value = (ed.benefits && ed.benefits[2]) || '';
      document.getElementById('builder-speaker-name').value = (ed.speaker && ed.speaker.name) || '';
      document.getElementById('builder-speaker-role').value = (ed.speaker && ed.speaker.role) || '';
      document.getElementById('builder-speaker-avatar').value = (ed.speaker && ed.speaker.avatar) || '';
      document.getElementById('builder-perks').value = ed.earlyBirdPerks || '';

      setLocationType(ed.locationType || 'offline', false);
      updateAvatarPreview();
      updateQuickSummary();
    }

    function setLocationType(type, triggerSync = true) {
      EventStudio.eventData.locationType = type;
      const btnOffline = document.getElementById('btn-loc-offline');
      const btnOnline = document.getElementById('btn-loc-online');
      const inputLoc = document.getElementById('builder-location');
      const iconLoc = document.getElementById('loc-icon');

      if (type === 'online') {
        btnOnline.className = "py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all bg-indigo-600/30 border-indigo-500 text-white shadow-md";
        btnOffline.className = "py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all bg-slate-900/60 border-white/10 text-slate-400 hover:text-white";
        iconLoc.className = "fa-solid fa-video absolute left-3.5 top-3.5 text-slate-500 text-sm";
        inputLoc.placeholder = "Link phòng Zoom / Google Meet (VD: https://meet.google.com/xyz-abcd-efg)";
        if (!inputLoc.value || inputLoc.value.includes('Hội trường')) {
          inputLoc.value = 'https://meet.google.com/vibe-coding-2026-summit';
        }
      } else {
        btnOffline.className = "py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all bg-indigo-600/30 border-indigo-500 text-white shadow-md";
        btnOnline.className = "py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all bg-slate-900/60 border-white/10 text-slate-400 hover:text-white";
        iconLoc.className = "fa-solid fa-location-dot absolute left-3.5 top-3.5 text-slate-500 text-sm";
        inputLoc.placeholder = "Địa chỉ cụ thể (VD: Hội trường Innovation Hall, FPT Polytechnic, TP.HCM)";
        if (!inputLoc.value || inputLoc.value.startsWith('http')) {
          inputLoc.value = 'Hội trường Innovation Hall, FPT Polytechnic, TP.HCM';
        }
      }

      if (triggerSync) {
        syncFormToState();
        renderLivePreview();
        saveEventToStorage(false);
      }
    }

    function getInitials(name) {
      if (!name) return 'VK';
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    function updateAvatarPreview() {
      const avatarUrl = EventStudio.eventData.speaker.avatar;
      const initials = getInitials(EventStudio.eventData.speaker.name);
      const prevBox = document.getElementById('builder-avatar-preview');
      if (!prevBox) return;

      if (avatarUrl) {
        const img = document.createElement('img');
        img.alt = 'Speaker';
        img.className = 'w-full h-full object-cover';
        img.onerror = function() {
          img.onerror = null;
          // Strict attachment check: only update prevBox if this img is still its active child
          if (img.parentElement === prevBox) {
            prevBox.innerHTML = `<span>${initials}</span>`;
          }
        };
        img.src = avatarUrl;
        prevBox.innerHTML = '';
        prevBox.appendChild(img);
      } else {
        prevBox.innerHTML = `<span>${initials}</span>`;
      }
    }

    function updateQuickSummary() {
      const ed = EventStudio.eventData;
      document.getElementById('quick-summary-title').textContent = ed.title || 'Sự Kiện Chưa Đặt Tên';
      document.getElementById('quick-summary-speaker').textContent = ed.speaker.name || 'Chưa cấu hình';
      document.getElementById('quick-summary-loc').textContent = ed.locationType === 'online' ? 'Online (Zoom/Meet)' : (ed.location || 'Offline');
      document.getElementById('quick-summary-tickets').textContent = `${EventStudio.attendees.length}/${ed.totalSeats}`;

      if (ed.datetime) {
        const d = new Date(ed.datetime);
        if (!isNaN(d.getTime())) {
          const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
          const pad = n => String(n).padStart(2, '0');
          document.getElementById('quick-summary-datetime').innerHTML = `
            <i class="fa-regular fa-clock text-indigo-400"></i>
            <span>${pad(d.getHours())}:${pad(d.getMinutes())} - ${daysOfWeek[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}</span>
          `;
        }
      }
    }

    // --- CLIENT-SIDE SMART AI SYNTHESIS ENGINE (R3) ---
    async function triggerMagicAI() {
      showToast('✨ AI đang phân tích từ khóa và sinh nội dung AIDA...', 'magic');

      // Check if user configured live external API
      if (EventStudio.aiSettings.provider === 'gemini' && EventStudio.aiSettings.apiKey) {
        try {
          await callGeminiApi();
          return;
        } catch (err) {
          console.warn('Gemini API call failed, falling back to offline engine:', err);
          showToast('Không thể kết nối Gemini API. Đã tự động chuyển sang AI Cục Bộ!', 'warning');
        }
      } else if (EventStudio.aiSettings.provider === 'openai' && EventStudio.aiSettings.apiKey) {
        try {
          await callOpenAiApi();
          return;
        } catch (err) {
          console.warn('OpenAI API call failed, falling back to offline engine:', err);
          showToast('Không thể kết nối OpenAI API. Đã tự động chuyển sang AI Cục Bộ!', 'warning');
        }
      }

      // Default: Pure Client-Side Heuristic Behavioral Engine (100% Offline)
      runHeuristicAidaEngine();
    }

    function runHeuristicAidaEngine() {
      const title = document.getElementById('builder-title').value.trim() || EventStudio.eventData.title;
      const lower = title.toLowerCase();

      let theme = 'general';
      if (lower.includes('ai') || lower.includes('trí tuệ nhân tạo') || lower.includes('llm') || lower.includes('agent')) theme = 'ai';
      else if (lower.includes('career') || lower.includes('việc làm') || lower.includes('tuyển dụng') || lower.includes('cv')) theme = 'career';
      else if (lower.includes('startup') || lower.includes('pitch') || lower.includes('đầu tư') || lower.includes('vốn')) theme = 'startup';
      else if (lower.includes('code') || lower.includes('web') || lower.includes('lập trình') || lower.includes('dev')) theme = 'coding';

      const templates = {
        ai: {
          headlines: [
            `Bùng Nổ ${title}: Làm Chủ Kỷ Nguyên Trí Tuệ Nhân Tạo Trước Khi Bị Bỏ Lại Phía Sau!`,
            `Mở Khóa Bí Mật AI & Vibe Coding: Tăng Tốc 10X Hiệu Suất Chỉ Sau 1 Buổi Thực Chiến!`,
            `Chiến Lược Thống Lĩnh Công Nghệ 2026: Đột Phá Quy Trình Cùng Autonomous AI Agents!`
          ],
          hooks: [
            `85% quy trình lập trình và tiếp thị đang được tự động hóa. Đừng để mình trở thành người đứng ngoài cuộc cách mạng công nghệ lớn nhất thập kỷ. Khóa học thực chiến trang bị tư duy và công cụ bứt phá!`,
            `Trong bối cảnh thị trường biến động dữ dội, các doanh nghiệp và chuyên gia tiên phong đang áp dụng AI để cắt giảm 70% thời gian triển khai. Đây là cơ hội duy nhất để bạn sở hữu công thức này.`
          ],
          benefits: [
            'Nắm trọn tư duy Vibe Coding từ ý tưởng đến sản phẩm chạy thực tế chỉ trong 5 phút.',
            'Nhận bộ công cụ Template AI độc quyền và mã nguồn mẫu chuẩn quốc tế sẵn sàng áp dụng.',
            'Kết nối trực tiếp cùng chuyên gia và cộng đồng Tech Lead hàng đầu FPT Polytechnic.'
          ]
        },
        career: {
          headlines: [
            `Chinh Phục Thu Nhập Nghìn Đô: Cơ Hội Tuyển Dụng IT & Tech Lớn Nhất Năm 2026!`,
            `Lộ Trình Bứt Phá Sự Nghiệp IT: Phỏng Vấn Trực Tiếp & Nhận Offer Ngay Tại Sự Kiện!`
          ],
          hooks: [
            `Hơn 50 doanh nghiệp công nghệ hàng đầu đang săn đón các tài năng lập trình viên và AI Vibe Coder. Bạn đã sẵn sàng để phỏng vấn và nhận offer ngay tại sự kiện?`,
            `Thị trường nhân sự IT đòi hỏi kỹ năng thực chiến và tư duy ứng dụng AI. Đừng để CV của bạn chìm vào quên lãng giữa hàng ngàn ứng viên khác.`
          ],
          benefits: [
            'Phỏng vấn trực tiếp cùng các Tech Lead và HR Director từ các tập đoàn hàng đầu.',
            'Được sửa CV 1-1 miễn phí và định hướng lộ trình thăng tiến sự nghiệp IT.',
            'Nhận hàng ngàn phần quà công nghệ độc quyền và cơ hội nhận học bổng chuyên sâu.'
          ]
        },
        startup: {
          headlines: [
            `Biến Ý Tưởng Thành Kỳ Lân: Đấu Trường Gọi Vốn Đỉnh Cao Của Giới Khởi Nghiệp!`,
            `Khai Phá Tiềm Năng Startup 2026: Thuyết Phục Quỹ Đầu Tư Triệu Đô Trong 5 Phút!`
          ],
          hooks: [
            `10 startup công nghệ xuất sắc nhất sẽ trình bày trực tiếp trước hội đồng đầu tư quốc tế. Cơ hội vàng để kết nối nguồn vốn triệu đô và mở rộng quy mô kinh doanh.`,
            `Gọi vốn thành công không chỉ dựa vào may mắn mà là sự chuẩn bị bài bản về định giá, mô hình kinh doanh và chiến lược pitch xuất sắc.`
          ],
          benefits: [
            'Lắng nghe 10 bài thuyết trình gọi vốn đỉnh cao và phản biện trực tiếp từ các Shark.',
            'Gặp gỡ hơn 30 nhà đầu tư thiên thần và đại diện quỹ mạo hiểm hàng đầu.',
            'Tham dự tiệc Networking VIP và kết nối đối tác chiến lược trong ngành.'
          ]
        },
        general: {
          headlines: [
            `Cơ Hội Đột Phá 2026: Nâng Tầm Kiến Thức & Mở Rộng Cơ Hội Nghề Nghiệp!`,
            `Sự Kiện Đỉnh Cao Độc Quyền: Lộ Trình Thực Chiến Dành Cho Thế Hệ Tiên Phong!`
          ],
          hooks: [
            `Sự kiện được thiết kế thực chiến nhằm trang bị tư duy và bộ công cụ sắc bén nhất, giúp bạn làm chủ tương lai và tạo dựng lợi thế cạnh tranh vượt trội.`,
            `Thời gian không chờ đợi ai. Hãy tham gia ngay để tiếp cận nguồn tri thức mới nhất từ những người đi đầu.`
          ],
          benefits: [
            'Tiếp cận quy trình thực chiến từ con số 0 đến ứng dụng thực tế sau 1 buổi.',
            'Nhận trọn bộ tài liệu, template hướng dẫn và slide thuyết trình chất lượng cao.',
            'Mở rộng vòng kết nối cùng các chuyên gia và bạn bè cùng chí hướng.'
          ]
        }
      };

      const selected = templates[theme] || templates.general;
      const randHeadline = selected.headlines[Math.floor(Math.random() * selected.headlines.length)];
      const randHook = selected.hooks[Math.floor(Math.random() * selected.hooks.length)];

      document.getElementById('builder-headline').value = randHeadline;
      document.getElementById('builder-hook').value = randHook;
      document.getElementById('builder-benefit-1').value = selected.benefits[0];
      document.getElementById('builder-benefit-2').value = selected.benefits[1];
      document.getElementById('builder-benefit-3').value = selected.benefits[2];

      syncFormToState();
      renderLivePreview();
      saveEventToStorage(false);

      showToast('🎉 Đã tự động sinh nội dung Marketing AIDA thành công!', 'success');
    }

    async function callGeminiApi() {
      const apiKey = EventStudio.aiSettings.apiKey;
      const title = EventStudio.eventData.title;
      const speaker = EventStudio.eventData.speaker.name;
      const prompt = `Bạn là chuyên gia Marketing sự kiện công nghệ. Hãy dựa vào tiêu đề sự kiện: "${title}" và diễn giả "${speaker}" để sinh nội dung tiếp thị chuẩn AIDA. Trả về DUY NHẤT một chuỗi JSON hợp lệ không có markdown bọc ngoài có cấu trúc: {"headline": "...", "hook": "...", "benefits": ["...", "...", "..."]}.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.7 }
        })
      });

      if (!res.ok) throw new Error(`Gemini API Error: ${res.status}`);
      const data = await res.json();
      const rawText = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(rawText);

      if (parsed.headline && parsed.hook && Array.isArray(parsed.benefits)) {
        document.getElementById('builder-headline').value = parsed.headline;
        document.getElementById('builder-hook').value = parsed.hook;
        document.getElementById('builder-benefit-1').value = parsed.benefits[0] || '';
        document.getElementById('builder-benefit-2').value = parsed.benefits[1] || '';
        document.getElementById('builder-benefit-3').value = parsed.benefits[2] || '';
        syncFormToState();
        renderLivePreview();
        saveEventToStorage(false);
        showToast('✨ Gemini AI đã sinh nội dung trực tuyến thành công!', 'success');
      } else {
        throw new Error('Invalid JSON format from Gemini');
      }
    }

    async function callOpenAiApi() {
      const apiKey = EventStudio.aiSettings.apiKey;
      const title = EventStudio.eventData.title;
      const speaker = EventStudio.eventData.speaker.name;
      const prompt = `Bạn là chuyên gia Marketing sự kiện công nghệ. Dựa vào tiêu đề "${title}" và diễn giả "${speaker}", hãy trả về duy nhất một chuỗi JSON với cấu trúc: {"headline": "...", "hook": "...", "benefits": ["...", "...", "..."]}.`;

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        })
      });

      if (!res.ok) throw new Error(`OpenAI API Error: ${res.status}`);
      const data = await res.json();
      const parsed = JSON.parse(data.choices[0].message.content);

      if (parsed.headline && parsed.hook && Array.isArray(parsed.benefits)) {
        document.getElementById('builder-headline').value = parsed.headline;
        document.getElementById('builder-hook').value = parsed.hook;
        document.getElementById('builder-benefit-1').value = parsed.benefits[0] || '';
        document.getElementById('builder-benefit-2').value = parsed.benefits[1] || '';
        document.getElementById('builder-benefit-3').value = parsed.benefits[2] || '';
        syncFormToState();
        renderLivePreview();
        saveEventToStorage(false);
        showToast('✨ OpenAI đã sinh nội dung trực tuyến thành công!', 'success');
      } else {
        throw new Error('Invalid JSON format from OpenAI');
      }
    }

    // --- PRESET LOADER (1-CLICK TEMPLATES) ---
    function loadPreset(presetKey) {
      const p = EVENT_PRESETS[presetKey];
      if (!p) return;

      EventStudio.eventData.title = p.title;
      EventStudio.eventData.locationType = p.locationType;
      EventStudio.eventData.location = p.location;
      EventStudio.eventData.totalSeats = p.totalSeats;
      EventStudio.eventData.headline = p.headline;
      EventStudio.eventData.hook = p.hook;
      EventStudio.eventData.benefits = [...p.benefits];
      EventStudio.eventData.speaker = Object.assign({}, p.speaker);
      EventStudio.eventData.earlyBirdPerks = p.earlyBirdPerks;

      populateBuilderForm();
      renderLivePreview();
      saveEventToStorage(false);
      togglePresetMenu(false);

      showToast(`Đã nạp mẫu sự kiện "${p.title.split(':')[0]}" thành công!`, 'success');
    }

    function togglePresetMenu(force) {
      const el = document.getElementById('preset-dropdown');
      if (force !== undefined) {
        if (force) el.classList.remove('hidden');
        else el.classList.add('hidden');
      } else {
        el.classList.toggle('hidden');
      }
    }

    // Close preset dropdown on click outside
    document.addEventListener('click', (e) => {
      const menu = document.getElementById('preset-dropdown');
      const btn = document.getElementById('btn-preset-menu');
      if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });

    // --- RENDER ALL VIEWS (DOM SYNC) ---
    function renderAllViews() {
      populateBuilderForm();
      renderLivePreview();
      renderAttendeesTable();
    }

    function renderLivePreview() {
      const ed = EventStudio.eventData;

      // Sub-nav brand
      document.getElementById('preview-nav-brand').textContent = ed.title.split(':')[0] || ed.title;

      // Hero Tag
      const heroTag = document.getElementById('preview-hero-tag');
      if (ed.locationType === 'online') {
        heroTag.innerHTML = `🌐 PHÒNG HỌP TRỰC TUYẾN GOOGLE MEET / ZOOM // SỰ KIỆN TOÀN QUỐC`;
      } else {
        heroTag.innerHTML = `🔴 TRỰC TIẾP TẠI TP. HỒ CHÍ MINH // SỰ KIỆN ĐỈNH CAO 2026`;
      }

      // Hero Title, Headline, Hook
      document.getElementById('preview-hero-title').textContent = ed.title;
      document.getElementById('preview-hero-headline').textContent = ed.headline;
      document.getElementById('preview-hero-hook').textContent = ed.hook;

      // Early Bird Perks
      const perksBox = document.getElementById('preview-hero-perks-box');
      if (ed.earlyBirdPerks) {
        perksBox.classList.remove('hidden');
        document.getElementById('preview-hero-perks').textContent = ed.earlyBirdPerks;
      } else {
        perksBox.classList.add('hidden');
      }

      // 3 Benefits
      document.getElementById('preview-card-benefit-1').textContent = ed.benefits[0] || '';
      document.getElementById('preview-card-benefit-2').textContent = ed.benefits[1] || '';
      document.getElementById('preview-card-benefit-3').textContent = ed.benefits[2] || '';

      // Speaker Card
      document.getElementById('preview-speaker-name').textContent = ed.speaker.name;
      document.getElementById('preview-speaker-role').textContent = ed.speaker.role;
      const speakerImg = document.getElementById('preview-speaker-img');
      const letterAvatar = document.getElementById('preview-speaker-letter-avatar');

      if (ed.speaker.avatar) {
        speakerImg.src = ed.speaker.avatar;
        speakerImg.classList.remove('hidden');
        letterAvatar.classList.add('hidden');
      } else {
        speakerImg.classList.add('hidden');
        letterAvatar.classList.remove('hidden');
        letterAvatar.textContent = getInitials(ed.speaker.name);
      }

      // Seat Counter & Progress Bar
      updateSeatCounterDisplay();

      // Countdown Date Display
      updateTimerDateLabel();
    }

    function handleSpeakerImgError() {
      const img = document.getElementById('preview-speaker-img');
      const letter = document.getElementById('preview-speaker-letter-avatar');
      if (img && letter) {
        img.classList.add('hidden');
        letter.classList.remove('hidden');
        letter.textContent = getInitials(EventStudio.eventData.speaker.name);
      }
    }

    function updateSeatCounterDisplay() {
      const booked = EventStudio.attendees.length;
      const total = EventStudio.eventData.totalSeats || 200;
      const percent = Math.min(100, Math.round((booked / total) * 100));
      const remaining = Math.max(0, total - booked);

      document.getElementById('preview-seats-label').innerHTML = `
        <i class="fa-solid fa-fire text-amber-400"></i>
        <span>Đã có ${booked}/${total} người giữ chỗ!</span>
      `;
      document.getElementById('preview-seats-percent').textContent = `${percent}%`;
      document.getElementById('preview-seats-bar').style.width = `${percent}%`;
      document.getElementById('preview-seats-remaining').textContent = remaining > 0 ? `Chỉ còn ${remaining} vé miễn phí cuối cùng` : `ĐÃ KÍN CHỖ (SOLD OUT)`;

      // Update header attendee count badge
      const headerCount = document.getElementById('header-attendee-count');
      if (headerCount) headerCount.textContent = booked;
    }

    function updateTimerDateLabel() {
      const dt = EventStudio.eventData.datetime;
      const label = document.getElementById('preview-timer-date-display');
      if (!dt) {
        label.textContent = 'Thời gian tổ chức sẽ sớm được công bố';
        return;
      }
      const d = new Date(dt);
      if (isNaN(d.getTime())) {
        label.textContent = 'Chưa xác định thời gian';
        return;
      }
      const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const pad = n => String(n).padStart(2, '0');
      label.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())} - ${daysOfWeek[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    }

    // --- COUNTDOWN TIMER ENGINE (CRITICAL EDGE CASES) ---
    function startCountdownTimer() {
      if (EventStudio.countdownIntervalId) {
        clearInterval(EventStudio.countdownIntervalId);
      }
      updateCountdownTick();
      EventStudio.countdownIntervalId = setInterval(updateCountdownTick, 1000);
    }

    function updateCountdownTick() {
      const container = document.getElementById('countdown-container');
      const dtStr = EventStudio.eventData.datetime;
      if (!dtStr) return;

      const target = new Date(dtStr).getTime();
      const now = Date.now();

      if (isNaN(target)) {
        // Fallback for malformed date
        renderActiveTimerBoxes('00', '00', '00', '00');
        return;
      }

      const diff = target - now;

      // CRITICAL REQUIREMENT: If diff <= 0 (event is in the past / currently happening):
      // NEVER show negative numbers (-1, -15) and NEVER show NaN!
      // Immediately render "SỰ KIỆN ĐANG DIỄN RA" Live Banner!
      if (diff <= 0) {
        container.innerHTML = `
          <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center shadow-xs animate-fade-in">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span> TRỰC TIẾP
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-wide font-heading">
              SỰ KIỆN ĐANG DIỄN RA
            </h3>
            <p class="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">
              Các phiên hội thảo chuyên sâu đang diễn ra trực tiếp. Đăng ký ngay để nhận đường dẫn phát sóng và toàn bộ slide thuyết trình!
            </p>
            <div class="mt-4 flex items-center justify-center gap-3">
              <a href="#register-section" class="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer">
                <i class="fa-solid fa-play"></i>
                <span>Tham Gia Phòng Live Ngay</span>
              </a>
            </div>
          </div>
        `;
        return;
      }

      // Normal future state
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = n => String(Math.max(0, n)).padStart(2, '0');
      renderActiveTimerBoxes(pad(days), pad(hours), pad(mins), pad(secs));
    }

    function renderActiveTimerBoxes(d, h, m, s) {
      const container = document.getElementById('countdown-container');
      const daysEl = document.getElementById('timer-days');
      
      // If container was replaced by "SỰ KIỆN ĐANG DIỄN RA", restore 4 crystalline dials
      if (!daysEl) {
        container.innerHTML = `
          <div class="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
            <div class="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">
              <div id="timer-days" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${d}</div>
              <div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Ngày</div>
            </div>
            <div class="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">
              <div id="timer-hours" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${h}</div>
              <div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Giờ</div>
            </div>
            <div class="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">
              <div id="timer-mins" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${m}</div>
              <div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Phút</div>
            </div>
            <div class="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-3 sm:p-5 text-center shadow-xs transition-all group">
              <div id="timer-secs" class="text-2xl sm:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tight">${s}</div>
              <div class="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1.5">Giây</div>
            </div>
          </div>
        `;
      } else {
        document.getElementById('timer-days').textContent = d;
        document.getElementById('timer-hours').textContent = h;
        document.getElementById('timer-mins').textContent = m;
        document.getElementById('timer-secs').textContent = s;
      }
    }

    // --- ATTENDEE REGISTRATION, CONFETTI & E-TICKET (R5) ---
    function handleRegistrationSubmit(e) {
      e.preventDefault();

      const nameInput = document.getElementById('reg-name');
      const emailInput = document.getElementById('reg-email');
      const phoneInput = document.getElementById('reg-phone');
      const orgInput = document.getElementById('reg-org');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const org = orgInput.value.trim();

      // Clear previous error messages
      hideInputErrors();

      let hasError = false;

      // 1. Validate Name (Vietnamese characters, min 2 chars)
      const nameRegex = /^[\p{L}\s']{2,60}$/u;
      if (!name || !nameRegex.test(name)) {
        showInputError('reg-name', 'err-reg-name', 'Họ và tên từ 2 đến 60 ký tự chữ.');
        hasError = true;
      }

      // 2. Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showInputError('reg-email', 'err-reg-email', 'Vui lòng nhập địa chỉ email hợp lệ.');
        hasError = true;
      }

      // 3. Validate Vietnamese Phone Number (10 digits starting with 03, 05, 07, 08, 09 or 84)
      const phoneClean = phone.replace(/[\s.-]/g, '');
      const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
      if (!phoneClean || !phoneRegex.test(phoneClean)) {
        showInputError('reg-phone', 'err-reg-phone', 'Số điện thoại 10 chữ số hợp lệ tại Việt Nam (03, 05, 07, 08, 09).');
        hasError = true;
      }

      // 4. Validate Org / Class
      if (!org || org.length < 2) {
        showInputError('reg-org', 'err-reg-org', 'Vui lòng nhập đơn vị / trường / lớp của bạn.');
        hasError = true;
      }

      if (hasError) return;

      // Check if duplicate email/phone/name already registered
      const existing = EventStudio.attendees.find(a => 
        (a.email && a.email.toLowerCase() === email.toLowerCase()) || 
        (a.phone && a.phone === phoneClean) ||
        (a.fullName && a.fullName.toLowerCase() === name.toLowerCase())
      );
      if (existing) {
        showToast('Bạn đã đăng ký vé trước đó! Đang mở lại vé VIP của bạn.', 'magic');
        openTicketModal(existing);
        return;
      }

      // Generate Tamper-evident unique ticket code
      const ticketCode = 'VIBE-2026-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

      const newAttendee = {
        ticketCode: ticketCode,
        fullName: name,
        email: email,
        phone: phoneClean,
        organization: org,
        registeredAt: dateStr
      };

      // Add to state and save
      EventStudio.attendees.unshift(newAttendee);
      saveAttendeesToStorage();

      // Trigger Confetti Celebration (2 waves)
      fireConfettiCelebration();

      // Reset form fields
      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      orgInput.value = '';

      // Update counters & tables
      updateSeatCounterDisplay();
      renderAttendeesTable();

      showToast('🎉 Chúc mừng! Bạn đã đăng ký vé VIP thành công!', 'success');

      // Open E-Ticket Modal
      openTicketModal(newAttendee);
    }

    function showInputError(inputId, errId, msg) {
      const inp = document.getElementById(inputId);
      const err = document.getElementById(errId);
      if (inp) {
        inp.classList.add('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-500/20');
      }
      if (err) {
        err.textContent = msg;
        err.classList.remove('hidden');
      }
    }

    function hideInputErrors() {
      ['reg-name', 'reg-email', 'reg-phone', 'reg-org'].forEach(id => {
        const inp = document.getElementById(id);
        if (inp) {
          inp.classList.remove('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-500/20');
        }
      });
      ['err-reg-name', 'err-reg-email', 'err-reg-phone', 'err-reg-org'].forEach(id => {
        const err = document.getElementById(id);
        if (err) err.classList.add('hidden');
      });
    }

    function fireConfettiCelebration() {
      if (typeof confetti === 'function') {
        // Wave 1: Central Cannon
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        // Wave 2: Side Cannons
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 250);
      }
    }

    // --- E-TICKET MODAL & SCANNABLE QR CODE (R5) ---
    function openTicketModal(attendee) {
      const ed = EventStudio.eventData;

      document.getElementById('ticket-event-name').textContent = ed.title;
      document.getElementById('ticket-attendee-name').textContent = attendee.fullName;
      document.getElementById('ticket-attendee-phone').textContent = attendee.phone;
      document.getElementById('ticket-attendee-org').textContent = attendee.organization;
      document.getElementById('ticket-code-display').textContent = attendee.ticketCode;
      document.getElementById('ticket-event-location').textContent = ed.locationType === 'online' ? 'Trực tuyến: ' + ed.location : ed.location;

      // Event Time
      if (ed.datetime) {
        const d = new Date(ed.datetime);
        if (!isNaN(d.getTime())) {
          const pad = n => String(n).padStart(2, '0');
          document.getElementById('ticket-event-time').textContent = `${pad(d.getHours())}:${pad(d.getMinutes())} - ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
        }
      }

      // Generate QR Code
      renderTicketQRCode(attendee.ticketCode, attendee.fullName);

      openModal('modal-ticket');
    }

    function renderTicketQRCode(ticketCode, name) {
      const qrContainer = document.getElementById('ticket-qrcode-container');
      qrContainer.innerHTML = '';

      const qrPayload = `https://vibecoding.fpt.edu.vn/verify?ticket=${ticketCode}&name=${encodeURIComponent(name)}`;

      // 1. Try QRCode.js CDN if loaded
      if (typeof QRCode !== 'undefined') {
        try {
          new QRCode(qrContainer, {
            text: qrPayload,
            width: 96,
            height: 96,
            colorDark: '#090d16',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
          });
          return;
        } catch (e) {
          console.warn('QRCode.js error, rendering SVG QR matrix fallback:', e);
        }
      }

      // 2. Offline Fallback: Crisp Inline SVG QR Matrix Pattern
      qrContainer.innerHTML = generateSvgQrFallback(ticketCode);
    }

    function generateSvgQrFallback(code) {
      // Deterministic decorative SVG QR pattern based on ticket code hash
      let hash = 0;
      for (let i = 0; i < code.length; i++) {
        hash = (hash << 5) - hash + code.charCodeAt(i);
        hash |= 0;
      }
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-24 h-24">
          <rect width="100" height="100" fill="#ffffff" />
          <!-- Corner Position Finder 1 -->
          <rect x="5" y="5" width="30" height="30" fill="#090d16" />
          <rect x="10" y="10" width="20" height="20" fill="#ffffff" />
          <rect x="15" y="15" width="10" height="10" fill="#090d16" />
          <!-- Corner Position Finder 2 -->
          <rect x="65" y="5" width="30" height="30" fill="#090d16" />
          <rect x="70" y="10" width="20" height="20" fill="#ffffff" />
          <rect x="75" y="15" width="10" height="10" fill="#090d16" />
          <!-- Corner Position Finder 3 -->
          <rect x="5" y="65" width="30" height="30" fill="#090d16" />
          <rect x="10" y="70" width="20" height="20" fill="#ffffff" />
          <rect x="15" y="75" width="10" height="10" fill="#090d16" />
          <!-- Data pattern blocks -->
          <rect x="42" y="10" width="16" height="8" fill="#090d16" />
          <rect x="42" y="25" width="8" height="15" fill="#090d16" />
          <rect x="10" y="45" width="25" height="8" fill="#090d16" />
          <rect x="45" y="45" width="12" height="12" fill="#090d16" />
          <rect x="68" y="45" width="15" height="8" fill="#090d16" />
          <rect x="45" y="68" width="10" height="20" fill="#090d16" />
          <rect x="65" y="65" width="25" height="10" fill="#090d16" />
          <rect x="75" y="80" width="15" height="12" fill="#090d16" />
        </svg>
      `;
    }

    // --- ATTENDEES TABLE & UTF-8 BOM CSV EXPORTER (R5) ---
    function renderAttendeesTable() {
      const tbody = document.getElementById('attendees-table-body');
      const emptyState = document.getElementById('attendees-empty-state');
      const totalCount = document.getElementById('attendees-total-count');

      if (!tbody) return;

      tbody.innerHTML = '';
      totalCount.textContent = EventStudio.attendees.length;

      if (EventStudio.attendees.length === 0) {
        emptyState.classList.remove('hidden');
        return;
      }
      emptyState.classList.add('hidden');

      EventStudio.attendees.forEach(a => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-white/5 transition';
        tr.innerHTML = `
          <td class="py-3 px-4 font-mono font-bold text-cyan-400">${escapeHtml(a.ticketCode)}</td>
          <td class="py-3 px-4 font-bold text-white">${escapeHtml(a.fullName)}</td>
          <td class="py-3 px-4 text-slate-300">${escapeHtml(a.email)}</td>
          <td class="py-3 px-4 font-mono text-slate-300">${escapeHtml(a.phone)}</td>
          <td class="py-3 px-4 text-slate-300">${escapeHtml(a.organization)}</td>
          <td class="py-3 px-4 text-slate-400 text-[11px]">${escapeHtml(a.registeredAt)}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    function filterAttendeesTable() {
      const query = (document.getElementById('attendee-search').value || '').toLowerCase();
      const rows = document.querySelectorAll('#attendees-table-body tr');

      rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        if (text.includes(query)) {
          r.style.display = '';
        } else {
          r.style.display = 'none';
        }
      });
    }

    function exportCSV() {
      const attendees = EventStudio.attendees;
      if (!attendees || attendees.length === 0) {
        showToast('Chưa có dữ liệu người đăng ký để xuất file CSV!', 'warning');
        return;
      }

      const headers = ['Mã Vé', 'Họ Và Tên', 'Email', 'Số Điện Thoại', 'Đơn Vị / Lớp', 'Thời Gian Đăng Ký'];
      const rows = attendees.map(a => [
        `"${(a.ticketCode || '').replace(/"/g, '""')}"`,
        `"${(a.fullName || '').replace(/"/g, '""')}"`,
        `"${(a.email || '').replace(/"/g, '""')}"`,
        `"${(a.phone || '').replace(/"/g, '""')}"`,
        `"${(a.organization || '').replace(/"/g, '""')}"`,
        `"${(a.registeredAt || '').replace(/"/g, '""')}"`
      ]);

      // Prepend UTF-8 Byte Order Mark (\uFEFF) to ensure Microsoft Excel renders Vietnamese diacritics
      const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      const safeTitle = (EventStudio.eventData.title || 'su_kien')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '_');
      const fileName = `Danh_sach_ve_${safeTitle}.csv`;

      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('Đã xuất danh sách vé ra file CSV chuẩn UTF-8 thành công!', 'success');
    }

    // --- RESET EVENT (TẠO SỰ KIỆN MỚI) LIFECYCLE (R5) ---
    function confirmResetEvent() {
      // Clear event data to a clean template
      EventStudio.eventData = {
        id: 'evt_vibe_' + Date.now(),
        title: '',
        datetime: '',
        locationType: 'offline',
        location: '',
        totalSeats: 200,
        headline: '',
        hook: '',
        benefits: ['', '', ''],
        speaker: {
          name: '',
          role: '',
          avatar: '',
          initials: 'VK'
        },
        earlyBirdPerks: ''
      };

      // Reset attendees array
      EventStudio.attendees = [];

      // Save reset state to storage (persisting clean event and empty attendees across F5)
      saveEventToStorage(false);
      saveAttendeesToStorage();

      // Re-populate form and switch to builder
      populateBuilderForm();
      updateSeatCounterDisplay();
      renderAttendeesTable();
      closeModal('modal-reset');
      switchView('builder');

      showToast('Đã làm mới dữ liệu sự kiện thành công! Sẵn sàng tạo mới.', 'success');
    }

    // --- UI MODALS & ACCESSIBILITY FOCUS TRAP (WCAG 2.1) ---
    function getModalFocusables(modal) {
      const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(modal.querySelectorAll(selector)).filter(el => {
        return !el.disabled &&
               !el.hasAttribute('disabled') &&
               el.getAttribute('aria-hidden') !== 'true' &&
               (el.offsetParent !== null || el.getClientRects().length > 0);
      });
    }

    function openModal(modalId) {
      const m = document.getElementById(modalId);
      if (!m) return;

      // 1. Capture the triggering element to restore focus upon close
      if (!m._triggerEl) {
        m._triggerEl = (document.activeElement && document.activeElement !== document.body)
          ? document.activeElement
          : null;
      }

      // 2. Ensure accessibility dialog attributes
      if (!m.hasAttribute('role')) m.setAttribute('role', 'dialog');
      if (!m.hasAttribute('aria-modal')) m.setAttribute('aria-modal', 'true');

      // 3. Make modal visible
      m.classList.remove('hidden');

      // 4. Custom modal initialization
      if (modalId === 'modal-attendees') {
        renderAttendeesTable();
      }

      // 5. Query focusable elements & set initial focus
      const focusables = getModalFocusables(m);
      if (focusables.length > 0) {
        focusables[0].focus();
        if (document.activeElement !== focusables[0]) {
          requestAnimationFrame(() => focusables[0].focus());
        }
      } else {
        m.setAttribute('tabindex', '-1');
        m.focus();
      }

      // 6. Clean up prior keydown listener if any
      if (m._handleKeydown) {
        document.removeEventListener('keydown', m._handleKeydown);
      }

      // 7. Attach focus trap keydown listener
      m._handleKeydown = function (e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeModal(modalId);
          return;
        }

        if (e.key === 'Tab') {
          const currentFocusables = getModalFocusables(m);
          if (currentFocusables.length === 0) {
            e.preventDefault();
            return;
          }

          const firstEl = currentFocusables[0];
          const lastEl = currentFocusables[currentFocusables.length - 1];

          if (e.shiftKey) {
            // Shift + Tab: wrap from first to last
            if (document.activeElement === firstEl || !m.contains(document.activeElement)) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            // Tab: wrap from last to first
            if (document.activeElement === lastEl || !m.contains(document.activeElement)) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', m._handleKeydown);
    }

    function closeModal(modalId) {
      const m = document.getElementById(modalId);
      if (!m || m.classList.contains('hidden')) return;

      m.classList.add('hidden');

      // Clean up keydown listener
      if (m._handleKeydown) {
        document.removeEventListener('keydown', m._handleKeydown);
        m._handleKeydown = null;
      }

      // Restore focus to original trigger element
      if (m._triggerEl && typeof m._triggerEl.focus === 'function') {
        m._triggerEl.focus();
        m._triggerEl = null;
      }
    }

    // Global ESC listener fallback
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ['modal-ticket', 'modal-attendees', 'modal-reset', 'modal-deploy', 'modal-ai-settings'].forEach(closeModal);
      }
    });

    function handleAiProviderChange() {
      const provider = document.getElementById('ai-provider-select').value;
      const keyBox = document.getElementById('ai-key-container');
      if (provider === 'gemini' || provider === 'openai') {
        keyBox.classList.remove('hidden');
      } else {
        keyBox.classList.add('hidden');
      }
    }

    // --- TOAST NOTIFICATIONS (R6) ---
    function showToast(message, type = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'pointer-events-auto bg-slate-900/95 border border-white/20 backdrop-blur-xl text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 transform translate-y-2 opacity-0 transition-all duration-300 text-xs sm:text-sm font-medium';

      let icon = 'fa-circle-info text-cyan-400';
      if (type === 'success') icon = 'fa-circle-check text-emerald-400';
      else if (type === 'warning') icon = 'fa-triangle-exclamation text-amber-400';
      else if (type === 'magic') icon = 'fa-wand-magic-sparkles text-indigo-400 animate-pulse';

      toast.innerHTML = `
        <i class="fa-solid ${icon} text-base shrink-0"></i>
        <div class="flex-1">${message}</div>
      `;

      container.appendChild(toast);

      // Trigger slide-in
      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
      });

      // Auto dismiss after 3500ms
      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  </script>
</body>
</html>
