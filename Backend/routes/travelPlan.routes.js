const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const travelPlanController = require("../controllers/travelPlan.controller");

router.post("/create", authUser, travelPlanController.createTravelPlan);
router.get("/all", authUser, travelPlanController.getAllTravelPlans);
router.post("/join/:travelPlanId", authUser, travelPlanController.joinTravelPlan);
router.delete("/delete/:id", authUser, travelPlanController.deleteTravelPlan);

module.exports = router;