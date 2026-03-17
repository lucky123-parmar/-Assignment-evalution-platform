const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const auth = require('../../middleware/auth'); 
 


// Public Routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Private Routes
router.get('/me', auth, userController.getMe);
router.get('/:id', auth, userController.getUserById);
router.get('/students', auth, userController.getAllStudents);
router.get('/teachers', auth, userController.getAllTeachers);
router.patch('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
