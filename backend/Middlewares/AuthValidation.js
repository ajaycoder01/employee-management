const joi = require('joi');

const signupValidation = (req,res,next)=>{
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(50).required()
    })
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: 'Validation Error',error
        })
    }
    next();
} 

const loginValidation = (req,res,next)=>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(50).required()
    })
    const {error} = schema.validate(req.body); 
    if(error){
        return res.status(400).json({
            message: 'Validation Error',error
        })
    }
    next();
}
module.exports = {
    signupValidation,
    loginValidation
}

