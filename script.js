let timer;
let totalSeconds = 0;
let isRunning = false;

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const dailyLogEl = document.getElementById('dailyLog');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

startButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      totalSeconds++;
      updateTimerDisplay();
    }, 1000);
  }
});

stopButton.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
    updateDailyLog();
  }
});

function updateTimerDisplay() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function updateDailyLog() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  dailyLogEl.textContent = `Total Study Time: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
