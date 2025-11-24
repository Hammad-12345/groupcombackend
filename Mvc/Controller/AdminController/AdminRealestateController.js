const RealEstate = require("../../Model/RealStateModel");

const Addrealestateproperty = async (req, res) => {
  try {
    // User info from token
    //   const userId = req.user.id; // coming from JWT middleware

    const {
      title,
      type,
      purpose,
      city,
      area,
      price,
      bedrooms,
      bathrooms,
      size,
      description,
    } = req.body;
    const imageUrl = req.file?.path;
    // Validate required fields
    if (
      !title ||
      !type ||
      !purpose ||
      !city ||
      !area ||
      !price ||
      !description ||
      !bedrooms ||
      !bathrooms ||
      !size
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing.",
      });
    }

    //   TODO: Replace this with MongoDB save logic
    //   Example:
    const property = new RealEstate({
      title,
      type,
      purpose,
      city,
      area,
      price,
      bedrooms,
      bathrooms,
      size,
      description,
      images:imageUrl
    });
    await property.save();

    return res.status(200).json({
      success: true,
      message: "Property added successfully!",
      data: req.body,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};
const Fetchrealestateproperty = async (req, res) => {
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
const Deleterealestateproperty = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required.",
      });
    }

    // Find and delete
    const deletedProperty = await RealEstate.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully!",
      data: deletedProperty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting property",
      error: error.message,
    });
  }
};
const Updaterealestateproperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body }; // copy body data
    // Add image URL if a file was uploaded
    if (req.file?.path) {
      updateData.images = req.file.path;
    }

    const updatedProperty = await RealEstate.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // return the updated document
    );

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating property",
      error: error.message,
    });
  }
};

module.exports = {
  Addrealestateproperty,
  Fetchrealestateproperty,
  Deleterealestateproperty,
  Updaterealestateproperty,
};
