const express = require("express");
const {
  getrealestatedatauser,
  getrealestatedatausersale,
  getrealestatedatauserrent
} = require("../../Controller/UserController/GetRealEstateController");
const Realestateshowuserroute = express.Router();

Realestateshowuserroute.get("/getdata", getrealestatedatauser);
Realestateshowuserroute.get("/saledata", getrealestatedatausersale);
Realestateshowuserroute.get("/rentdata", getrealestatedatauserrent);
module.exports = Realestateshowuserroute;
