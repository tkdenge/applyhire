const express = require("express");
const router = express.Router();

const {
  getJobs,
  createJob,
  deleteJob,
  updateJob
} = require("../controllers/jobController");

const {protect} = require("../middleware/authMiddleware.js");

router.get("/", protect, getJobs);
router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);


module.exports = router;