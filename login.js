document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "Caldr" && password === "Cladr 2025.") {
      window.location.href = "menu.html";
    } else {
      loginMessage.textContent = "Invalid username or password.";
      loginMessage.style.color = "red";
    }
  });
});