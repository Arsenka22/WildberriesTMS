const body = document.querySelector("body");

const timer = document.createElement("div");
timer.classList.add("font-bold", "text-4xl", "text-red-500");
body.appendChild(timer);

const hoursSpan = document.createElement("span");
const minutesSpan = document.createElement("span");
const secondsSpan = document.createElement("span");

timer.appendChild(hoursSpan);
timer.appendChild(minutesSpan);
timer.appendChild(secondsSpan);

let hours = 10;
let minutes = 10;
let seconds = 10;

hoursSpan.textContent = `${hours}:`;
minutesSpan.textContent = `${minutes}:`;
secondsSpan.textContent = `${seconds}`;


