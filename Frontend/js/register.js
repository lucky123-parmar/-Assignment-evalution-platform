// js/register.js
const roleDropdown = document.getElementById("role");
const universityIdLabel = document.getElementById("universityIdLabel");

roleDropdown.addEventListener("change", () => {
  if (roleDropdown.value === "teacher") {
    universityIdLabel.textContent = "University Employee ID";
  } else {
    universityIdLabel.textContent = "University Roll Number";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const formData = {
          name: registerForm.name.value,
          username: registerForm.username.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          universityRollNo: registerForm.universityRollNo.value,
          role: registerForm.role.value,
        };

        await api.register(formData);
        
        alert("Registration successful! Please log in.");
        window.location.href = "login.html";
      } catch (error) {
        alert(error.message || "Registration failed");
      }
    });
  }
});
