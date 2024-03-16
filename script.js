const input = document.querySelector("#search");
const btn = document.querySelector("#btn");
const divCelsius = document.querySelector("#box-celsius");


const apiKey = "a69f480673b41b45866e9fba72599070";
async function getWeather(cityName){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)

        if(!response){
            throw new Error;
        }

        const data = await response.json();

        return data;
    }catch(err){
        console.err(err)
    }
}


function kevinToCelsius(k){
    return k - 273.15;
}


btn.addEventListener("click", async () => {
    try {
        const data = await getWeather("sao paulo");

        if(!data) throw Error("It was not possible retreat the data");

        console.log(data); 

        const tempInCelsius = kevinToCelsius(data.main.temp);

        divCelsius.innerText = `${tempInCelsius.toFixed(1)} ºC`;

    } catch (error) {
        console.error(error);
    }
});