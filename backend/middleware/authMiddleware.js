const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token)
      return res.status(401).json({ message: "No token" });

    const cleanToken = token.split(" ")[1];
    const decoded = jwt.verify(cleanToken, "secret");

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;