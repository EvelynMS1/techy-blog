const User = require('./User');
const Comment = require('./Comment');
const BlogP = require('./BlogP');

//associations between User and Comment

//user can have many comments 
//comments can have only one user 
User.hasMany(Comment,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

User.hasMany(BlogP,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});
BlogP.belongsTo(User,{
    foreignKey:'user_id'
});

BlogP.hasMany(Comment,{
    foreignKey:'blog_id',
    onDelete:'CASCADE'
});
Comment.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'CASCADE',
});

Comment.belongsTo(BlogP,{
    foreignKey:'blog_id',
});
//ask about underscore

module.exports = { User, Comment,BlogP };