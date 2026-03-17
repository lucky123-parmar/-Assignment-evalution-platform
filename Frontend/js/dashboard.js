// Dashboard Service
class DashboardService {
  constructor() {
    this.checkAuthentication();
  }

  // Check if user is authenticated
  checkAuthentication() {
    if (!api.isAuthenticated()) {
      window.location.href = 'login.html';
      return;
    }
    
    const user = api.getCurrentUserData();
    if (!user) {
      api.logout();
      return;
    }
  }

  // Load user data
  async loadUserData() {
    try {
      const user = await api.getCurrentUser();
      return user;
    } catch (error) {
      console.error('Error loading user data:', error);
      api.logout();
      return null;
    }
  }

  // Display user info in dashboard
  displayUserInfo(user) {
    const userInfoElements = document.querySelectorAll('.user-info');
    userInfoElements.forEach(element => {
      element.textContent = user.name || user.username;
    });

    const userRoleElements = document.querySelectorAll('.user-role');
    userRoleElements.forEach(element => {
      element.textContent = user.role;
    });
  }

  // Setup logout functionality
  setupLogout() {
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        api.logout();
      });
    });
  }

  // Show loading state
  showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '<div class="loading">Loading...</div>';
    }
  }

  // Hide loading state
  hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
  }

  // Show error message
  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  // Show success message
  showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  // Format status
  formatStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  // Get status color
  getStatusColor(status) {
    const statusColors = {
      'pending': '#ffa500',
      'submitted': '#007bff',
      'evaluated': '#28a745',
      'rejected': '#dc3545'
    };
    return statusColors[status] || '#6c757d';
  }
}

// Create global dashboard instance
const dashboard = new DashboardService(); 