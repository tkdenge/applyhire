import API from "../services/api";

function JobList({ jobs, refreshJobs }) {

  const deleteJob = async (id) => {
    await API.delete(`/jobs/${id}`);
    refreshJobs();
  };

   const updateStatus = async (id, status) => {
    await API.put(`/jobs/${id}`, { status });
    refreshJobs();
  };

  return (
    <div>
      {jobs.map((job) => (
        <div key={job._id} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>

          <h3>{job.company}</h3>
          <p>{job.role}</p>
          <p>Status: {job.status}</p>

          <select
            value={job.status}
            onChange={(e) =>
              updateStatus(job._id, e.target.value)
            }
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <br /><br />

          <button onClick={() => deleteJob(job._id)}>
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}

export default JobList;