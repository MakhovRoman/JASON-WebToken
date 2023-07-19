const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req, res, next) => {
  try {

    // 1. desctructor req.header

    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }

    // 2. verify jwt

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    // 3. send payload

    req.user = payload.user

  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authorize");
  }

  next();
}
