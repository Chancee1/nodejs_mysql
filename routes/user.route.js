import express from 'express';
import { registerNewUser, login, getAllUsers, getUserInfo } from '../controllers/user.controller.js';
import { validateLogin, validateUserRegister } from '../validators/user.validator.js';
import { checkAuthorization } from '../middlewares/auth.middleware.js';
let router = express.Router();

/**
 * @swagger
 * /user/register:
 *  post:
 *      
 *      summary: Register User
 *      description: Register User
 *      parameters:
 *          - name: firstname
 *            description: first name
 *            in: formData
 *            type: string
 *            required: true
 *          - name: lastname
 *            description: last name
 *            in: formData
 *            type: string
 *            required: true
 *          - name: email
 *            description: email
 *            in: formData
 *            type: string
 *            required: true
 *          - name: password
 *            description: password 
 *            in: formData
 *            type: string
 *            required: true
 *          - name: type
 *            description: type
 *            in: formData
 *            type: string
 *            required: true
 *      responses: 
 *          200:
 *              description: Returns message indicating success
 *          400:
 *              description: Returns message indicating failure
 */
router.post("/register", validateUserRegister, registerNewUser)
router.post("/login", validateLogin, login)
router.get("/all", checkAuthorization,getAllUsers)
router.get("/profile", checkAuthorization, getUserInfo)

export default router;