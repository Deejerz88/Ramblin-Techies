const router = require("express").Router();
const { User, Blogpost, Comment } = require("../../models");


router.get("/", async (req, res) => { 
  try {
    const comments = await Comment.findAll({
      raw: true,
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post("/", async (req, res) => {
  const { user_id, blogpost_id, content } = req.body.commentData
  try {
    const newComment = await Comment.create({
      content,
      user_id,
      blogpost_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;