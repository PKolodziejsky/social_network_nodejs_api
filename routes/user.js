const express = require('express');
const { allUsers,getUser,updateUser,deleteUser,userPic,userById,
    addFollowing,addFollower,removeFollower,removeFollowing,findPeople } = require('../controllers/user')
const router = express.Router();
const { requireSignin } = require('../controllers/auth');



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
router.get('/user/discover/:userId', requireSignin,findPeople)

module.exports = router;