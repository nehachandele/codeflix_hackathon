const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // To load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variables to store sensitive keys
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/chat", async (req, res) => {
  // Validate incoming request
  if (!req.body || !req.body.messages) {
    return res.status(400).json({ error: "Messages are required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Use a model like gpt-3.5-turbo
        messages: req.body.messages,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error from OpenAI API:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
