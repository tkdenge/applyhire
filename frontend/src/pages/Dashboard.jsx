import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [jobs,setJobs] = useState([]);
  

  const fetchJobs = async () => {

    const res = await API.get("/jobs");

    setJobs(res.data);

  };

  useEffect(()=>{
    fetchJobs();
  },[]);

  return (

    <div>

      <h1>Job Dashboard</h1>

      <JobForm refreshJobs={fetchJobs}/>

      <JobList jobs={jobs} refreshJobs={fetchJobs}/>

    </div>

  );

}

export default Dashboard;