const express = require("express");
const { User } = require("../models");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware");

const router = express.Router();

// Get all users (Admin only)
router.get("/", authenticateToken, authorizeRole(["admin"]), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get single user (Protected)
router.get("/:id", authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Update user (User can update their own details, Admin can update anyone)
router.put("/:id", authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  if (req.user.role !== "admin" && req.user.id !== user.id) {
    return res.status(403).json({ error: "Access denied" });
  }

  await user.update(req.body);
  res.json(user);
});

// Delete user (Admin only)
router.delete("/:id", authenticateToken, authorizeRole(["admin"]), async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await user.destroy();
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
