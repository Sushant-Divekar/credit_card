const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
//const { ensureAuthenticated } = require('../middleware/cardauth');

require('../db/conn');
const User = require("../model/userSchema");

router.get('/' , (req , res) =>{
    res.send(`hello world from server from router`);
});

/*
using promices

router.post('/register' , (req , res) =>{
    const {name , email , phone, work, password , cpassword} = req.body
    
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"plz filled the field properly"});
    }
    //res.send("mera rgsiter page");
    //res.json({message: req.body});

    User.findOne({email:email})
    .then((userExist)  => {
        if(userExist){
            return res.status(422).json({error : "Email already Exist"});
        }

        const user = new User({name , email , phone, work, password , cpassword})

        user.save()
        .then(() => {
            res.status(201).json({message: "User register successfully"})
        })
        .catch((err) => res.status(500).json({error : "fail to register"}))
    })
    .catch(err => {
        console.log(err);
    });
});
 */

//using async
router.post('/register' , async (req , res) =>{
    const {name , email , phone, work, password , cpassword} = req.body
    
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"plz filled the field properly"});
    }

    //res.send("mera rgsiter page");
    //res.json({message: req.body});

    try{

        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(422).json({error : "Email already Exist"});
        }
        else if(password != cpassword){
            return res.status(422).json({error : "password is not matching"});
        }
        else{

            const user = new User({name , email , phone, work, password , cpassword})

            //hash

            const userRegister = await user.save(); 

            if(userRegister){
                res.status(201).json({message: "User register successfully"});
                //res.json({userId : user._id});
            }
            else{
                res.status(500).json({error : "fail to register"})
            }
        }

        

    }catch(err){
        console.log(err);
    }
    
    
});

//login route

router.post('/signin' , async (req , res) =>{
    let token;
    //console.log(req.body);
    //res.json({message : "assome"})

    try{
        const {email , password } = req.body;

        if(!email || !password){
            return res.status(400).json({error:"plz filled the data"})
        }

        const userLogin = await User.findOne({email:email});
        //console.log(userLogin);

        if(userLogin){
            const isMatch = await bcrypt.compare(password , userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken" , token , {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isMatch){
                res.status(400).json({error:"user error password"});
            }
            else{
                res.json({message : "user signin successfully" , token:token});
            }
        }
        else{
            res.status(400).json({error:"user error "});
        }

        
        

    }catch(err){

        console.log(err);
    }

})


router.get('/signin' , (req , res) =>{
    res.send(`hello world from signin server`);
});

router.get('/signup' , (req , res) =>{
    res.send(`hello world from signup server`);
});

router.get('/contact' , (req , res) =>{
    //res.cookie("Test" , "sushant");
    res.send(`hello world from contact server`);
});
//about us page
router.get('/about' ,authenticate ,(req , res) =>{
    console.log("hello in about through middleware");
    res.send(req.rootUser);
});

router.get('/logout' ,(req , res) =>{
    console.log("hello logout page");
    res.clearCookie('jwtoken' , {path:'/'});
    res.status(200).send('user logout');
});

router.get('/getdata',authenticate , (req , res) =>{
    console.log("getting all info");
    res.send(req.rootUser);
})

module.exports = router;

