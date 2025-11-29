const mongoose = require("mongoose");

const InteriorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Residential",
        "Commercial",
        "Furniture",
        "Decor",
        "Lighting",
        "Flooring",
      ],
    },

    style: {
      type: String,
      required: true,
      enum: ["Modern", "Contemporary", "Minimalist", "Classic", "Industrial"],
    },

    city: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
      min: 1,
    },

    rooms: {
      type: String, // comma separated or simple string
      default: "",
    },

    materials: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
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
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Interior = mongoose.model("Interior", InteriorSchema);

module.exports = Interior;
