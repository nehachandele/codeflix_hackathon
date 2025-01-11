import React, { useState, useEffect, useCallback } from "react";
import "./WaterIntakeTracker.css";

const WaterIntakeTracker = () => {
  const [water, setWater] = useState(0);
  const [goal, setGoal] = useState(8); // Default daily goal: 8 glasses
  const [log, setLog] = useState({});
  const [date, setDate] = useState(new Date());
  const [streak, setStreak] = useState(0);
  const [successRate, setSuccessRate] = useState(0);

  const updateSuccessRate = useCallback(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let successfulDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${currentMonth}-${String(day).padStart(2, "0")}`;
      if ((log[formattedDate] || 0) >= goal) {
        successfulDays++;
      }
    }

    setSuccessRate(((successfulDays / daysInMonth) * 100).toFixed(2));
  }, [date, goal, log]);

  const addGlass = () => {
    const today = date.toISOString().split("T")[0];
    setWater((prev) => prev + 1);
    setLog((prevLog) => ({
      ...prevLog,
      [today]: (prevLog[today] || 0) + 1,
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now.getDate() !== date.getDate()) {
        setDate(now);
        setWater(0);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().split("T")[0];
        if (log[yesterdayKey] >= goal) {
          setStreak((prev) => prev + 1);
        } else {
          setStreak(0);
        }

        updateSuccessRate();
      }
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, [date, log, goal, updateSuccessRate]);

  const getMotivationalMessage = () => {
    if (water === 0) return "Let's get started! Stay hydrated! 💧";
    if (water < goal / 2) return "Great start! Keep it up! 🚰";
    if (water < goal) return "You're almost there! 💪";
    return "Amazing! You've hit your goal! 🎉";
  };

  const generateMonthlySummary = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const summary = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${currentMonth}-${String(day).padStart(2, "0")}`;
      summary.push({
        date: formattedDate,
        intake: log[formattedDate] || 0,
        success: (log[formattedDate] || 0) >= goal,
      });
    }

    return summary;
  };

  const summary = generateMonthlySummary();

  const progress = Math.min((water / goal) * 100, 100);

  return (
    <div className="water-intake-tracker">
      <h1>💧 Water Intake Tracker</h1>
      <p className="motivational-message">{getMotivationalMessage()}</p>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {Math.round(progress)}%
        </div>
      </div>

      <div className="stats">
        <p>Daily Goal: {goal} glasses</p>
        <p>Glasses of Water Today: {water}</p>
        <p>Current Streak: {streak} days 🔥</p>
        <p>Monthly Success Rate: {successRate}% 🌟</p>
      </div>

      <button className="add-glass-button" onClick={addGlass}>
        ➕ Add Glass
      </button>

      {/* Input to change goal */}
      <div>
        <label>Set Daily Goal: </label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
        />
      </div>

      <h2>Monthly Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Water Intake</th>
            <th>Success</th>
          </tr>
        </thead>
        <tbody>
          {summary.map(({ date, intake, success }) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{intake}</td>
              <td>{success ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WaterIntakeTracker;
