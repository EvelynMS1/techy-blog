const User = require('./User');
const Comment = require('./Comment');

//associations between User and Comment

//user can have many comments 
//comments can have only one user 
User.hasMany(Comment,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

Comment.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'CASCADE',
});

//ask about underscore

module.exports = { User, Comment };