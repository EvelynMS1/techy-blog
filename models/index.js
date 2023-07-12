const User = require('./User');
const Comment = require('./Comment');
const BlogP = require('./BlogP');




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


module.exports = { User, Comment,BlogP };