(function() {
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    #main-header {
      font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    
    #main-header .header-title {
      background: linear-gradient(135deg, #667eea, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    #sidebar {
      font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
      box-shadow: 4px 0 20px rgba(0,0,0,0.3);
    }
    
    #sidebar .nav-link {
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }
    
    #sidebar .nav-link:hover {
      background: linear-gradient(90deg, rgba(102,126,234,0.2), transparent) !important;
      border-left: 3px solid #667eea;
      padding-left: 25px !important;
    }
    
    #sidebar .nav-link.active {
      background: linear-gradient(90deg, rgba(102,126,234,0.3), transparent) !important;
      border-left: 3px solid #667eea;
    }
    
    #sidebar .sidebar-footer {
      background: linear-gradient(180deg, transparent, rgba(102,126,234,0.1));
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    
    #hamburgerBtn {
      transition: all 0.3s ease;
      border-radius: 8px;
    }
    
    #hamburgerBtn:hover {
      background: rgba(255,255,255,0.1) !important;
    }
    
    #sidebarOverlay {
      backdrop-filter: blur(2px);
    }

    /* ---------- NOTIFICATION BELL ---------- */
    .notification-bell {
      position: relative;
      cursor: pointer;
      margin-right: 8px;
      font-size: 1.2rem;
      color: #cbd5e1;
    }
    .notification-bell .badge {
      position: absolute;
      top: -6px;
      right: -8px;
      background: #ef4444;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    /* Card-style notification dropdown */
    .notification-dropdown {
      position: absolute;
      top: 55px;
      right: 80px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.05);
      width: 360px;
      max-height: 480px;
      overflow-y: auto;
      z-index: 2000;
      display: none;
      font-family: 'Poppins', sans-serif;
      color: #1e293b;
      border: 1px solid rgba(0,0,0,0.05);
    }
    .notification-dropdown::before {
      content: '';
      position: absolute;
      top: -8px;
      right: 30px;
      width: 16px;
      height: 16px;
      background: white;
      transform: rotate(45deg);
      border-left: 1px solid rgba(0,0,0,0.05);
      border-top: 1px solid rgba(0,0,0,0.05);
    }
    .notification-dropdown.show {
      display: block;
      animation: fadeSlideDown 0.25s ease;
    }
    @keyframes fadeSlideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .notification-dropdown .dropdown-header {
      padding: 16px 20px;
      border-bottom: 1px solid #f1f5f9;
      font-weight: 700;
      font-size: 15px;
      color: #0f172a;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .notification-dropdown .dropdown-header .clear-all {
      font-size: 12px;
      color: #667eea;
      cursor: pointer;
      font-weight: 500;
      background: none;
      border: none;
      padding: 0;
    }
    .notification-dropdown .dropdown-header .clear-all:hover {
      color: #4f46e5;
    }
    .notification-item {
      padding: 16px 20px;
      border-bottom: 1px solid #f8fafc;
      font-size: 13px;
      transition: background 0.15s;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .notification-item:last-child {
      border-bottom: none;
    }
    .notification-item:hover {
      background: #fafbff;
    }
    .notification-item .notif-content {
      flex: 1;
    }
    .notification-item .notif-message {
      line-height: 1.5;
      margin-bottom: 6px;
    }
    .notification-item .notif-time {
      font-size: 11px;
      color: #94a3b8;
    }
    .notification-item .actions {
      margin-top: 6px;
      display: flex;
      gap: 8px;
    }
    .notification-item .actions button {
      padding: 4px 10px;
      border-radius: 6px;
      border: none;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .btn-approve {
      background: #10b981;
      color: white;
    }
    .btn-approve:hover { background: #059669; }
    .btn-deny {
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #e2e8f0;
    }
    .btn-deny:hover { background: #e2e8f0; }
    .btn-delete {
      background: #fee2e2;
      color: #dc2626;
      border: none;
      margin-left: 8px;
    }
    .btn-delete:hover { background: #fecaca; }
    .notification-empty {
      padding: 30px 20px;
      text-align: center;
      color: #94a3b8;
      font-size: 14px;
    }

    /* Access modal (unchanged) */
    .access-modal {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .access-modal.show {
      display: flex;
    }
    .access-modal-content {
      background: white;
      border-radius: 16px;
      padding: 30px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .access-modal-content h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 10px;
    }
    .access-modal-content p {
      font-size: 14px;
      color: #475569;
      margin-bottom: 25px;
      line-height: 1.6;
    }
    .access-modal-content .btn-request {
      background: #2563eb;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      margin: 0 5px;
      transition: background 0.3s;
    }
    .access-modal-content .btn-request:hover { background: #1d4ed8; }
    .access-modal-content .btn-close-modal {
      background: #f1f5f9;
      color: #475569;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      margin: 0 5px;
      transition: background 0.3s;
    }
    .access-modal-content .btn-close-modal:hover { background: #e2e8f0; }
    
    @media (max-width: 768px) {
      #main-header {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
      }
      #sidebar {
        box-shadow: 4px 0 30px rgba(0,0,0,0.5);
      }
      .notification-dropdown {
        right: 10px;
        left: 10px;
        width: auto;
      }
    }
  `;
  document.head.appendChild(style);

  // ---------- TOP BAR ----------
  const header = document.createElement('header');
  header.id = 'main-header';
  header.style.position = 'fixed';
  header.style.top = '0';
  header.style.left = '0';
  header.style.width = '100%';
  header.style.minHeight = '60px';
  header.style.color = 'white';
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.justifyContent = 'space-between';
  header.style.padding = '10px 20px';
  header.style.boxSizing = 'border-box';
  header.style.zIndex = '1000';
  header.style.gap = '12px';

  const headerLeft = document.createElement('div');
  headerLeft.style.flex = '1';
  headerLeft.style.minWidth = '0';
  headerLeft.style.overflow = 'hidden';
  
  const headerTitle = document.createElement('strong');
  headerTitle.className = 'header-title';
  headerTitle.style.fontSize = '18px';
  headerTitle.style.fontWeight = '700';
  headerTitle.style.display = 'block';
  headerTitle.style.overflow = 'hidden';
  headerTitle.style.textOverflow = 'ellipsis';
  headerTitle.style.whiteSpace = 'nowrap';
  headerTitle.style.letterSpacing = '-0.3px';
  headerTitle.textContent = 'Manage Church Member';
  
  const headerSubtitle = document.createElement('span');
  headerSubtitle.style.fontSize = '11px';
  headerSubtitle.style.fontWeight = '300';
  headerSubtitle.style.color = '#94a3b8';
  headerSubtitle.style.display = 'block';
  headerSubtitle.style.overflow = 'hidden';
  headerSubtitle.style.textOverflow = 'ellipsis';
  headerSubtitle.style.whiteSpace = 'nowrap';
  headerSubtitle.style.letterSpacing = '0.3px';
  headerSubtitle.textContent = 'Mobilization Church Balilihan';
  
  headerLeft.appendChild(headerTitle);
  headerLeft.appendChild(headerSubtitle);
  header.appendChild(headerLeft);

  const headerRight = document.createElement('div');
  headerRight.style.display = 'flex';
  headerRight.style.alignItems = 'center';
  headerRight.style.gap = '12px';
  headerRight.style.flexShrink = '0';

  // Date/time
  const dateTimeContainer = document.createElement('div');
  dateTimeContainer.style.display = 'flex';
  dateTimeContainer.style.alignItems = 'center';
  dateTimeContainer.style.gap = '6px';
  dateTimeContainer.style.background = 'rgba(255,255,255,0.08)';
  dateTimeContainer.style.padding = '6px 12px';
  dateTimeContainer.style.borderRadius = '20px';
  dateTimeContainer.style.border = '1px solid rgba(255,255,255,0.1)';
  
  const clockIcon = document.createElement('span');
  clockIcon.innerHTML = '🕐';
  clockIcon.style.fontSize = '12px';
  dateTimeContainer.appendChild(clockIcon);
  
  const dateTimeDiv = document.createElement('div');
  dateTimeDiv.id = 'datetime';
  dateTimeDiv.style.fontSize = '11px';
  dateTimeDiv.style.fontWeight = '400';
  dateTimeDiv.style.color = '#cbd5e1';
  dateTimeDiv.style.whiteSpace = 'nowrap';
  dateTimeDiv.style.letterSpacing = '0.3px';
  dateTimeContainer.appendChild(dateTimeDiv);
  
  headerRight.appendChild(dateTimeContainer);

  // ---------- NOTIFICATION BELL ----------
  const bellSpan = document.createElement('span');
  bellSpan.className = 'notification-bell';
  bellSpan.innerHTML = '🔔 <span class="badge" id="notificationBadge" style="display:none">0</span>';
  headerRight.appendChild(bellSpan);

  // Notification dropdown (card style)
  const notifDropdown = document.createElement('div');
  notifDropdown.className = 'notification-dropdown';
  notifDropdown.id = 'notificationDropdown';
  document.body.appendChild(notifDropdown);

  // Toggle dropdown when bell is clicked
  bellSpan.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('show');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!bellSpan.contains(e.target) && !notifDropdown.contains(e.target)) {
      notifDropdown.classList.remove('show');
    }
  });

  // Hamburger button
  const hamburger = document.createElement('button');
  hamburger.id = 'hamburgerBtn';
  hamburger.innerHTML = '☰';
  hamburger.style.display = 'none';
  hamburger.style.background = 'rgba(255,255,255,0.08)';
  hamburger.style.border = '1px solid rgba(255,255,255,0.1)';
  hamburger.style.color = 'white';
  hamburger.style.fontSize = '20px';
  hamburger.style.cursor = 'pointer';
  hamburger.style.padding = '6px 10px';
  hamburger.style.borderRadius = '8px';
  hamburger.style.lineHeight = '1';
  hamburger.style.flexShrink = '0';
  headerRight.appendChild(hamburger);

  header.appendChild(headerRight);
  document.body.prepend(header);

  // Update date/time
  function updateDateTime() {
    const now = new Date();
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('datetime').textContent = now.toLocaleString('en-US', options);
  }
  updateDateTime();
  setInterval(updateDateTime, 30000);

  function getHeaderHeight() {
    return header.offsetHeight;
  }

  // ---------- SIDEBAR ----------
  const sidebar = document.createElement('nav');
  sidebar.id = 'sidebar';
  sidebar.style.position = 'fixed';
  sidebar.style.top = getHeaderHeight() + 'px';
  sidebar.style.left = '0';
  sidebar.style.width = '240px';
  sidebar.style.height = 'calc(100% - ' + getHeaderHeight() + 'px)';
  sidebar.style.color = 'white';
  sidebar.style.display = 'flex';
  sidebar.style.flexDirection = 'column';
  sidebar.style.justifyContent = 'space-between';
  sidebar.style.zIndex = '999';
  sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  sidebar.style.overflowY = 'auto';
  sidebar.style.overflowX = 'hidden';

  const menuContainer = document.createElement('div');
  menuContainer.style.padding = '12px 0';

  const menuHeader = document.createElement('div');
  menuHeader.style.padding = '8px 20px 16px';
  menuHeader.style.fontSize = '11px';
  menuHeader.style.fontWeight = '600';
  menuHeader.style.color = '#64748b';
  menuHeader.style.textTransform = 'uppercase';
  menuHeader.style.letterSpacing = '1px';
  menuHeader.textContent = 'Navigation';
  menuContainer.appendChild(menuHeader);

  const menuList = document.createElement('ul');
  menuList.style.listStyle = 'none';
  menuList.style.padding = '0';
  menuList.style.margin = '0';

  // ---------- SUPABASE CLIENT FOR NOTIFICATIONS ----------
  const SUPABASE_URL = 'https://mjpahhjaefflposesygk.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qcGFoaGphZWZmbHBvc2VzeWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NjQzMDMsImV4cCI6MjEwMDQ0MDMwM30.cNMzs1TxHKPbWKtY9xZD6W29nSU1ocvm8n5pjE68d1g';
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Helpers for admin role
  function getAdminUsername() {
    return sessionStorage.getItem('adminUsername') || localStorage.getItem('adminUsername') || '';
  }
  function getAdminRole() {
    return sessionStorage.getItem('adminRole') || localStorage.getItem('adminRole') || '';
  }
  function isSuperAdmin() {
    return getAdminRole() === 'super_admin';
  }

  // ---------- NOTIFICATION FUNCTIONS ----------
  async function loadNotifications() {
    const username = getAdminUsername();
    if (!username) return;

    if (isSuperAdmin()) {
      const { data, error } = await supabase
        .from('admin_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) return console.error(error);
      renderNotificationDropdownForSuperAdmin(data);
      updateBadge(data.filter(r => r.status === 'pending').length);
    } else {
      const { data, error } = await supabase
        .from('admin_requests')
        .select('*')
        .eq('requester_username', username)
        .order('created_at', { ascending: false });

      if (error) return console.error(error);
      renderNotificationDropdownForAdmin(data);
      const pending = data.filter(r => r.status === 'pending').length;
      updateBadge(pending);
    }
  }

  function updateBadge(count) {
    const badge = document.getElementById('notificationBadge');
    if (count > 0) {
      badge.style.display = 'flex';
      badge.textContent = count;
    } else {
      badge.style.display = 'none';
    }
  }

  function renderNotificationDropdownForSuperAdmin(requests) {
    const dropdown = document.getElementById('notificationDropdown');
    if (!dropdown) return;

    if (requests.length === 0) {
      dropdown.innerHTML = `
        <div class="dropdown-header">
          <span>🔔 Notifications</span>
        </div>
        <div class="notification-empty">No requests.</div>`;
      return;
    }

    let html = `<div class="dropdown-header"><span>🔔 All Requests (${requests.length})</span><button class="clear-all" onclick="clearAllNotifications()">Clear All</button></div>`;
    requests.forEach(req => {
      const statusInfo = getStatusDisplay(req.status);
      const time = new Date(req.created_at).toLocaleString();
      html += `
        <div class="notification-item">
          <div class="notif-content">
            <div class="notif-message"><strong>${req.requester_username}</strong> requested <strong>${req.requested_role}</strong> – <span class="${statusInfo.color} font-medium">${statusInfo.text}</span></div>
            <div class="notif-time">${time}</div>
            ${req.status === 'pending' ? `
              <div class="actions">
                <button class="btn-approve" onclick="approveRequest('${req.id}', '${req.requester_username}', '${req.requested_role}')">✓ Approve</button>
                <button class="btn-deny" onclick="denyRequest('${req.id}')">✕ Deny</button>
              </div>
            ` : ''}
          </div>
          <button class="btn-delete" onclick="deleteRequest('${req.id}')" title="Delete">🗑</button>
        </div>`;
    });
    dropdown.innerHTML = html;
  }

  function renderNotificationDropdownForAdmin(requests) {
    const dropdown = document.getElementById('notificationDropdown');
    if (!dropdown) return;

    if (requests.length === 0) {
      dropdown.innerHTML = `
        <div class="dropdown-header">
          <span>🔔 My Requests</span>
        </div>
        <div class="notification-empty">No requests yet.</div>`;
      return;
    }

    let html = `<div class="dropdown-header"><span>🔔 My Requests</span><button class="clear-all" onclick="clearAllNotifications()">Clear All</button></div>`;
    requests.forEach(req => {
      const statusInfo = getStatusDisplay(req.status);
      const time = new Date(req.created_at).toLocaleString();
      html += `
        <div class="notification-item">
          <div class="notif-content">
            <div class="notif-message">Request for <strong>${req.requested_role}</strong> – <span class="${statusInfo.color} font-medium">${statusInfo.text}</span></div>
            <div class="notif-time">${time}</div>
          </div>
          <button class="btn-delete" onclick="deleteRequest('${req.id}')" title="Delete">🗑</button>
        </div>`;
    });
    dropdown.innerHTML = html;
  }

  function getStatusDisplay(status) {
    if (status === 'approved') return { color: 'text-green-600', text: 'Approved ✅' };
    if (status === 'denied') return { color: 'text-red-600', text: 'Denied ❌' };
    return { color: 'text-yellow-600', text: 'Pending ⏳' };
  }

  window.deleteRequest = async function(requestId) {
    const { error } = await supabase
      .from('admin_requests')
      .delete()
      .eq('id', requestId);
    if (error) {
      alert('Error deleting: ' + error.message);
    } else {
      loadNotifications();
    }
  };

  window.clearAllNotifications = async function() {
    const username = getAdminUsername();
    let query = supabase.from('admin_requests').delete();
    if (!isSuperAdmin()) {
      query = query.eq('requester_username', username);
    }
    const { error } = await query;
    if (error) {
      alert('Error clearing: ' + error.message);
    } else {
      loadNotifications();
    }
  };

  window.approveRequest = async function(requestId, username, role) {
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({ role: role })
      .eq('username', username);
    if (updateError) {
      alert('Error updating role: ' + updateError.message);
      return;
    }
    const { error: reqError } = await supabase
      .from('admin_requests')
      .update({ status: 'approved', resolved_at: new Date().toISOString() })
      .eq('id', requestId);
    if (reqError) {
      alert('Error updating request: ' + reqError.message);
      return;
    }
    loadNotifications();
    if (getAdminUsername() === username) {
      sessionStorage.setItem('adminRole', role);
      localStorage.setItem('adminRole', role);
      location.reload();
    }
  };

  window.denyRequest = async function(requestId) {
    const { error } = await supabase
      .from('admin_requests')
      .update({ status: 'denied', resolved_at: new Date().toISOString() })
      .eq('id', requestId);
    if (error) {
      alert('Error denying request: ' + error.message);
    } else {
      loadNotifications();
    }
  };

  // ---------- ACCESS DENIED MODAL ----------
  const modal = document.createElement('div');
  modal.className = 'access-modal';
  modal.innerHTML = `
    <div class="access-modal-content">
      <h3>⛔ Access Denied</h3>
      <p>You are not authorized to view the Admin Users page.<br>Only <strong>super admins</strong> can manage admin accounts.</p>
      <button class="btn-request" id="requestSuperAdminBtn">📩 Request Super Admin</button>
      <button class="btn-close-modal" id="closeAccessModal">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('closeAccessModal').addEventListener('click', () => modal.classList.remove('show'));

  document.getElementById('requestSuperAdminBtn').addEventListener('click', async () => {
    const username = getAdminUsername();
    if (!username) {
      alert('You must be logged in.');
      return;
    }
    const { data: existing } = await supabase
      .from('admin_requests')
      .select('*')
      .eq('requester_username', username)
      .eq('status', 'pending')
      .maybeSingle();
    if (existing) {
      alert('You already have a pending request. Please wait for approval.');
      modal.classList.remove('show');
      return;
    }
    const { error } = await supabase
      .from('admin_requests')
      .insert([{ requester_username: username, requested_role: 'super_admin', status: 'pending' }]);
    if (error) {
      alert('Error sending request: ' + error.message);
    } else {
      alert('Your request has been sent to the Super Admin.');
      modal.classList.remove('show');
      loadNotifications();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });

  // ---------- MENU ITEMS ----------
  const menuItems = [
    { text: '🏠 Home', href: 'index.html' },
    { text: '➕ Add Members', href: 'add_member.html' },
    { text: '📊 User Table', href: 'table.html' },
    { text: '🔑 Credentials', href: 'credentials.html' },
    { text: '👥 Admin Users', href: 'admin_user.html' },
    { text: '🚪 Logout', href: '#', action: 'logout' }
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  menuItems.forEach(item => {
    const li = document.createElement('li');
    li.style.margin = '2px 8px';
    const a = document.createElement('a');
    a.textContent = item.text;
    a.href = item.href;
    a.className = 'nav-link';
    a.style.display = 'block';
    a.style.padding = '12px 16px';
    a.style.color = '#cbd5e1';
    a.style.textDecoration = 'none';
    a.style.fontSize = '14px';
    a.style.fontWeight = '500';
    a.style.borderRadius = '8px';
    a.style.transition = 'all 0.3s ease';
    a.style.position = 'relative';
    
    if (currentPage === item.href) {
      a.classList.add('active');
      a.style.color = 'white';
      a.style.background = 'linear-gradient(90deg, rgba(102,126,234,0.3), transparent)';
      a.style.borderLeft = '3px solid #667eea';
    }
    
    a.onmouseover = () => {
      if (!a.classList.contains('active')) {
        a.style.background = 'linear-gradient(90deg, rgba(102,126,234,0.2), transparent)';
        a.style.borderLeft = '3px solid #667eea';
        a.style.paddingLeft = '20px';
        a.style.color = 'white';
      }
    };
    
    a.onmouseout = () => {
      if (!a.classList.contains('active')) {
        a.style.background = '';
        a.style.borderLeft = '3px solid transparent';
        a.style.paddingLeft = '16px';
        a.style.color = '#cbd5e1';
      }
    };
    
    if (item.action === 'logout') {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        if (window.innerWidth <= 768) closeSidebar();
        window.location.href = 'login.html';
      });
    } else if (item.text === '👥 Admin Users') {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        if (!isSuperAdmin()) {
          modal.classList.add('show');
        } else {
          window.location.href = item.href;
        }
        if (window.innerWidth <= 768) closeSidebar();
      });
    } else {
      a.onclick = () => {
        if (window.innerWidth <= 768) closeSidebar();
      };
    }
    
    li.appendChild(a);
    menuList.appendChild(li);
  });

  menuContainer.appendChild(menuList);
  sidebar.appendChild(menuContainer);

  const footerNote = document.createElement('div');
  footerNote.className = 'sidebar-footer';
  footerNote.style.padding = '20px';
  footerNote.style.fontSize = '11px';
  footerNote.style.color = '#94a3b8';
  footerNote.style.flexShrink = '0';
  
  const footerLogo = document.createElement('div');
  footerLogo.style.fontWeight = '600';
  footerLogo.style.color = '#667eea';
  footerLogo.style.marginBottom = '4px';
  footerLogo.textContent = 'MCB';
  
  const footerText = document.createElement('div');
  footerText.style.fontSize = '10px';
  footerText.style.fontWeight = '300';
  footerText.innerHTML = 'Mobilization Church Balilihan<br>© 2026 All rights reserved';
  
  footerNote.appendChild(footerLogo);
  footerNote.appendChild(footerText);
  sidebar.appendChild(footerNote);

  document.body.appendChild(sidebar);

  const overlay = document.createElement('div');
  overlay.id = 'sidebarOverlay';
  overlay.style.display = 'none';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  overlay.style.zIndex = '998';
  overlay.style.transition = 'opacity 0.3s ease';
  document.body.appendChild(overlay);

  const mainContent = document.createElement('div');
  mainContent.id = 'main-content';
  mainContent.style.marginLeft = '240px';
  mainContent.style.marginTop = getHeaderHeight() + 'px';
  mainContent.style.padding = '25px';
  mainContent.style.transition = 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  mainContent.style.minHeight = '100vh';
  const existingChildren = Array.from(document.body.children).filter(el => 
    el !== header && el !== sidebar && el !== overlay && el !== style && el !== modal && el !== notifDropdown
  );
  existingChildren.forEach(child => mainContent.appendChild(child));
  document.body.appendChild(mainContent);

  let sidebarOpen = false;

  function openSidebar() {
    sidebar.style.transform = 'translateX(0)';
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
    document.body.style.overflow = 'hidden';
    sidebarOpen = true;
    hamburger.innerHTML = '✕';
  }

  function closeSidebar() {
    sidebar.style.transform = 'translateX(-100%)';
    overlay.style.display = 'none';
    overlay.style.opacity = '0';
    document.body.style.overflow = '';
    sidebarOpen = false;
    hamburger.innerHTML = '☰';
  }

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    if (sidebarOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener('click', function() {
    closeSidebar();
  });

  function updateLayout() {
    const headerHeight = getHeaderHeight();
    sidebar.style.top = headerHeight + 'px';
    sidebar.style.height = 'calc(100% - ' + headerHeight + 'px)';
    mainContent.style.marginTop = headerHeight + 'px';
  }

  function handleResize() {
    if (window.innerWidth <= 768) {
      hamburger.style.display = 'block';
      sidebar.style.transform = 'translateX(-100%)';
      sidebar.style.width = '280px';
      overlay.style.display = 'none';
      overlay.style.opacity = '0';
      mainContent.style.marginLeft = '0';
      mainContent.style.padding = '15px';
      sidebarOpen = false;
      document.body.style.overflow = '';
      hamburger.innerHTML = '☰';
      header.style.padding = '10px 15px';
      headerTitle.style.fontSize = '16px';
    } else {
      hamburger.style.display = 'none';
      sidebar.style.transform = 'translateX(0)';
      sidebar.style.width = '240px';
      overlay.style.display = 'none';
      overlay.style.opacity = '0';
      mainContent.style.marginLeft = '240px';
      mainContent.style.padding = '25px';
      sidebarOpen = true;
      document.body.style.overflow = '';
      header.style.padding = '10px 20px';
      headerTitle.style.fontSize = '18px';
    }
    updateLayout();
  }

  window.addEventListener('resize', function() {
    handleResize();
    updateLayout();
  });
  
  handleResize();
  updateLayout();
  setInterval(updateLayout, 500);

  loadNotifications();
  setInterval(loadNotifications, 60000);
})();
