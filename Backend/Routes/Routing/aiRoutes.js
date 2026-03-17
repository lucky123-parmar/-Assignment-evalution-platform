
const express = require('express');
const router = express.Router();
const aiController = require('../Controllers/aiController');

// Route to evaluate code
router.post('/evaluate', aiController.evaluateCode);

module.exports = router;
