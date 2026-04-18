const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (id) => {
  return jwt.sign(
    { userId: id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

/// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({ name, email, password });

    
    return res.status(201).json({
      message: "User created successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    // Check credentials
    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        message: "Login successful",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    }

    // Invalid credentials
    return res.status(401).json({
      message: "Invalid credentials",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};