import { deleteJob, updateJob } from "../utils/api";

function JobList({ jobs, refreshJobs }) {

  const HandleDeleteJob = async (id) => {
    await deleteJob(id);
    refreshJobs();
  };

  const handleUpdateStatus = async (id, status) => {
    await updateJob(id,{ status });
    refreshJobs();
  };

  return (
    <div>
      {Array.isArray(jobs) && jobs.map(job => (
        <div key={job._id} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>

          <h3>{job.company}</h3>
          <p>{job.role}</p>
          <p>Status: {job.status}</p>

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

          <br /><br />

          <button onClick={() => HandleDeleteJob(job._id)}>
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}

export default JobList;