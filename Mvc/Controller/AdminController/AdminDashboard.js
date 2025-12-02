const RealEstate = require("../../Model/RealStateModel");
const Interior = require("../../Model/InteriorModel"); // Replace with your Interior model path

const AdminDashboardSummary = async (req, res) => {
  try {
    // Fetch all real estate properties
    const allRealEstate = await RealEstate.find().lean();
    const totalRealEstateCount = allRealEstate.length;

    // Filter sale and rent properties
    const availableForSale = allRealEstate.filter(prop => prop.purpose === "Sale");
    const rentedProperties = allRealEstate.filter(prop => prop.purpose === "Rent");
    const commercialProperties = allRealEstate.filter(prop => prop.purpose === "Commercial");
    const OffPlanProperties = allRealEstate.filter(prop => prop.purpose === "Off Plan");

    // Fetch all interior projects
    const allInteriorProjects = await Interior.find().lean();
    const totalInteriorCount = allInteriorProjects.length;

    // Return summary
    res.status(200).json({
      success: true,
      data: {
        realEstate: {
          totalCount: totalRealEstateCount,
          properties: allRealEstate,
          availableForSale,
          rentedProperties,
          commercialProperties,
          OffPlanProperties
        },
        interior: {
          totalCount: totalInteriorCount,
          projects: allInteriorProjects,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard summary",
      error: error.message,
    });
  }
};

module.exports = { AdminDashboardSummary };
