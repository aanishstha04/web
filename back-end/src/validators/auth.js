const { check } = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('First Name is required.'),
    // check('lastName')
    // .notEmpty()
    // .withMessage('Last Name is required.'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required.'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be atleast 6 character long')
];  

exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required.')
    ,
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be atleast 6 character long')
];  


exports.isRequestValidated = (req, res, next) =>{
    console.log(req.body)
   const errors = validationResult(req);
   if(errors.array().length > 0){
       return  console.log(errors) //res.status(400).json({ error: errors.array()[0].msg})
   }
   next();
}