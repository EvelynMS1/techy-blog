const router = require('express').Router();
const{Comment, User, BlogP} = require('../../models');
const withAuth = require('../../utils/auth');

//dashboard
//get all the blogs specifc sesh user has created
// allow for puts that does an update to the blog post
//allow for new blogs  post
//deletes the blog post if wanted 
//all changes made on dashboard
//pop on the homepage 


//getting all blog posts created by the user in sesh by specific user id
router.get('/dashboard',  async(req,res)=>{
    try{
        // const userId = req.session.user_id;
        const userId = req.body.user_id; //in order to test without withAuth
        const user = await User.findOne({ where: { id: userId}});

        if(user) {
            const blogData = await BlogP.findAll({
                where:{ user_id: userId},
                attributes: ['title','content']
            });
            const blogs = blogData.map(blog => blog.get({plain:true}));
            // res.render('dashboard', {blogs});
            res.json(blogs);
     
            }
    }catch(err){
      console.log(err);
        res.status(500).json(err);
    }
});

// router.get('/updatedblog/:id',asyn(req,res)=>{
//   try{
//     const updatedblog = await BlogP.create({

//     })
//   }catch(err){
//     err
//   }
// })

//Post option for creating a new blog 
router.post('/createblog', withAuth,async(req,res)=>{

    try{
        const blogPost = await BlogP.create({
            //will need to have the specific fields for  adding data to the table
            ...req.body,
            user_id: req.session.user_id,
        });
        const blog = blogPost.get({plain:true});
        res.status(200).json(blog);
    }catch(err){
        res.status(200).json(err);
    }
});
//put that can update the blog that was created
//comment has a user and a id for the comment itself 
//the blogs are from that specific user 
//selecting one of the blogs is already tied to the user we only need 
//to get the number of the blog 
//that was created by the user
router.put('/blogupdate/:id',withAuth, async(req,res)=>{
  console.log('req.params.id: ', req.params.id);
    try {
        const affectedrow = await BlogP.update(
          {
            title: req.body.title,
            content: req.body.content
          },
          {
            where: {
              id: req.params.id,
              user_id: req.session.user_id // only allow the owner to update the blog post
            },
         
          }
         
        );
    
        if (!affectedrow || affectedrow[0]===0) {
          res.status(404).json({ message: 'No blog post found with this id!' });
          return;
        }
   
        const updatedBlog = await BlogP.findOne({
          where: {
            id: req.params.id,
            user_id: req.session.user_id
          }
        });

        res.status(200).json(updatedBlog.get({ plain: true })); 
        // const blogpost = blog.get({plain:true});
        // res.status(200).json(blog); 
        
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
 });


//delete so that the post can be destroyed
router.delete('/blog/:id',withAuth,async(req,res)=>{
    try {
        const blog = await BlogP.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id, // only allow the owner to delete the blog post
          },
        });
    
        if (!blog) {
          res.status(404).json({ message: 'No blog post found with this id!' });
          return;
        }
    
        res.status(200).json({ message: 'Blog post deleted successfully!' });
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;