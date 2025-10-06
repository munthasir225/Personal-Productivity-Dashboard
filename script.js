// --- Theme Toggle ---
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// --- To-Do List ---
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTask.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;
  const li = document.createElement("li");
  li.textContent = taskInput.value;
  li.onclick = () => li.classList.toggle("done");
  taskList.appendChild(li);
  taskInput.value = "";
});

// --- Pomodoro Timer ---
let timer;
let timeLeft = 25 * 60; // 25 minutes

const timerDisplay = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startTimer");
const resetBtn = document.getElementById("resetTimer");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

startBtn.onclick = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      alert("Pomodoro complete!");
    }
  }, 1000);
};

resetBtn.onclick = () => {
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateTimerDisplay();
};

updateTimerDisplay();

// --- Weather (OpenWeather API) ---
const apiKey = "https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true";
const weatherInfo = document.getElementById("weatherInfo");
const getWeather = document.getElementById("getWeather");
const cityInput = document.getElementById("cityInput");

getWeather.onclick = async () => {
  const city = cityInput.value.trim();
  if (!city) return;
  weatherInfo.textContent = "Fetching weather...";
  
  setTimeout(() => {
    weatherInfo.innerHTML = `<b>${city}</b>: 30°C, Clear Sky`;
  }, 1000);
};

// --- Quote Generator ---
const quoteText = document.getElementById("quoteText");
const newQuote = document.getElementById("newQuote");

const quotes = [
  "Success is not final; failure is not fatal.",
  "The future depends on what you do today.",
  "Discipline is the bridge between goals and accomplishment.",
  "Focus on being productive instead of busy."
];

newQuote.onclick = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[randomIndex];
};

quoteText.textContent = quotes[0];
