const express = require('express');
const { signup, signin } = require('../controller/user');

const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();



//router.post('/profile', requireSignin ,(req, res) => {
//    res.status(200).json({ user: 'profile' })
//});


router.post('/signup',validateSignupRequest , isRequestValidated,signup);

router.post('/signin', validateSigninRequest, isRequestValidated,signin);

module.exports = router;