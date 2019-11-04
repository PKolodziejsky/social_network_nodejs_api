const auth = require('../controllers/auth');
const express = require('express');
const validator = require('../validate/valid');
const user_profile = require('../controllers/user')
const router = express.Router();

//for any req containing userId
router.param("userId" , user_profile.userById);

router.post("/signup",validator.userSignupValidator,auth.signup);
router.post("/signin",auth.signin);
router.get("/signout",auth.signout);


module.exports = router;