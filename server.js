// ✅ Step 1: Force DNS to prioritize IPv4 (fix for MongoDB Atlas on some systems)
require('dns').setDefaultResultOrder('ipv4first');

// ✅ Step 2: Load environment variables from .env
require("dotenv").config();

// ✅ Step 3: Import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// ✅ Step 4: Initialize the Express app
const app = express();

// ✅ Step 5: Middleware setup
app.use(cors()); // Allow all CORS requests
app.use(express.json()); // Parse JSON bodies

// ✅ Step 6: Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Step 7: Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Step 8: API routes
app.use("/api/auth", require("./routes/auth"));         // User register/login
app.use("/api/product", require("./routes/product"));   // Product upload

// ✅ Step 9: Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
