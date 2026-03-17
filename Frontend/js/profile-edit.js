// Profile Edit JavaScript
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load user data
    const user = await dashboard.loadUserData();
    if (!user) {
      dashboard.showError('Failed to load user data');
      return;
    }

    // Display user info
    dashboard.displayUserInfo(user);
    
    // Setup logout
    dashboard.setupLogout();

    // Populate form with current user data
    populateForm(user);

    // Setup form submission
    setupFormSubmission();

  } catch (error) {
    console.error('Profile edit initialization error:', error);
    dashboard.showError('Failed to initialize profile edit');
  }
});

// Populate form with user data
function populateForm(user) {
  const fullnameInput = document.getElementById('fullname');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const rollInput = document.getElementById('roll');

  if (fullnameInput) fullnameInput.value = user.name || '';
  if (usernameInput) usernameInput.value = user.username || '';
  if (emailInput) emailInput.value = user.email || '';
  if (rollInput) rollInput.value = user.universityRollNo || '';
}

// Setup form submission
function setupFormSubmission() {
  const form = document.querySelector('.form-card');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      try {
        const formData = {
          name: document.getElementById('fullname').value,
          username: document.getElementById('username').value,
          email: document.getElementById('email').value,
          universityRollNo: document.getElementById('roll').value
        };

        await studentDashboard.updateProfile(formData);
        
        // Redirect back to profile page
        window.location.href = 'student-profile.html';
        
      } catch (error) {
        dashboard.showError(error.message || 'Failed to update profile');
      }
    });
  }
} 