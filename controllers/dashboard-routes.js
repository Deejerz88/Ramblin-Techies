const router = require("express").Router();
const { User, Blogpost } = require("../models");
const { DateTime } = require("luxon");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  userData = await User.findByPk(id, { raw: true });
  const blogs = await Blogpost.findAll({
    raw: true,
    where: { user_id: id },
    order: [["updatedAt", "DESC"]],
  });
  blogs.forEach((blog) => {
    blog.updatedAt = DateTime.fromJSDate(blog.updatedAt).toLocaleString(
      DateTime.DATETIME_MED_WITH_SECONDS
    );
    blog.createdAt = DateTime.fromJSDate(blog.createdAt).toLocaleString(
      DateTime.DATETIME_MED_WITH_SECONDS
    );
  });
  userData.blogs = blogs;
  console.log("userData", userData);
  res.render("dashboard", {
    userData,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
  });
});

module.exports = router;
