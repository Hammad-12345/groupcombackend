const express = require("express");
const {
  Addrealestateproperty,
  Fetchrealestateproperty,
  Deleterealestateproperty,
  Updaterealestateproperty
} = require("../../Controller/AdminController/AdminRealestateController");
const { verifyToken } = require("../../middleware/authMiddleware");
const { upload } = require("../../../cloudinary");

const Realestateroute = express.Router();

// Protected Route
Realestateroute.post("/addproperty", verifyToken,upload.single("images"), Addrealestateproperty);
Realestateroute.get("/fetchproperty", verifyToken, Fetchrealestateproperty);
Realestateroute.delete("/deleteproperty/:id", verifyToken, Deleterealestateproperty);
Realestateroute.put("/updateproperty/:id", verifyToken, upload.single("images"), Updaterealestateproperty);

module.exports = Realestateroute;
