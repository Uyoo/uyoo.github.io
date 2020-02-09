const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".js-title");

const getTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

function init() {
  //get current time
  getTime();
  setInterval(getTime, 1000);
}

init();
