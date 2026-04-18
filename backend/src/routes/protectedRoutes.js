const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    userId: req.userId,
  });
});

module.exports = router;