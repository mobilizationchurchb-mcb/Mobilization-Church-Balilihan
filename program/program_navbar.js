(function () {
  // Load Tailwind CSS
  const tailwindCDN = document.createElement('script');
  tailwindCDN.src = 'https://cdn.tailwindcss.com';
  document.head.appendChild(tailwindCDN);

  tailwindCDN.onload = function () {
    // ========== TOP BAR ==========
    const header = document.createElement('header');
    header.className = 'fixed top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg flex items-center justify-between px-4 sm:px-6 z-50';

    // Left section: title + subtitle
    const headerLeft = document.createElement('div');
    headerLeft.innerHTML = `
      <h1 class="text-lg sm:text-xl font-bold text-blue-700 leading-tight">Program Church</h1>
      <p class="text-[10px] sm:text-xs text-blue-400 leading-tight">Mobilization Church Balilihan</p>
    `;
    header.appendChild(headerLeft);

    // Right section: date/time + hamburger
    const headerRight = document.createElement('div');
    headerRight.className = 'flex items-center gap-3';

    const dateTimeBox = document.createElement('div');
    dateTimeBox.id = 'programDatetime';
    dateTimeBox.className = 'text-right text-xs sm:text-sm text-blue-900 whitespace-nowrap font-medium bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/50 shadow-sm';
    headerRight.appendChild(dateTimeBox);

    // Hamburger button (mobile)
    const hamburger = document.createElement('button');
    hamburger.id = 'hamburgerBtn';
    hamburger.className = 'p-2 rounded-lg bg-blue-900/30 hover:bg-blue-800/50 text-white text-xl md:hidden transition-colors duration-200 hidden';
    hamburger.innerHTML = '☰';
    headerRight.appendChild(hamburger);

    header.appendChild(headerRight);
    document.body.prepend(header);

    // Update date/time
    function updateDateTime() {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const el = document.getElementById('programDatetime');
      if (el) el.innerHTML = `${dateStr}<br><span class="text-blue-600 font-semibold">${timeStr}</span>`;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // ========== SIDEBAR (background image with gray transparent overlay + blur) ==========
    const sidebar = document.createElement('aside');
    sidebar.id = 'programSidebar';
    sidebar.className = 'fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out md:translate-x-0 overflow-hidden';
    // Set background image (no bg color, we rely on overlay)
    sidebar.style.backgroundImage = "url('mcb.jpg')";
    sidebar.style.backgroundSize = 'cover';
    sidebar.style.backgroundPosition = 'center center';
    sidebar.style.backgroundRepeat = 'no-repeat';

    // Add the gray transparent overlay with blur (it will blur the background image)
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'absolute inset-0 bg-gray-800/40 backdrop-blur-sm z-0';
    sidebar.appendChild(sidebarOverlay);

    // Navigation (relative to be above overlay)
    const navItems = [
      { text: 'Home', href: 'index.html', icon: '🏠' },
      { text: 'Program', href: 'add_new_program.html', icon: '📋' },
      { text: 'Table', href: 'table.html', icon: '📊' },
      { text: 'Monthly Schedule', href: 'schedule.html', icon: '📅' },
    ];

    const menuList = document.createElement('ul');
    menuList.className = 'mt-8 space-y-1 px-3 relative z-10';

    navItems.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.className = 'flex items-center gap-3 px-4 py-3 rounded-xl text-gray-100 hover:bg-blue-50/30 hover:text-white transition-colors duration-200 text-sm font-medium';
      a.innerHTML = `<span>${item.icon}</span> <span>${item.text}</span>`;

      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      if (currentPath === item.href) {
        a.classList.add('bg-blue-100/40', 'text-white', 'font-semibold', 'shadow-sm');
      }

      li.appendChild(a);
      menuList.appendChild(li);
    });
    sidebar.appendChild(menuList);

    // ========== SIDEBAR BOTTOM SECTION (Logout + Footer Note) ==========
    const sidebarBottom = document.createElement('div');
    sidebarBottom.className = 'border-t border-gray-400/30 relative z-10';

    // Logout link
    const logoutLink = document.createElement('a');
    logoutLink.href = 'logout.html';
    logoutLink.className = 'flex items-center gap-3 px-4 py-3 mx-3 my-2 rounded-xl text-gray-200 hover:bg-red-500/30 hover:text-red-200 transition-colors duration-200 text-sm font-medium';
    logoutLink.innerHTML = '<span>🚪</span> <span>Logout</span>';
    sidebarBottom.appendChild(logoutLink);

    // Footer note (copyright)
    const footerNote = document.createElement('div');
    footerNote.className = 'px-4 py-3 text-center text-xs text-gray-300 font-light border-t border-gray-400/30';
    footerNote.innerHTML = 'Mobilization Church Balilihan<br>© 2026 All rights reserved';
    sidebarBottom.appendChild(footerNote);

    sidebar.appendChild(sidebarBottom);
    document.body.appendChild(sidebar);

    // Overlay for mobile
    const overlay = document.createElement('div');
    overlay.id = 'sidebarOverlay';
    overlay.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-30 hidden';
    document.body.appendChild(overlay);

    // Main content wrapper
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    mainContent.className = 'ml-72 mt-16 p-6 min-h-screen transition-all duration-300';

    const existingChildren = Array.from(document.body.children).filter(
      el => el !== header && el !== sidebar && el !== overlay && el.tagName !== 'SCRIPT'
    );
    existingChildren.forEach(child => mainContent.appendChild(child));
    document.body.appendChild(mainContent);

    // ========== MOBILE TOGGLE LOGIC ==========
    let sidebarOpen = false;

    function openSidebar() {
      sidebar.style.transform = 'translateX(0)';
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      sidebarOpen = true;
      hamburger.innerHTML = '✕';
    }

    function closeSidebar() {
      if (window.innerWidth < 768) {
        sidebar.style.transform = 'translateX(-100%)';
      }
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
      sidebarOpen = false;
      hamburger.innerHTML = '☰';
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebarOpen) closeSidebar();
      else openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    function handleResize() {
      if (window.innerWidth < 768) {
        // Mobile
        hamburger.classList.remove('hidden');
        sidebar.style.transform = 'translateX(-100%)';
        mainContent.classList.remove('ml-72');
        mainContent.classList.add('ml-0');
        overlay.classList.add('hidden');
        sidebarOpen = false;
        hamburger.innerHTML = '☰';
      } else {
        // Desktop
        hamburger.classList.add('hidden');
        sidebar.style.transform = 'translateX(0)';
        mainContent.classList.add('ml-72');
        mainContent.classList.remove('ml-0');
        overlay.classList.add('hidden');
        sidebarOpen = false;
        document.body.style.overflow = '';
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  };
})();
