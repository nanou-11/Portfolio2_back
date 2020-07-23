const User = require("./models/User")
const Work = require("./models/Work")
const About = require("./models/About")

User.hasMany(Work);
Work.belongsTo(User, { foreignKey: { allowNull: true }});

User.hasOne(About, { foreignKey: { allowNull: true }})
About.belongsTo(User, { foreignKey: { allowNull: true }})