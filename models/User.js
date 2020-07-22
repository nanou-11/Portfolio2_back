const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const User = sequelizeInstance.define("User", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  lastName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  github: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  linkedin: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  about: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  cv: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});
module.exports = User;
