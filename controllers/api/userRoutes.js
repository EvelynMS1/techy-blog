const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require('../../utils/auth');
//route path for userRoutes
// /api/user
//creates new user when signed up
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get("/status", withAuth,async (req, res) => {
    // If withAuth doesn't call next() when the user isn't logged in, this line will only run if the user is logged in.
    if(req.session.logged_in) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
  });
//cehcks to see if user has been signed up
router.post("/login", async (req, res) => {
  try {
    console.log("==================================");
    console.log(req.body.email);
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//logs out by ending the session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
