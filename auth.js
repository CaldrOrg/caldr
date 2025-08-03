document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username === "Caldr" && password === "Cladr 2025.") {
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "menu.html";
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  } else {
    // Page is protected, check auth
    if (!localStorage.getItem("isAuthenticated")) {
      window.location.href = "login.html";
    }
  }
});
