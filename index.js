function getWeather() {
    const apiKey = 'e4feae1faa2d5a8f8b3f4f0d4d45469e';
    const city = document.getElementById('location').value;


    if (!city) {
        alert('Please enter a location')
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


    fetch(currentWeatherUrl)
        .then(Response => Response.json())
        .then(data => {
            console.log(data)
            displayWeather(data);

        })
        .catch(error => {
            console.log('Error fetching current weather data', error);

        });

    fetch(forecastUrl)
        .then(Response => Response.json())
        .then(data => {
            displayforecast(data.list);

        })
        .catch(error => {
            console.log('Error fetching weather forecast data', error);

        });
}
function displayWeather(data) {
    const tempatureInfo = document.getElementById('tempature');
    const weather = document.getElementById('weather-details');
    const hourlyforecast = document.getElementById('hourly');
    const weatherIcon = document.getElementById('weather-icon');

    weather.innerHTML = '';
    hourlyforecast.innerHTML = '';
    tempatureInfo.innerHTML = '';

    if (data.cod === '404') {
        weather.innerHTML = `<p>${data.message}</p>`;
    }
    else {
        const cityName = data.name;
        const tempature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}`;

        const tempatureHTML = `<p>${tempature}°C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        tempatureInfo.innerHTML = tempatureHTML;
        weather.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alert = description;

        showImage();
    }
}