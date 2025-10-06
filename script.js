// --- THEME TOGGLE WITH LOCALSTORAGE ---
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

// --- TO-DO LIST WITH LOCALSTORAGE ---
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");
    li.onclick = () => toggleTask(task.text);
    taskList.appendChild(li);
  });
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updated = tasks.map(t => t.text === text ? { ...t, done: !t.done } : t);
  saveTasks(updated);
  loadTasks();
}

addTask.onclick = () => {
  if (taskInput.value.trim() === "") return;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskInput.value, done: false });
  saveTasks(tasks);
  loadTasks();
  taskInput.value = "";
};

loadTasks();

// --- POMODORO TIMER ---
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

// --- WEATHER USING OPENWEATHER API ---
const getWeather = document.getElementById("getWeather");
const weatherInfo = document.getElementById("weatherInfo");
const cityInput = document.getElementById("cityInput");

getWeather.onclick = async () => {
  const city = cityInput.value.trim();
  if (!city) return alert("Enter a city name!");
  weatherInfo.textContent = "Fetching weather...";

  try {
    // Use the key from config.js
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Invalid city or network error");

    const data = await res.json();
    weatherInfo.innerHTML = `<b>${data.name}</b>: ${data.main.temp}°C, ${data.weather[0].description}`;
  } catch (err) {
    weatherInfo.textContent = "Error fetching weather data.";
  }
};

// --- QUOTE GENERATOR ---
const quoteText = document.getElementById("quoteText");
const newQuote = document.getElementById("newQuote");
const quotes = [
  "Success is not final; failure is not fatal.",
  "The future depends on what you do today.",
  "Discipline is the bridge between goals and accomplishment.",
  "Focus on being productive instead of busy.",
  "Don’t watch the clock; do what it does. Keep going."
];

function loadQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[randomIndex];
}

newQuote.onclick = loadQuote;
loadQuote();

