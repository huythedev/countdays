let canFetch = true;

async function getCurrentTime() {
  if (!canFetch) return;
  
  canFetch = false;
  setTimeout(() => {
    canFetch = true;
  }, 500);

  try {
    const response = await fetch("https://worldtimeapi.org/api/ip");
    const data = await response.json();
    const currentTime = new Date(data.unixtime * 1000);
    return currentTime;

  } catch (error) {
    console.error("Could not get response", error);
  }
}

function calculateTimeRemaining() {
    const tetDate = new Date("2024-02-10T00:00:00+07:00");
    const currentTime = getCurrentTime();

    currentTime.then((now) => {
        const timeRemaining = tetDate - now;
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = `${days} ngày`;
        document.getElementById("hours").innerText = `${hours} giờ`;
        document.getElementById("minutes").innerText = `${minutes} phút`;
        document.getElementById("seconds").innerText = `${seconds} giây`;
    });
}

calculateTimeRemaining();

function updateClock() {
    calculateTimeRemaining();
    requestAnimationFrame(updateClock);
}

updateClock();
