const express = require("express");
const {
  getrealestatedatauser,
  getrealestatedatausersale,
  getrealestatedatauserrent,
  getrealestatedatausercommercial,
  getrealestatedatauseroffplan,
  sellproperties,
  fetchsellproperties
  } = require("../../Controller/UserController/GetRealEstateController");
const { verifyToken } = require("../../middleware/authMiddleware");
const Realestateshowuserroute = express.Router();

Realestateshowuserroute.get("/getdata", getrealestatedatauser);
Realestateshowuserroute.get("/saledata", getrealestatedatausersale);
Realestateshowuserroute.get("/rentdata", getrealestatedatauserrent);
Realestateshowuserroute.get("/commercialdata", getrealestatedatausercommercial);
Realestateshowuserroute.get("/offplandata", getrealestatedatauseroffplan);
Realestateshowuserroute.post("/sellproperties", sellproperties);
Realestateshowuserroute.get("/fetchsellproperties",verifyToken, fetchsellproperties);
module.exports = Realestateshowuserroute;
