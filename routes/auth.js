const { signin, signout, signup} = require('../controllers/auth');
const express = require('express');
const { userSignupValidator } = require('../validate/valid');
const { userById } = require('../controllers/user')
const router = express.Router();

//for any req containing userId
router.param("userId" , userById);

router.post("/signup",userSignupValidator,signup);
router.post("/signin",signin);
router.get("/signout",signout);


module.exports = router;