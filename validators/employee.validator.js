import Joi from "joi";

export const validateEmployee = (req, res, next) =>{
    try {
        const {body} = req;
    const employeeValidator = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        nationalId: Joi.string().min(16).required(),
        phone:Joi.string().min(10).required(),
        department:Joi.string().required(),
        position: Joi.string().required(),
        manufacturer:Joi.string().required(),
        model:Joi.string().required(),
        serialNumber: Joi.string().required()
    })

    const {error} = employeeValidator.validate(body)
    if(error){
        return res.status(401).json({
            error: error.message,
            message: "Unable to create product"
        })
    }
    return next();
    } catch (error) {
        return res.status(401).json({
            error: error
        })
    }

}