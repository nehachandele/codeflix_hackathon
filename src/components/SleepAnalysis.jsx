import React, { useState } from 'react';
import '../App.css'; // Ensure you have the correct styling

const SleepAnalysis = () => {
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [sleepDurationInfo, setSleepDurationInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle setting sleep alarm
  const handleSetSleepAlarm = () => {
    if (!sleepTime) {
      setErrorMessage('Please set a valid sleep time.');
      return;
    }

    const now = new Date();
    const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);

    // Setting sleep time
    const sleepTimeDate = new Date();
    sleepTimeDate.setHours(sleepHours, sleepMinutes, 0);

    // If sleep time is in the past, set it for the next day
    if (sleepTimeDate < now) {
      sleepTimeDate.setDate(sleepTimeDate.getDate() + 1);
    }

    // Calculate the duration until the sleep time
    const sleepDurationInMs = sleepTimeDate - now;

    // Trigger the sleep alarm when sleep time is reached
    setTimeout(() => {
      const alarm = new Audio('/alarm.mp3'); // Path to the alarm sound in the public folder
      alarm.play();
      alert('It\'s time to sleep!');
    }, sleepDurationInMs);

    setErrorMessage('');
  };

  // Function to handle setting wake alarm and displaying sleep duration info
  const handleSetWakeAlarm = () => {
    if (!sleepTime || !wakeTime) {
      setErrorMessage('Please set both sleep and wake times.');
      return;
    }

    const now = new Date();
    const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);
    const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);

    // Setting sleep and wake times
    const sleepTimeDate = new Date();
    sleepTimeDate.setHours(sleepHours, sleepMinutes, 0);
    const wakeTimeDate = new Date();
    wakeTimeDate.setHours(wakeHours, wakeMinutes, 0);

    // If wake-up time is earlier than sleep time, set wake-up time for the next day
    if (wakeTimeDate < sleepTimeDate) {
      wakeTimeDate.setDate(wakeTimeDate.getDate() + 1);
    }

    // Calculate the sleep duration
    const sleepDurationInMs = wakeTimeDate - sleepTimeDate;
    const sleepDurationInHours = sleepDurationInMs / (1000 * 60 * 60); // Convert ms to hours

    // Display sleep duration info based on hours
    if (sleepDurationInHours >= 8) {
      setSleepDurationInfo(`Great! You are getting ${Math.floor(sleepDurationInHours)} hours of sleep. That's good for your health!`);
    } else {
      setSleepDurationInfo(`You need at least 8 hours of sleep. You are getting only ${Math.floor(sleepDurationInHours)} hours. Consider sleeping more!`);
    }

    // Trigger the wake alarm when wake time is reached
    const wakeDurationInMs = wakeTimeDate - now;
    setTimeout(() => {
      const alarm = new Audio('/alarm.mp3'); // Path to the alarm sound in the public folder
      alarm.play();
      alert('Wake up! Time to start your day!');
    }, wakeDurationInMs);

    setErrorMessage('');
  };

  return (
    <div className="container">
      <h2>Sleep and Wake-up Reminder</h2>

      <div className="card">
        <label htmlFor="sleep-time">Set Sleep Time:</label>
        <input
          type="time"
          id="sleep-time"
          value={sleepTime}
          onChange={(e) => setSleepTime(e.target.value)}
        />
        <button onClick={handleSetSleepAlarm}>Set Sleep Alarm</button>
      </div>

      <div className="card">
        <label htmlFor="wake-time">Set Wake-up Time:</label>
        <input
          type="time"
          id="wake-time"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
        />
        <button onClick={handleSetWakeAlarm}>Set Wake Alarm</button>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="info-card">
        <h3>Sleep Duration Info</h3>
        <p>{sleepDurationInfo}</p>
      </div>
    </div>
  );
};

export default SleepAnalysis;
