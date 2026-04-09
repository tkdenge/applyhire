import { useState } from "react";
import { createJob } from "../utils/api";
import "./JobForm.css";

function JobForm({ refreshJobs }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const handleCreateJob = async (e) => {
    e.preventDefault();

    if (!company || !role) return;

    await createJob({ company, role });

    setCompany("");
    setRole("");

    refreshJobs();
  };

  return (
    <form onSubmit={handleCreateJob} className="job-form">
      
      <h3>Add Job</h3>

      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;