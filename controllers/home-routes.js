const router = require("express").Router();
const { User, Blogpost } = require("../models");
const { DateTime } = require("luxon");

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blogpost.findAll({
      raw: true,
    });

    blogs.forEach(async (blog) => {
      blog.updatedAt = DateTime.fromJSDate(blog.updatedAt).toLocaleString(DateTime.DATETIME_MED)
      console.log(blog.user_id)
      const author = await User.findByPk(blog.user_id, { raw: true });
      blog.author = author.name
    });

    console.log(blogs[0])
    req.session.save(() => {
      if (req.session.countVisit) {
        req.session.countVisit++;
      } else {
        req.session.countVisit = 1;
      }
      res.render("homepage", {
        blogs,
        loggedIn: req.session.loggedIn,
        countVisit: req.session.countVisit,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;