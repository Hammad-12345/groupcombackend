const mongoose = require("mongoose");

const AdminLoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Update the updatedAt field before saving
AdminLoginSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const AdminLogin = mongoose.model("AdminLogin", AdminLoginSchema);

module.exports = AdminLogin;
