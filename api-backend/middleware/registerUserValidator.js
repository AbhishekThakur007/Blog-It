const { check, validationResult } = require('express-validator');

// Register validation
const registerValidator = 
[
    check('name').isLength({min:4}).withMessage('name should be of minimum 4 character'),
    check('password').isLength({min:8}).withMessage('Password should be of minimum 8 character'),
    check('email').isEmail().withMessage('Enter a valid email')

]
// Register validation result middleware
const registerValidationMiddleware = (req,res,next)=>
{
    console.log("Success");
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        const err = errors.array()[0].msg;
        return res.status(403).json({"msg": err});
    }
    next();
}

module.exports = {registerValidator,registerValidationMiddleware};