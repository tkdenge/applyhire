import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { useEffect, useState } from "react";
import { getJobs } from "../services/api";


function Dashboard() {

  const [jobs,setJobs] = useState([]);
  

  const fetchJobs = async () => {
    try {
      const data = await getJobs(); // data = array of jobs
      console.log("API response:", data);
      setJobs(data); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  loadJobs();
  }, []);
  return (

    <div>

      <h1>Job Dashboard</h1>

      <JobForm refreshJobs={fetchJobs}/>

      <JobList jobs={jobs} refreshJobs={fetchJobs}/>

    </div>

  );

}

export default Dashboard;