const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Work = sequelizeInstance.define("Work", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  label: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  tools: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  screenshot1: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  screenshot2: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  screenshot3: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING(255),
    allowNull: false,
  }
});
module.exports = Work;
