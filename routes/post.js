const { getPosts,createPost,postsByUser,updatePost,deletePost,postById,isAuthor,getPicture,singlePost} = require('../controllers/post');
const express = require('express');
const { createPostValidator } = require('../validate/valid');
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);

router.get("/posts/:userId",requireSignin, getPosts);
router.post("/post/new/:userId",requireSignin,createPost, createPostValidator);
router.get("/posts/by/:userId",requireSignin,postsByUser);
router.delete("/post/:postId",requireSignin,isAuthor ,deletePost);
router.put("/post/:postId",requireSignin,isAuthor ,updatePost);
router.get("/post/:postId", singlePost);
router.get('/post/picture/:postId', getPicture);




module.exports = router;