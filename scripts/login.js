document.getElementById('loginForm').addEventListener('submit', function(event) {
event.preventDefault();
const user = document.getElementById('username').value;
const pass = document.getElementById('password').value;
if (user === 'Caldr' && pass === 'Cladr 2025.') {
localStorage.setItem('authenticated', 'true');
window.location.href = 'index.html';
} else {
alert('Invalid credentials');
}
});