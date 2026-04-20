const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const protectedRoutes = require("./routes/protectedRoutes");

dotenv.config();

if(process.env.NODE_ENV !== "production") {
  app.use(cors());

  // Health check route
  app.get("/", (req, res) => {
    res.status(200).send("API working");
  })
}

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", protectedRoutes);


if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get(/.*/,(req, res)=> {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"))
  })
};

module.exports = app;