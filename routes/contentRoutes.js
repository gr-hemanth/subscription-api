const express = require("express");
const fs = require("fs");
const path = require("path");

const authMiddleware = require("../middleware/authMiddleware");
const premiumMiddleware = require("../middleware/premiumMiddleware");

const router = express.Router();

/* FREE CONTENT */
router.get("/free", authMiddleware, (req, res) => {
  res.json({ message: "This is free content" });
});

/* PREMIUM CONTENT */
router.get("/premium", authMiddleware, premiumMiddleware, (req, res) => {

  const logLine = `User ${req.user.id} accessed premium content at ${new Date().toISOString()}\n`;

  const logFile = path.join(__dirname, "..", "logs", "access.log");

  fs.appendFileSync(logFile, logLine, "utf8");

  res.json({ message: "This is premium content" });
});

module.exports = router;