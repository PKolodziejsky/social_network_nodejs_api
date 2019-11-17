const { getPosts,createPost,postsByUser,updatePost,deletePost,postById,isAuthor,getPicture} = require('../controllers/post');
const express = require('express');
const { createPostValidator } = require('../validate/valid');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

//for any req containing userId
router.param("userId" , userById);
// -||- postId
router.param("postId" , postById);

router.get("/posts/:userId",requireSignin, getPosts);
router.post("/post/new/:userId",requireSignin,createPost, createPostValidator);
router.get("/posts/by/:userId",requireSignin,postsByUser);
router.get('/post/picture/:postId',getPicture);
router.put("/post/:postId",requireSignin,isAuthor ,updatePost);
router.delete("/post/:postId",requireSignin,isAuthor ,deletePost)


module.exports = router;