const express = require('express');
const user_profile = require('../controllers/user')
const router = express.Router();
const signinController = require('../controllers/auth');


//for any req containing userId
router.param("userId" , user_profile.userById);

router.get("/users",signinController.requireSignin,user_profile.allUsers);
router.get("/user/:userId",signinController.requireSignin,user_profile.getUser);
router.put("/user/:userId",signinController.requireSignin,user_profile.updateUser);
router.delete("/user/:userId",signinController.requireSignin,user_profile.deleteUser);
//pic
router.get("/user/picture/:userId",user_profile.userPic);

module.exports = router;