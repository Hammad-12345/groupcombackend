const RealEstate = require("../../Model/RealStateModel");
const sellrealestateproperties = require("../../Model/SellModel")
// GET all real estate data for users
const getrealestatedatauser = async (req, res) => {
  try {
    let properties = await RealEstate.find().sort({ createdAt: -1 }).lean();
    if (!properties || properties.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No properties found",
        data: [],
      });
    }
    // Format createdAt, remove updatedAt and __v
    properties = properties.map((item) => {
      const date = new Date(item.createdAt);

      // ---- DATE FORMATTING ----
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      // ---- TIME FORMATTING ----
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // convert to 12-hour format

      const formattedCreatedAt = `${day}/${month}/${year} — ${hours}:${minutes} ${ampm}`;

      return {
        ...item,
        createdAt: formattedCreatedAt, // custom formatted
        updatedAt: undefined, // remove updatedAt
        __v: undefined, // remove _v
      };
    });

    res.status(200).json({
      success: true,
      message: "Properties fetched successfully",
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching properties",
      error: error.message,
    });
  }
};

// GET all real estate data for users with purpose "Sale"
const getrealestatedatausersale = async (req, res) => {
  try {
    // Find all properties where purpose is "Buy"
    const SaleProperties = await RealEstate.find({ purpose: "Sale" });

    if (!SaleProperties || SaleProperties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No properties found for Sale purpose",
      });
    }

    res.status(200).json({
      success: true,
      data: SaleProperties,
      message: "Sale properties fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Sale properties:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching Sale properties",
      error: error.message,
    });
  }
};

// GET all real estate data for users with purpose "Rent"
const getrealestatedatauserrent = async (req, res) => {
  try {
    // Find all properties where purpose is "Rent"
    const RentProperties = await RealEstate.find({ purpose: "Rent" });

    if (!RentProperties || RentProperties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No properties found for Rent purpose",
      });
    }

    res.status(200).json({
      success: true,
      data: RentProperties,
      message: "Rent properties fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Rent properties:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching Rent properties",
      error: error.message,
    });
  }
};
// GET all real estate data for users with purpose "Commercial"
const getrealestatedatausercommercial = async (req, res) => {
  try {
    const CommercialProperties = await RealEstate.find({ purpose: "Commercial" });
    if (!CommercialProperties || CommercialProperties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No commercial properties found",
      });
    }
    res.status(200).json({
      success: true,
      data: CommercialProperties,
      message: "Commercial properties fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching Commercial properties:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching Commercial properties",
      error: error.message,
    });
  }
};
// GET all real estate data for users with purpose "Off-Plan"
const getrealestatedatauseroffplan = async (req, res) => {
  try {
    const OffPlanProperties = await RealEstate.find({ purpose: "Off Plan" });
    if (!OffPlanProperties || OffPlanProperties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No off-plan properties found",
      });
    }
    res.status(200).json({
      success: true,
      data: OffPlanProperties,
      message: "Off-plan properties fetched successfully",
    });
  }
  catch (error) {
    console.error("Error fetching Off-Plan properties:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching Off-Plan properties",
      error: error.message,
    });
  }
}
// Create new property inquiry
const sellproperties = async (req, res) => {
  try {
    const {
      propertyAddress,
      propertyType,
      bedrooms,
      bathrooms,
      builtUpArea,
      propertyCondition,
      sellingPrice,
      fullName,
      phone,
      email,
      additionalNotes
    } = req.body;

    // Simple validation (required fields)
    if (!propertyAddress || !propertyType || !bedrooms || !bathrooms || !builtUpArea || !propertyCondition || !fullName || !phone || !email) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Create a new document
    const newProperty = new sellrealestateproperties({
      propertyAddress,
      propertyType,
      bedrooms,
      bathrooms,
      builtUpArea,
      propertyCondition,
      sellingPrice,
      fullName,
      phone,
      email,
      additionalNotes
    });

    // Save to MongoDB
    await newProperty.save();
    console.log(newProperty)

    res.status(201).json({ message: "Sell Property submitted successfully!", data: newProperty });
  } catch (error) {
    console.error("Error saving property:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const fetchsellproperties = async (req, res) => {
   try {
    let sellproperties = await sellrealestateproperties.find().sort({ createdAt: -1 }).lean();
    if (!sellproperties || sellproperties.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No sellproperties found",
        data: [],
      });
    }
    // Format createdAt, remove updatedAt and __v
    sellproperties = sellproperties.map((item) => {
      const date = new Date(item.createdAt);

      // ---- DATE FORMATTING ----
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      // ---- TIME FORMATTING ----
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // convert to 12-hour format

      const formattedCreatedAt = `${day}/${month}/${year} — ${hours}:${minutes} ${ampm}`;

      return {
        ...item,
        createdAt: formattedCreatedAt, // custom formatted
        updatedAt: undefined, // remove updatedAt
        __v: undefined, // remove _v
      };
    });

    res.status(200).json({
      success: true,
      message: "Sell Properties fetched successfully",
      data: sellproperties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching sell properties",
      error: error.message,
    });
  }
};

module.exports = {
  getrealestatedatauser,
  getrealestatedatausersale,
  getrealestatedatauserrent,
  getrealestatedatausercommercial,
  getrealestatedatauseroffplan,
  sellproperties,
  fetchsellproperties
};
