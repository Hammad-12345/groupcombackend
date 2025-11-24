const express = require("express");
const Interiorshowuserroute = express.Router();
const {
    getinteriordatauser,
  } = require("../../Controller/UserController/GetInteriorController");

Interiorshowuserroute.get("/getdatainterior", getinteriordatauser);
module.exports = Interiorshowuserroute;
