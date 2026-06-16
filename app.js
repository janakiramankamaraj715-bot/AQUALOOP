// ===================================================
// Greywater Recycling Intelligence Platform
// Main Application Controller
// ===================================================

const App = {
  currentPage: 'dashboard',
  theme: 'light',

  // --- Initialization ---
  init() {
    this.loadTheme();
    this.initNavigation();
    this.initSearch();
    this.initNotifications();
    this.initSettings();
    this.initMobileMenu();
    this.navigateTo('dashboard');
    Calculator.init();

    // Delay chart init slightly to ensure DOM is ready
    setTimeout(() => {
      Charts.initAll();
      this.initAnimatedCounters();
      this.initFiltrationAnimation();
      this.initGauges();
    }, 300);
  },

  // --- Theme Management ---
  loadTheme() {
    const saved = localStorage.getItem('grip-theme') || 'light';
    this.theme = saved;
    document.documentElement.setAttribute('data-theme', saved);
    this.updateThemeToggle();
  },

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('grip-theme', this.theme);
    this.updateThemeToggle();

    // Re-init charts for new theme colors
    setTimeout(() => Charts.initAll(), 100);
  },

  updateThemeToggle() {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.innerHTML = this.theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }
    // Update settings toggle
    const settingsToggle = document.getElementById('darkModeToggle');
    if (settingsToggle) {
      settingsToggle.classList.toggle('active', this.theme === 'dark');
    }
  },

  // --- Navigation ---
  initNavigation() {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', (e) => {
        const page = e.currentTarget.getAttribute('data-page');
        this.navigateTo(page);
        // Close mobile sidebar
        document.querySelector('.sidebar').classList.remove('open');
        document.querySelector('.overlay').classList.remove('active');
      });
    });
  },

  navigateTo(pageId) {
    this.currentPage = pageId;

    // Update nav active state
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-page') === pageId);
    });

    // Show/hide sections
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.toggle('active', section.id === `page-${pageId}`);
    });

    // Update topbar title
    const navItem = AppData.navItems.find(n => n.id === pageId);
    const topTitle = document.getElementById('topbarTitle');
    const topBreadcrumb = document.getElementById('topbarBreadcrumb');
    if (topTitle && navItem) {
      topTitle.textContent = navItem.label;
    }
    if (topBreadcrumb && navItem) {
      const sectionMap = {
        overview: 'Overview',
        monitoring: 'Monitoring',
        insights: 'Insights',
        management: 'Management',
        system: 'System'
      };
      topBreadcrumb.textContent = `Home / ${sectionMap[navItem.section]} / ${navItem.label}`;
    }

    // Re-animate page elements
    this.animatePageElements(pageId);

    // Initialize specific page features
    if (pageId === 'dashboard') {
      setTimeout(() => {
        this.initAnimatedCounters();
        Charts.initDashboardMiniChart('dashboardMiniChart');
      }, 100);
    }
    if (pageId === 'analytics') {
      setTimeout(() => {
        Charts.initDailySavings('dailySavingsChart');
        Charts.initMonthlySavings('monthlySavingsChart');
        Charts.initConsumptionVsRecovered('consumptionVsRecoveredChart');
        Charts.initAnnualForecast('annualForecastChart');
        Charts.initFiltrationPerformance('filtrationPerformanceChart');
      }, 100);
    }
    if (pageId === 'cost-analysis') {
      setTimeout(() => Charts.initCostPieChart('costPieChart'), 100);
    }
    if (pageId === 'filtration') {
      setTimeout(() => this.initFiltrationAnimation(), 100);
    }
    if (pageId === 'water-quality') {
      setTimeout(() => this.initGauges(), 100);
    }
    if (pageId === 'maintenance') {
      setTimeout(() => this.initHealthBar(), 100);
    }
  },

  animatePageElements(pageId) {
    const section = document.getElementById(`page-${pageId}`);
    if (!section) return;
    const elements = section.querySelectorAll('.animate-in');
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 60);
    });
  },

  // --- Animated Counters ---
  initAnimatedCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter'));
      const duration = 1500;
      const startTime = performance.now();
      const decimals = target % 1 !== 0 ? 1 : 0;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (target >= 1000) {
          el.textContent = Math.round(current).toLocaleString();
        } else {
          el.textContent = current.toFixed(decimals);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  },

  // --- Filtration Animation ---
  initFiltrationAnimation() {
    const stages = document.querySelectorAll('.filtration-stage');
    const arrows = document.querySelectorAll('.filtration-arrow');

    stages.forEach((stage, i) => {
      setTimeout(() => {
        stage.classList.add('visible');
      }, i * 180);
    });

    arrows.forEach((arrow, i) => {
      setTimeout(() => {
        arrow.classList.add('visible');
      }, i * 180 + 100);
    });
  },

  // --- Gauge Animations ---
  initGauges() {
    document.querySelectorAll('.gauge-fill').forEach(gauge => {
      const value = parseFloat(gauge.getAttribute('data-value'));
      const circumference = 2 * Math.PI * 52; // r=52
      const offset = circumference - (value / 100) * circumference;

      gauge.style.strokeDasharray = circumference;
      gauge.style.strokeDashoffset = circumference;

      setTimeout(() => {
        gauge.style.strokeDashoffset = offset;
      }, 200);
    });

    // Animate gauge value text
    document.querySelectorAll('.gauge-value[data-gauge-value]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-gauge-value'));
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + '%';
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    });
  },

  // --- Health Bar ---
  initHealthBar() {
    const bar = document.querySelector('.health-bar-fill');
    if (bar) {
      const health = AppData.maintenance.schedule.overallHealth;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = health + '%';
      }, 300);
    }
  },

  // --- Search ---
  initSearch() {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    if (!input || !results) return;

    const searchItems = AppData.navItems.map(item => ({
      label: item.label,
      page: item.id,
      icon: item.icon
    }));

    // Add extra search items
    searchItems.push(
      { label: 'Water Consumption Data', page: 'dashboard', icon: 'fa-droplet' },
      { label: 'Filtration Efficiency', page: 'water-quality', icon: 'fa-vial-circle-check' },
      { label: 'Generate PDF Report', page: 'reports', icon: 'fa-file-pdf' },
      { label: 'Export CSV Data', page: 'reports', icon: 'fa-file-csv' },
      { label: 'Dark Mode', page: 'settings', icon: 'fa-moon' },
      { label: 'Monthly Savings', page: 'analytics', icon: 'fa-chart-line' },
      { label: 'Component Costs', page: 'cost-analysis', icon: 'fa-coins' }
    );

    input.addEventListener('input', () => {
      const query = input.value.toLowerCase().trim();
      if (query.length < 2) {
        results.classList.remove('active');
        return;
      }

      const filtered = searchItems.filter(item =>
        item.label.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        results.innerHTML = '<div class="search-result-item"><i class="fa-solid fa-circle-xmark"></i>No results found</div>';
      } else {
        results.innerHTML = filtered.map(item =>
          `<div class="search-result-item" data-search-page="${item.page}">
            <i class="fa-solid ${item.icon}"></i>
            ${item.label}
          </div>`
        ).join('');

        results.querySelectorAll('.search-result-item[data-search-page]').forEach(el => {
          el.addEventListener('click', () => {
            this.navigateTo(el.getAttribute('data-search-page'));
            input.value = '';
            results.classList.remove('active');
          });
        });
      }

      results.classList.add('active');
    });

    // Close search on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-bar')) {
        results.classList.remove('active');
      }
    });
  },

  // --- Notifications ---
  initNotifications() {
    const btn = document.getElementById('notificationBtn');
    const panel = document.querySelector('.notification-panel');
    const closeBtn = document.getElementById('notificationClose');
    const overlay = document.querySelector('.overlay');

    if (btn && panel) {
      btn.addEventListener('click', () => {
        panel.classList.toggle('open');
        overlay.classList.toggle('active');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
        overlay.classList.remove('active');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        panel.classList.remove('open');
        overlay.classList.remove('active');
        document.querySelector('.sidebar').classList.remove('open');
      });
    }
  },

  // --- Settings ---
  initSettings() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // All toggle switches
    document.querySelectorAll('.toggle-switch:not(#darkModeToggle)').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
      });
    });
  },

  // --- Mobile Menu ---
  initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    if (toggle) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
      });
    }
  },

  // --- Toast Notification ---
  showToast(message, type = 'info') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const iconMap = {
      success: 'fa-circle-check',
      info: 'fa-circle-info',
      warning: 'fa-triangle-exclamation',
      error: 'fa-circle-xmark'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${iconMap[type]}"></i>${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// --- Boot ---
document.addEventListener('DOMContentLoaded', () => App.init());
