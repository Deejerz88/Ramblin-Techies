const router = require("express").Router();
const { User, Blogpost, Comment } = require("../../models");

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const user_id = req.session.userId;
  try {
    const newBlogpost = await Blogpost.create({
      title,
      content,
      user_id,
    });
    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
