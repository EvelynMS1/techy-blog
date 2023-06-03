const {Model,DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Comment extends Model{

}


Comment.init(
{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    date:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    comment:{
        type:DataTypes.TEXT,
        allowNull:false,
        defaultValue:"make your presence with words"


    },
    //referencing the user table id so that it may be joined at the id and from there obtaining the username
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id',
        },
    },
},
{
    sequelize,
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'comment',
}
);


module.exports = Comment;