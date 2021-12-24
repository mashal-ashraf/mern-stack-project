const jwt = require('jsonwebtoken');
const express = require('express');
const router =express.Router();
const bcrypt = require ('bcryptjs');

require('../db/conn');
const User = require("../model/userSchema");

router.get('/' ,(req,res)=>{
    res.send("hello world from router.js");
});

/////using promises/////

// router.post('/register' ,(req,res) =>{
//     const { name, email, phone, work, password, cpassword} = req.body;
    
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "please filled the field property"});
//     }
//     User.findOne({ email : email})
//     .then((userExist) => {
//         if (userExist){
//             return res.status(422).json({ error :"Email already exist"});
//         }

//         const user = new User({ name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({ message: "user registered successfully" });
//         }).catch((err) => res.status(500).json({ error: "Failed registerd" }));

//     }).catch(err => { console.log(err); });
// });

///using async await////

router.post('/register' ,async (req,res) =>{

    const { name, email, phone, work, password, cpassword} = req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "please filled the field property"});
    }
    try{
        const userExist =await User.findOne({ email : email});

        if (userExist){
            return res.status(422).json({ error :"Email already exist"});

            }else if (password != cpassword ){
            return res.status(422).json({error: "password is not matching"})

            }else{

            const user = new User({ name, email, phone, work, password, cpassword});
            //from there
            await user.save();

            res.status(201).json({ message: "user registered successfully" });
            }

         }catch (err) { 
            console.log(err);
        }
    });

//login route
//Create a Login Route with Form Validation 

router.post('/signin' , async (req, res) => {
    // console.log(req.body)
    // res.json({message: "awsome" });
    try {
        let token;
        const { email, password } =req.body;
         if (!email || !password) {
             return res.status(400).json({error : "please filled the data "})
         }
         const userLogin = await User.findOne({email : email});
         //console.log(userLogin);
         if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log (token);

            //Store JWT Token in Cookie For Authentication
            res.cookie("jwtoken", token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if (!isMatch){
                res.status(400).json({ message : "  Invalid Credential Pass"});
            }else{
                res.json({ message : " user Signin Successfully "}); 
            }
            }else{
                res.status(400).json({ message : " Invalid Credential"});
            }

    } catch (err) {
        console.log(err) 
    }

});
module.exports= router;