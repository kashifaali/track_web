// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIAErtXAMjiK46SBm3bK2Fn428ShRFNlk",
  authDomain: "trackweb-657dd.firebaseapp.com",
  databaseURL: "https://trackweb-657dd-default-rtdb.firebaseio.com",
  projectId: "trackweb-657dd",
  storageBucket: "trackweb-657dd.firebasestorage.app",
  messagingSenderId: "518786304412",
  appId: "1:518786304412:web:5c7a7bc42f918e78336059",
  measurementId: "G-QYJHNNTC52"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Timer Logic
let isRunning = false;
let timerInterval;
let totalSeconds = 0;

// DOM Elements
const timerDisplay = document.getElementById("timerDisplay");
const startTimerButton = document.getElementById("startTimer");
const stopTimerButton = document.getElementById("stopTimer");

// Start Timer
startTimerButton.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      totalSeconds++;
      updateTimerDisplay();
      updateFirebase();
    }, 1000);
  }
});

// Stop Timer
stopTimerButton.addEventListener("click", () => {
  isRunning = false;
  clearInterval(timerInterval);
  updateFirebase();
});

// Update Timer Display
function updateTimerDisplay() {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update Firebase
function updateFirebase() {
  database.ref("tracker").set({
    totalSeconds: totalSeconds,
    lastUpdated: Date.now(),
  });
}

// Sync Data from Firebase
database.ref("tracker").on("value", (snapshot) => {
  const data = snapshot.val();
  if (data) {
    totalSeconds = data.totalSeconds || 0;
    updateTimerDisplay();
  }
});
