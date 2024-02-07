const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const path = require('path');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

//to handle the json middleware is to be used


// Signup route - GET
router.get('/', (req, res) => {
    // Your logic for handling GET requests

    res.sendFile(path.join(__dirname, 'template', 'signup.html'));
});



//defing the user mongoose in the old db 
const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },

    createdAt:{
        type:Date, 
        default: Date.now
    }
})
//user mnodel
const User = mongoose.model('User',userSchema)


// Signup route - POST
router.post('/', async  (req, res) => {
//simple registration for the user on the webpage deatils would be extracted from the request body

try { 

    const{name ,email , password,confirm_password  } = req.body
    const existingUser = await User.findOne({email})
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (existingUser){
        return res.status(400).json({meassage:"user with this email already exist"})
    }
    const newUser = new User ({name , email , password}) 
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully' });

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: true });
    await sendEmail(email, 'Your OTP verification code is',  otp); // Replace '123456' with the actual OTP
    


    }
catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}

});






async function sendEmail(to,text,otp) {
    try {
        // Create a transporter using Gmail SMTP settings
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ahere094@gmail.com',
                pass: 'hpao tmpx hlyk jkkv'
            }
        });

        // Define email content
        let mailOptions = {
            from: 'ahere094@gmail.com',
            to: to,
            subject: "OTP VERIFICATION EMAIL",
            text: `${text} ${otp}`
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}




module.exports = router;
