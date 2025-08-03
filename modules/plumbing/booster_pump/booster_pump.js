
// JS logic for Booster Pump module

document.addEventListener('DOMContentLoaded', function () {
  // Grabbing DOM elements
  const numFloorsInput = document.getElementById('numFloors');
  const levelsContainer = document.getElementById('levelsContainer');
  const horizontalRunInput = document.getElementById('horizontalRun');
  const verticalRiseInput = document.getElementById('verticalRise');
  const totalLengthOutput = document.getElementById('totalLength');
  const calcButton = document.getElementById('calculatePump');
  const resultsOutput = document.getElementById('results');

  // Dynamically generate level/floor height inputs based on number of floors
  if (numFloorsInput && levelsContainer) {
    numFloorsInput.addEventListener('input', function () {
      levelsContainer.innerHTML = '';
      const numFloors = parseInt(this.value);
      if (!isNaN(numFloors) && numFloors > 0) {
        for (let i = 1; i <= numFloors; i++) {
          const row = document.createElement('div');
          row.classList.add('level-row');
          row.innerHTML = `
            <input type="text" placeholder="Level ${i}" class="level-name" />
            <input type="number" placeholder="Floor Height (ft)" class="floor-height" />
          `;
          levelsContainer.appendChild(row);
        }
      }
    });
  }

  // Calculate total developed length (horizontal + vertical)
  function calculateDevelopedLength() {
    const horizontal = parseFloat(horizontalRunInput && horizontalRunInput.value) || 0;
    const vertical = parseFloat(verticalRiseInput && verticalRiseInput.value) || 0;
    const total = horizontal + vertical;
    if (totalLengthOutput) {
      totalLengthOutput.textContent = `${total} ft`;
    }
    return total;
  }

  // Listen for changes on horizontal/vertical run to update developed length
  if (horizontalRunInput && verticalRiseInput) {
    horizontalRunInput.addEventListener('input', calculateDevelopedLength);
    verticalRiseInput.addEventListener('input', calculateDevelopedLength);
  }

  // Booster pump sizing calculation logic
  function calculateBoosterPumpRequirements() {
    const floorHeights = Array.from(document.querySelectorAll('.floor-height'))
      .map(input => parseFloat(input.value) || 0);
    const totalElevation = floorHeights.reduce((acc, val) => acc + val, 0);
    const developedLength = calculateDevelopedLength();

    const incomingPressure = parseFloat(document.getElementById('incomingPressure')?.value) || 0; // psi
    const desiredPressure = parseFloat(document.getElementById('desiredPressure')?.value) || 0; // psi
    const frictionLossPer100ft = parseFloat(document.getElementById('frictionLoss')?.value) || 0; // psi per 100ft
    const flowRate = parseFloat(document.getElementById('flowRate')?.value) || 0; // GPM

    const frictionLoss = (developedLength / 100) * frictionLossPer100ft; // psi
    const elevationHead = totalElevation * 0.433; // 0.433 psi/ft
    const requiredBoostPressure = desiredPressure + frictionLoss + elevationHead - incomingPressure;

    const totalDynamicHead = requiredBoostPressure * 2.31; // convert psi to feet

    if (resultsOutput) {
      resultsOutput.innerHTML = `
        <strong>Total Building Elevation:</strong> ${totalElevation.toFixed(2)} ft<br>
        <strong>Total Developed Length:</strong> ${developedLength.toFixed(2)} ft<br>
        <strong>Elevation Head:</strong> ${elevationHead.toFixed(2)} psi<br>
        <strong>Friction Loss:</strong> ${frictionLoss.toFixed(2)} psi<br>
        <strong>Required Boost Pressure:</strong> ${requiredBoostPressure.toFixed(2)} psi<br>
        <strong>Total Dynamic Head:</strong> ${totalDynamicHead.toFixed(2)} ft<br><br>
        <div style="border-top: 1px solid #ccc; padding-top: 10px; margin-top: 10px;">
          <strong>Formula Breakdown:</strong><br>
          Elevation Head = Total Elevation × 0.433 = ${totalElevation.toFixed(2)} × 0.433 = ${elevationHead.toFixed(2)} psi<br>
          Friction Loss = (Total Length ÷ 100) × Friction Loss/100ft = (${developedLength.toFixed(2)} ÷ 100) × ${frictionLossPer100ft.toFixed(2)} = ${frictionLoss.toFixed(2)} psi<br>
          Required Boost Pressure = Desired Pressure + Elevation Head + Friction Loss - Incoming Pressure = ${desiredPressure.toFixed(2)} + ${elevationHead.toFixed(2)} + ${frictionLoss.toFixed(2)} - ${incomingPressure.toFixed(2)} = ${requiredBoostPressure.toFixed(2)} psi<br>
          Total Dynamic Head = Required Boost Pressure × 2.31 = ${requiredBoostPressure.toFixed(2)} × 2.31 = ${totalDynamicHead.toFixed(2)} ft
        </div>
      `;
    }
  }

  // Wire up calculate button
  if (calcButton) {
    calcButton.addEventListener('click', calculateBoosterPumpRequirements);
  }
});
