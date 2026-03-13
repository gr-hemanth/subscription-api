const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/logs", (req, res) => {
  const logPath = path.join(__dirname, "../logs/access.log");

  fs.readFile(logPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Unable to read log file" });
    }

    res.send(data);
  });
});

module.exports = router;