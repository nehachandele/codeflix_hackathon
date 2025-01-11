// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getMessaging, getToken } from "firebase/messaging"; // Import getToken here

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX2fKLy0U6syEp4kgHl-KbowD1jBLORaU",
  authDomain: "health-29d5e.firebaseapp.com",
  projectId: "health-29d5e",
  storageBucket: "health-29d5e.firebasestorage.app",
  messagingSenderId: "332660415746",
  appId: "1:332660415746:web:9c5f42630848bd9b23b61b",
  measurementId: "G-1RQ9PLXPN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Messaging
const messaging = getMessaging(app);

// Export the messaging object and getToken function
export { messaging, getToken };
