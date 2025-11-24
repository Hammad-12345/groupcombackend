const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectiondb } = require("./Db/connect");
const AdminloginRoute = require("./Mvc/routes/AdminRoutes/AdminLoginRoutes");
const AdminStatsRoute = require("./Mvc/routes/AdminRoutes/AdminStatsRoute");
const Realestateroute = require("./Mvc/routes/AdminRoutes/Realestateroutes");
const RealEstateShowRoutes = require("./Mvc/routes/UserShowRoutes/RealEstateShowRoutes");
const InteriorShowRoutes = require("./Mvc/routes/UserShowRoutes/InteriorShowRoutes");
const Interiorroutes = require("./Mvc/routes/AdminRoutes/Interiorroutes");
const app = express();
dotenv.config();

//db conn
connectiondb();
//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/Admin", AdminloginRoute);
app.use("/AdminDashboard", AdminStatsRoute);
app.use("/RealEstate", Realestateroute);
app.use("/UserRealEstate", RealEstateShowRoutes);
app.use("/UserInterior", InteriorShowRoutes);
app.use("/Interior", Interiorroutes);

app.listen(`${process.env.PORT}`, () => {
  console.log("server listen");
});
