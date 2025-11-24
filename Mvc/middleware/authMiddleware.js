const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token
 * Use this middleware to protect routes that require authentication
 * 
 * Usage:
 * const { verifyToken } = require("../middleware/authMiddleware");
 * router.get("/protected-route", verifyToken, yourController);
 */
const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "your-secret-key-change-in-production"
    );

    // Attach decoded user info to request object
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again."
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token."
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error verifying token.",
        error: error.message
      });
    }
  }
};

module.exports = { verifyToken };

