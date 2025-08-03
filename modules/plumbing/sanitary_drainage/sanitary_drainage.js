// JS logic for Sanitary Drainage module

function calculatePipeSize() {
  document.getElementById("resultBox").style.display = "block";
  const dfu = parseInt(document.getElementById("dfu").value, 10);
  const code = document.getElementById("codeSelect").value;
  const branchType = document.getElementById("branchType").value;
  const pipeSizeOutput = document.getElementById("pipeResult");
  const summaryOutput = document.getElementById("sanitary-result");
  const referenceText = document.getElementById("referenceText");

  if (isNaN(dfu) || dfu < 0) {
    pipeSizeOutput.textContent = "Enter a valid DFU.";
    referenceText.textContent = "";
    return;
  }

  const ipcHorizontal = [
    { size: "1.25\"", maxDFU: 1 },
    { size: "1.5\"", maxDFU: 3 },
    { size: "2\"", maxDFU: 6 },
    { size: "2.5\"", maxDFU: 12 },
    { size: "3\"", maxDFU: 20 },
    { size: "4\"", maxDFU: 160 },
    { size: "5\"", maxDFU: 360 },
    { size: "6\"", maxDFU: 620 },
    { size: "8\"", maxDFU: 1400 }
  ];

  const ipcStack = [
    { size: "2\"", maxDFU: 6 },
    { size: "3\"", maxDFU: 48 },
    { size: "4\"", maxDFU: 240 },
    { size: "5\"", maxDFU: 540 },
    { size: "6\"", maxDFU: 960 },
    { size: "8\"", maxDFU: 2200 }
  ];

  const upcHorizontal = [
    { size: "1.5\"", maxDFU: 1 },
    { size: "2\"", maxDFU: 8 },
    { size: "3\"", maxDFU: 35 },
    { size: "4\"", maxDFU: 216 },
    { size: "5\"", maxDFU: 360 },
    { size: "6\"", maxDFU: 620 },
    { size: "8\"", maxDFU: 1400 }
  ];

  const upcStack = [
    { size: "2\"", maxDFU: 6 },
    { size: "3\"", maxDFU: 48 },
    { size: "4\"", maxDFU: 240 },
    { size: "5\"", maxDFU: 540 },
    { size: "6\"", maxDFU: 960 },
    { size: "8\"", maxDFU: 2200 }
  ];

  let selectedChart;

  if (code === "IPC" && branchType === "horizontal") selectedChart = ipcHorizontal;
  else if (code === "IPC") selectedChart = ipcStack;
  else if (code === "UPC" && branchType === "horizontal") selectedChart = upcHorizontal;
  else selectedChart = upcStack;

  const size = selectedChart.find(entry => dfu <= entry.maxDFU);
  if (size) {
    console.log("DFU:", dfu, "Selected Size:", size.size);
    const outputHTML = `
      <strong>Recommended Pipe Size:</strong> ${size.size}<br>
      <strong>Input DFU:</strong> ${dfu}<br>
      <button onclick="showFormula()" style="margin-top: 8px;">Show Formula</button>
    `;
    pipeSizeOutput.innerHTML = outputHTML;
    document.getElementById("resultBox").style.display = "block";
    if (summaryOutput) summaryOutput.innerHTML = outputHTML;
  } else {
    console.warn("DFU exceeds maximum range. DFU:", dfu);
    const errorHTML = `<span style="color:red;"><strong>DFU exceeds available sizing chart.</strong></span>`;
    pipeSizeOutput.innerHTML = errorHTML;
    document.getElementById("resultBox").style.display = "block";
    if (summaryOutput) summaryOutput.innerHTML = errorHTML;
  }
  referenceText.textContent = code === "IPC"
    ? `Per ${branchType === "horizontal" ? "IPC Table 710.1(1)" : "IPC Table 710.1(2)"}`
    : `Per ${branchType === "horizontal" ? "UPC Table 703.2" : "UPC Table 703.2"} (Stack)`;
}

function showFormula() {
  alert("Pipe Size is selected based on the DFU value against the selected code (IPC/UPC) and branch type chart.");
}

document.addEventListener("DOMContentLoaded", () => {
  const dfuInput = document.getElementById("dfu");
  const codeSelect = document.getElementById("codeSelect");
  const branchType = document.getElementById("branchType");
  const calculateBtn = document.getElementById("calculateBtn");

  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculatePipeSize);
  }

  if (dfuInput && codeSelect && branchType) {
    dfuInput.addEventListener("input", calculatePipeSize);
    codeSelect.addEventListener("change", calculatePipeSize);
    branchType.addEventListener("change", calculatePipeSize);
  }

  // Clear result box on load
  const pipeSizeOutput = document.getElementById("pipeResult");
  if (pipeSizeOutput) pipeSizeOutput.innerHTML = "";
});
