const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const About = sequelizeInstance.define("About", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
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

module.exports = About;
