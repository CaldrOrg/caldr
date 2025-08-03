// JavaScript for Fixture Count Module
document.addEventListener('DOMContentLoaded', () => {
  console.log('[CALDR] DOM Content Loaded');

  function waitForElement(selector, callback, retries = 20) {
    const el = document.querySelector(selector);
    if (el) return callback(el);
    if (retries === 0) return console.warn('Element not found:', selector);
    setTimeout(() => waitForElement(selector, callback, retries - 1), 250);
  }

  waitForElement('.fixture-row', () => {
    console.log('[CALDR] .fixture-row found');

    const hvacDemandInput = document.getElementById('hvac-demand');
    const irrigationDemandInput = document.getElementById('irrigation-demand');
    const otherDemandsInput = document.getElementById('other-demands');

    const wsfuTotalEl = document.getElementById('wsfu-total');
    const dfuTotalEl = document.getElementById('dfu-total');
    const hwfuTotalEl = document.getElementById('hwfu-total');

    const wsfuToGpmEl = document.getElementById('wsfu-to-gpm');
    const dfuToGpmEl = document.getElementById('dfu-to-gpm');
    const hwfuToGpmEl = document.getElementById('hwfu-to-gpm');

    const wsfuFormulaEl = document.getElementById('wsfu-formula');
    const hwfuFormulaEl = document.getElementById('hwfu-formula');
    const dfuFormulaEl = document.getElementById('dfu-formula');

    const WSFU_TO_GPM_FACTOR = 0.1;
    const DFU_TO_GPM_FACTOR = 0.05;
    const HWSFU_TO_GPM_FACTOR = 0.08;

    function getFixtureRows() {
      return document.querySelectorAll('.fixture-row');
    }

    function parseNumber(value) {
      const n = parseFloat((value || '').toString().trim());
      return isNaN(n) ? 0 : n;
    }

    function calculateTotals() {
      let wsfuTotal = 0;
      let hwfuTotalFromFixtures = 0;
      let dfuTotal = 0;

      getFixtureRows().forEach(row => {
        const qtyInput = row.querySelector('.fixture-qty');
        const sfuInput = row.querySelector('.fixture-sfu');
        const dfuInput = row.querySelector('.fixture-dfu');
        const labelEl = row.querySelector('.fixture-label');

        console.group('[CALDR DOM TRACE]');
        console.log('Raw row:', row);
        console.log('Label:', labelEl?.textContent || 'N/A');
        console.log('Qty:', qtyInput?.value || 'Missing');
        console.log('SFU:', sfuInput?.value || 'Missing');
        console.log('DFU:', dfuInput?.value || 'Missing');
        console.groupEnd();

        if (!qtyInput || !sfuInput || !dfuInput) {
          console.warn('[CALDR QAQC] Skipping fixture row due to missing input:', row);
          return;
        }

        const qty = parseNumber(qtyInput.value);
        const sfu = parseNumber(sfuInput.value);
        const dfu = parseNumber(dfuInput.value);
        // Validate numeric input for fixture row
        if (isNaN(qty) || isNaN(sfu) || isNaN(dfu)) {
          console.warn('[CALDR QAQC] Invalid numeric input:', { qty, sfu, dfu, row });
          return;
        }
        const rowLabel = labelEl && typeof labelEl.textContent === 'string'
          ? labelEl.textContent.toLowerCase().trim()
          : '';
        console.log(`[CALDR QAQC LABEL] Evaluating rowLabel: "${rowLabel}"`);
        // Improved cold-water-only matching: case-insensitive, includes abbreviations and word boundaries
        const isColdWaterOnly = /\b(water\s*closet|urinal|flush\s*valve|tank\s*(wc|water\s*closet)|\bur\b|\bwc\b|\burinal\b)\b/i.test(rowLabel);
        console.log(`[CALDR DEBUG] Qty: ${qty}, SFU: ${sfu}, DFU: ${dfu}, Label: "${rowLabel}" — CW Only: ${isColdWaterOnly}`);

        wsfuTotal += qty * sfu;
        if (!isColdWaterOnly) {
          hwfuTotalFromFixtures += qty * sfu;
        }

        dfuTotal += qty * dfu;
      });

      const hvac = parseNumber(hvacDemandInput?.value);
      const irrigation = parseNumber(irrigationDemandInput?.value);
      const other = parseNumber(otherDemandsInput?.value);

      const hwfuTotal = hwfuTotalFromFixtures + hvac + irrigation + other;

      if (wsfuTotalEl) wsfuTotalEl.textContent = wsfuTotal.toFixed(2);
      if (dfuTotalEl) dfuTotalEl.textContent = dfuTotal.toFixed(2);
      if (hwfuTotalEl) hwfuTotalEl.textContent = hwfuTotal.toFixed(2);

      if (wsfuToGpmEl) wsfuToGpmEl.textContent = (wsfuTotal * WSFU_TO_GPM_FACTOR).toFixed(2);
      if (dfuToGpmEl) dfuToGpmEl.textContent = (dfuTotal * DFU_TO_GPM_FACTOR).toFixed(2);
      if (hwfuToGpmEl) hwfuToGpmEl.textContent = (hwfuTotal * HWSFU_TO_GPM_FACTOR).toFixed(2);

      if (wsfuFormulaEl) wsfuFormulaEl.textContent = `Sum of (Qty × SFU) = ${wsfuTotal.toFixed(2)}`;
      if (dfuFormulaEl) dfuFormulaEl.textContent = `Sum of (Qty × DFU) = ${dfuTotal.toFixed(2)}`;
      if (hwfuFormulaEl) hwfuFormulaEl.textContent = `WSFU + HVAC + Irrigation + Other = ${hwfuTotal.toFixed(2)}`;

      console.log('[CALDR] Totals updated');
    }

    window.calculateTotals = calculateTotals;

    function attachListeners() {
      let timeoutId;
      const debounceCalculate = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          calculateTotals();
        }, 150);
      };

      document.addEventListener('input', function (e) {
        if (e.target.matches('.fixture-qty, .fixture-sfu, .fixture-dfu, #hvac-demand, #irrigation-demand, #other-demands')) {
          debounceCalculate();
        }
      });

      document.querySelectorAll('.formula-button').forEach(button => {
        button.addEventListener('click', e => {
          e.preventDefault();
          console.log('[CALDR] Formula button clicked');
          calculateTotals();
        });
      });
    }

    attachListeners();
    calculateTotals();
  });
});