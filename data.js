// ===================================================
// Greywater Recycling Intelligence Platform
// Mock Data Module
// ===================================================

const AppData = {
  // --- KPI Dashboard Data ---
  kpi: {
    dailyConsumption: { value: 450, unit: 'L', change: -3.2, label: 'Daily Water Consumption' },
    greywaterGenerated: { value: 292.5, unit: 'L', change: 1.8, label: 'Greywater Generated' },
    recoveredWater: { value: 248.6, unit: 'L', change: 4.1, label: 'Recovered Water' },
    waterSavedToday: { value: 248.6, unit: 'L', change: 5.3, label: 'Water Saved Today' },
    monthlySavings: { value: 7458, unit: 'L', change: 8.7, label: 'Monthly Water Savings' },
    annualSavings: { value: 90739, unit: 'L', change: 12.4, label: 'Annual Water Savings' },
    filtrationEfficiency: { value: 94.2, unit: '%', change: 0.8, label: 'Filtration Efficiency' },
    sustainabilityScore: { value: 87, unit: '/100', change: 2.1, label: 'Sustainability Score' }
  },

  // --- Calculator Defaults ---
  calculator: {
    familyMembers: 4,
    dailyConsumption: 450,
    greywaterPercent: 0.65,
    recoveryPercent: 0.85
  },

  // --- Filtration Stages ---
  filtrationStages: [
    {
      name: 'Greywater Collection',
      description: 'Wastewater from sinks, showers, and laundry is collected through a dedicated plumbing diversion system.',
      icon: 'fa-faucet-drip',
      color: '#64748b',
      bgColor: 'rgba(100, 116, 139, 0.12)',
      badge: 'Input',
      badgeColor: '#64748b'
    },
    {
      name: 'Mesh Filter',
      description: 'A stainless steel mesh screen removes large debris, hair, food particles, and fabric fibers.',
      icon: 'fa-filter',
      color: '#0ea5e9',
      bgColor: 'rgba(14, 165, 233, 0.12)',
      badge: 'Stage 1',
      badgeColor: '#0ea5e9'
    },
    {
      name: 'Pebble Layer',
      description: 'Coarse pebbles (10-20mm) create channels for water flow and trap larger suspended solids.',
      icon: 'fa-circle-nodes',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.12)',
      badge: 'Stage 2',
      badgeColor: '#8b5cf6'
    },
    {
      name: 'Gravel Layer',
      description: 'Medium-grade gravel (5-10mm) provides secondary filtration, reducing turbidity by up to 40%.',
      icon: 'fa-cubes',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.12)',
      badge: 'Stage 3',
      badgeColor: '#f59e0b'
    },
    {
      name: 'Fine Sand Layer',
      description: 'Fine sand particles capture microscopic contaminants and further polish water clarity.',
      icon: 'fa-hourglass-half',
      color: '#14b8a6',
      bgColor: 'rgba(20, 184, 166, 0.12)',
      badge: 'Stage 4',
      badgeColor: '#14b8a6'
    },
    {
      name: 'Activated Charcoal Layer',
      description: 'Activated carbon adsorbs chemicals, chlorine, odors, and organic compounds through microporous action.',
      icon: 'fa-gem',
      color: '#0f172a',
      bgColor: 'rgba(15, 23, 42, 0.12)',
      badge: 'Stage 5',
      badgeColor: '#475569'
    },
    {
      name: 'Storage Tank',
      description: 'Treated water is stored in a UV-resistant sealed tank, maintaining quality for up to 48 hours.',
      icon: 'fa-database',
      color: '#06b6d4',
      bgColor: 'rgba(6, 182, 212, 0.12)',
      badge: 'Storage',
      badgeColor: '#06b6d4'
    },
    {
      name: 'Water Reuse',
      description: 'Recycled water is distributed for garden irrigation, toilet flushing, and outdoor cleaning tasks.',
      icon: 'fa-recycle',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.12)',
      badge: 'Output',
      badgeColor: '#10b981'
    }
  ],

  // --- Water Quality Metrics ---
  waterQuality: {
    turbidityReduction: { value: 92, status: 'excellent', color: '#10b981' },
    waterRecoveryRate: { value: 85, status: 'excellent', color: '#0ea5e9' },
    odorReduction: { value: 88, status: 'excellent', color: '#14b8a6' },
    filtrationEfficiency: { value: 94, status: 'excellent', color: '#06b6d4' },
    waterClarityIndex: { value: 78, status: 'good', color: '#8b5cf6' }
  },

  // --- Analytics Chart Data ---
  analytics: {
    dailySavings: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [235, 248, 242, 251, 249, 268, 258]
    },
    monthlySavings: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [6200, 5800, 6500, 7100, 7300, 7458, 7600, 7800, 7500, 7200, 7000, 6800]
    },
    consumptionVsRecovered: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      consumption: [13500, 12600, 13800, 14200, 14500, 13500, 14800, 15000, 14200, 13900, 13600, 14000],
      recovered: [6200, 5800, 6500, 7100, 7300, 7458, 7600, 7800, 7500, 7200, 7000, 6800]
    },
    annualForecast: {
      labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
      actual: [62000, 72000, 78000, 85000, 90739, null],
      forecast: [null, null, null, null, 90739, 98000]
    },
    filtrationPerformance: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
      turbidity: [88, 89, 91, 90, 92, 93, 92, 94],
      clarity: [72, 74, 75, 76, 77, 78, 77, 78],
      efficiency: [90, 91, 92, 91, 93, 94, 93, 94]
    }
  },

  // --- Cost Analysis ---
  costAnalysis: {
    components: [
      { name: 'Bucket (20L)', cost: 15, icon: 'fa-bucket', percentage: 15 },
      { name: 'PVC Pipe', cost: 12, icon: 'fa-grip-lines-vertical', percentage: 12 },
      { name: 'Sand (5kg)', cost: 8, icon: 'fa-hourglass-half', percentage: 8 },
      { name: 'Gravel (5kg)', cost: 10, icon: 'fa-cubes', percentage: 10 },
      { name: 'Pebbles (3kg)', cost: 7, icon: 'fa-circle-nodes', percentage: 7 },
      { name: 'Activated Charcoal (2kg)', cost: 25, icon: 'fa-gem', percentage: 25 },
      { name: 'Tap / Valve', cost: 10, icon: 'fa-faucet', percentage: 10 },
      { name: 'Miscellaneous', cost: 13, icon: 'fa-screwdriver-wrench', percentage: 13 }
    ],
    totalCost: 100,
    currency: '$'
  },

  // --- Sustainability Metrics ---
  sustainability: {
    freshwaterReduction: { value: 55.2, unit: '%', icon: 'fa-droplet-slash', description: 'Reduction in freshwater demand through greywater reuse and conservation.' },
    annualWaterConserved: { value: 90739, unit: 'L', icon: 'fa-water', description: 'Total water conserved annually through efficient recycling processes.' },
    groundwaterSaved: { value: 45370, unit: 'L', icon: 'fa-mountain-sun', description: 'Estimated groundwater preserved by reducing freshwater extraction.' },
    envBenefitScore: { value: 82, unit: '/100', icon: 'fa-leaf', description: 'Composite score measuring overall positive environmental impact.' },
    sustainabilityRating: { value: 'A+', unit: '', icon: 'fa-award', description: 'Overall sustainability grade based on conservation and efficiency.' },
    householdImpact: { value: 'High', unit: '', icon: 'fa-house-chimney', description: 'Assessment of household-level contribution to water conservation.' }
  },

  // --- Maintenance Data ---
  maintenance: {
    items: [
      { name: 'Mesh Filter', status: 'green', detail: 'Clean — Last replaced 5 days ago', badge: 'Good', badgeClass: 'good' },
      { name: 'Sand Layer', status: 'green', detail: 'Optimal flow rate maintained', badge: 'Good', badgeClass: 'good' },
      { name: 'Gravel Layer', status: 'green', detail: 'No blockages detected', badge: 'Good', badgeClass: 'good' },
      { name: 'Activated Charcoal', status: 'yellow', detail: 'Replacement due in 12 days', badge: 'Attention', badgeClass: 'attention' },
      { name: 'Storage Tank', status: 'green', detail: 'Last sanitized 3 days ago', badge: 'Good', badgeClass: 'good' },
      { name: 'PVC Connections', status: 'green', detail: 'All joints sealed — No leaks', badge: 'Good', badgeClass: 'good' }
    ],
    schedule: {
      lastCleaning: '2026-06-11',
      nextCleaning: '2026-06-25',
      charcoalReplacement: '2026-06-28',
      overallHealth: 89
    }
  },

  // --- Notifications ---
  notifications: [
    { type: 'success', title: 'Daily target exceeded!', message: 'You saved 248.6L today, surpassing your 200L daily goal.', time: '2 minutes ago' },
    { type: 'info', title: 'Monthly report ready', message: 'Your June water conservation report is ready for download.', time: '1 hour ago' },
    { type: 'warning', title: 'Charcoal replacement', message: 'Activated charcoal layer needs replacement in approximately 12 days.', time: '3 hours ago' },
    { type: 'info', title: 'System optimization', message: 'Filtration efficiency improved by 0.8% this week due to regular maintenance.', time: '5 hours ago' },
    { type: 'success', title: 'Milestone reached!', message: 'You have saved over 90,000 liters of water this year!', time: '1 day ago' },
    { type: 'info', title: 'Sustainability rating upgrade', message: 'Your household sustainability rating has been upgraded to A+.', time: '2 days ago' }
  ],

  // --- Navigation Items ---
  navItems: [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge-high', section: 'overview' },
    { id: 'calculator', label: 'Calculator', icon: 'fa-calculator', section: 'overview' },
    { id: 'filtration', label: 'Filtration System', icon: 'fa-filter-circle-xmark', section: 'monitoring' },
    { id: 'water-quality', label: 'Water Quality', icon: 'fa-vial-circle-check', section: 'monitoring' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-chart-line', section: 'insights' },
    { id: 'cost-analysis', label: 'Cost Analysis', icon: 'fa-coins', section: 'insights' },
    { id: 'sustainability', label: 'Sustainability', icon: 'fa-seedling', section: 'insights' },
    { id: 'maintenance', label: 'Maintenance', icon: 'fa-wrench', section: 'management' },
    { id: 'reports', label: 'Reports', icon: 'fa-file-pdf', section: 'management' },
    { id: 'settings', label: 'Settings', icon: 'fa-gear', section: 'system' }
  ]
};
