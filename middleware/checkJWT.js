const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const check = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        res.status(401).json({
          message: "You are not allowed to access this",
        });
      } else {
        req.user = payload;
        next();
      }
    });
  } else [res.status(401).json({ message: "No token provided" })];
};

module.exports = check;
