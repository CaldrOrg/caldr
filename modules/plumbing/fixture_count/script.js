function addRow() {
  const table = document.getElementById('fixture-body');
  const row = table.insertRow();
  row.innerHTML = `
    <td><input type="text" placeholder="e.g., Lavatory" /></td>
    <td><input type="number" value="1" min="0" oninput="recalc()" /></td>
    <td><input type="number" value="1.0" min="0" step="0.1" oninput="recalc()" /></td>
    <td><input type="number" value="0.5" min="0" step="0.1" oninput="recalc()" /></td>
    <td><input type="number" value="1.0" min="0" step="0.1" oninput="recalc()" /></td>
    <td class="wsfu-total">1.5</td>
    <td><button onclick="removeRow(this)">🗑️</button></td>
  `;
  recalc();
}

function removeRow(btn) {
  const row = btn.closest('tr');
  row.remove();
  recalc();
}

function recalc() {
  let totalCW = 0, totalHW = 0, totalWSFU = 0, totalDFU = 0;
  document.querySelectorAll('#fixture-body tr').forEach(row => {
    const qty = parseFloat(row.cells[1].querySelector('input').value) || 0;
    const cw = parseFloat(row.cells[2].querySelector('input').value) || 0;
    const hw = parseFloat(row.cells[3].querySelector('input').value) || 0;
    const dfu = parseFloat(row.cells[4].querySelector('input').value) || 0;
    const wsfu = cw + hw;

    row.cells[5].textContent = (wsfu * qty).toFixed(1);
    totalCW += cw * qty;
    totalHW += hw * qty;
    totalWSFU += wsfu * qty;
    totalDFU += dfu * qty;
  });
  document.getElementById('total-cw').textContent = totalCW.toFixed(1);
  document.getElementById('total-hw').textContent = totalHW.toFixed(1);
  document.getElementById('total-wsfu').textContent = totalWSFU.toFixed(1);
  document.getElementById('total-dfu').textContent = totalDFU.toFixed(1);
}
