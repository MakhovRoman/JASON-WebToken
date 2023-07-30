const router = require("express").Router();
const pool = require('../db');
const authorization = require("../middleware/authorization");

router.get("/", authorization, async(req, res) => {
  try {
    // req.user has the payload
    // res.json(req.user) //req.user --> user_id in database

    const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]); // find user by ID
    res.json(user.rows[0]) // send user

  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
})

module.exports = router;
