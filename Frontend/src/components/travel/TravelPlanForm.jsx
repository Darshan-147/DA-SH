import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TravelPlanForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    seatsNeeded: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASEAPP_BACKEND_URL}/api/travel-plans/create`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      navigate("/travel-plans");
      // Handle success
      console.log("Travel plan created:", response.data);
    } catch (error) {
      console.error("Error creating travel plan:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Create Travel Plan</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Pickup Location"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, pickup: e.target.value})}
        />
        <input
          type="text"
          placeholder="Destination"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, destination: e.target.value})}
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
        <input
          type="time"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, time: e.target.value})}
        />
        <input
          type="number"
          min="1"
          placeholder="Number of seats needed"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, seatsNeeded: parseInt(e.target.value)})}
        />
        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Post Travel Plan
        </button>
      </div>
    </form>
  );
};

export default TravelPlanForm;