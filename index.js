const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);

// Use the routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);

// Define this route after the other specific routes
app.get('/home', async (req, res) => {
    res.send("Hey there");
});
const start  = async()=> {


    await mongoose.connect('mongodb+srv://abdullahaliquadri:tiktak786@cluster0.fihugf0.mongodb.net/myclients?retryWrites=true&w=majority' )
    app.listen(port,()=>{
      console.log('Server has been started ' + port)
    });
  
  }
  start()
