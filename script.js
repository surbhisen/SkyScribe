const apiKey = "75bcd9e38b98615e7c148346b1a32b02";
const defaultCity = "Jabalpur";

document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData(defaultCity);
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.cod !== 200) {
            throw new Error(`API error! Message: ${data.message}`);
        }

        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

function displayWeatherData(data) {
    const weatherIcon = {
        "Clear": "sunny",
        "Clouds": "cloud",
        "Rain": "rainy",
        "Snow": "ac_unit",
        "Thunderstorm": "flash_on",
        "Drizzle": "grain",
        "Atmosphere": "waves"
    };

    document.getElementById('city-name').textContent = data.name;
    document.getElementById('date').textContent = new Date().toLocaleDateString();
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('visibility').textContent = `${data.visibility / 1000} km`;
    document.getElementById('weather-icon').textContent = weatherIcon[data.weather[0].main] || "wb_sunny";
}

function getWeather(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    fetchWeatherData(city);
}
