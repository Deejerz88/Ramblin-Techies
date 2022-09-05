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

router.put("/:id", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const updatedBlogpost = await Blogpost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlogpost = await Blogpost.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
