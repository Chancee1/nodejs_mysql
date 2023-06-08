import express from 'express'
const app = express();
var router = express.Router();

import cors from 'cors'
import morgan from 'morgan'
import { config } from "dotenv";
import userRoutes from "./routes/user.route.js"
import "./utils/db_connection.js"
import { corsFunction } from './utils/cors.js';
import bodyParser from 'body-parser'
import swaggerUi from "swagger-ui-express";
import {swaggerJsDoc} from './utils/swagger.js'
config({ path: "./.env" });
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc))
app.use(bodyParser.urlencoded({extended: true}))
router.options("/", cors());
router.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
    next();
})
app.use(corsFunction)
app.use(bodyParser.json())

app.get("/", (req, res)=>{
    return res.status(200).json({
        message: "This is the home page"
    })
})
// routes
app.use("/user",userRoutes)

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})