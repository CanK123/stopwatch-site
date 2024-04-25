const Display = document.getElementById("display");
const stButton = document.getElementById("start-button");
const resButton = document.getElementById("res-button");
class Stopwatch {
  isActive = false;
  startTime = 0;
  currentTime = 0;
  accumulatedTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  intervalId;
}
const stopwatch = createStopwatch();

function beginPause() {
  if (stopwatch.isActive() == false) {
    stopwatch.start();
  } else {
    stopwatch.pause();
  }
}

function createStopwatch() {
  let stopwatch = new Stopwatch();
  let minutes;
  let hours;
  let seconds;
  return { start, pause, isActive };
  function start() {
    stopwatch.isActive = true;
    stopwatch.startTime = Date.now();
    intervalId = setInterval(() => {
      currentTime = Date.now();
      hours =
        Math.floor(
          (currentTime - stopwatch.startTime) / (60 * 60 * 100) +
            stopwatch.accumulatedTime.hours
        ) % 60;
      minutes =
        Math.floor(
          (currentTime - stopwatch.startTime) / (60 * 100) +
            stopwatch.accumulatedTime.minutes
        ) % 60;
      seconds =
        Math.floor(
          (currentTime - stopwatch.startTime) / 100 +
            stopwatch.accumulatedTime.seconds
        ) % 60;
      const time = `${hours.toString().padStart(2, 0)}:${minutes
        .toString()
        .padStart(2, 0)},${seconds.toString().padStart(2, 0)}`;
      Display.textContent = time;
    }, 1000);
    stButton.style.backgroundColor = "hsl(0, 100%, 22%)";
    stButton.style.color = "red";
    stButton.textContent = "Stop";
  }
  function pause() {
    clearInterval(intervalId);
    stopwatch.isActive = false;
    stopwatch.accumulatedTime = { hours, minutes, seconds };
    stButton.textContent = "Start";
    stButton.style.backgroundColor = "hsl(120, 88%, 22%, 0.8)";
    stButton.style.color = "rgba(128, 255, 0, 0.85)";
    resButton.style.textContent = "Restart";
  }
  function isActive() {
    return stopwatch.isActive;
  }
  function lap() {}
}
