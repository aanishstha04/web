const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-midware');

const { addCategory, getCategory } = require('../controller/categories');
const router = express.Router();



router.post('/category/create',requireSignin,adminMiddleware, addCategory);
router.get('/category/getcategory', getCategory);


module.exports = router;