import React, { useState, useEffect } from 'react';
import './Wearables.css';

const Wearables = () => {
  const [steps, setSteps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await fetch('/api/fitbit-steps');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSteps(data.steps);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  return (
    <div className="wearables-container">
      <h2 className="wearables-header">Wearables Integration</h2>
      <p className="status-text">Status: Working on this module</p> {/* Added status message */}
      {loading ? (
        <p className="loading-text">Loading steps data...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="steps-container">
          <p className="steps-text">Steps: {steps}</p>
        </div>
      )}
    </div>
  );
};

export default Wearables;
