const sequelize = require("../config/connection");
const { User, Blogpost } = require("../models");

const userSeedData = require("./userSeedData.json");
const blogpostSeedData = require("./blogpostSeedData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogpost of blogpostSeedData) {
    await Blogpost.create({
      ...blogpost,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedAll();
