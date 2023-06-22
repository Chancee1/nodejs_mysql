import { compare, genSalt, hash } from "bcrypt"
import lodash from "lodash"
const {pick} = lodash;
import pkg from 'jsonwebtoken'
const {sign} = pkg;

import db from "../utils/db_connection.js"

const {models} = db;
const {User} = models;

export const registerNewUser = async(req, res) =>{
    console.log("We are Hereee")
    try {
        let newUser = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password}

    const salt = await genSalt(10);
    console.log("salt", salt)
    console.log("pass", newUser.password)
    newUser.password = await hash(newUser.password, salt)
    await User.create(newUser);

    return res.status(200).json({
        message: "User Registered Successfully",
        id: newUser._id,
        data: newUser
    })
    } catch (error) {
       return res.status(400).json({
            message: error.message,
            error: error
        })
    }
}

export const login = async(req, res) =>{
    try {
        let {body} = req;
        let user = await User.findOne({where: {email: body.email}});
        if (!user){
            res.status(400).json({
                message: "Invalid Email or Password"
            })
        }
        let comparePass = await compare(body.password, user.password)
        if(!comparePass) return res.status(400).json({message: "Invalid Email or Password"})

        const token = generateToken(user.id, user.email);
        return res.header("Authorization", token).status(200).json({
            message: "Logged in Successfully",
            token, 
            data: user
        })
    } catch (error) {
       return res.status(400).json({
            message: error.message,
            error: error
        })
    }
}

export const getAllUsers = async(req, res) =>{
  try {
    const allUsers = await User.findAll();
    return res.status(200).json({
        message: "Returned All Users",
        data: allUsers
    })
  } catch (error) {
    return res.status(400).json({
        message: error.message,
        error: error
    })
  }
}

export const getUserInfo = async(req, res) =>{
    const user = await User.findOne({where: {id: req.user._id}});
    if(!user) return res.status(400).json({message: "User not found!"})
    return res.status(200).json({
        message: "Returned Logged in User",
        data: user
    })
}

export const updateUserInfo = async(req, res)=>{
    try {
        let {body} = req;
    let userInfo = await User.findById(req.user._id);
      if (!userInfo) return res.status(404).send("User not found!");

    let firstname = body.firstname ? body.firstname : userInfo.firstname;
    let lastname = body.lastname ? body.lastname : userInfo.lastname;

    let user = await User.findByIdAndUpdate(
        req.user._id,
        {firstname, lastname},
        {new: true}
    )
    res.status(200).send({
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
       return res.status(400).send({
            message: error.message,
            error: error,
          });
    }
}

const generateToken = (id, email) =>{
    const token = sign({_id: id, email: email},
                process.env.JWT_SECRET.trim(), {expiresIn: '1h'})
    return "Bearer "+ token;
}