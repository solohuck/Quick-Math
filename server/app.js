const fs = require("fs");
const https = require("https");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

const generateAcessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  );
};

// CONNECT TO MONGO-DB
mongoose.connect("mongodb://localhost:27017/quickMath", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// DEFINE USER SCHEMA
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  newScore: [
    {
      total: {
        type: Number,
      },
      rounds: {
        type: Number,
      },
      streak: {
        type: Number,
      },
      perfects: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  currentRank: {
    type: Number,
  },
  highScore: {
    total: {
      type: Number,
      default: 0,
    },
    rounds: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    perfects: {
      type: Number,
      default: 0,
    },
  },
  refreshToken: {
    type: String,
  },
});

// CREATE USER MODEL
const User = mongoose.model("User", userSchema);

// MIDDLEWARE
app.use(bodyParser.json());

// TOKEN AUTHENTICATION MIDDLEWARE**
// - Extracts the token from the 'authorization' header
// - Verifies token using secret
// - If valid, attaches the decoded token data to the 'req.user' and calls the next() to proceed to the next middleware or route handler
const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token from header:", token);
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Token is not valid. Please login again" });
    }
  });
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).json({ error: "Invalid token." });
  }
};

// USER DATA ENDPOINT (protected)**
// - Finds the user by ID and returns user data
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", Error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// TOKEN REFRESH ENDPOINT
app.post("/api/token", async (req, res) => {
  const { refreshToken } = req.body;
  console.log("Refresh token received:", refreshToken);

  if (!refreshToken)
    return res.status(401).json({ error: "No token provided" });

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ error: "Invalid refresh token" });

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("Error verifying refresh token:", err);
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      const accessToken = generateAcessToken({ username: user.username });
      return res.json({ accessToken });
    });
  } catch (error) {
    console.error(" Error refreshing token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// LEADERBOARD ENDPOINT**
// - Retrieves top 10 users sorted by 'highScore.total' in descenging order
// - Returns their 'username' and 'highScore'
app.get("/api/leaderboard", async (req, res) => {
  try {
    const topScores = await User.find()
      .sort({ "highScore.total": -1 })
      .limit(10)
      .select("username highScore");
    res.status(200).json(topScores);
  } catch (error) {
    res.status(500).json({ error: "Interal Seerver Error" });
  }
});

// SUBMIT SCORE ENDPOINT (protected)**
// - Protected route to submit a new score
// - Validates that all scores are numbers
// - Updates user's high score if the new score is higher
app.post("/api/score", authenticateToken, async (req, res) => {
  const { total, rounds, streak, perfects } = req.body;
  if (
    [total, rounds, streak, perfects].some((score) => typeof score !== "number")
  ) {
    return res.status(400).json({ error: "All scores must be a number" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const previousRank = user.currentRank;

    if (total > user.highScore.total) {
      user.newScore.push({ total, rounds, streak, perfects });
      user.highScore = { total, rounds, streak, perfects };
      await user.save();

      // calc the new rank for the user based on the new highscore
      const pipeline = [
        { $match: { "highScore.total": { $gt: total } } },
        { $group: { _id: null, rank: { $sum: 1 } } },
      ];

      const calculateRank = await User.aggregate(pipeline);
      const newRank = calculateRank.length > 0 ? calculateRank[0].rank + 1 : 1;

      // update currentRank if rank cahnges
      if (newRank !== previousRank) {
        user.currentRank = newRank;
        await user.save();
      }

      res.status(200).json({
        message: `New High Score! New rank: ${newRank}`,
      });
    } else {
      return res.status(200).json({
        message: `Current high score: ${user.highScore.total} & current rank: ${user.currentRank}`,
      });
    }
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// REGISTER ENDPOINT**
// - Registers a new user
// - Hashes the password using bcrypt
// - Saves the new user in the database
app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// LOGIN ENDPOINT**
// - Authenticates a user
// - Verifies the password using bcrypt
// - Generates an access token and a refresh token
// - Saves the refresh token in the database
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credential" });
    }

    const accessToken = generateAcessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    console.log("Setting refresh token cookie:", refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure this is only true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// LOGOUT ENDPOINT
app.post("/api/logout", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the refreshToken
    user.refreshToken = "";
    await user.save();

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// START THE HTTPS SERVER
const options = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
