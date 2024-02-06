const express = require('express');
const router = express.Router();
const path = require('path');

// Login route
router.get('/', (req, res) => {
    // Your login logic goes here
    res.sendFile(path.join(__dirname, 'template', 'login.html'));
});

router.post('/', (req, res) => {
res.send("endpoint for the data hadnling")
});




module.exports = router;