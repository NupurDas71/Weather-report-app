document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('get').addEventListener('click', function() {
        const cityName = document.getElementById('search').value;
        if (cityName) {
            weatherFn(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });
});

async function weatherFn(cName) {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';
    const temp = `${url}?q=${encodeURIComponent(cName)},IN&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(temp);
        const data = await res.json();
        console.log(data);  // Log the full response
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('date').textContent = new Date().toLocaleString();
    document.getElementById('temperature').innerHTML = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('wind-speed').innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('weather-icon').setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    document.getElementById('weather-info').style.display = 'block';
}
