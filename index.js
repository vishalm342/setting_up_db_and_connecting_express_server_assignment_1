const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Check if MONGO_URI is loaded
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

// MongoDB Connection with options
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database:", error.message);
    console.log("Full error:", error);
  });

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Customer Management System API" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
