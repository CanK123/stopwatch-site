const Display = document.getElementById("display");
const stButton = document.getElementById("start-button");
const resButton = document.getElementById("res-button");
const lapContainer = document.getElementById("lap-container");
class Stopwatch {
  constructor() {
    this.isActive = false;
    this.startTime = 0;
    this.accumulatedTime = 0;
    this.intervalId;
    this.prevTime = 0;
  }
}
const stopwatch = createStopwatch();
function beginPause() {
  if (stopwatch.isActive() == false) {
    stopwatch.start();
  } else {
    stopwatch.pause();
  }
}

function lapReset() {
  if (stopwatch.isActive()) {
    stopwatch.newLap();
  } else {
    stopwatch.restart();
  }
}

function createStopwatch() {
  let stopwatch = new Stopwatch();
  let minutes;
  let miliseconds;
  let seconds;
  let lap = 0;
  return { start, pause, isActive, newLap, restart };
  function start() {
    stopwatch.isActive = true;
    stopwatch.startTime = Date.now();
    intervalId = setInterval(() => {
      currentTime = Date.now();
      minutes = Math.floor(
        (currentTime - stopwatch.startTime + stopwatch.accumulatedTime) /
          (60 * 1000)
      );
      seconds = Math.floor(
        ((currentTime - stopwatch.startTime + stopwatch.accumulatedTime) %
          (60 * 1000)) /
          1000
      );
      miliseconds = Math.floor(
        ((currentTime - stopwatch.startTime + stopwatch.accumulatedTime) %
          1000) /
          10
      );
      const time = `${minutes.toString().padStart(2, 0)}:${seconds
        .toString()
        .padStart(2, 0)},${miliseconds.toString().padStart(2, 0)}`;
      Display.textContent = time;
    }, 10);
    stButton.style.backgroundColor = "hsl(0, 100%, 22%)";
    stButton.style.color = "red";
    resButton.textContent = "Lap";
    stButton.textContent = "Stop";
  }
  function pause() {
    clearInterval(intervalId);
    stopwatch.isActive = false;
    stopwatch.accumulatedTime =
      minutes * 60 * 1000 + seconds * 1000 + miliseconds * 10;
    stButton.textContent = "Start";
    stButton.style.backgroundColor = "hsl(120, 88%, 22%, 0.8)";
    stButton.style.color = "rgba(128, 255, 0, 0.85)";
    resButton.textContent = "Restart";
  }
  function isActive() {
    return stopwatch.isActive;
  }
  function newLap() {
    const lapDiv = document.createElement("div");
    lapDiv.className = "lap";
    const Span1 = document.createElement("span");
    const Span2 = document.createElement("span");
    lap++;
    Span1.textContent = `Lap ${lap}`;
    let elapsedTime =
      stopwatch.startTime > stopwatch.prevTime
        ? Date.now() - stopwatch.startTime
        : Date.now() - stopwatch.prevTime;
    stopwatch.prevTime = Date.now();
    Span2.textContent = `${Math.floor(elapsedTime / (60 * 1000))
      .toString()
      .padStart(2, 0)}:${Math.floor((elapsedTime % (60 * 1000)) / 1000)
      .toString()
      .padStart(2, 0)};${Math.floor((elapsedTime % 1000) / 10)
      .toString()
      .padStart(2, 0)}
    `;
    lapDiv.appendChild(Span1);
    lapDiv.appendChild(Span2);
    lapContainer.appendChild(lapDiv);
  }
  function restart() {
    stopwatch = new Stopwatch();
    Display.textContent = "00:00;00";
    resButton.textContent = "Lap";
    while (lapContainer.firstChild) {
      lapContainer.removeChild(lapContainer.firstChild);
    }
    lap = 0;
  }
}
