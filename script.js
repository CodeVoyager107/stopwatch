let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById("time-display");
const lapList = document.getElementById("lap-list");
const startPauseBtn = document.getElementById("startPauseBtn");

function timeToString(time) {
  const ms = String(time % 1000).padStart(3, '0');
  const secs = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
  const mins = String(Math.floor((time / 60000) % 60)).padStart(2, '0');
  const hrs = String(Math.floor(time / 3600000)).padStart(2, '0');
  return `${hrs}:${mins}:${secs}.${ms}`;
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = timeToString(elapsedTime);
}

function startPause() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
    startPauseBtn.textContent = "Pause";
    startPauseBtn.style.backgroundColor = "#ff9933";
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = "Resume";
    startPauseBtn.style.backgroundColor = "#00cc66";
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  startPauseBtn.style.backgroundColor = "#00cc66";
  lapList.innerHTML = "";
  lapCounter = 0;
}

function recordLap() {
  if (!isRunning) return;

  lapCounter++;
  const lapTime = timeToString(elapsedTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCounter}: ${lapTime}`;
  lapList.appendChild(li);
}
