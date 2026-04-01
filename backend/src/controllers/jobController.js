const Job = require("../models/Job");

exports.getJobs = async (req, res) => {

  const jobs = await Job.find();

  res.json(jobs);

};

exports.createJob = async (req, res) => {

  const job = new Job(req.body);

  const saved = await job.save();

  res.json(saved);

};

exports.updateJob = async (req, res) => {

  try {
      const updated = await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.deleteJob = async (req, res) => {

  try {
      await Job.findByIdAndDelete(req.params.id);
      res.json({ message: "Job deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

