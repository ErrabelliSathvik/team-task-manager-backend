const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/projects", projectRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});


// Start Server
const startServer = async () => {

  try {

    console.log("Connecting to MongoDB...");

    await connectDB();

    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {

    console.log(error);

  }

};

startServer();