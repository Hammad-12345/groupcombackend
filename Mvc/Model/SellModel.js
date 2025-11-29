const mongoose = require("mongoose");

const SellPropertiesSchema = new mongoose.Schema(
  {
    propertyAddress: {
      type: String,
      required: true,
      trim: true,
    },
    propertyType: {
      type: String,
      required: true,
      trim: true,
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
    builtUpArea: {
      type: Number,
      required: true,
      min: 1,
    },
    propertyCondition: {
      type: String,
      required: true,
      trim: true,
    },
    sellingPrice: {
      type: Number,
      min: 0,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    additionalNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const sellrealestateproperties = mongoose.model("SellProperties", SellPropertiesSchema);
module.exports = sellrealestateproperties;