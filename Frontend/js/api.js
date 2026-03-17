// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Service Class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }
    return data;
  }

  // User Authentication
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return this.handleResponse(response);
  }

  async register(userData) {
    const response = await fetch(`${this.baseURL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseURL}/users/me`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updateUser(userId, userData) {
    const response = await fetch(`${this.baseURL}/users/${userId}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  // Assignment Management
  async createAssignment(assignmentData) {
    const response = await fetch(`${this.baseURL}/assignments`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(assignmentData)
    });
    return this.handleResponse(response);
  }

  async getAssignments() {
    const response = await fetch(`${this.baseURL}/assignments`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getAssignmentById(assignmentId) {
    const response = await fetch(`${this.baseURL}/assignments/${assignmentId}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updateAssignment(assignmentId, assignmentData) {
    const response = await fetch(`${this.baseURL}/assignments/${assignmentId}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(assignmentData)
    });
    return this.handleResponse(response);
  }

  async deleteAssignment(assignmentId) {
    const response = await fetch(`${this.baseURL}/assignments/${assignmentId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Submission Management
  async createSubmission(submissionData) {
    const response = await fetch(`${this.baseURL}/submissions`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(submissionData)
    });
    return this.handleResponse(response);
  }

  async getSubmissions() {
    const response = await fetch(`${this.baseURL}/submissions`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getSubmissionById(submissionId) {
    const response = await fetch(`${this.baseURL}/submissions/${submissionId}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updateSubmission(submissionId, submissionData) {
    const response = await fetch(`${this.baseURL}/submissions/${submissionId}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(submissionData)
    });
    return this.handleResponse(response);
  }

  // Evaluation Management
  async createEvaluation(evaluationData) {
    const response = await fetch(`${this.baseURL}/evaluations`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(evaluationData)
    });
    return this.handleResponse(response);
  }

  async getEvaluations() {
    const response = await fetch(`${this.baseURL}/evaluations`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getEvaluationById(evaluationId) {
    const response = await fetch(`${this.baseURL}/evaluations/${evaluationId}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updateEvaluation(evaluationId, evaluationData) {
    const response = await fetch(`${this.baseURL}/evaluations/${evaluationId}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(evaluationData)
    });
    return this.handleResponse(response);
  }

  // AI Services
  async evaluateSubmission(submissionId) {
    const response = await fetch(`${this.baseURL}/ai/evaluate/${submissionId}`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async generateFeedback(submissionId) {
    const response = await fetch(`${this.baseURL}/ai/feedback/${submissionId}`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Utility Methods
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/pages/login.html';
  }

  getCurrentUserData() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}

// Create global API instance
const api = new ApiService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
} 