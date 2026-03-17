const express = require('express');
const router = express.Router();
const evaluationController = require('../Controllers/evaluationController');
// const auth = require('../middleware/auth');

// Create evaluation (teacher or AI)
router.post('/evaluate', evaluationController.createEvaluation);

// Get all evaluations
router.get('/', evaluationController.getAllEvaluations);

// Get evaluation by ID
router.get('/:id', evaluationController.getEvaluationById);

// Get evaluations for a submission
router.get('/submission/:submissionId', evaluationController.getEvaluationsBySubmission);

// Get evaluations for a student
router.get('/student/:studentId', evaluationController.getEvaluationsByStudent);

// Update evaluation
router.patch('/:id', evaluationController.updateEvaluation);

// Delete evaluation
router.delete('/:id', evaluationController.deleteEvaluation);

module.exports = router;
