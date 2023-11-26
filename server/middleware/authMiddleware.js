const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  let token = req.headers.token;

  if (token.startsWith("Beare ")) {
    // Remove the prefix
    token = token.substring(6);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "Authentication",
        status: "ERROR",
      });
    }
    const { payload } = user;
    if (payload.role === "admin") {
      console.log("is admin");
      next();
    } else {
      return res.status(404).json({
        message: "Authentication",
        status: "ERROR",
      });
    }
  });
};
module.exports = {
  authMiddleWare,
};
