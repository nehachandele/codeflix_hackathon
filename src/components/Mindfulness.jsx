import React, { useState, useEffect } from 'react';
import './Mindfulness.css';

const Mindfulness = () => {
  const [isMeditating, setIsMeditating] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mood, setMood] = useState('');
  const [journal, setJournal] = useState('');
  const [quote, setQuote] = useState('');
  const [meditationReason, setMeditationReason] = useState('');
  const [meditationDuration, setMeditationDuration] = useState(0);
  const [suggestedMeditations, setSuggestedMeditations] = useState([]);
  const [continuousSessions, setContinuousSessions] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [monthlyTimeSpent, setMonthlyTimeSpent] = useState(0); // Track total time spent in the current month

  const meditationReasons = [
    { value: 'sleep', label: 'Night Meditation (Sleep)' },
    { value: 'stress', label: 'Stress Relief' },
    { value: 'focus', label: 'Focus & Concentration' },
    { value: 'relax', label: 'Relaxation' },
  ];

  const meditationTypes = {
    sleep: ['Guided Sleep Meditation', 'Breathing Exercises', 'Body Scan'],
    stress: ['Progressive Muscle Relaxation', 'Mindful Breathing', 'Visualization'],
    focus: ['Concentration Meditation', 'Breathing Focus', 'Mantra Meditation'],
    relax: ['Deep Relaxation', 'Guided Imagery', 'Gentle Stretching Meditation'],
  };

  useEffect(() => {
    const quotes = [
      "You are stronger than you think!",
      "Breathe in peace, breathe out stress.",
      "Mindfulness is the gateway to inner peace.",
      "One step at a time, one breath at a time.",
    ];

    if (isMeditating && timer === 0) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }

    let interval;
    if (isMeditating && timer < meditationDuration * 60) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (timer === meditationDuration * 60 && isMeditating) {
      clearInterval(interval);
      setIsMeditating(false); // Stop meditation
      setContinuousSessions((prev) => prev + 1); // Increment session count by 1
      setTotalTimeSpent((prev) => prev + meditationDuration * 60); // Increment total time by session duration
      setMonthlyTimeSpent((prev) => prev + meditationDuration * 60); // Add to monthly time
    }

    return () => clearInterval(interval);
  }, [isMeditating, timer, meditationDuration]);

  useEffect(() => {
    // Calculate progress based on total time spent in the month (30 days)
    const targetTimeForMonth = 30 * meditationDuration * 60; // 30 days of meditation at the selected duration
    const timeProgress = monthlyTimeSpent
      ? Math.min((monthlyTimeSpent / targetTimeForMonth) * 100, 100)
      : 0;
    setProgress(timeProgress);
  }, [monthlyTimeSpent, meditationDuration]);

  const handleMeditationStart = () => {
    if (meditationReason && meditationDuration > 0) {
      setIsMeditating(true);
      setTimer(0);
    } else {
      alert("Please select a meditation reason and duration.");
    }
  };

  const handleMeditationStop = () => {
    setIsMeditating(false);
    setTimer(0);
  };

  const handleReasonChange = (e) => {
    const reason = e.target.value;
    setMeditationReason(reason);
    setSuggestedMeditations(meditationTypes[reason] || []);
  };

  const handleSaveJournal = () => {
    if (timer === meditationDuration * 60) {
      alert('Your journal entry has been saved!');
      setJournal('');
    } else {
      alert('Please complete the meditation session first.');
    }
  };

  return (
    <div className="mindfulness-container">
      <h1>Mindfulness & Meditation</h1>

      <div className="meditation-reason">
        <h4>Select Meditation Reason</h4>
        <select value={meditationReason} onChange={handleReasonChange}>
          <option value="">Select Reason</option>
          {meditationReasons.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
      </div>

      {meditationReason && (
        <div className="meditation-types">
          <h4>Suggested Meditation Types</h4>
          <ul>
            {suggestedMeditations.map((meditation, index) => (
              <li key={index}>{meditation}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="meditation-duration">
        <h4>Set Meditation Duration (in minutes)</h4>
        <input
          type="number"
          value={meditationDuration}
          onChange={(e) => setMeditationDuration(e.target.value)}
          min="1"
          max="120"
        />
      </div>

      <div className="timer">
        <h3>
          Timer: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
        </h3>
        {isMeditating ? (
          <button onClick={handleMeditationStop}>Stop</button>
        ) : (
          <button onClick={handleMeditationStart}>Start</button>
        )}
      </div>

      <div className="circular-progress">
        <h4>Progress</h4>
        <div className="progress-circle">
          <div
            className="circle"
            style={{
              background: `conic-gradient(#4caf50 ${progress * 3.6}deg, #e0e0e0 0deg)`,
            }}
          >
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
        <p>{continuousSessions} Continuous sessions completed</p>
        <p>Total time: {Math.floor(totalTimeSpent / 3600)}h {Math.floor((totalTimeSpent % 3600) / 60)}m</p>
      </div>

      <div className="journal-entry">
        <h4>Journal</h4>
        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="Reflect on your session..."
        />
        <button onClick={handleSaveJournal}>Save Entry</button>
      </div>
    </div>
  );
};

export default Mindfulness;
