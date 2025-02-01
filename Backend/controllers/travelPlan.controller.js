const TravelPlan = require("../models/travelPlan.model");

exports.createTravelPlan = async (req, res) => {
  try {
    const { pickup, destination, date, time, seatsNeeded } = req.body;
    const travelPlan = await TravelPlan.create({
      user: req.user._id,
      pickup,
      destination,
      date,
      time,
      seatsNeeded,
    });

    res.status(201).json(travelPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTravelPlans = async (req, res) => {
  try {
    const travelPlans = await TravelPlan.find({ status: "active" })
      .populate("user", "fullname email")
      .populate("coPassengers", "fullname email");

    res.status(200).json(travelPlans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.joinTravelPlan = async (req, res) => {
  try {
    const { travelPlanId } = req.params;
    const travelPlan = await TravelPlan.findById(travelPlanId);

    if (!travelPlan) {
      return res.status(404).json({ message: "Travel plan not found" });
    }

    if (travelPlan.coPassengers.length >= travelPlan.seatsNeeded) {
      return res.status(400).json({ message: "No seats available" });
    }

    travelPlan.coPassengers.push(req.user._id);
    await travelPlan.save();

    res.status(200).json(travelPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTravelPlan = async (req, res) => {
  try{
    const {id} = req.params;
    await TravelPlan.findByIdAndDelete(id);
    res.status(200).json({message: "Travel Plan deleted successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
