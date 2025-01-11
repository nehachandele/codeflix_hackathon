import React, { useState } from "react";
import axios from "axios";

const NutritionTracker = () => {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [meal, setMeal] = useState("");
  const [foodLog, setFoodLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const mealOptions = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  const fetchCalories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.edamam.com/api/nutrition-data`,
        {
          params: {
            app_id: "6c194529", // Replace with your Edamam app ID
            app_key: "954723a9fd7668dab95c30eb1a49fc99", // Replace with your Edamam app key
            ingr: `${quantity} ${food}`,
          },
        }
      );
      const calories = response.data.calories;
      setFoodLog([
        ...foodLog,
        { food, quantity, calories, meal },
      ]);
      setFood("");
      setQuantity("");
      setMeal("");
    } catch (error) {
      console.error("Error fetching calorie data:", error);
      alert("Could not fetch calorie data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = () => {
    if (!food || !meal || !quantity) {
      alert("Please fill in all fields.");
      return;
    }
    fetchCalories();
  };

  const groupByMealType = () => {
    return foodLog.reduce((acc, item) => {
      if (!acc[item.meal]) {
        acc[item.meal] = [];
      }
      acc[item.meal].push(item);
      return acc;
    }, {});
  };

  const generateMealPlan = () => {
    const groupedPlan = foodLog.reduce((acc, item) => {
      if (!acc[item.meal]) {
        acc[item.meal] = [];
      }
      acc[item.meal].push({
        food: item.food,
        quantity: item.quantity,
        calories: item.calories,
      });
      return acc;
    }, {});
    
    const totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);
    setMealPlan(groupedPlan);
    setTotalCalories(totalCalories);
  };
  

  const groupedFoodLog = groupByMealType();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Nutrition Tracker</h2>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Food Item"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Quantity (e.g., 1 cup, 1 serving)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <select
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Meal</option>
          {mealOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddFood}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Adding..." : "Add Food"}
      </button>
      <button
        onClick={generateMealPlan}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Generate Meal Plan
      </button>

      {Object.keys(groupedFoodLog).map((mealType) => (
        <div key={mealType} style={{ marginTop: "20px" }}>
          <h3>{mealType} Log</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "10px", backgroundColor: "#47047a", color: "#fff" }}>Food Item</th>
                <th style={{ border: "1px solid #ccc", padding: "10px", backgroundColor: "#47047a", color: "#fff" }}>Quantity</th>
                <th style={{ border: "1px solid #ccc", padding: "10px", backgroundColor: "#47047a", color: "#fff" }}>Calories</th>
              </tr>
            </thead>
            <tbody>
              {groupedFoodLog[mealType].map((item, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{item.food}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{item.quantity}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{item.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

{Object.keys(mealPlan).length > 0 && (
  <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    <h3 style={{ textAlign: "center", color: "#333", fontSize: "24px", marginBottom: "20px" }}>Meal Plan</h3>
    {Object.keys(mealPlan).map((mealType) => (
      <div key={mealType} style={{ marginBottom: "20px" }}>
        <h4 style={{ fontSize: "20px", color: "#47047a", marginBottom: "10px" }}>{mealType}</h4>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {mealPlan[mealType].map((item, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "16px", color: "#333" }}>
                {item.food} ({item.quantity})
              </span>
              <span style={{ fontSize: "16px", color: "#ff5722" }}>{item.calories} kcal</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: "#333" }}>
      Total Calories: <span style={{ color: "#ff5722" }}>{totalCalories} kcal</span>
    </div>
  </div>
)}


    </div>
  );
};

export default NutritionTracker;
