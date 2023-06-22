import express from 'express';
import { createNewEmployee, getAllEmployees } from '../controllers/employee.controller.js';
import { validateEmployee } from '../validators/employee.validator.js';
import { checkAuthorization } from '../middlewares/auth.middleware.js';
let router = express.Router();

router.post("/", checkAuthorization, validateEmployee, createNewEmployee)
router.get("/", checkAuthorization, getAllEmployees)


export default router;