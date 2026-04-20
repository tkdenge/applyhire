const Job = require("../models/Job");

exports.getJobs = async (req, res) => {

  const jobs = await Job.find({ user: req.userId });

  res.json(jobs);

};

exports.createJob = async (req, res) => {

  const job = new Job({
    ...req.body,
    user: req.userId
  });

  const saved = await job.save();

  res.status(201).json(saved);
};

exports.updateJob = async (req, res) => {

  try {
      const updated = await Job.findByIdAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body,
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: "Job not found" });

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.deleteJob = async (req, res) => {

  try {
      await Job.findByIdAndDelete({
        _id: req.params.id,
        user: req.userId,
      });
      res.json({ message: "Job deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

