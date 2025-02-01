import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TravelPlanForm from '../../components/travel/TravelPlanForm';
import TravelPlansList from '../../components/travel/TravelPlansList';

const TravelPlansPage = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Travel Plans</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {showForm ? 'Close Form' : 'Create New Plan'}
          </button>
          <button
            onClick={() => navigate('/home')}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>

      {showForm && <TravelPlanForm />}
      <TravelPlansList />
    </div>
  );
};

export default TravelPlansPage;