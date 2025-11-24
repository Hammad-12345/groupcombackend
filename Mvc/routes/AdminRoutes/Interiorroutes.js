const express = require("express");
const Interiorroute = express.Router();
const { verifyToken } = require("../../middleware/authMiddleware");
const {
  Addinteriorproperty,
  Fetchinteriorproperty,
  Deleteinteriorproperty,
  Updateinteriorproperty
} = require("../../Controller/AdminController/AdmininteriorController");
const { upload } = require("../../../cloudinary");

Interiorroute.post("/addproperty", verifyToken,upload.single("images"), Addinteriorproperty);
Interiorroute.get("/fetchproperty", verifyToken, Fetchinteriorproperty);
Interiorroute.delete("/deleteproperty/:id", verifyToken, Deleteinteriorproperty);
Interiorroute.put("/updateproperty/:id", verifyToken,upload.single("images"), Updateinteriorproperty);
module.exports = Interiorroute;
