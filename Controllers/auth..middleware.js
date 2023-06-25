const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "kanban");
      if (decoded) {
        req.body.email_task = decoded.email_task;
        next();
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    res.status(401).send({ msg: "Token Not Found, Please Login again" });
  }
};

module.exports = { auth };
