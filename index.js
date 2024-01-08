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

            displayWeather(data);

        })
        .catch(error => {
            console.log('Error fetching current weather data', error);


        });

    fetch(forecastUrl)
        .then(Response => Response.json())
        .then(data => {

            hourlyforecast(data.list);
            console.log(data.list);

        })
        .catch(error => {
            console.log('Error fetching current weather forecas data', error);


        });



    function displayWeather(data) {
        const tempatureInfo = document.getElementById('tempature');
        const weather = document.getElementById('weather-details');
        const weatherIcon = document.getElementById('weather-icon');

        weather.innerHTML = '';
        tempatureInfo.innerHTML = '';


        if (data.cod === '404') {
            weather.innerHTML = `<p>${data.message}</p>`;
        }
        else {
            const cityName = data.name;
            const tempature = Math.round(data.main.temp - 273.15);
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
            const timezone1 = data.timezone;



            const tempatureHTML = `<p>${tempature}°C</p>`;
            const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

            tempatureInfo.innerHTML = tempatureHTML;
            weather.innerHTML = weatherHTML;
            weatherIcon.src = iconUrl;
            weatherIcon.alert = description;

            getDate(timezone1);
            showImage();
        }
    }
    function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';
    }


    function getDate(timezone1) {

        const currentDateTime = new Date().toDateString("en-US", { timeZone: `${timezone1}`, timeStyle: 'medium', hourCyle: 'h24' });
        document.getElementById('time').innerHTML = currentDateTime;
    }
    getDate();

    function hourlyforecast(data) {

        let hourNow = data[0].dt_txt.substr(11, 8);
        let hour1 =  data[1].dt_txt.substr(11, 8);
        let hour2 =  data[2].dt_txt.substr(11, 8);
        let hour3 =  data[3].dt_txt.substr(11, 8);
    

        document.getElementById("hour-now").innerHTML =`<p>${hourNow}°C</p>`;
        document.getElementById("hour-one").innerHTML =`<p>${hour1}°C</p>`;
        document.getElementById("hour-two").innerHTML =`<p>${hour2}°C</p>`;
        document.getElementById("hour-three").innerHTML =`<p>${hour3}°C</p>`;


    }
    // hourlyforecast(data);

}
