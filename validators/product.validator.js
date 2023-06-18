import Joi from "joi";

export const validateProduct = (req, res, next) =>{
    try {
        const {body} = req;
    const productValidator = Joi.object({
        name: Joi.string().required()
    })

    const {error} = productValidator.validate(body)
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