const express = require('express');
const router = express.Router();
const assignmentController = require('../Controllers/assignmentController');
// const auth = require('../middleware/auth');

// Create new assignment
router.post('/create',assignmentController.createAssignment);

// Get all assignments
router.get('/', assignmentController.getAllAssignments);

// Get assignment by ID
router.get('/:id', assignmentController.getAssignmentById);

// Get assignments by teacher ID
router.get('/teacher/:teacherId', assignmentController.getAssignmentsByTeacher);

// Update assignment
router.patch('/:id', assignmentController.updateAssignment);

// Delete assignment
router.delete('/:id', assignmentController.deleteAssignment);

module.exports = router;
