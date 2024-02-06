const express = require('express');
const router = express.Router();
const path = require('path');

// Signup route - GET
router.get('/', (req, res) => {
    // Your logic for handling GET requests

    res.sendFile(path.join(__dirname, 'template', 'signup.html'));
});

// Signup route - POST
router.post('/', (req, res) => {

    res.send("Welcome")
    // Your signup logic goes here
});

module.exports = router;
