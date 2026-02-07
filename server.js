require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");

const authRoutes = require("./src/routes/authroutes");
const fileRoutes = require("./src/routes/fileroutes");

const app = express();

/* 🔥 ADD THESE TWO LINES */
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Secure File Sharing API running");
});

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
