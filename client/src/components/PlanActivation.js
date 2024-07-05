import React, { useState } from 'react';
import { activatePlan } from '../services/api';

const PlanActivation = ({ plan }) => {
  const [activationStatus, setActivationStatus] = useState('');

  const handleActivate = async () => {
    try {
      const activationStart = new Date().toISOString();
      const activationEnd = new Date(Date.now() + parseDuration(plan.duration)).toISOString();
      await activatePlan(plan.id, activationStart, activationEnd);
      setActivationStatus('Activated');
    } catch (error) {
      setActivationStatus('Activation failed');
    }
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
      <button onClick={handleActivate} disabled={activationStatus === 'Activated'}>
        {activationStatus === 'Activated' ? 'Activated' : 'Activate'}
      </button>
      {activationStatus && <p>{activationStatus}</p>}
    </div>
  );
};

export default PlanActivation;
