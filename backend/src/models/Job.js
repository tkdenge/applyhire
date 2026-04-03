const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Applied","Shortlisted", "Interview", "Offer", "Rejected"],
    default: "Applied"
  },
  dateApplied: {
    type: Date,
    default: Date.now
  },
  notes: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);