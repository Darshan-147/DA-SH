const mongoose = require("mongoose");

const travelPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  pickup: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  seatsNeeded: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active"
  },
  coPassengers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("travelPlans", travelPlanSchema);