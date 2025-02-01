import React, { useEffect, useState } from "react";
import axios from "axios";

const TravelPlansList = () => {
  const [travelPlans, setTravelPlans] = useState([]);

  const handleJoin = async (travelPlanId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASEAPP_BACKEND_URL}/api/travel-plans/join/${travelPlanId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Check if seats are now full
      const updatedPlan = response.data;
      if (updatedPlan.seatsNeeded <= updatedPlan.coPassengers.length) {
        await axios.delete(
          `${import.meta.env.VITE_BASEAPP_BACKEND_URL}/api/travel-plans/delete/${travelPlanId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
      
      // Fetch updated travel plans
      const updatedPlans = await axios.get(
        `${import.meta.env.VITE_BASEAPP_BACKEND_URL}/api/travel-plans/all`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTravelPlans(updatedPlans.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASEAPP_BACKEND_URL}/api/travel-plans/all`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setTravelPlans(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTravelPlans();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Travel Plans</h2>
      <div className="flex gap-5">
        {travelPlans.map((plan) => (
          <div key={plan._id} className="border p-4 rounded">
            <p>From: {plan.pickup}</p>
            <p>To: {plan.destination}</p>
            <p>Date: {new Date(plan.date).toLocaleDateString()}</p>
            <p>Time: {plan.time}</p>
            <p>Seats Available: {plan.seatsNeeded - plan.coPassengers.length}</p>
            <button
              onClick={() => handleJoin(plan._id)}
              className="mt-2 bg-black text-white px-4 py-2 rounded"
              disabled={plan.seatsNeeded <= plan.coPassengers.length}
            >
              {plan.seatsNeeded <= plan.coPassengers.length ? 'Full' : 'Join Ride'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelPlansList;