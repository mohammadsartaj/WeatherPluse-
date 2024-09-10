document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.querySelector('.city-input');
    const searchBtn = document.getElementById('search-btn');
    const weather_img = document.querySelector('.weather-img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const wind_speed = document.getElementById('wind-speed');
    const location_not_found = document.querySelector('.location-not-found');
    const weather_body = document.querySelector('.weather-body');
    const country_txt = document.querySelector(".country_txt");
    const date = document.querySelector('.current_date_txt');
    const hum = document.getElementById('humidity2');
    const ws = document.getElementById('wind2');
    const wd = document.getElementById('deg');
    const Temp = document.getElementById('Temp');
    const mt = document.getElementById('min-temp');
    const mmt = document.getElementById('max-temp');
    const p = document.getElementById('pressure');
    const sea = document.getElementById('sea');
    const feel = document.getElementById('feel');
    // const sec = document.querySelector('.forecast_now');
    searchBtn.addEventListener('click', () => {
        checkWeather(inputBox.value);
    });
    async function forcast(lat, lon) {
        const api_key1 = '98a8fac040caeeb1735ce72d3b710682';
        const url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key1}`
        // const response1 = await fetch(`${url1}`).then(response => response.json());;
        // console.log(response1);
        const response1 = await fetch(url1);
        const forecastData = await response1.json();
        const forecastContainer = document.querySelector('.forecast-container');
        forecastContainer.innerHTML = ''; // Clear previous content
        // Display forecast for the next 5 days at 12:00 PM each day
        forecastData.list.forEach((item, index) => {
            if (item.dt_txt.includes("12:00:00")) {
                const card = document.createElement('div');
                card.classList.add('forecast-card');

                const date = new Date(item.dt * 1000).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                });

                card.innerHTML = `
                <h3>${date}</h3>
                <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="weather icon">
                <p>Temp: ${Math.round(item.main.temp - 273.15)}°C</p>
                <p class="desc">${item.weather[0].description}</p>
                <p>Wind: ${item.wind.speed}  m/s</p>
            `;

                forecastContainer.appendChild(card);
            }
        });
    }

    async function checkWeather(city) {
        const api_key = "98a8fac040caeeb1735ce72d3b710682";
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

        const weather_data = await fetch(`${url}`).then(response => response.json());
        // const weather_data1 = await fetch(`${qurl}`).then(response => response.json());
        // console.log(weather_data1);

        if (weather_data.cod === `404`) {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("error");
            return;
        }

        console.log("run");
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;

        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
        country_txt.innerHTML = `${weather_data.name}, ${weather_data.sys.country}`; // City and country
        date.innerHTML = new Intl.DateTimeFormat('en-GB', {
            weekday: 'short',
            day: '2-digit',
            month: 'short'
        }).format(new Date());
        Temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        mmt.innerHTML = `${Math.round(weather_data.main.temp_max - 273.15)}°C`;
        mt.innerHTML = `${Math.round(weather_data.main.temp_min - 273.15)}°C`;
        hum.innerHTML = `${weather_data.main.humidity}%`;
        ws.innerHTML = `${weather_data.wind.speed}Km/H`;
        wd.innerHTML = `${weather_data.wind.deg}°`;
        p.innerHTML = `${weather_data.main.pressure}`;
        sea.innerHTML = `${weather_data.main.sea_level}`;
        feel.innerHTML = `${Math.round(weather_data.main.feels_like - 273.15)}°c`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "/assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "/assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/assets/rain.png";
                break;
            case "Thunderstorm":
                weather_img.src = "/assets/snow.png";
                break;
            case 'Mist':
                weather_img.src = "/assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/assets/snow.png";
                break;
        }
        const lat = weather_data.coord.lat;
        const lon = weather_data.coord.lon;
        console.log(lon, lat);
        forcast(lat, lon);
        console.log(weather_data);
    }
});
