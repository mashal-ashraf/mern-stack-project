const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path: './config.env'});
require('./db/conn');
//const User =require('./model/userSchema');
app.use(express.json());


//we link the router files to make our route 
app.use(require('./router/auth')); 

 
const PORT =process.env.PORT;
 





//Middleware
const middleware = (req,res,next)=>{
    console.log("hello middleware");
    next();
    
}


// app.get('/' ,(req,res)=>{
//     res.send("hello world from appjs");
// });
app.get('/about' ,middleware, (req, res)=>{
    res.send("hello world from aboutus using middleware");
});
app.get('/contact' ,(req, res)=>{
    res.cookie("Test" , 'mash');
    res.send("hello world from contact us");
});
app.get('/signin' ,(req, res)=>{
    res.send("hello world from signin");
});
    app.get('/signup' ,(req, res)=>{
    res.send("hello world from signup");
});
  

app.listen(PORT,() =>{ 
    console.log(`server running at port no ${PORT}`);
});
