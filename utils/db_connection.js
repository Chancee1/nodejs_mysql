import { config } from 'dotenv';
config({path:'./.env'});
import {Sequelize} from 'sequelize';
import {userModel} from '../models/user.model.js'
import {employeeModel} from '../models/employee.model.js'
// export const connection = mysql.createConnection({
//   host: 'localhost',
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASS,
//   database: 'edb_database'
// });
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });

 const sequelize = new Sequelize(
    'edb_database',
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
     {
       host: 'localhost',
       port: 3307,
       dialect: 'mysql'
     }
   );

 const db = {}
 db.sequelize = sequelize;
 db.models={}
 db.models.User = userModel(sequelize, Sequelize.DataTypes)
 db.models.Employee = employeeModel(sequelize, Sequelize.DataTypes)

 export default db;



// mongoose.connect(process.env.MONGODB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(()=>{
//     console.log("Connected to database Successfully")
// }).catch(err =>{
//     console.log(err)
// })