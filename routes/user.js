const express = require('express');
const { allUsers,getUser,updateUser,deleteUser,userPic,userById } = require('../controllers/user')
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { addFollowing,addFollower,removeFollower,removeFollowing } = require('../controllers/user');


//for any req containing userId
router.param("userId" , userById);

//following
router.put('/user/follow',requireSignin,addFollowing,addFollower);
router.put('/user/unfollow',requireSignin,removeFollowing,removeFollower);

router.get("/users",requireSignin,allUsers);
router.get("/user/:userId",requireSignin,getUser);
router.put("/user/:userId",requireSignin,updateUser);
router.delete("/user/:userId",requireSignin,deleteUser);
//pic
router.get("/user/picture/:userId",userPic);


module.exports = router;