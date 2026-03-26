const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getJobs,
  createJob,
  deleteJob,
  updateJob
} = require("../controllers/jobController");

router.get("/", auth, getJobs);

router.post("/", auth, createJob);

router.delete("/:id", auth, deleteJob);

router.put("/:id", auth, updateJob);

module.exports = router;