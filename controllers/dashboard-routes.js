const router = require("express").Router();
const { User } = require("../models");
const fs = require("fs");



router.get("/:id", async (req, res) => {
  const id = req.params.id;
  userData = await User.findByPk(id, { raw: true });
  res.render("dashboard", {
    userData,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
  });
});



module.exports = router;