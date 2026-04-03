import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL : "/api";

const API = axios.create({
  baseURL: BASE_URL,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// ===== AUTH =====
export const signupUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};


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