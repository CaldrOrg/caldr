document.getElementById('pipeSizerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const flowRate = parseFloat(document.getElementById('flowRate').value);
  const material = document.getElementById('pipeMaterial').value;

  // Friction loss values per 100ft based on material and approximate industry tables (example data)
  const pipeData = {
    'Copper':   [ {size: '3/4"', maxGPM: 10}, {size: '1"', maxGPM: 20}, {size: '1 1/4"', maxGPM: 30}, {size: '1 1/2"', maxGPM: 50}, {size: '2"', maxGPM: 75}, {size: '2 1/2"', maxGPM: 110}, {size: '3"', maxGPM: 160}, {size: '4"', maxGPM: 200} ],
    'PVC':      [ {size: '3/4"', maxGPM: 8}, {size: '1"', maxGPM: 18}, {size: '1 1/4"', maxGPM: 28}, {size: '1 1/2"', maxGPM: 45}, {size: '2"', maxGPM: 70}, {size: '2 1/2"', maxGPM: 105}, {size: '3"', maxGPM: 150}, {size: '4"', maxGPM: 190} ],
    'Steel':    [ {size: '3/4"', maxGPM: 9}, {size: '1"', maxGPM: 19}, {size: '1 1/4"', maxGPM: 29}, {size: '1 1/2"', maxGPM: 48}, {size: '2"', maxGPM: 72}, {size: '2 1/2"', maxGPM: 108}, {size: '3"', maxGPM: 155}, {size: '4"', maxGPM: 195} ]
  };

  let selectedMaterialData = pipeData[material] || [];
  let recommendedSize = 'Contact Engineer – No Match Found';

  for (let i = 0; i < selectedMaterialData.length; i++) {
    if (flowRate <= selectedMaterialData[i].maxGPM) {
      recommendedSize = selectedMaterialData[i].size;
      break;
    }
  }

  // Show calculation breakdown
  const formula = `Match GPM ≤ max capacity per pipe size from table`;
  const explanation = selectedMaterialData.map(d => `${d.size} → ${d.maxGPM} GPM`).join('<br>');
  const used = selectedMaterialData.find(d => flowRate <= d.maxGPM);

  document.getElementById('result').style.display = 'block';
  document.getElementById('result').innerHTML = `
    <p><strong>Flow Rate:</strong> ${flowRate} GPM</p>
    <p><strong>Material:</strong> ${material}</p>
    <p><strong>Recommended Pipe Size:</strong> ${recommendedSize}</p>
    <hr>
    <p><strong>Formula:</strong> ${formula}</p>
    <p><strong>Pipe Size Table:</strong><br>${explanation}</p>
    ${used ? `<p><strong>Selected:</strong> ${flowRate} GPM ≤ ${used.maxGPM} GPM → ${used.size}</p>` : ''}
  `;
});
