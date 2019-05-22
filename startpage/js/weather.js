const OPENWEATHERMAP_KEY = 'ad2d8c643ebc16c189b91f61623cee6f';
const COORDS = 'coords';
const weather = document.querySelector('#weather');
const weatherText = weather.querySelector('.location');
const tempText = weather.querySelector('.temp');

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHERMAP_KEY}&units=metric`).then(function (response) {
        //자바스크립트 객체를 JSON으로 변환
        return response.json();
    }).then(function (data) {
        const img = document.createElement("img");
        const city = data.name;
        const icon = data.weather[0].icon;
        const temp = Math.floor(data.main.temp);
        if (temp >= 0) {
            weather.style.color = '#c23616';
        } else {
            weather.style.color = '#192a56';
        }
        const imgTag = weather.insertBefore(img, weather.firstChild);
        imgTag.src = `http://openweathermap.org/img/w/${icon}.png`;
        tempText.innerText = `${temp}℃`;
        weatherText.innerText = `${city}`;
    });
}

function saveCoords(obj) {
    localStorage.setItem(COORDS, JSON.stringify(obj));
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}


function error(error) {
    console.log(error.message);
}

function askLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
}

function getLocation() {
    const info = localStorage.getItem(COORDS);

    if (info === null) {
        askLocation();
    } else {
        const parseCoords = JSON.parse(info);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    getLocation();
}

init();