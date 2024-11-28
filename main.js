const apiKey = 'a53819ec567cd3d81449694d1ab3d3c6';
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

// Event listener for "Enter" key press in the input field
cityInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchButton.click();
    }
});

// Function to fetch weather data
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found. Please check the city name and try again.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Function to display weather data
function displayWeather(data) {
    const { main, weather, name, sys } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    const icon = weather[0].icon;
    const country = sys.country;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Description:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
}
