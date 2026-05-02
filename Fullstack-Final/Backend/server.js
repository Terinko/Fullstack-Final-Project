const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const allRoutes = require("./Routers/allRoutes");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Use the consolidated routes
app.use("/api", allRoutes);

const PORT = process.env.PORT || 3001;
const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ryan2:Jeffbezos5@ryansdb.jdngomb.mongodb.net/?appName=ryansdb";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
