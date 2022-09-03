const { Model, DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Blogpost extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Blogpost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    comments: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("comments"));
      },
      set: function (val) {
        return this.setDataValue("comments", JSON.stringify(val));
      },
      allowNull: true,
    },
  },
  {
    hooks: {},
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "blogposts",
  }
);

module.exports = Blogpost;
