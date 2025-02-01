import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyTravelPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASEAPP_BACKEND_URL}/api/travel-plans/my-plans`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Travel Plans</h2>
      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan._id} className="border p-4 rounded">
            <p>From: {plan.pickup}</p>
            <p>To: {plan.destination}</p>
            <p>Date: {new Date(plan.date).toLocaleDateString()}</p>
            <p>Time: {plan.time}</p>
            <p>Status: {plan.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTravelPlans;