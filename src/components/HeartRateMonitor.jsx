import React, { useState } from "react";
import "./HeartRateMonitor.css";

const HeartRateMonitor = () => {
  const [age, setAge] = useState(30); // Default age for Max HR calculation
  const [heartRate, setHeartRate] = useState(70); // Default heart rate
  const [result, setResult] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleHeartRateChange = (e) => {
    setHeartRate(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const calculateResult = () => {
    // Maximum Heart Rate (Max HR)
    const maxHR = 220 - age;

    // Target Heart Rate Zone (50-85% of Max HR)
    const targetMin = maxHR * 0.5;
    const targetMax = maxHR * 0.85;

    let resultText = "";
    let feedbackText = "";

    if (heartRate < 60) {
      resultText = "Low Heart Rate (Bradycardia)";
      feedbackText = "Your heart rate is lower than normal. It could be due to a high level of fitness or a medical condition. Please consult a doctor if you're concerned.";
    } else if (heartRate > 100) {
      resultText = "High Heart Rate (Tachycardia)";
      feedbackText = "Your heart rate is higher than normal. This could be due to stress, anxiety, or overexertion. If persistent, consult a healthcare professional.";
    } else if (heartRate >= 60 && heartRate <= 100) {
      resultText = "Normal Heart Rate";
      feedbackText = "Your heart rate is within the normal range. Maintain a healthy lifestyle with regular exercise and proper nutrition.";
    }

    if (heartRate >= targetMin && heartRate <= targetMax) {
      feedbackText += " You are within the target heart rate zone for exercise, which is ideal for cardiovascular fitness.";
    } else {
      feedbackText += " Try to stay within the target heart rate zone for optimal exercise benefits.";
    }

    setResult(resultText);
    setFeedback(feedbackText);
  };

  return (
    <div className="heart-rate-monitor">
      <h2>Professional Heart Rate Monitor</h2>
      <div className="input-group">
        <label htmlFor="age">Enter Your Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={handleAgeChange}
          min="1"
          max="120"
        />
      </div>
      <div className="input-group">
        <label htmlFor="heartRate">Enter Your Heart Rate (bpm):</label>
        <input
          type="number"
          id="heartRate"
          value={heartRate}
          onChange={handleHeartRateChange}
          min="30"
          max="200"
        />
      </div>
      <button onClick={calculateResult}>Check Heart Rate</button>

      <div className="result">
        <h3>Heart Rate Result:</h3>
        <p>{result}</p>
        <p>{feedback}</p>
      </div>

      <div className="heart-rate-chart">
        <h3>Heart Rate Chart by Age</h3>
        <table>
          <thead>
            <tr>
              <th>Age Range (Years)</th>
              <th>Normal Resting Heart Rate (bpm)</th>
              <th>Low Heart Rate (Bradycardia)</th>
              <th>High Heart Rate (Tachycardia)</th>
              <th>Potential Conditions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 - 10</td>
              <td>70 - 120</td>
              <td>Below 70</td>
              <td>Above 120</td>
              <td>Heart defects, Bradycardia, Tachycardia</td>
            </tr>
            <tr>
              <td>11 - 20</td>
              <td>60 - 100</td>
              <td>Below 60</td>
              <td>Above 100</td>
              <td>Anxiety, Stress, Bradycardia, Tachycardia</td>
            </tr>
            <tr>
              <td>21 - 30</td>
              <td>60 - 100</td>
              <td>Below 60</td>
              <td>Above 100</td>
              <td>Dehydration, Overexertion, Bradycardia, Tachycardia</td>
            </tr>
            <tr>
              <td>31 - 40</td>
              <td>60 - 100</td>
              <td>Below 60</td>
              <td>Above 100</td>
              <td>Heart disease, Stress, Bradycardia, Tachycardia</td>
            </tr>
            <tr>
              <td>41 - 50</td>
              <td>60 - 100</td>
              <td>Below 60</td>
              <td>Above 100</td>
              <td>Hypertension, Heart disease, Bradycardia, Tachycardia</td>
            </tr>
            <tr>
              <td>51 - 60</td>
              <td>60 - 100</td>
              <td>Below 60</td>
              <td>Above 100</td>
              <td>Cardiovascular diseases, Bradycardia, Tachycardia</td>
            </tr>
            <tr>
              <td>61 - 70</td>
              <td>60 - 100</td>
              <td>Below 60</td>
              <td>Above 100</td>
              <td>Heart failure, Stroke, Bradycardia, Tachycardia</td>
            </tr>
            <tr>
              <td>71 - 80</td>
              <td>60 - 100</td>
              <td>Below 60</td>
              <td>Above 100</td>
              <td>Atrial fibrillation, Heart failure, Bradycardia, Tachycardia</td>
            </tr>
            <tr>
              <td>81+</td>
              <td>60 - 100</td>
              <td>Below 60</td>
              <td>Above 100</td>
              <td>Severe heart conditions, Bradycardia, Tachycardia</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeartRateMonitor;
