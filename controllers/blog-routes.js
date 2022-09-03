const router = require("express").Router();
const { User, Blogpost } = require("../models");
const { DateTime } = require("luxon");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blogpost.findByPk(id, { raw: true });
  const author = await User.findByPk(blog.user_id, { raw: true });
  blog.updatedAt = DateTime.fromJSDate(blog.updatedAt).toLocaleString(
    DateTime.DATETIME_MED
  );
  blog.author = author.name;
  console.log("blog comments", typeof blog.comments);
  res.render("blog", {
    blog,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blogpost.findByPk(id, { raw: true });
  const { data } = req.body;
  console.log("data", data);
  const commentData = data.commentData || null;
  const comments = JSON.parse(blog.comments) || [];
  console.log("comments", comments);
  comments.push(commentData);
  console.log(">>>>new comments", comments);
  blog.comments = comments;
  console.log(">>>>new Blog", blog);
  await Blogpost.update(blog, { where: { id: id } });
  res.status(200).json(blog);
});
module.exports = router;
