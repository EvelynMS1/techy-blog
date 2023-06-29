const router = require("express").Router();
const { Comment, User, BlogP } = require("../models");
const withAuth = require("../utils/auth");
//display all comments that were created by users

//route path for homeRoutes
// '/'
router.get("/", async (req, res) => {
  try {
    const blogData = await BlogP.findAll({
      include: [
        {
          model: User,
          // attributes:['username'],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);
    // res.json(blogs); testing backend
    res.status(200).render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//seperate handlebar display
//get method displaying the blog and the comments that were made on that blog

router.get("/blog/:id", async (req, res) => {
  console.log("req.params.id: home routes get of blog", req.params.id);
  try {
    const blogData = await BlogP.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [{ model: User }],
        },
      ],
    });
    // const blogs = blogData.map((blog) => blog.get({ plain: true }));
    const blog = blogData.get({ plain: true });
    console.log(blog);

    res.status(200).render("dashboard", {
      blog,
      logged_in: req.session.logged_in,
      iscreatedpost: true,
    });
    // dont need
    // res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/comment/:id", withAuth, async (req, res) => {
  console.log("req.params.id: home routes get of blog", req.params.id);
  try {
    const blogData = await BlogP.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [{ model: User }],
        },
      ],
    });
    // const blogs = blogData.map((blog) => blog.get({ plain: true }));
    const blog = blogData.get({ plain: true });

    console.log(blog);

    res.status(200).render("comment", {
      blog,
      logged_in: req.session.logged_in,
      iscomment: true,
      btn: "Comment",
    });
    // dont need this 89
    // res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/blogupdate/:id', async(req,res)=>{
//     console.log('req.params.id: home routes get of updated blog', req.params.id);
//     try{
//         const blogData = await BlogP.findByPk(req.params.id,{

//             include:[
//             {
//                 model:User,
//                 // include: [User],
//             }
//         ],
//         });
//         const blog = blogData.get({plain:true});
//         res.status(200).render('dashboard',{
//             blog,
//             logged_in:req.session.logged_in,
//             iscreatedpost:true
//         });
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

//post on blog that has a user id  on seperate page
// router.post('/comment',withAuth,async(req,res)=>{
//     try{
//         //get all comments that were made on the blog that was clicked
//         //depending on the user id connected to the blog
//         const newComment = await Comment.create({
//             ...req.body,
//             user_id:req.session.user_id,
//             blog_id: req.body.blog_id
//         });
//         res.status(200).json(newComment);
//     }catch(err){
//         res.status(500).json(err);
//     }
// })
//create a comment/:id so that the comment can be associated to the blog

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login", {
    formTitle: "Login",
    formClass: "login-form",
    formAction: "/api/user/login",
    formButtonText: "Login",
    isLoginForm: true,
  });
});

router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup", {
    formTitle: "Sign up",
    formClass: "signup-form",
    formAction: "api/user/signup",
    formButtonText: "Sign up",
    isLoginForm: false,
  });
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    logged_in: req.session.logged_in,
    isdashboard: true,
    btn: "Create",
  });
});
//  withAuth,
router.get("/comment", (req, res) => {
  res.render("comment", {
    logged_in: req.session.logged_in,
    iscomment: true,
    btn: "Comment",
  });
});
router.get("/newComment/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!comment) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    const commentData = comment.get({ plain: true });
    const blog = await BlogP.findByPk(commentData.blog_id);

    if (!blog) {
      res.status(404).json({ message: "No blog found with that id!" });
      return;
    }

    const blogData = blog.get({ plain: true });

    console.log(blogData);
    // res.json({
    //   comment: commentData,
    //   blog: blogData,
    //   blogContent: blogData.content,
    //   logged_in: req.session.logged_in,
    // });
    res.render("createdComment", {
      comment: commentData,
      blog: blogData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/homepage", (req, res) => {
  res.render("homepage");
});

module.exports = router;
