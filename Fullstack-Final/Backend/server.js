const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const allRoutes = require("./Routers/allRoutes");
const Student = require("./models/Student");
const Faculty = require("./models/Faculty");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Passport JWT Configuration
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "super_secret_fallback_key",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      let user;
      if (jwt_payload.userType === "Student") {
        user = await Student.findById(jwt_payload.id);
      } else {
        user = await Faculty.findById(jwt_payload.id);
      }

      if (user) {
        return done(null, {
          ...user.toObject(),
          userType: jwt_payload.userType,
        });
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }),
);

app.use(passport.initialize());

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
