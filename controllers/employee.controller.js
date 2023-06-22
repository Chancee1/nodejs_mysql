import { compare, genSalt, hash } from "bcrypt"
import lodash from "lodash"
const {pick} = lodash;

import db from "../utils/db_connection.js"

const {models} = db;
const {Employee} = models;

// functions to create new employee
export const createNewEmployee = async(req, res) =>{
   try {
    const {body} = req;

    await Employee.create(body);
    return res.status(200).json({
        message: "Employee saved Successfully",
        data: body
    })

   } catch (error) {
    return res.status(400).json({
       error
    })
   }

}
// functions to fetch all employees
export const getAllEmployees = async(req, res) =>{
    try {
        let employees = await Employee.findAll();
        return res.status(200).json({
            message: "Returned all employees",
            data: employees
        })
    } catch (error) {
        
    }
}