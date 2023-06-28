const sequelize = require('../config/connection');
const { BlogP, Comment, User } = require('../models');

const users = [
    {
        name: 'john',
        username:'johndoe',
        email:'john@gmail.com',
        password: 'userjohnpass'
    },
      {
        name: 'joan',
        username:'joandove',
        email:'joan@gmail.com',
        password: 'userjoanpass'
    },
]

const blogs = [
    {
        title: 'firstBlog',
        content:'blogging',
        user_id:1,

    },
     {
        title: 'secondBlog',
        content:'secondblog',
        user_id:2,

    },
]

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const userData = await User.bulkCreate(users,{
    individualHooks: true,
    return: true,
  });

  const blogData = await BlogP.bulkCreate(blogs);



  process.exit(0);
};

seedDatabase();
