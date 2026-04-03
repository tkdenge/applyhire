const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

dotenv.config();
const app = express();

if(process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);


if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get(/.*/,(req, res)=> {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"))
  })
};

module.exports = app;