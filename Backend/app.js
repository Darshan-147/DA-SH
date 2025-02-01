const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectToDB = require("./database/db");
const userRoutes = require("./routes/user.routes");
const driverRoutes = require("./routes/driver.routes");
const travelPlanRoutes = require("./routes/travelPlan.routes");

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// For testing purposes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/travel-plans", travelPlanRoutes);

module.exports = app;
