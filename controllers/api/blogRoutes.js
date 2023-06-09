const router = require('express').Router();
const{User, BlogP} = require('../../models');
const withAuth = require('../../utils/auth');


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
            res.json(blogs);
     
            }
    }catch(err){
      console.log(err);
        res.status(500).json(err);
    }
});


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