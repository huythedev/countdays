let currentTime;

async function getCurrentTime() {
  try {
    const response = await fetch("https://worldtimeapi.org/api/ip");
    const data = await response.json();
    const time = new Date(data.unixtime * 1000);
    return time;
  } catch (error) {
    console.error("Could not get response", error);
    return new Date();
  }
}

async function initializeClock() {
  currentTime = await getCurrentTime();
  updateClock();
}

function displayCurrentTime() {
    const options = { hour: "numeric", minute: "numeric", second: "numeric" };
    const timeString = new Intl.DateTimeFormat("en-US", options).format(currentTime);
  
    const [hours, minutes, seconds] = timeString.split(':');
  
    const secondsWithoutMeridiem = seconds.split(' ')[0];
  
    document.getElementById("current-hours").innerText = `${hours} giờ`;
    document.getElementById("current-minutes").innerText = `${minutes} phút`;
    document.getElementById("current-seconds").innerText = `${secondsWithoutMeridiem} giây`;
}  

function calculateTimeRemaining() {
  const tetDate = new Date("2024-02-10T00:00:00+07:00");
  const timeRemaining = tetDate - currentTime;
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = `${days} ngày`;
  document.getElementById("hours").innerText = `${hours.toString().padStart(2, '0')} giờ`;
  document.getElementById("minutes").innerText = `${minutes.toString().padStart(2, '0')} phút`;
  document.getElementById("seconds").innerText = `${seconds.toString().padStart(2, '0')} giây`;
}

function updateClock() {
  setInterval(() => {
    currentTime.setSeconds(currentTime.getSeconds() + 1);
    calculateTimeRemaining();
    displayCurrentTime();
  }, 1000);
}

function showInitialTime() {
  initializeClock();
  displayCurrentTime();
}

showInitialTime();
