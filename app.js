import express from 'express'
const app = express();
var router = express.Router();

import cors from 'cors'
import morgan from 'morgan'
import { config } from "dotenv";
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/employee.route.js"
import { corsFunction } from './utils/cors.js';
import bodyParser from 'body-parser'
import swaggerUi from "swagger-ui-express";
config({ path: "./.env" });
const PORT = process.env.PORT;
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerJson = require("./swagger.json");
import db from './utils/db_connection.js'

app.use(cors());
app.use(morgan('dev'));
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson))
app.use(bodyParser.urlencoded({extended: true}))
router.options("/", cors());
router.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
    next();
})
app.use(corsFunction)
app.use(bodyParser.json())

;(async() =>{
    await db.sequelize.sync()
})();
// routes
app.use("/user",userRoutes)
app.use("/employee", productRoutes)

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})