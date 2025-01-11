import React, { useState } from "react";

const FitnessGoals = () => {
  const [goal, setGoal] = useState("");
  const [months, setMonths] = useState(1);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [submittedExercises, setSubmittedExercises] = useState([]);

  // Predefined fitness options
  const fitnessOptions = [
    { id: "weight_loss", name: "Weight Loss", exercises: ["Running", "Cycling", "Jump Rope", "HIIT", "Boxing"] },
    { id: "muscle_gain", name: "Muscle Gain", exercises: ["Bench Press", "Deadlift", "Squats", "Pull-Ups", "Bicep Curls"] },
    { id: "endurance", name: "Endurance", exercises: ["Swimming", "Rowing", "Hiking", "Marathon Training", "Stair Climbing"] },
    { id: "flexibility", name: "Flexibility", exercises: ["Yoga", "Stretching", "Pilates", "Tai Chi", "Dynamic Stretching"] },
    { id: "general_fitness", name: "General Fitness", exercises: ["Walking", "Jogging", "Bodyweight Exercises", "Dance", "Kettlebell Workouts"] },
    { id: "core_strength", name: "Core Strength", exercises: ["Plank", "Russian Twists", "Mountain Climbers", "Leg Raises", "Ab Rollouts"] },
    { id: "cardio_health", name: "Cardio Health", exercises: ["Elliptical", "Treadmill", "Zumba", "Jumping Jacks", "Rowing Machine"] },
    { id: "stress_relief", name: "Stress Relief", exercises: ["Meditation", "Breathing Exercises", "Tai Chi", "Yin Yoga", "Light Stretching"] },
  ];

  // Get exercises for the selected goal
  const exercises =
    fitnessOptions.find((option) => option.id === goal)?.exercises || [];

  // Calculate sets based on months
  const calculateSets = () => {
    if (months <= 1) return 5;
    if (months <= 3) return 4;
    if (months <= 6) return 3;
    return 2;
  };

  // Handle checkbox selection
  const handleExerciseSelection = (exercise) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise)
        ? prev.filter((ex) => ex !== exercise)
        : [...prev, exercise]
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    setSubmittedExercises(selectedExercises);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Fitness Goals</h2>

      {/* Dropdown for fitness options */}
      <select
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      >
        <option value="">Select your fitness goal</option>
        {fitnessOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      {/* Dropdown for months */}
      <select
        value={months}
        onChange={(e) => setMonths(Number(e.target.value))}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      >
        <option value={1}>1 Month</option>
        <option value={2}>2 Months</option>
        <option value={3}>3 Months</option>
        <option value={6}>6 Months</option>
        <option value={12}>12 Months</option>
      </select>

      {/* Display selected goal and months */}
      <p>
        <strong>Goal:</strong> {goal ? fitnessOptions.find((opt) => opt.id === goal)?.name : "None"}{" "}
        | <strong>Duration:</strong> {months} {months === 1 ? "Month" : "Months"}
      </p>

      {/* Display fitness table with checkboxes */}
      {exercises.length > 0 && (
        <div>
          <h3>Select Recommended Exercises:</h3>
          <form>
            {exercises.map((exercise, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={exercise}
                    checked={selectedExercises.includes(exercise)}
                    onChange={() => handleExerciseSelection(exercise)}
                  />
                  {exercise}
                </label>
              </div>
            ))}
          </form>
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      )}

      {/* Display submitted exercises */}
      {submittedExercises.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Fitness Chart and Table:</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Exercise</th>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Duration (mins)</th>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Sets</th>
              </tr>
            </thead>
            <tbody>
              {submittedExercises.map((exercise, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>{exercise}</td>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>30</td>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>{calculateSets()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>Total Exercises Selected:</strong> {submittedExercises.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default FitnessGoals;
