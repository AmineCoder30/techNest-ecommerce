const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto"); // To hash the email for Gravatar

async function userSignUpController(req, res) {
  try {
    const { email, password, username } = req.body;

    // Check if email is provided and valid
    if (!email || !validator.isEmail(email)) {
      throw new Error("Please provide a valid email");
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Check if password and username are provided
    if (!password) {
      throw new Error("Please provide a password");
    }
    if (!username) {
      throw new Error("Please provide a username");
    }

    // Generate Gravatar URL
    const emailHash = crypto
      .createHash("md5")
      .update(email.trim().toLowerCase())
      .digest("hex");
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`; // Default fallback to an identicon

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (!hashPassword) {
      throw new Error("Error while hashing the password");
    }

    // Prepare user payload
    const payload = {
      email,
      username,
      password: hashPassword,
      profilePic: gravatarUrl, // Store Gravatar URL
      role: "GENERAL",
    };

    // Save the user to the database
    const userData = new userModel(payload);
    const savedUser = await userData.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
