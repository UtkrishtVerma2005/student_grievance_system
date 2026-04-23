const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 🔑 Authorization header lo
    const authHeader = req.headers.authorization;

    // ❌ agar token nahi hai
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 🔍 "Bearer token" se token extract karo
    const token = authHeader.split(" ")[1];

    // 🔐 verify token (IMPORTANT: env se lo)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 user attach karo request me
    req.user = decoded;

    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;