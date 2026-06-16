// ===================================================
// Greywater Recycling Intelligence Platform
// Report Generation Module (PDF & CSV)
// ===================================================

const Reports = {
  // --- Generate PDF Report ---
  generatePDF(type) {
    // Use jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 25;

    // Helper functions
    const addTitle = (text) => {
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(14, 165, 233);
      doc.text(text, margin, y);
      y += 10;
    };

    const addSubtitle = (text) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text(text, margin, y);
      y += 8;
    };

    const addText = (text) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(text, margin, y);
      y += 6;
    };

    const addLine = () => {
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;
    };

    const addKV = (key, value) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(key, margin, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(String(value), margin + 80, y);
      y += 7;
    };

    // Header
    doc.setFillColor(14, 165, 233);
    doc.rect(0, 0, pageWidth, 8, 'F');
    y = 22;

    addTitle('Greywater Recycling Intelligence Platform');
    y += 2;
    addText(`Report Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`);
    addText(`Report Type: ${type}`);
    y += 4;
    addLine();

    if (type === 'Water Savings Summary' || type === 'Complete Report') {
      addSubtitle('Water Savings Summary');
      y += 2;
      addKV('Daily Water Consumption:', `${AppData.kpi.dailyConsumption.value} L`);
      addKV('Greywater Generated:', `${AppData.kpi.greywaterGenerated.value} L`);
      addKV('Recovered Water:', `${AppData.kpi.recoveredWater.value} L`);
      addKV('Water Saved Today:', `${AppData.kpi.waterSavedToday.value} L`);
      addKV('Monthly Water Savings:', `${AppData.kpi.monthlySavings.value.toLocaleString()} L`);
      addKV('Annual Water Savings:', `${AppData.kpi.annualSavings.value.toLocaleString()} L`);
      y += 4;
      addLine();
    }

    if (type === 'Filtration Statistics' || type === 'Complete Report') {
      addSubtitle('Filtration Statistics');
      y += 2;
      addKV('Filtration Efficiency:', `${AppData.kpi.filtrationEfficiency.value}%`);
      addKV('Turbidity Reduction:', `${AppData.waterQuality.turbidityReduction.value}%`);
      addKV('Water Recovery Rate:', `${AppData.waterQuality.waterRecoveryRate.value}%`);
      addKV('Odor Reduction:', `${AppData.waterQuality.odorReduction.value}%`);
      addKV('Water Clarity Index:', `${AppData.waterQuality.waterClarityIndex.value}%`);
      y += 4;
      addLine();
    }

    if (type === 'Sustainability Metrics' || type === 'Complete Report') {
      addSubtitle('Sustainability Metrics');
      y += 2;
      addKV('Freshwater Reduction:', `${AppData.sustainability.freshwaterReduction.value}%`);
      addKV('Annual Water Conserved:', `${AppData.sustainability.annualWaterConserved.value.toLocaleString()} L`);
      addKV('Groundwater Saved:', `${AppData.sustainability.groundwaterSaved.value.toLocaleString()} L`);
      addKV('Environmental Score:', `${AppData.sustainability.envBenefitScore.value}/100`);
      addKV('Sustainability Rating:', AppData.sustainability.sustainabilityRating.value);
      addKV('Household Impact:', AppData.sustainability.householdImpact.value);
      y += 4;
      addLine();
    }

    if (type === 'Cost Analysis' || type === 'Complete Report') {
      addSubtitle('Cost Analysis');
      y += 2;
      AppData.costAnalysis.components.forEach(comp => {
        addKV(`${comp.name}:`, `$${comp.cost}`);
      });
      y += 2;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(14, 165, 233);
      doc.text(`Total System Cost: $${AppData.costAnalysis.totalCost}`, margin, y);
      y += 10;
      addLine();
    }

    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('© 2026 Greywater Recycling Intelligence Platform — Sustainable Water Management', margin, 285);

    // Bottom bar
    doc.setFillColor(20, 184, 166);
    doc.rect(0, 290, pageWidth, 8, 'F');

    doc.save(`GRIP_${type.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`);
    App.showToast('PDF report downloaded successfully!', 'success');
  },

  // --- Generate CSV Export ---
  generateCSV(type) {
    let csvContent = '';
    const addRow = (...cols) => {
      csvContent += cols.map(c => `"${c}"`).join(',') + '\n';
    };

    addRow('Greywater Recycling Intelligence Platform');
    addRow('Report Type', type);
    addRow('Generated', new Date().toLocaleDateString());
    addRow('');

    if (type === 'Water Savings' || type === 'All Data') {
      addRow('--- Water Savings Summary ---');
      addRow('Metric', 'Value', 'Unit');
      addRow('Daily Water Consumption', AppData.kpi.dailyConsumption.value, 'L');
      addRow('Greywater Generated', AppData.kpi.greywaterGenerated.value, 'L');
      addRow('Recovered Water', AppData.kpi.recoveredWater.value, 'L');
      addRow('Water Saved Today', AppData.kpi.waterSavedToday.value, 'L');
      addRow('Monthly Water Savings', AppData.kpi.monthlySavings.value, 'L');
      addRow('Annual Water Savings', AppData.kpi.annualSavings.value, 'L');
      addRow('');
    }

    if (type === 'Analytics' || type === 'All Data') {
      addRow('--- Daily Water Savings ---');
      addRow('Day', 'Liters Saved');
      AppData.analytics.dailySavings.labels.forEach((label, i) => {
        addRow(label, AppData.analytics.dailySavings.data[i]);
      });
      addRow('');

      addRow('--- Monthly Water Savings ---');
      addRow('Month', 'Liters Saved');
      AppData.analytics.monthlySavings.labels.forEach((label, i) => {
        addRow(label, AppData.analytics.monthlySavings.data[i]);
      });
      addRow('');
    }

    if (type === 'Cost' || type === 'All Data') {
      addRow('--- Cost Analysis ---');
      addRow('Component', 'Cost ($)');
      AppData.costAnalysis.components.forEach(comp => {
        addRow(comp.name, comp.cost);
      });
      addRow('Total', AppData.costAnalysis.totalCost);
      addRow('');
    }

    if (type === 'All Data') {
      addRow('--- Sustainability Metrics ---');
      addRow('Metric', 'Value');
      addRow('Freshwater Reduction', `${AppData.sustainability.freshwaterReduction.value}%`);
      addRow('Annual Water Conserved', `${AppData.sustainability.annualWaterConserved.value} L`);
      addRow('Groundwater Saved', `${AppData.sustainability.groundwaterSaved.value} L`);
      addRow('Environmental Score', `${AppData.sustainability.envBenefitScore.value}/100`);
      addRow('Sustainability Rating', AppData.sustainability.sustainabilityRating.value);
      addRow('');
    }

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `GRIP_${type.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    App.showToast('CSV data exported successfully!', 'success');
  }
};
