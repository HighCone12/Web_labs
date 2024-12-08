const API_KEY = '273657f5701db2c16041dee25d2e3a33';

const form = document.querySelector('#form');
const input = document.querySelector('.form_input');

form.onsubmit = submitHandler;

async function submitHandler (e) {
    e.preventDefault();

    if (!input.value.trim()) {
        console.log('Enter City name');
        return
    } 

    const cityInfo = await getGeo(input.value.trim());

    const weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon']);
    console.log(weatherInfo);

    console.log(weatherInfo.name);
    console.log(weatherInfo.main.temp);
    console.log(weatherInfo.main.humidity);
    console.log(weatherInfo.wind.speed);
    console.log(weatherInfo.weather[0]['main']);
}

async function getGeo (name) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
    const response = await fetch(geoUrl);
    const data = await response.json();
    return data;
}

async function getWeather (lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    return data;
}