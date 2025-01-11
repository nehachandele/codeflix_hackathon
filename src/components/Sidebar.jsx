// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaRobot,
  FaBed,
  FaHeartbeat,
  FaBell,
  FaAppleAlt,
  FaDumbbell,
  FaTint,
  FaRegChartBar,
  FaBrain,
} from 'react-icons/fa'; // Import relevant icons
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">AI Health Companion</h2>
      <ul className="sidebar-links">
        <li>
          <Link to="/" className="sidebar-link">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/chatbot" className="sidebar-link">
            <FaRobot /> Chatbot
          </Link>
        </li>
        <li>
          <Link to="/mindfulness" className="sidebar-link">
            <FaBed /> Mindfulness
          </Link>
        </li>
        <li>
          <Link to="/wearables" className="sidebar-link">
            <FaHeartbeat /> Wearables
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="sidebar-link">
            <FaBell /> Notifications
          </Link>
        </li>
        <li>
          <Link to="/nutrition" className="sidebar-link">
            <FaAppleAlt /> Nutrition Tracker
          </Link>
        </li>
        <li>
          <Link to="/fitnessGoals" className="sidebar-link">
            <FaDumbbell /> Fitness Goals
          </Link>
        </li>
        <li>
          <Link to="/waterIntake" className="sidebar-link">
            <FaTint /> Water Intake
          </Link>
        </li>
        <li>
          <Link to="/sleepAnalysis" className="sidebar-link">
            <FaRegChartBar /> Sleep Analysis
          </Link>
        </li>
        <li>
          <Link to="/healthMonitor" className="sidebar-link">
            <FaHeartbeat /> Heart Rate Monitor
          </Link>
        </li>
        <li>
          <Link to="/mentalHealth" className="sidebar-link">
            <FaBrain /> Mental Health Check
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
