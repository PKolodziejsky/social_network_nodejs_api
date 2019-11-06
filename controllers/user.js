const User = require('../models/user');
const _  = require('lodash');
const formidable = require("formidable")
const fs = require("fs");

//running always when userId in URL
function userById(req,res,next,id){

    User.findById(id).populate('following','_id name').populate('followers','_id name')
        .exec((err,user) =>{

        if(err || !user){
        return res.status(400).json({
            error:'User not found'
        })
    }
    //executed whenever userId is used and user (found by User model) => req.profile
    req.profile =user;
    next();
});

}

function hasAuth(req,res,next){
    //req.auth added in express jwt authentication
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if(!authorized){
        return res.status(403).json({
            error:"User is not authorized to perform this action"
        });
    }
}

function allUsers(req,res){

    User.find((err,users) =>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.json(users);
    }).select("name created")
}

function getUser(req,res){
    req.profile.passwd_hash =undefined;
    req.profile.salt =undefined;

    return res.json(req.profile)
}

function updateUser(req,res,next){

    let form = new formidable.IncomingForm();
    form.keepExtensions =true;
    form.parse(req ,(err,fields,files) => {
        if (err) {
            return res.status(400).json({
                error: "Picture could not be uploaded"
            });
        }

        let user = req.profile
        user = _.extend(user, fields)
        user.updated = Date.now();

        if (files.picture) {
            user.picture.data = fs.readFileSync(files.picture.path);
            user.picture.contentType = files.picture.type;
        }
        user.save((err,result) =>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            user.passwd_hash = undefined;
            user.salt = undefined;
            return res.json(user)
        });
    });
}

function userPic(req,res,next){

    if(req.profile.picture.data){
        res.set({"Content-Type":req.profile.picture.contentType});
        return res.send(req.profile.picture.data)
    }
    next();
}

function deleteUser(req,res,next){

    let user = req.profile;
    user.remove((err,user) => {
        if(err){
            return res.status(400).json({
                error:"You are not authorized to delete this profile"
            })
        }

        user.passwd_hash = undefined;
        user.salt= undefined;
        return res.json({
            message:"Profile deleted successfully"
        });

    });

}

function addFollower(req,res,next){
    User.findByIdAndUpdate(req.body.userId, {$push : {followers:req.body.followId}},
        (err,result) =>{
            if(err){
                res.status(400).json({
                    error:err
                });
            }
            next();
        })
}

function addFollowing(req,res){
    User.findByIdAndUpdate(
        req.body.followId,
        {$push : {following:req.body.userId}},
        {new:true}).exec((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            result.salt =undefined;
            result.passwd_hash = undefined;
    })
}

module.exports = {
    userById,
    hasAuth,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPic,
    addFollowing,
    addFollower
}