const postController = require('../controllers/post');
const express = require('express');
const validatePost = require('../validate/valid');
const router = express.Router();
const signinController = require('../controllers/auth');
const user_profile = require('../controllers/user')


//for any req containing userId
router.param("userId" , user_profile.userById);
// -||- postId
router.param("postId" , postController.postById);


router.get("/posts",signinController.requireSignin,postController.getPosts);
router.post("/post/new/:userId",signinController.requireSignin,postController.createPost, validatePost.createPostValidator);
router.get("/post/by/:userId",signinController.requireSignin,postController.postsByUser);

router.put("/post/:postId",signinController.requireSignin,postController.isAuthor ,postController.updatePost)
router.delete("/post/:postId",signinController.requireSignin,postController.isAuthor ,postController.deletePost)

module.exports = router;