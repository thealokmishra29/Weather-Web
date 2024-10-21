const apiKey = 'a53819ec567cd3d81449694d1ab3d3c6';  // Replace 'YOUR_API_KEY' with your actual API key
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { main, weather, name } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    const icon = weather[0].icon;
    const country = data.sys.country;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
        <p>${temperature}°C</p>
        <p>${description}</p>
    `;
}

document.getElementById("city-input").addEventListener("keyup", function(event) {
    // 13 is the "Enter" key's code
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});

document.getElementById("search-btn").addEventListener("click", function() {
    const city = document.getElementById("city-input").value;
    if(city) {
        getWeather(city); // Call your weather fetching function
    } else {
        alert("Please enter a city name");
    }
});

// Example function for fetching and displaying weather data
function getWeather(city) {
    // Call to API or other logic to fetch weather data for the city
    document.getElementById("result").innerHTML = `Showing weather for ${city}`;
}
