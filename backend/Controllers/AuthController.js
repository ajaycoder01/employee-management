

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../Models/User');

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "user" // default role
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 🔥 SAME RESPONSE FOR ADMIN & USER
    res.status(200).json({
      success: true,
      message: "Login successful",
      jwtToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { Signup, login };
