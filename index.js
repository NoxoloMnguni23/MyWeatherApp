function getWeather() {
    const apiKey = 'e4feae1faa2d5a8f8b3f4f0d4d45469e';
    const city = document.getElementById('location').value;


    if (!city) {
        alert('Please enter a location')
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;



    fetch(currentWeatherUrl)
        .then(Response => Response.json())
        .then(data => {

            displayWeather(data);

        })
        .catch(error => {
            console.log('Error fetching current weather data', error);


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
            //const timezone1 = data.timezone.id;



            const tempatureHTML = `<p>${tempature}°C</p>`;
            const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

            tempatureInfo.innerHTML = tempatureHTML;
            weather.innerHTML = weatherHTML;
            weatherIcon.src = iconUrl;
            weatherIcon.alert = description;

            getDate();
            showImage();
            hourlyforecast(data);
        }
    }
    function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';
    }


    function getDate() {

        document.getElementById('date').innerHTML = new Date();
        //const currentDateTime = new Intl.DateTimeFormat("en-US", {timeZone: `${timezone1}`, timeStyle: 'short', hour12: true}).format(date);
        //document.getElementById('time').innerHTML = currentDateTime;
        //document.getElementById('date').innerHTML = new Date().toDateString("en-US", { timeZone: `${timezone1}`, timeStyle: 'medium', hourCyle: 'h24' });
    }

    function hourlyforecast(data) {

        let now = new Date().getHours();
        let time1 = now + 1;
        let time2 = time1 + 1;
        //let time3 = time2 + 1;


        const hour1 = data.hourly[1].temp;
        const hour2 = data.hourly[2].temp;
        const hour3 = data.hourly[3].temp;


        document.getElementById("hour-one").innerHTML = hour1 + "°C";
        document.getElementById("hour-two").innerHTML = hour2 + "°C";
        document.getElementById("hour-three").innerHTML = hour3 + "°C";


    }}