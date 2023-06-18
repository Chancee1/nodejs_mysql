import express from 'express';
import { registerNewUser, login, getAllUsers, getUserInfo } from '../controllers/user.controller.js';
import { validateLogin, validateUserRegister } from '../validators/user.validator.js';
import { checkAuthorization } from '../middlewares/auth.middleware.js';
let router = express.Router();

router.post("/register", validateUserRegister, registerNewUser)
router.post("/login", validateLogin, login)
router.get("/all", checkAuthorization,getAllUsers)
router.get("/profile", checkAuthorization, getUserInfo)

export default router;