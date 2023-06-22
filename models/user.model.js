
export const userModel = (sequelize, DataTypes) =>{
   const User = sequelize.define("users", {
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
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {freezeTableName: true});
    return User;
}


