const RealEstate = require("../../Model/RealStateModel");

const Addrealestateproperty = async (req, res) => {
  try {
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

    // Convert numeric fields
    const numericFields = {
      price: Number(price),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      size: Number(size),
    };

    // Validation
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

    // ⭐ Handle Multiple Images (req.files)
    const imageUrls = req.files?.map((file) => file.path) || [];

    const property = new RealEstate({
      title,
      type,
      purpose,
      city,
      area,
      price: numericFields.price,
      bedrooms: numericFields.bedrooms,
      bathrooms: numericFields.bathrooms,
      size: numericFields.size,
      description,
      images: imageUrls, // Save array
    });

    await property.save();

    return res.status(200).json({
      success: true,
      message: "Property added successfully!",
      data: property,
    });
  } catch (error) {
    console.error("Error adding property:", error);

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

    const updateData = { ...req.body };

    // If frontend sends price, bedrooms etc. as strings, convert to numbers
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.bedrooms) updateData.bedrooms = Number(updateData.bedrooms);
    if (updateData.bathrooms) updateData.bathrooms = Number(updateData.bathrooms);
    if (updateData.size) updateData.size = Number(updateData.size);

    // ⭐ Handle Multiple Uploaded Images
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.path);
    }

    console.log("Update Data:", updateData);
    const updatedProperty = await RealEstate.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully!",
      data: updatedProperty,
    });

  } catch (error) {
    console.error("Update Error:", error);

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
