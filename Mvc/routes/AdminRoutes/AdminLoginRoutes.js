const express = require("express");
const { AdminLogin } = require("../../Controller/AdminController/AdminLoginController");
const AdminloginRoute = express.Router();


AdminloginRoute.post("/login", AdminLogin);


module.exports = AdminloginRoute;