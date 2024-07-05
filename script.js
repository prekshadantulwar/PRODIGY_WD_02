let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function startStopwatch() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = "Pause";
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    startPauseBtn.textContent = "Start";
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.textContent = "00:00:00";
    startPauseBtn.textContent = "Start";
    laps.innerHTML = "";
    running = false;
    lapCounter = 1;
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let time = new Date(difference);
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();
    let milliseconds = Math.floor(time.getUTCMilliseconds() / 10);

    display.textContent = 
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + ":" +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement("li");
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        laps.appendChild(lapTime);
        lapCounter++;
    }
}

startPauseBtn.addEventListener("click", () => {
    if (!running) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
    running = !running;
});

resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
