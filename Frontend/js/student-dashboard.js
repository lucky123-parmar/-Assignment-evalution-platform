// Student Dashboard JavaScript
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
    // Load assignments
    const assignments = await api.getAssignments();
    
    // Load submissions
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
  const pendingAssignments = assignments.filter(assignment => 
    new Date(assignment.dueDate) > new Date() && 
    !submissions.some(sub => sub.assignmentId === assignment._id)
  ).length;

  const totalSubmissions = submissions.length;
  
  const evaluatedSubmissions = evaluations.length;
  const averageScore = evaluations.length > 0 
    ? (evaluations.reduce((sum, eval) => sum + (eval.score || 0), 0) / evaluations.length).toFixed(1)
    : 0;

  const upcomingDeadlines = assignments
    .filter(assignment => new Date(assignment.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Update cards
  const cards = document.querySelectorAll('.card');
  
  if (cards[0]) {
    cards[0].innerHTML = `
      <h4>Assignments Pending</h4>
      <p>You have ${pendingAssignments} assignments due soon.</p>
    `;
  }
  
  if (cards[1]) {
    cards[1].innerHTML = `
      <h4>Submissions</h4>
      <p>${totalSubmissions} submissions uploaded so far.</p>
    `;
  }
  
  if (cards[2]) {
    cards[2].innerHTML = `
      <h4>Evaluation Scores</h4>
      <p>Your average score is ${averageScore}%.</p>
    `;
  }
  
  if (cards[3]) {
    const nextDeadline = upcomingDeadlines.length > 0 
      ? dashboard.formatDate(upcomingDeadlines[0].dueDate)
      : 'No upcoming deadlines';
    
    cards[3].innerHTML = `
      <h4>Upcoming Deadlines</h4>
      <p>Next deadline: ${nextDeadline}</p>
    `;
  }
}

// Load recent assignments
async function loadRecentAssignments() {
  try {
    const assignments = await api.getAssignments();
    const recentAssignments = assignments
      .filter(assignment => new Date(assignment.dueDate) > new Date())
      .slice(0, 5);

    const assignmentsContainer = document.getElementById('recent-assignments');
    if (assignmentsContainer) {
      assignmentsContainer.innerHTML = recentAssignments.map(assignment => `
        <div class="assignment-item">
          <h5>${assignment.title}</h5>
          <p>${assignment.description}</p>
          <span class="due-date">Due: ${dashboard.formatDate(assignment.dueDate)}</span>
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
          <p>Submitted: ${dashboard.formatDate(submission.submittedAt)}</p>
          <span class="status" style="color: ${dashboard.getStatusColor(submission.status)}">
            ${dashboard.formatStatus(submission.status)}
          </span>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading recent submissions:', error);
  }
}

// Handle assignment submission
async function submitAssignment(assignmentId, code, language) {
  try {
    const submissionData = {
      assignmentId,
      code,
      language,
      submittedAt: new Date().toISOString()
    };

    await api.createSubmission(submissionData);
    dashboard.showSuccess('Assignment submitted successfully!');
    
    // Refresh dashboard data
    await loadDashboardData();
    
  } catch (error) {
    dashboard.showError(error.message || 'Failed to submit assignment');
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
window.studentDashboard = {
  loadDashboardData,
  loadRecentAssignments,
  loadRecentSubmissions,
  submitAssignment,
  updateProfile
}; 