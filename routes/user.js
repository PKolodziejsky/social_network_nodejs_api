const express = require('express');
const { allUsers,getUser,updateUser,deleteUser,userPic } = require('../controllers/user')
const router = express.Router();
const { requireSignin } = require('../controllers/auth');
const { addFollowing,addFollower } = require('../controllers/user');

//for any req containing userId
router.param("userId" , user_profile.userById);

router.get("/users",requireSignin,allUsers);
router.get("/user/:userId",requireSignin,getUser);
router.put("/user/:userId",requireSignin,updateUser);
router.delete("/user/:userId",requireSignin,deleteUser);
//pic
router.get("/user/picture/:userId",userPic);
//following
router.put('/user/follow',requireSignin,requireSignin,addFollower,addFollowing)

module.exports = router;