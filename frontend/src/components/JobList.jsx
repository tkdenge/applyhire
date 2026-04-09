import { deleteJob, updateJob } from "../utils/api";
import "./JobList.css";

function JobList({ jobs, refreshJobs }) {

  const handleDeleteJob = async (id) => {
    await deleteJob(id);
    refreshJobs();
  };

  const handleUpdateStatus = async (id, status) => {
    await updateJob(id, { status });
    refreshJobs();
  };

  return (
    <div className="job-list">
      {Array.isArray(jobs) && jobs.map(job => (

        
        <div key={job._id} className="job-card">

          <h3>{job.company}</h3>
          <p>{job.role}</p>

          <span className={`status ${job.status}`}>
            {job.status}
          </span>

          <div className="job-controls">
            <select
              value={job.status}
              onChange={(e) =>
                handleUpdateStatus(job._id, e.target.value)
              }
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <button
              className="delete-btn"
              onClick={() => handleDeleteJob(job._id)}
            >
              Delete
            </button>
          </div>

        </div>

      ))}
    </div>
  );
}

export default JobList;