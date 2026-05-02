import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import { register, login } from "./controllers/authController";
import "dotenv/config";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(json());

app.post("/api/register", register);
app.post("/api/login", login);

const PORT = process.env.PORT || 3001;
const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ryan2:Jeffbezos5@ryansdb.jdngomb.mongodb.net/?appName=ryansdb";

connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
