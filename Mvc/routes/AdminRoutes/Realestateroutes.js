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

// Add multiple images
Realestateroute.post(
  "/addproperty",
  verifyToken,
  upload.array("images", 10),          // ⬅️ Multiple Images
  Addrealestateproperty
);

// Fetch properties
Realestateroute.get(
  "/fetchproperty",
  verifyToken,
  Fetchrealestateproperty
);

// Delete property
Realestateroute.delete(
  "/deleteproperty/:id",
  verifyToken,
  Deleterealestateproperty
);

// Update property + multiple images
Realestateroute.put(
  "/updateproperty/:id",
  verifyToken,
  upload.array("images", 10),         // ⬅️ Multiple Images
  Updaterealestateproperty
);

module.exports = Realestateroute;
  