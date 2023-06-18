import express from 'express';
import { createNewProduct, getAllProducts } from '../controllers/product.controller.js';
import { validateProduct } from '../validators/product.validator.js';
import { checkAuthorization } from '../middlewares/auth.middleware.js';
let router = express.Router();

router.post("/", checkAuthorization, validateProduct, createNewProduct)
router.get("/", checkAuthorization, getAllProducts)


export default router;