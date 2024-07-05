import React, { useEffect, useState } from 'react';
import { getPlans } from '../services/api';
import PlanActivation from './PlanActivation';

const PlanList = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      const response = await getPlans();
      setPlans(response.data);
    }
    fetchPlans();
  }, []);

  return (
    <div>
      <h1>Available Internet Plans</h1>
      {plans.map(plan => (
        <PlanActivation key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

export default PlanList;
