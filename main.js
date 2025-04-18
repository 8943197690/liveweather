const apiKey = 'de4de2a9159ee4af4d9a122fe86a7853';
const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Mumbai', 'Cape Town', 'Kochi','Moscow', 'Beijing', 'Rio de Janeiro', 'Cairo', 'Bangkok', 'Berlin', 'Toronto', 'Dubai']; 

const weatherContainer = document.getElementById('weather-container');


async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data for ${city}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function displayWeather() {
    for (const city of cities) {
        const weatherData = await fetchWeather(city);
        if (weatherData) {
            const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`; 

            const weatherTile = document.createElement('div');
            weatherTile.className = 'weather-tile';
            weatherTile.innerHTML = `
                <div class="temperature">${weatherData.main.temp}°C</div>
                <h2>${weatherData.name}</h2>
                <img src="${iconUrl}" alt="${weatherData.weather[0].description}" class="weather-icon">
                <p>Weather: ${weatherData.weather[0].description}</p>
                <p>Humidity: ${weatherData.main.humidity}%</p>
            `;
            weatherContainer.appendChild(weatherTile);
        } 
    }
}

displayWeather();

// Add event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const weatherTiles = document.querySelectorAll('.weather-tile');

    weatherTiles.forEach(tile => {
        const cityName = tile.querySelector('h2').textContent.toLowerCase();
        if (cityName.includes(searchInput)) {
            tile.style.display = 'block'; // Show matching tiles
        } else {
            tile.style.display = 'none'; // Hide non-matching tiles
        }
    });
});

// Optional: Add "Enter" key functionality for the search bar
document.getElementById('search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});