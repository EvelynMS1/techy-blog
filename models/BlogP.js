const {Model,DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class BlogP extends Model{

}

BlogP.init(
{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false,

    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id'
        }


    }
},
{
    sequelize,
    timestamps:true,
    freezeTableName:true,
    underscored:true,
    modelName:'blogp',
}
);

module.exports = BlogP;