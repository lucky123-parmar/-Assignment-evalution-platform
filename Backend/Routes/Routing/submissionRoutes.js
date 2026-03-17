const express = require('express');
const router = express.Router();
const submissionController = require('../Controllers/submissionController');
// const auth = require('../middleware/auth');

// Submit a new assignment
router.post('/submit',submissionController.submitAssignment);

// Get all submissions
router.get('/', submissionController.getAllSubmissions);

// Get submission by ID
router.get('/:id', submissionController.getSubmissionById);

// Get all submissions for a specific assignment
router.get('/assignment/:assignmentId', submissionController.getSubmissionsByAssignment);

// Get all submissions by a specific student
router.get('/student/:studentId', submissionController.getSubmissionsByStudent);

// Update submission (repoLink/comment)
router.patch('/:id', submissionController.updateSubmission);

// Delete submission
router.delete('/:id', submissionController.deleteSubmission);

module.exports = router;
