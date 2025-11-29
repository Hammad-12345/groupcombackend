const AdminLoginModel = require("../../Model/AdminLoginModel");
const jwt = require("jsonwebtoken");

const AdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "username and password are required"
      });
    }

    // Find admin in MongoDB AdminLogin collection
    const admin = await AdminLoginModel.findOne({ username:username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    // Check password (you may want to use bcrypt for password hashing)
    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id,
        username: admin.username
      },
      process.env.JWT_SECRET_KEY || "your-secret-key-change-in-production",
      { expiresIn: "24h" } // Token expires in 24 hours
    );

    // Successful login
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: admin._id,
        email: admin.email,
        username: admin.username
      },
      token: token
    });

  } catch (error) {
    console.error("Error in AdminLogin:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = { AdminLogin };