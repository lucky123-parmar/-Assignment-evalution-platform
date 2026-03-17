// Teacher Dashboard JavaScript
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load user data
    const user = await dashboard.loadUserData();
    if (!user) {
      dashboard.showError('Failed to load user data');
      return;
    }

    // Check if user is a teacher
    if (user.role !== 'teacher') {
      dashboard.showError('Access denied. Teacher access required.');
      api.logout();
      return;
    }

    // Display user info
    dashboard.displayUserInfo(user);
    
    // Update welcome message
    const welcomeElement = document.querySelector('.welcome');
    if (welcomeElement) {
      welcomeElement.textContent = `Welcome, ${user.name || user.username}!`;
    }

    // Setup logout
    dashboard.setupLogout();

    // Load dashboard data
    await loadDashboardData();

  } catch (error) {
    console.error('Dashboard initialization error:', error);
    dashboard.showError('Failed to initialize dashboard');
  }
});

// Load dashboard statistics
async function loadDashboardData() {
  try {
    // Load assignments created by teacher
    const assignments = await api.getAssignments();
    
    // Load all submissions
    const submissions = await api.getSubmissions();
    
    // Load evaluations
    const evaluations = await api.getEvaluations();
    
    // Update dashboard cards
    updateDashboardCards(assignments, submissions, evaluations);
    
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    dashboard.showError('Failed to load dashboard data');
  }
}

// Update dashboard cards with real data
function updateDashboardCards(assignments, submissions, evaluations) {
  // Calculate statistics
  const totalAssignments = assignments.length;
  
  const totalSubmissions = submissions.length;
  
  const pendingEvaluations = submissions.filter(sub => 
    !evaluations.some(eval => eval.submissionId === sub._id)
  ).length;
  
  const completedEvaluations = evaluations.length;
  const averageScore = evaluations.length > 0 
    ? (evaluations.reduce((sum, eval) => sum + (eval.score || 0), 0) / evaluations.length).toFixed(1)
    : 0;

  // Update cards
  const cards = document.querySelectorAll('.card');
  
  if (cards[0]) {
    cards[0].innerHTML = `
      <h4>Total Assignments</h4>
      <p>${totalAssignments} assignments created.</p>
    `;
  }
  
  if (cards[1]) {
    cards[1].innerHTML = `
      <h4>Total Submissions</h4>
      <p>${totalSubmissions} submissions received.</p>
    `;
  }
  
  if (cards[2]) {
    cards[2].innerHTML = `
      <h4>Pending Evaluations</h4>
      <p>${pendingEvaluations} submissions need evaluation.</p>
    `;
  }
  
  if (cards[3]) {
    cards[3].innerHTML = `
      <h4>Average Score</h4>
      <p>Class average: ${averageScore}%.</p>
    `;
  }
}

// Create new assignment
async function createAssignment(assignmentData) {
  try {
    const newAssignment = await api.createAssignment(assignmentData);
    dashboard.showSuccess('Assignment created successfully!');
    
    // Refresh dashboard data
    await loadDashboardData();
    
    return newAssignment;
  } catch (error) {
    dashboard.showError(error.message || 'Failed to create assignment');
    throw error;
  }
}

// Load recent assignments
async function loadRecentAssignments() {
  try {
    const assignments = await api.getAssignments();
    const recentAssignments = assignments.slice(0, 5);

    const assignmentsContainer = document.getElementById('recent-assignments');
    if (assignmentsContainer) {
      assignmentsContainer.innerHTML = recentAssignments.map(assignment => `
        <div class="assignment-item">
          <h5>${assignment.title}</h5>
          <p>${assignment.description}</p>
          <span class="due-date">Due: ${dashboard.formatDate(assignment.dueDate)}</span>
          <button onclick="editAssignment('${assignment._id}')" class="edit-btn">Edit</button>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading recent assignments:', error);
  }
}

// Load recent submissions
async function loadRecentSubmissions() {
  try {
    const submissions = await api.getSubmissions();
    const recentSubmissions = submissions.slice(0, 5);

    const submissionsContainer = document.getElementById('recent-submissions');
    if (submissionsContainer) {
      submissionsContainer.innerHTML = recentSubmissions.map(submission => `
        <div class="submission-item">
          <h5>${submission.assignmentTitle || 'Assignment'}</h5>
          <p>Submitted by: ${submission.studentName || 'Student'}</p>
          <p>Submitted: ${dashboard.formatDate(submission.submittedAt)}</p>
          <span class="status" style="color: ${dashboard.getStatusColor(submission.status)}">
            ${dashboard.formatStatus(submission.status)}
          </span>
          <button onclick="evaluateSubmission('${submission._id}')" class="evaluate-btn">Evaluate</button>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading recent submissions:', error);
  }
}

// Evaluate submission using AI
async function evaluateSubmission(submissionId) {
  try {
    dashboard.showLoading('evaluation-status');
    
    const evaluation = await api.evaluateSubmission(submissionId);
    
    dashboard.hideLoading('evaluation-status');
    dashboard.showSuccess('Submission evaluated successfully!');
    
    // Refresh dashboard data
    await loadDashboardData();
    
    return evaluation;
  } catch (error) {
    dashboard.hideLoading('evaluation-status');
    dashboard.showError(error.message || 'Failed to evaluate submission');
    throw error;
  }
}

// Generate feedback for submission
async function generateFeedback(submissionId) {
  try {
    const feedback = await api.generateFeedback(submissionId);
    return feedback;
  } catch (error) {
    dashboard.showError(error.message || 'Failed to generate feedback');
    throw error;
  }
}

// Update assignment
async function updateAssignment(assignmentId, assignmentData) {
  try {
    await api.updateAssignment(assignmentId, assignmentData);
    dashboard.showSuccess('Assignment updated successfully!');
    
    // Refresh dashboard data
    await loadDashboardData();
  } catch (error) {
    dashboard.showError(error.message || 'Failed to update assignment');
    throw error;
  }
}

// Delete assignment
async function deleteAssignment(assignmentId) {
  try {
    await api.deleteAssignment(assignmentId);
    dashboard.showSuccess('Assignment deleted successfully!');
    
    // Refresh dashboard data
    await loadDashboardData();
  } catch (error) {
    dashboard.showError(error.message || 'Failed to delete assignment');
    throw error;
  }
}

// Handle profile update
async function updateProfile(profileData) {
  try {
    const user = api.getCurrentUserData();
    await api.updateUser(user._id, profileData);
    dashboard.showSuccess('Profile updated successfully!');
    
    // Reload user data
    const updatedUser = await api.getCurrentUser();
    localStorage.setItem('user', JSON.stringify(updatedUser));
    dashboard.displayUserInfo(updatedUser);
    
  } catch (error) {
    dashboard.showError(error.message || 'Failed to update profile');
  }
}

// Export functions for use in other files
window.teacherDashboard = {
  loadDashboardData,
  loadRecentAssignments,
  loadRecentSubmissions,
  createAssignment,
  evaluateSubmission,
  generateFeedback,
  updateAssignment,
  deleteAssignment,
  updateProfile
}; 