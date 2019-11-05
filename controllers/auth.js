const User = require('../models/user');
const jwt = require('jsonwebtoken');
const express_jwt = require('express-jwt');
const dotenv = require('dotenv');
dotenv.config();

async function signup(req,res){

    const userExists = await User.findOne({email:req.body.email});

    if(userExists) {
        return res.status(403).json({
            error: "User with this email address already exists"
        });
    }

    const user = await new User (req.body);
    await user.save();
    res.status(200).json({ message:'Signup successful!' });
}

function signin (req,res){

    const {email,password} = req.body;

    User.findOne({email} , (err,user) =>{

        if (err || !user){
        return res.status(401).json({
            error:'User with this email does not exist. Please signup.'

            });
        }
    if(!user.authenticate(password)){
        return res.status(401).json({
            error:"Wrong password"
        })
    }

    //create token
    const token = jwt.sign({_id:user._id},process.env.SECRET);

    //save the token as t in cookie
    res.cookie('t' , token , { expire:new Date()+9999 });

    //return cookie and user to frontend client
    const {_id, name,email} = user;
    return res.json({token , user:{_id , name,email}})

    });

}

function signout (req,res){
    res.clearCookie('t');
    return res.status(200).json({message:"Singout succesful"});
}

const requireSignin= express_jwt({
    //if token valid => express_jwt appends verified users id in an auth key to the req obj
    secret:process.env.SECRET,
    userProperty:'auth'
});


module.exports={
    signup,
    signin,
    signout,
    requireSignin
}
