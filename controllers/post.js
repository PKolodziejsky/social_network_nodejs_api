const Post = require('../models/post');
const formidable = require("formidable");
const fs = require("fs");
const _  = require('lodash');

function getPosts(req,res){

    const posts = Post.find().select("_id title body").populate("postedBy","_id name").then((posts) =>res.json({
        posts:posts
    })).catch(err => console.log(err));

}

function createPost(req,res) {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req , (err,fields,files) =>{

        if(err){
            return res.status(400).json({
                error:"Image could not be uplaoded"
            })
        }

    let post = new Post(fields);
    req.profile.passwd_hash =undefined;
    req.profile.salt =undefined;
    req.profile.email = undefined;
    post.postedBy = req.profile;

    if(files.photo){
        post.photo =fs.readFileSync(files.photo.path);
        post.photo.contentType(files.photo.type);
    }

    post.save((err,result) =>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({ result });
})
});
}

function postsByUser(req,res){

    Post.find({postedBy:req.profile._id}).populate("postedBy", "_id name").sort("created")
        .exec((err,posts) =>{

        if(err){
            return res.status(400).json({
                error:err
            })

        }
        res.status(200).json({posts});
});
}

function postById(req,res,next,abc){

    Post.findById(abc).populate("postedBy" , "_id name").exec((err,post) =>{

        if(err || !post){
        return res.status(400).json({
            error:err
        })
    }
    req.post = post;
    next();
});
}

function isAuthor(req,res,next){

    let isAuthor = req.post && req.auth && req.post.postedBy._id == req.auth._id;

    if(!isAuthor){
        return res.status(403).json({
            error:"Unauthorized. You are not the author of this post"
        });
    }
    next();
}

function deletePost(req,res){

    let post = req.post;
    post.remove((err,post) =>{

        if(err){
            return res.status(400).json({})
            error:err
        }

        res.json({
            message:"Post deleted successfully"
        })
    })
}

function updatePost (req,res,next){

    let post = req.post;
    post = _.extend(post,req.body);
    post.updated = Date.now();
    post.save((err) =>{

        if(err){
            return res.status(400).json({
                error:err
            });
        }
        res.json({post:post});
})
}

module.exports={
    getPosts,
    createPost,
    postsByUser,
    postById,
    isAuthor,
    deletePost,
    updatePost
}