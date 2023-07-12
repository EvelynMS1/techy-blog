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
      // this is for the update and delete btns that show up on the page
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
    const comments = blog.comments;

    console.log("comments" + JSON.stringify(comments, null, 2));
    console.log(blog);

    res.status(200).render("comment", {
      comments,
      blog,
      logged_in: req.session.logged_in,
      iscomment: true,
      btn: "Comment",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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
router.get("/dashboard", async (req, res) => {
  try {
    // Check if the user is logged in
    if (!req.session.logged_in) {
      res.redirect("/login");
      return;
    }

    // Fetch the blogs created by the user in session
    const blogData = await BlogP.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Render the dashboard view with the user's blogs
    res.status(200).render("dashboard", {
      user: req.session.user_id,
      blogs,
      logged_in: req.session.logged_in,
      //state for partial
      isdashboard: true,
      userblog: true,
      btn: "Create",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//  withAuth,
router.get("/comment", (req, res) => {
  res.render("comment", {
    logged_in: req.session.logged_in,
    iscomment: true,
    btn: "Comment",
  });
});
// router.get("/newComment/:id", async (req, res) => {
//   try {
//     const comment = await Comment.findByPk(req.params.id, {
//       include: [{ model: User, attributes: ["username"] }],
//     });

//     if (!comment) {
//       res.status(404).json({ message: "No comment found with that id!" });
//       return;
//     }

//     const commentData = comment.get({ plain: true });
//     const blog = await BlogP.findByPk(commentData.blog_id);

//     if (!blog) {
//       res.status(404).json({ message: "No blog found with that id!" });
//       return;
//     }

//     const blogData = blog.get({ plain: true });

//     console.log(blogData);

//     res.render("createdComment", {
//       newComment: true,
//       comment: commentData,
//       blog: blogData,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
