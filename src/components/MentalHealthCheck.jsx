import React, { useState } from "react";
import "./MentalHealthCheck.css";

const MentalHealthCheck = () => {
  const [responses, setResponses] = useState({
    stress: 0,
    sleep: 0,
    mood: 0,
    focus: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const calculateResult = () => {
    const { stress, sleep, mood, focus } = responses;
    const totalScore = stress + (10 - sleep) + (5 - mood) + (5 - focus);

    let resultText = "";
    let backgroundColor = "";

    if (totalScore >= 15) {
      resultText =
        "Your mental health may need attention. Consider consulting a professional or practicing mindfulness techniques.";
      backgroundColor = "#ffcccc"; // Light red for high stress
    } else if (totalScore >= 10) {
      resultText =
        "Your mental health is slightly impacted. Ensure you're getting enough rest and taking breaks.";
      backgroundColor = "#fff3cd"; // Light yellow for moderate stress
    } else {
      resultText =
        "Your mental health appears to be in a good state. Keep maintaining a healthy balance!";
      backgroundColor = "#d4edda"; // Light green for good mental health
    }

    return { resultText, backgroundColor };
  };

  const { resultText, backgroundColor } = calculateResult();

  return (
    <div className="mental-health-check">
      <h2>Mental Health Check</h2>
      <form className="questionnaire">
        <div className="question">
          <label htmlFor="stress">Stress Level (1-10):</label>
          <input
            type="number"
            id="stress"
            name="stress"
            min="1"
            max="10"
            value={responses.stress}
            onChange={handleChange}
          />
          <small>
            1 = No stress, 5 = Moderate stress, 10 = Extremely high stress
          </small>
        </div>
        <div className="question">
          <label htmlFor="sleep">Hours of Sleep (1-10):</label>
          <input
            type="number"
            id="sleep"
            name="sleep"
            min="1"
            max="10"
            value={responses.sleep}
            onChange={handleChange}
          />
          <small>
            1 = Very poor sleep (1-2 hours), 5 = Moderate sleep (5-6 hours), 10
            = Excellent sleep (8+ hours)
          </small>
        </div>
        <div className="question">
          <label htmlFor="mood">Mood Level (1-5):</label>
          <input
            type="number"
            id="mood"
            name="mood"
            min="1"
            max="5"
            value={responses.mood}
            onChange={handleChange}
          />
          <small>1 = Very low mood, 3 = Neutral, 5 = Very happy</small>
        </div>
        <div className="question">
          <label htmlFor="focus">Focus Level (1-5):</label>
          <input
            type="number"
            id="focus"
            name="focus"
            min="1"
            max="5"
            value={responses.focus}
            onChange={handleChange}
          />
          <small>
            1 = Poor focus, 3 = Average focus, 5 = Excellent focus
          </small>
        </div>
      </form>
      <div
        className="result"
        style={{ backgroundColor: backgroundColor }}
      >
        <h3>Overall Assessment Result:</h3>
        <p>{resultText}</p>
      </div>
    </div>
  );
};

export default MentalHealthCheck;
