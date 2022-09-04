const router = require("express").Router();
const { User, Blogpost, Comment } = require("../models");
const { DateTime } = require("luxon");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blogpost.findByPk(id, {
    raw: true,
    include: [{ model: User }],
  });
  blog.author = blog["user.name"];
  const comments = await Comment.findAll({
    raw: true,
    where: { blogpost_id: id },
    include: [{ model: User }],
  });
  console.log('>>>>>>>>comments', comments)
  blog.comments = comments;
  console.log('blog', blog)
  // const author = await User.findByPk(blog.user_id, {
  //   raw: true,
  // });
  blog.updatedAt = DateTime.fromJSDate(blog.updatedAt).toLocaleString(
    DateTime.DATETIME_MED_WITH_SECONDS
  );
  // blog.author = author.name;
  const user = await User.findByPk(req.session.userId, {
    raw: true,
  });
  res.render("blog", {
    blog,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
    user: JSON.stringify(user),
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blogpost.findByPk(id, { raw: true });
  const { data } = req.body;
  const commentData = data.commentData || null;
  const comments = JSON.parse(blog.comments) || [];
  comments.push(commentData);
  blog.comments = comments;
  await Blogpost.update(blog, { where: { id: id } });
  res.status(200).json(blog);
});
module.exports = router;
