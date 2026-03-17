// js/login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      try {
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        const data = await api.login(email, password);
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "student") {
          window.location.href = "student-dashboard.html";
        } else {
          window.location.href = "teacher-dashboard.html";
        }
      } catch (error) {
        alert(error.message || "Login failed");
      }
    });
  }
});
