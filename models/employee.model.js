
export const employeeModel = (sequelize, DataTypes) =>{
    const Employee = sequelize.define("employees", {
         id: {
             type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
         },
         firstname:{
             type: DataTypes.STRING,
             allowNull: false
         },
         lastname:{
             type: DataTypes.STRING,
             allowNull: false
         },
         email:{
             type: DataTypes.STRING,
             allowNull: false
         },
         nationalId:{
             type: DataTypes.STRING,
             allowNull: false
         }
         ,
         phone:{
             type: DataTypes.STRING,
             allowNull: false
         },
         department:{
             type: DataTypes.STRING,
             allowNull: false
         },
         position:{
             type: DataTypes.STRING,
             allowNull: false
         },
         manufacturer:{
             type: DataTypes.STRING,
             allowNull: false
         },
         model:{
             type: DataTypes.STRING,
             allowNull: false
         },
         serialNumber:{
             type: DataTypes.STRING,
             allowNull: false
         }
     }, {freezeTableName: true});
     return Employee;
 }
 
 
 