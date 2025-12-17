const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authmiddleware = (req, res, next) => {
  const token = req.cookies?.adminToken;
// console.log("Token from cookies:", token ,  process.env.JWT_SECRET);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = authmiddleware;
