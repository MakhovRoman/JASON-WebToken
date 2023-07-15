const Pool = reqire("pg").Pool;

const pool = new Pool({
  user: "postgress",
  password: "30888666",
  host: "localhost",
  port: 5432,
  database: "jwttutorial"
})

module.exports = pool;
