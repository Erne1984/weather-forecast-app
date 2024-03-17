const input = document.querySelector("#search");
const btn = document.querySelector("#btn");
const icon = document.querySelector("#icon");
const divCelsius = document.querySelector("#celsius");
const fieldCity = document.querySelector("#field-city");
const fieldHumidity = document.querySelector("#humidity");
const fieldWind = document.querySelector("#wind");

const apiKey = "a69f480673b41b45866e9fba72599070";
async function getWeather(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)

        if (!response) {
            throw new Error;
        }

        const data = await response.json();

        return data;
    } catch (err) {
        console.err(err)
    }
}

function kevinToCelsius(k) {
    return k - 273.15;
}

function checkTemperature(c) {
    if (c < 10) {
        icon.src = "assets/snow.png";
    } else if (c >= 10 && c <= 25) {
        icon.src = "assets/clouds.png";
    } else {
        icon.src = "assets/clear.png";
    }
}

async function initialData() {
    try {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);

                if (!response.ok) {
                    throw new Error("Could not retrieve weather data");
                }

                const data = await response.json();

                const tempInCelsius = kevinToCelsius(data.main.temp);
                const name = data.name
                const humidity = data.main.humidity;
                const wind = data.wind.speed;

                checkTemperature(tempInCelsius);
                divCelsius.innerText = `${tempInCelsius.toFixed(1)} ºC`;
                fieldCity.innerText = `${name}`;
                fieldHumidity.innerText = `${humidity}%`;
                fieldWind.innerText = `${wind}%`;
            });
        } else {
            throw new Error("Geolocation is not supported by this browser.");
        }
    } catch (error) {
        console.error(error);
    }
}

function search() {
    const searchedCity = input.value;
    return searchedCity;
}

initialData();

btn.addEventListener("click", async () => {
    try {
        const searchedCity = search();
        input.value = "";

        const data = await getWeather(searchedCity.toLowerCase());

        if (!data) throw Error("It was not possible retreat the data");

        if(data.cod=== 200){
            const tempInCelsius = kevinToCelsius(data.main.temp);
            const name = data.name
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
    
            checkTemperature(tempInCelsius);
            divCelsius.innerText = `${tempInCelsius.toFixed(1)} ºC`;
            fieldCity.innerText = `${name}`;
            fieldHumidity.innerText = `${humidity}%`;
            fieldWind.innerText = `${wind}%`;
        }else{
            alert("That city doens't exists!")
        }



    } catch (error) {
        console.error(error);
    }
});