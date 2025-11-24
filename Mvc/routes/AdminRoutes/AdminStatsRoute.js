const express = require("express");
const AdminStatsRoute = express.Router();
const {
  AdminDashboardSummary,
} = require("../../Controller/AdminController/AdminDashboard");
const { verifyToken } = require("../../middleware/authMiddleware");
AdminStatsRoute.get("/summary", verifyToken, AdminDashboardSummary);
module.exports = AdminStatsRoute;
