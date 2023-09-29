// create a variable
let weatherImage = document.querySelector("#current-img");
let temperature = document.querySelector("#temp");
let city = document.querySelector("#city");
let humidity = document.querySelector("#humidity-text");
let windSpeed = document.querySelector("#wind-text");
let inputCity = document.querySelector("#input-city");
let searchWeather = document.querySelector("#search-weather");
let targetCity = "Delhi"; 

// create an array of needed all images
let allWeatherImg = {
    clear: "https://pluspng.com/img-png/bright-sunny-day-png-bright-calendar-clear-day-daytime-forecast-solar-sun-512.png",
    cloud: "https://cdn1.iconfinder.com/data/icons/weather-forecast-meteorology-color-1/128/weather-partly-sunny-512.png",
    drizzle: "https://whatemoji.org/wp-content/uploads/2020/07/Sun-Behind-Rain-Cloud-Emoji.png",
    mist: "https://cdn3.iconfinder.com/data/icons/weather-ios-11-1/50/Partly_Cloudy_Cloudy_Sun_Cloud_Nebulosity_Apple_Weather-1024.png",
    rain: "https://cdn3.iconfinder.com/data/icons/weather-ios-11-1/50/Partly_Cloudy_Cloudy_Sun_Cloud_Nebulosity_Apple_Weather-1024.png",
    snow: "https://www.freeiconspng.com/uploads/weather-snow-icon-23.png",
};


// create async function to handle weather api call to get weather related data
async function getWeather(targetCity) {
    try {
        if (targetCity !== "") {
            url = `https://api.weatherapi.com/v1/current.json?key=2b6c20e1a2b245c4b3a61912232909&q=${targetCity}&aqi=no`;
        }
        let data = await fetch(url);
        let jsonValue = await data.json();
        printWeather(jsonValue);
    } catch (error) {
        alert("Enter correct place")
    }
}

// handle particular images for particular weather
function handleWeatherImage(text) {
    switch (text) {
        case "Partly cloudy":
            return allWeatherImg.drizzle;
        case "Mist":
            return allWeatherImg.mist;
        case "Sunny":
            return allWeatherImg.clear;
        case "Clear":
            return allWeatherImg.clear;
        case "Patchy light rain with thunder":
            return allWeatherImg.rain;
        case "Patchy rain possible":
            return allWeatherImg.rain;
        case "Overcast":
            return allWeatherImg.snow;
        case "Light rain":
            return allWeatherImg.drizzle;
        default:
            return null;
    }
}

// show data on screem
function printWeather(weatherData) {
    weatherImage.src = handleWeatherImage(weatherData["current"]["condition"].text);
    temperature.innerHTML = weatherData["current"].temp_c + "<sup>o</sup> C";
    city.innerHTML = weatherData["location"].name;
    humidity.innerHTML = weatherData["current"].humidity + " %";
    windSpeed.innerHTML = weatherData["current"].wind_kph + " km/h";
}

// add click listeners on search icon
searchWeather.addEventListener("click", () => {
    targetCity = inputCity.value;
    getWeather(targetCity);
});

// Call getWeather with the default targetCity value
window.addEventListener("load", () => {
    getWeather(targetCity);
});