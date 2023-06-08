import Joi from "joi"
import { User } from "../models/user.model.js";

export const validateUserRegister = async(req, res, next) =>{
    try {
    const {body} = req;
    const userValidator = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        password: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        type: Joi.string().valid('user', 'admin').required()
    })

    const {error} = userValidator.validate(body);
    if(error){
       return res.status(401).json({
            error: error.message,
            message: "Unable to create account"
        })
    }
    let emailExists = await User.findOne({email: body.email})
    if(emailExists){
       return res.status(401).json({
            message: "Email Already Exists"
        })
    }

    return next();
    } catch (error) {
        return res.status(400).json({
            error: error,
            message: error.message
        })
    }
}

export const validateLogin = (req, res, next) =>{
    try {
        const {body} = req;
    const loginValidator = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const {error} = loginValidator.validate(body)
    if(error){
        res.status(400).json({
            error: error.message,
            message: "Login Failed"
        })
    }
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
    return next();
}