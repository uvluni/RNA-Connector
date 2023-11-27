const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Create this controller

// Route for root path ('/')
router.get('/', (req, res) => {
  res.send('Hello, this is your API!');
});

// Route for authentication ('/authenticate')
router.post('/authenticate', authController.authenticate);

module.exports = router;
