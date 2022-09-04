const sequelize = require("../config/connection");
const { User, Blogpost, Comment } = require("../models");

const userSeedData = require("./userSeedData.json");
const blogpostSeedData = require("./blogpostSeedData.json");
const commentSeedData = require("./commentSeedData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  let blogposts = [];
  for (const blogpost of blogpostSeedData) {
    blogposts.push(
      await Blogpost.create({
        ...blogpost,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      })
    );
  }

  for (const comment of commentSeedData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blogpost_id: blogposts[Math.floor(Math.random() * blogposts.length)].id,
    });
  }

  process.exit(0);
};

seedAll();
