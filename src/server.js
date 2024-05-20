const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 5000;

// Connects the app to a MongoDB database
mongoose.connect("mongodb://localhost:27017/quickMath", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(bodyParser.json());

// Define Mongoose schema
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
});

// Define Mongoose Model
const User = mongoose.model("User", userSchema);

// secure user account page

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token from header:", token);
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).json({ error: "Invalid token." });
  }
};

app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define API endpoints

// Leaderboard endpoint
app.get("/api/leaderboard", async (req, res) => {
  try {
    // find all users, project only the highscore, and sort by total score in descending order
    const topScores = await User.find()
      .sort({ "highScore.total": -1 })
      .limit(10)
      .select("username highScore");

    console.log("Top Scores:", topScores);
    res.status(200).json(topScores);
  } catch (error) {
    console.error("Error fecthing leaderboard:", error);
    res.status(500).json({ error: "Interal Seerver Error" });
  }
});

// Score endpoint
app.post("/api/score", authenticateToken, async (req, res) => {
  const { total, rounds, streak, perfects } = req.body;
  if (
    ![total, rounds, streak, perfects].every(
      (score) => typeof score === "number"
    )
  ) {
    return res.status(400).json({ error: "All scores must be a number" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (total > user.highScore.total) {
      user.newScore.push({ total, rounds, streak, perfects });
      user.highScore = { total, rounds, streak, perfects };
      await user.save();
      res.status(200).json({ message: "New High Score" });
    } else {
      return res.status(200).json({
        message: "Score is less than Personal best and has been deleted",
      });
    }
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Register endpoint
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
        .json({ error: "User with this username already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credential" });
    }
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "12h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
