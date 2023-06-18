import { compare, genSalt, hash } from "bcrypt"
import lodash from "lodash"
import { Product } from "../models/product.model.js";
const {pick} = lodash;

export const createNewProduct = async(req, res) =>{
   try {
    const body = pick(req.body, ["name"])
    let newProduct = new Product(body);

    await newProduct.save();
    return res.status(200).json({
        message: "Product saved Successfully",
        id: newProduct._id,
        data: newProduct
    })

   } catch (error) {
    return res.status(400).json({
       error
    })
   }

}

export const getAllProducts = async(req, res) =>{
    try {
        let products = await Product.find();
        return res.status(200).json({
            message: "Returned all products",
            data: products
        })
    } catch (error) {
        
    }
}