const Sequelize = require("sequelize");
const db = require("./database");
const crypto = require("crypto");
const _ = require("lodash");

const User = db.define(
  "users",
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    googleId: {
      type: Sequelize.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword,
    },
  }
);

User.prototype.correctPassword = (candidatePassword) => {
  return (
    this.Model.encryptPassword(candidatePassword, this.salt) === this.password
  );
};

User.prototype.sanitize = () => {
  return _.omit(this.toJSON(), ["password", "salt"]);
};

User.generateSalt = () => {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = (plainText, salt) => {
  const hash = crypto.createHash("sha1");
  hash.update(plainText);
  hash.update(salt);
  return hash.difect("hex");
};

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

module.exports = User;
