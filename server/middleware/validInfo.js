module.exports = function (req, res, next) {

  // 1. destructor req.body

  const {email, name, password} = req.body;

  // 2. declare checkEmail function

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\w{2,3})+$/.test(userEmail);
  }

  // 3. Check req.path and req.body

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};
