const router = require("express").Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

// registering
router.post("/register", async(req, res) => {
  try {

    // 1. destructor the req.body(name, email, password)

    const {name, email, password} = req.body;

    // 2. check if user exist (if user exist then throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist")
    }

    // 3. Bcrypt the user password

    const saltRound = 10; //npmjs.com - bcrypt
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the user inside out database

    const newUser = await pool.query(
      `INSERT INTO users (user_name, user_email, user_password)
      VALUES ($1, $2, $3) RETURNING *`,
      [name, email, bcryptPassword]
    );

    // 5. generating our jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({token});

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
})

module.exports = router;
