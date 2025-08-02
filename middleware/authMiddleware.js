const jwt = require("jsonwebtoken");

// Middleware: Verify JWT Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header is present and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role } from token payload
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// Optional Middleware: Allow only admins
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }
  next();
};

// Optional Middleware: Allow only customers
const verifyCustomer = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ error: "Customer access required." });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyCustomer,
};
