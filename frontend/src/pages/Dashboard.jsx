import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { useEffect, useState } from "react";
import { getJobs } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../public/Artboard 1.svg";
import "../pages/Dashboard.css"
import Footer from "../components/Footer";

function Dashboard() {

  const [jobs,setJobs] = useState([]);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

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
    <>
      <div className="dashboard">

        <div className="dashboard-header">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="logo" />
          </Link>

          <button className="logout-btn" onClick={handleLogout}>Logout
          </button>
        </div>

        <div className="dashboard-content">
            <div className="dashboard-card">
              <JobForm refreshJobs={fetchJobs} />
            </div>

            <div className="dashboard-card">
              <h2>All Jobs</h2>
              <JobList jobs={jobs} refreshJobs={fetchJobs} />
            </div>
        </div>

      </div>

      <div className="dashboard-footer">
          <Footer/>
      </div>
    </>
  );

}

export default Dashboard;