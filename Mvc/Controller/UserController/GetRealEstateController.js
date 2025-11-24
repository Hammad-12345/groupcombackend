const RealEstate = require("../../Model/RealStateModel");

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
module.exports = {
  getrealestatedatauser,
  getrealestatedatausersale,
  getrealestatedatauserrent,
};
