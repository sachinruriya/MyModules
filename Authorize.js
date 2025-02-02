const authenticateToken = require("./authMiddleware");

const authorizeRole = (roles) => {
  return (req, res, next) => {
    authenticateToken(req, res, () => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied. Insufficient permissions." });
      }
      next();
    });
  };
};

module.exports = authorizeRole;
