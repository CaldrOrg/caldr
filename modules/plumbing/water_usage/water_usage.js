document.addEventListener("DOMContentLoaded", () => {
  const inputGroups = document.querySelectorAll(".water-usage-group");
  const resultEl = document.getElementById("calculationResult");
  const formulaBox = document.getElementById("formulaBox");
  const toggleFormulaBtn = document.getElementById("toggleFormulaBtn");
  const calculateButton = document.getElementById("calculateButton");

  function calculateTotalUsage() {
    let total = 0;
    let formulaText = "";

    inputGroups.forEach(group => {
      const fixtureName = group.getAttribute("data-label") || "Group";

      const gpm = Number(group.querySelector(".gpm")?.value) || 0;
      const minutes = Number(group.querySelector(".minutes")?.value) || 0;
      const days = Number(group.querySelector(".days")?.value) || 0;
      const occurrences = Number(group.querySelector(".occurrences")?.value) || 0;
      const duration = Number(group.querySelector(".duration")?.value) || 0;

      const result = gpm * minutes * days * occurrences * duration;
      total += result;

      if (gpm || minutes || days || occurrences || duration) {
        formulaText += `
          <div style="margin-bottom: 8px;">
            <strong>${fixtureName}</strong>: 
            ${gpm} × ${minutes} × ${days} × ${occurrences} × ${duration} = 
            <strong>${result.toLocaleString()} gal/day</strong>
          </div>
        `;
      }
    });

    if (resultEl) {
      resultEl.textContent = `${total.toLocaleString()} gallons/day`;
    }

    if (formulaBox) {
      if (formulaText.trim()) {
        formulaBox.innerHTML = `
          <strong>Formula Used:</strong><br />
          <div style="margin-top: 8px;">${formulaText}</div>
        `;
      } else {
        formulaBox.innerHTML = `<em>No data entered yet.</em>`;
      }
    }
  }

  if (inputGroups.length > 0) {
    inputGroups.forEach(group => {
      const inputs = group.querySelectorAll("input");
      inputs.forEach(input => {
        input.addEventListener("input", calculateTotalUsage);
      });
    });
  }

  if (calculateButton) {
    calculateButton.addEventListener("click", calculateTotalUsage);
  }

  if (toggleFormulaBtn) {
    toggleFormulaBtn.addEventListener("click", () => {
      const isVisible = window.getComputedStyle(formulaBox).display !== "none";
      if (!isVisible) {
        calculateTotalUsage(); // ensure formula is refreshed
        formulaBox.style.display = "block";
      } else {
        formulaBox.style.display = "none";
      }
    });
  }

  calculateTotalUsage();
});