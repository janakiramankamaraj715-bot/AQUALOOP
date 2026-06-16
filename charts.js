// ===================================================
// Greywater Recycling Intelligence Platform
// Chart.js Visualizations
// ===================================================

const Charts = {
  instances: {},
  defaultFont: "'Inter', sans-serif",

  // Shared chart defaults
  getDefaults() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      textColor: isDark ? '#94a3b8' : '#64748b',
      gridColor: isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(148, 163, 184, 0.15)',
      bgColor: isDark ? '#0f1a2e' : '#ffffff',
      blue: '#0ea5e9',
      teal: '#14b8a6',
      green: '#10b981',
      cyan: '#06b6d4',
      purple: '#8b5cf6',
      sky: '#38bdf8',
      blueAlpha: 'rgba(14, 165, 233, 0.15)',
      tealAlpha: 'rgba(20, 184, 166, 0.15)',
      greenAlpha: 'rgba(16, 185, 129, 0.15)',
    };
  },

  // Create gradient
  createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  },

  // ---- Daily Water Savings (Bar Chart) ----
  initDailySavings(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const d = this.getDefaults();
    const data = AppData.analytics.dailySavings;

    this.instances.dailySavings = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Water Saved (L)',
          data: data.data,
          backgroundColor: data.data.map((_, i) => {
            const colors = [d.blue, d.teal, d.green, d.cyan, d.blue, d.teal, d.green];
            return colors[i];
          }),
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: d.bgColor,
            titleColor: d.textColor,
            bodyColor: d.textColor,
            borderColor: d.gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: { family: this.defaultFont, weight: '600' },
            bodyFont: { family: this.defaultFont },
            callbacks: {
              label: (ctx) => `${ctx.parsed.y} Liters saved`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: d.textColor, font: { family: this.defaultFont, size: 11 } }
          },
          y: {
            grid: { color: d.gridColor, drawBorder: false },
            ticks: {
              color: d.textColor,
              font: { family: this.defaultFont, size: 11 },
              callback: v => v + 'L'
            },
            beginAtZero: true
          }
        }
      }
    });
  },

  // ---- Monthly Water Savings Trend (Line Chart) ----
  initMonthlySavings(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const d = this.getDefaults();
    const data = AppData.analytics.monthlySavings;
    const context = ctx.getContext('2d');
    const gradient = this.createGradient(context, 'rgba(14, 165, 233, 0.2)', 'rgba(14, 165, 233, 0.01)');

    this.instances.monthlySavings = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Monthly Savings (L)',
          data: data.data,
          borderColor: d.blue,
          backgroundColor: gradient,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: d.blue,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: d.bgColor,
            titleColor: d.textColor,
            bodyColor: d.textColor,
            borderColor: d.gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: { family: this.defaultFont, weight: '600' },
            bodyFont: { family: this.defaultFont },
            callbacks: { label: (ctx) => `${ctx.parsed.y.toLocaleString()} Liters` }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: d.textColor, font: { family: this.defaultFont, size: 11 } }
          },
          y: {
            grid: { color: d.gridColor, drawBorder: false },
            ticks: {
              color: d.textColor,
              font: { family: this.defaultFont, size: 11 },
              callback: v => (v / 1000).toFixed(1) + 'K'
            }
          }
        }
      }
    });
  },

  // ---- Consumption vs Recovered (Dual Line Chart) ----
  initConsumptionVsRecovered(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const d = this.getDefaults();
    const data = AppData.analytics.consumptionVsRecovered;
    const context = ctx.getContext('2d');

    this.instances.consumptionVsRecovered = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Consumption (L)',
            data: data.consumption,
            borderColor: d.blue,
            backgroundColor: 'rgba(14, 165, 233, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: d.blue,
          },
          {
            label: 'Recovered (L)',
            data: data.recovered,
            borderColor: d.green,
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: d.green,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              color: d.textColor,
              font: { family: this.defaultFont, size: 11 },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: d.bgColor,
            titleColor: d.textColor,
            bodyColor: d.textColor,
            borderColor: d.gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: { family: this.defaultFont, weight: '600' },
            bodyFont: { family: this.defaultFont },
            callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}L` }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: d.textColor, font: { family: this.defaultFont, size: 11 } }
          },
          y: {
            grid: { color: d.gridColor, drawBorder: false },
            ticks: {
              color: d.textColor,
              font: { family: this.defaultFont, size: 11 },
              callback: v => (v / 1000).toFixed(0) + 'K'
            }
          }
        }
      }
    });
  },

  // ---- Annual Impact Forecast (Bar + Line combo) ----
  initAnnualForecast(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const d = this.getDefaults();
    const data = AppData.analytics.annualForecast;

    this.instances.annualForecast = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            type: 'bar',
            label: 'Actual Savings (L)',
            data: data.actual,
            backgroundColor: d.teal,
            borderRadius: 8,
            borderSkipped: false,
            barPercentage: 0.5,
            order: 2
          },
          {
            type: 'line',
            label: 'Forecast (L)',
            data: data.forecast,
            borderColor: d.blue,
            borderWidth: 2.5,
            borderDash: [6, 4],
            pointBackgroundColor: d.blue,
            pointRadius: 5,
            pointHoverRadius: 8,
            tension: 0.3,
            spanGaps: true,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              color: d.textColor,
              font: { family: this.defaultFont, size: 11 },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: d.bgColor,
            titleColor: d.textColor,
            bodyColor: d.textColor,
            borderColor: d.gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: { family: this.defaultFont, weight: '600' },
            bodyFont: { family: this.defaultFont },
            callbacks: {
              label: (ctx) => {
                if (ctx.parsed.y === null) return '';
                return `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}L`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: d.textColor, font: { family: this.defaultFont, size: 11 } }
          },
          y: {
            grid: { color: d.gridColor, drawBorder: false },
            ticks: {
              color: d.textColor,
              font: { family: this.defaultFont, size: 11 },
              callback: v => (v / 1000).toFixed(0) + 'K'
            }
          }
        }
      }
    });
  },

  // ---- Filtration Performance Trends (Multi-Line) ----
  initFiltrationPerformance(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const d = this.getDefaults();
    const data = AppData.analytics.filtrationPerformance;

    this.instances.filtrationPerformance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Turbidity Reduction',
            data: data.turbidity,
            borderColor: d.teal,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: d.teal,
          },
          {
            label: 'Water Clarity',
            data: data.clarity,
            borderColor: d.purple,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: d.purple,
          },
          {
            label: 'Efficiency',
            data: data.efficiency,
            borderColor: d.green,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: d.green,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              color: d.textColor,
              font: { family: this.defaultFont, size: 11 },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: d.bgColor,
            titleColor: d.textColor,
            bodyColor: d.textColor,
            borderColor: d.gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: { family: this.defaultFont, weight: '600' },
            bodyFont: { family: this.defaultFont },
            callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%` }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: d.textColor, font: { family: this.defaultFont, size: 11 } }
          },
          y: {
            grid: { color: d.gridColor, drawBorder: false },
            min: 60,
            max: 100,
            ticks: {
              color: d.textColor,
              font: { family: this.defaultFont, size: 11 },
              callback: v => v + '%'
            }
          }
        }
      }
    });
  },

  // ---- Cost Analysis Pie/Doughnut Chart ----
  initCostPieChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const d = this.getDefaults();
    const data = AppData.costAnalysis.components;
    const colors = [d.blue, d.teal, d.green, '#f59e0b', d.cyan, '#8b5cf6', d.sky, '#f472b6'];

    this.instances.costPie = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(c => c.name),
        datasets: [{
          data: data.map(c => c.cost),
          backgroundColor: colors,
          borderWidth: 0,
          hoverOffset: 12,
          spacing: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: d.textColor,
              font: { family: this.defaultFont, size: 11 },
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: d.bgColor,
            titleColor: d.textColor,
            bodyColor: d.textColor,
            borderColor: d.gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: { family: this.defaultFont, weight: '600' },
            bodyFont: { family: this.defaultFont },
            callbacks: {
              label: (ctx) => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct = ((ctx.parsed / total) * 100).toFixed(1);
                return ` $${ctx.parsed} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  },

  // ---- Dashboard mini chart (Sparkline-style area) ----
  initDashboardMiniChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const d = this.getDefaults();
    const data = AppData.analytics.dailySavings;
    const context = ctx.getContext('2d');
    const gradient = this.createGradient(context, 'rgba(14, 165, 233, 0.3)', 'rgba(14, 165, 233, 0.01)');

    this.instances.dashboardMini = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.data,
          borderColor: d.blue,
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointBackgroundColor: d.blue,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  },

  // Destroy all chart instances (for theme toggle)
  destroyAll() {
    Object.values(this.instances).forEach(chart => {
      if (chart) chart.destroy();
    });
    this.instances = {};
  },

  // Initialize all charts
  initAll() {
    this.destroyAll();
    this.initDailySavings('dailySavingsChart');
    this.initMonthlySavings('monthlySavingsChart');
    this.initConsumptionVsRecovered('consumptionVsRecoveredChart');
    this.initAnnualForecast('annualForecastChart');
    this.initFiltrationPerformance('filtrationPerformanceChart');
    this.initCostPieChart('costPieChart');
    this.initDashboardMiniChart('dashboardMiniChart');
  }
};
