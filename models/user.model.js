import { Schema, model } from "mongoose";
import pkg from 'jsonwebtoken'
const {sign} = pkg;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 3
    },
    type:{
        type: String,
        enum: ['user', 'admin'],
        required: true
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = sign(
        {_id: this._id, type:this.type},
        process.env.JWT_SECRET.trim()
    )
    return "Bearer "+ token;
}

export const User = model('User', userSchema)

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       properties:
*         firstname:
*             type: string
*/