import React, { useState } from 'react';
import { activatePlan } from '../services/api';

const Plan = ({ plan }) => {
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = async () => {
    const activationStart = new Date().toISOString();
    const activationEnd = new Date(Date.now() + parseDuration(plan.duration)).toISOString();
    await activatePlan(plan.id, activationStart, activationEnd);
    setIsActivated(true);
  };

  const parseDuration = (duration) => {
    const [value, unit] = duration.split(' ');
    if (unit === 'hour' || unit === 'hours') {
      return value * 60 * 60 * 1000;
    }
    return 0;
  };

  return (
    <div>
      <h2>{plan.name}</h2>
      <p>Price: ${plan.price}</p>
      <p>Duration: {plan.duration}</p>
      <button onClick={handleActivate} disabled={isActivated}>
        {isActivated ? 'Activated' : 'Activate'}
      </button>
    </div>
  );
};

export default Plan;
