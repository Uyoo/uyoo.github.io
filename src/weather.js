const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "a833f2dada0961049b5f2e52565e8340";

const getWeather = (lat, lng) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
        .then(response => {
            return response.json();
        })
        .then(json => {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}℃ / ${place}`;
        });
};

const saveCoords = coordsObj => {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const handleGeoSuccess = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
};

const handleGeoError = () => {
    console.log("cant access");
};

const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

const loadCoords = () => {
    const loadCoords = localStorage.getItem(COORDS);
    if (loadCoords === null) {
        askForCoords();
    } else {
        //get weather
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
};

function init() {
    loadCoords();
}
init();
