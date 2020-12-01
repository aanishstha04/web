const express = require('express');
const { signup, signin, requireSignin } = require('../controller/user');
const router = express.Router();


router.post('/profile', requireSignin ,(req, res) => {
    res.status(200).json({ user: 'profile' })
});


router.post('/signup', signup);

router.post('/signin', signin);

module.exports = router;