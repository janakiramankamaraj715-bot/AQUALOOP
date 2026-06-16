// ===================================================
// Greywater Recycling Intelligence Platform
// Calculator Module
// ===================================================

const Calculator = {
  elements: {},

  init() {
    this.elements = {
      familyMembers: document.getElementById('calcFamilyMembers'),
      dailyConsumption: document.getElementById('calcDailyConsumption'),
      greywaterGenerated: document.getElementById('calcGreywaterGenerated'),
      recoveredWater: document.getElementById('calcRecoveredWater'),
      monthlySavings: document.getElementById('calcMonthlySavings'),
      annualSavings: document.getElementById('calcAnnualSavings'),
      groundwaterConserved: document.getElementById('calcGroundwaterConserved')
    };

    if (this.elements.familyMembers && this.elements.dailyConsumption) {
      this.elements.familyMembers.addEventListener('input', () => this.calculate());
      this.elements.dailyConsumption.addEventListener('input', () => this.calculate());

      // Set defaults
      this.elements.familyMembers.value = AppData.calculator.familyMembers;
      this.elements.dailyConsumption.value = AppData.calculator.dailyConsumption;
      this.calculate();
    }
  },

  calculate() {
    const members = parseInt(this.elements.familyMembers.value) || 0;
    const dailyConsumption = parseFloat(this.elements.dailyConsumption.value) || 0;

    const greywaterPercent = AppData.calculator.greywaterPercent;
    const recoveryPercent = AppData.calculator.recoveryPercent;

    const greywaterGenerated = dailyConsumption * greywaterPercent;
    const recoveredWater = greywaterGenerated * recoveryPercent;
    const monthlySavings = recoveredWater * 30;
    const annualSavings = recoveredWater * 365;
    const groundwaterConserved = annualSavings * 0.5; // 50% estimated ground water impact

    // Animate the result values
    this.animateValue(this.elements.greywaterGenerated, greywaterGenerated, 'L');
    this.animateValue(this.elements.recoveredWater, recoveredWater, 'L');
    this.animateValue(this.elements.monthlySavings, monthlySavings, 'L');
    this.animateValue(this.elements.annualSavings, annualSavings, 'L');
    this.animateValue(this.elements.groundwaterConserved, groundwaterConserved, 'L');
  },

  animateValue(element, targetValue, unit) {
    if (!element) return;
    
    const formattedValue = targetValue >= 1000
      ? targetValue.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : targetValue.toFixed(1);

    element.textContent = formattedValue;
    
    // Add a brief flash animation
    element.style.transform = 'scale(1.05)';
    element.style.transition = 'transform 0.2s ease';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 200);
  }
};
