document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (username === "admin" && password === "admin") {
        // Redirecționează către pagina de produse
        window.location.href = "index.html";
      } else {
        alert("Credențiale invalide. Te rugăm să încerci din nou.");
      }
    });
  });
  