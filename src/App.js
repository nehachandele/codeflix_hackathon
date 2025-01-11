// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Mindfulness from './components/Mindfulness';
import Wearables from './components/Wearables';
import Notifications from './components/Notifications';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import NutritionTracker from './components/NutritionTracker';
import FitnessGoals from './components/FitnessGoals';
import WaterIntakeTracker from './components/WaterIntakeTracker';
import  SleepAnalysis from './components/SleepAnalysis'
import HeartRateMonitor from './components/HeartRateMonitor';
import MentalHealthCheck from './components/MentalHealthCheck';

const App = () => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
    exercise: [30, 45, 60, 40],
    sleep: [7, 8, 6, 7],
    stress: [4, 3, 5, 2],
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <h1>AI Health Companion</h1>
          <Routes>
            <Route path="/" element={<Dashboard data={data} />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/mindfulness" element={<Mindfulness />} />
            <Route path="/wearables" element={<Wearables />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/nutrition" element={<NutritionTracker />} />
            <Route path="/fitnessGoals" element={<FitnessGoals/>} />
            <Route path="/waterIntake" element={<WaterIntakeTracker/>} />
            <Route path="/healthMonitor" element={<HeartRateMonitor />} />
            <Route path="/mentalhealth" element={<MentalHealthCheck />} />
            <Route path="/sleepAnalysis" element={<SleepAnalysis />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
