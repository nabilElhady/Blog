const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/User");
const app = express();

const Register = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const salt = await bcrypt.genSalt();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "Email is already in use" });
    } else {
      if (userName && email && password) {
        const newUser = await User.create({
          userName,
          password: await bcrypt.hash(password, salt),
          email,
        });
        console.log("Registration successful:", newUser);
        return res.status(200).json(newUser);
      } else {
        console.log("Invalid data");
        return res.status(400).json({ error: "Invalid data" });
      }
    }
  } catch (err) {
    // Log and handle errors
    console.log("Registration error:", err);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", details: err.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const matching = await bcrypt.compare(password, existingUser.password);
    if (matching) {
      const token = jwt.sign({ id: existingUser._id }, "strong secret", {});
      delete existingUser.password;
      return res
        .status(200)
        .json({ message: "Login successful!", token, existingUser });
    } else {
      return res.status(401).json({ message: "wrong info" });
    }
  } else {
    return res.status(401).json({ message: "wrong info" });
  }
};

module.exports = {
  Register,
  Login,
};
