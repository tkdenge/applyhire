import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// ===== Jobs CRUD functions =====

// GET all items
export const getJobs = async () => {
  try {
    const res = await API.get("/jobs");
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// POST new item
export const createJob = async (data) => {
  try {
    const res = await API.post("/jobs", data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// PUT / update item
export const updateJob = async (jobId, data) => {
  try {
    const res = await API.put(`/jobs/${jobId}`, data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// DELETE item
export const deleteJob = async (jobId) => {
  try {
    const res = await API.delete(`/jobs/${jobId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export default API;