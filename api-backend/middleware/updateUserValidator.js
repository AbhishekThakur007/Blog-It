const { check, validationResult } = require('express-validator');

// Register validation
const updateValidator = 
[
    check('name').isLength({min:4}).withMessage('name should be of minimum 4 character'),
]
// Register validation result middleware
const updateValidationMiddleware = (req,res,next)=>
{
    // console.log("Success");
    // console.log("fire");
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        const err = errors.array()[0].msg;
        return res.status(403).json({"msg": err});
    }
    next();
}

module.exports ={updateValidator,updateValidationMiddleware};