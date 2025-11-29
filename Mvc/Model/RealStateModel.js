const mongoose = require("mongoose");

const RealEstateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["House", "Villa", "Apartment", "Commercial", "Plot"],
    },

    purpose: {
      type: String,
      required: true,
      enum: ["Sale", "Rent", "Commercial", "Off Plan"],
    },

    city: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    size: {
      type: Number,
      required: true,
      min: 1,
    },

    description: {
      type: String,
      required: true,
    },
    // ⭐ Add Images (Array)
    images: {
      type: [String],   // ⬅️ Array of image URLs
      required: false,
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

const RealEstate = mongoose.model("RealEstate", RealEstateSchema);

module.exports = RealEstate;
