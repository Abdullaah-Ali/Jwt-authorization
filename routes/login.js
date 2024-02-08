const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./signup');


router.route('/')
    .get((req, res) => {
        // Your logic for handling GET requests
        res.sendFile(path.join(__dirname, 'template', 'login.html'));
    })
    .post(async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(User)
            const user = await User.findOne({ email:email });
            
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            console.log(user)

            // Call the method for password validation
            
            if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            return res.redirect('/home')

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

module.exports = router;