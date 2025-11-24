const mongoose = require("mongoose");
const connectiondb = async () => {
  try {
    if (!process.env.MONGO_DB) {
      console.error("Error: MONGO_DB environment variable is not set!");
      return;
    }

    const connectionOptions = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGO_DB, connectionOptions);
    console.log("Connected With MongoDb");
  } catch (error) {
    console.error("Database connection error:", error.message);
    
    if (error.code === 'ESERVFAIL') {
      console.error("DNS Resolution Error: Unable to resolve MongoDB hostname.");
      console.error("Check your internet connection and MongoDB connection string.");
    } else if (error.name === 'MongoServerSelectionError') {
      console.error("Unable to connect to MongoDB server.");
    }
  }
};
module.exports = { connectiondb };
