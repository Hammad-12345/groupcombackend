const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AdminLoginModel = require("./Mvc/Model/AdminLoginModel");

dotenv.config();

const seedDefaultAdmin = async () => {
  try {
    // Connect to database with connection options to handle DNS issues
    const connectionOptions = {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    if (!process.env.MONGO_DB) {
      console.error("Error: MONGO_DB environment variable is not set!");
      console.log("Please make sure your .env file contains MONGO_DB=your_connection_string");
      process.exit(1);
    }

    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_DB, connectionOptions);
    console.log("Connected With MongoDb");

    // Default admin data
    const defaultAdmin = {
      username: "admin",
      password: "admin123", // In production, this should be hashed
    };

    // Check if admin already exists
    const existingAdmin = await AdminLoginModel.findOne({ 
      username: defaultAdmin.username 
    });

    if (existingAdmin) {
      console.log("Default admin already exists in the database.");
      process.exit(0);
    }

    // Create default admin
    const admin = new AdminLoginModel(defaultAdmin);
    await admin.save();

    console.log("Default admin created successfully!");
    console.log("Username:", defaultAdmin.username);
    console.log("Password:", defaultAdmin.password);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding default admin:", error);
    
    // Provide helpful error messages
    if (error.code === 'ESERVFAIL') {
      console.error("\nDNS Resolution Error:");
      console.error("Unable to resolve MongoDB Atlas hostname. Possible causes:");
      console.error("1. Check your internet connection");
      console.error("2. Verify your MongoDB connection string in .env file");
      console.error("3. Check if your IP is whitelisted in MongoDB Atlas");
      console.error("4. Try using a different DNS server (e.g., 8.8.8.8)");
      console.error("5. Disable VPN if active");
    } else if (error.name === 'MongoServerSelectionError') {
      console.error("\nMongoDB Server Selection Error:");
      console.error("Unable to connect to MongoDB. Check your connection string and network settings.");
    }
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedDefaultAdmin();

