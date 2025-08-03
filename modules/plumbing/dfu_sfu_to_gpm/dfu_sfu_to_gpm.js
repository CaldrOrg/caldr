// JS logic for DFU/SFU to GPM module

document.addEventListener('DOMContentLoaded', () => {
  const dfuInput = document.getElementById('dfuInput');
  const sfuInput = document.getElementById('sfuInput');
  const hwfuInput = document.getElementById('hwfuInput');
  const gpmOutput = document.getElementById('gpmOutput');

  function calculateGPM(dfu, sfu, hwfu) {
    const dfuToGpm = dfu * 0.5;
    const sfuToGpm = sfu * 1.0;
    const hwfuToGpm = hwfu * 0.75;
    return dfuToGpm + sfuToGpm + hwfuToGpm;
  }

  function updateGPM() {
    const dfu = parseFloat(dfuInput.value) || 0;
    const sfu = parseFloat(sfuInput.value) || 0;
    const hwfu = parseFloat(hwfuInput.value) || 0;

    const totalGpm = calculateGPM(dfu, sfu, hwfu);
    gpmOutput.textContent = totalGpm.toFixed(2) + ' GPM';
  }

  [dfuInput, sfuInput, hwfuInput].forEach(input => {
    input.addEventListener('input', updateGPM);
  });
});
