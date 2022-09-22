const router = require("express").Router();
const { User, Blogpost } = require("../models");
const { DateTime } = require("luxon");

router.get("/login", (req, res) => {
  const { blogId } = req.query || null;
  if (req.session.logged_in) {
    if (blogId) {
      res.redirect(`/blogpost/${blogId}`);
    } else {
      res.redirect("/");
    }
    return;
  }

  res.render("login");
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blogpost.findAll({
      raw: true,
      order: [["updatedAt", "DESC"]],
    });

    blogs.forEach(async (blog) => {
      blog.updatedAt = DateTime.fromJSDate(blog.updatedAt).toLocaleString(
        DateTime.DATETIME_MED
      );
      blog.createdAt = DateTime.fromJSDate(blog.createdAt).toLocaleString(
        DateTime.DATETIME_MED_WITH_SECONDS
      );
      const author = await User.findByPk(blog.user_id, { raw: true });
      blog.author = author.name;
    });

    req.session.save(() => {
      if (req.session.countVisit) {
        req.session.countVisit++;
      } else {
        req.session.countVisit = 1;
      }
      res.render("homepage", {
        blogs,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        countVisit: req.session.countVisit,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
