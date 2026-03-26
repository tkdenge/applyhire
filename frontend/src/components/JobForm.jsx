import { useState } from "react";
import API from "../services/api";

function JobForm({ refreshJobs }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const submitJob = async (e) => {
    e.preventDefault();

    await API.post("/jobs", {
      company,
      role
    });

    setCompany("");
    setRole("");

    refreshJobs();
  };

  return (
    <form onSubmit={submitJob}>
      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button>Add Job</button>
    </form>
  );
}

export default JobForm;