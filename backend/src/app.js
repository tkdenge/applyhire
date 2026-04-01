const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);

module.exports = app;