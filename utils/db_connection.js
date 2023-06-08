import mongoose from 'mongoose'
import { config } from 'dotenv';
config({path:'./.env'});

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database Successfully")
}).catch(err =>{
    console.log(err)
})