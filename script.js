const apiKey = "30ac42692749446387a162213261005";

const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");

const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");


// Fetch Weather Data
async function fetchWeather(cityName){

  try{

    const url =
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=yes`;

    const response = await fetch(url);

    const data = await response.json();

    updateUI(data);

  }catch(error){

    alert("Unable to fetch weather data");

  }

}


// Update UI
function updateUI(data){

  temperature.innerText =
  `${data.current.temp_c}°C`;

  city.innerText =
  `${data.location.name}, ${data.location.country}`;

  condition.innerText =
  data.current.condition.text;

  humidity.innerText =
  `${data.current.humidity}%`;

  wind.innerText =
  `${data.current.wind_kph} km/h`;

  feelsLike.innerText =
  `${data.current.feelslike_c}°C`;

  weatherIcon.src =
  "https:" + data.current.condition.icon;

  changeBackground(data.current.temp_c);

}


// Auto Suggestion
cityInput.addEventListener("input", async () => {

  const query = cityInput.value.trim();

  if(query.length < 2){

    suggestions.innerHTML = "";
    return;

  }

  const url =
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

  const response = await fetch(url);

  const cities = await response.json();

  suggestions.innerHTML = "";

  cities.forEach((cityData) => {

    const div = document.createElement("div");

    div.classList.add("suggestion-item");

    div.innerText =
    `${cityData.name}, ${cityData.country}`;

    div.addEventListener("click", () => {

      cityInput.value = cityData.name;

      suggestions.innerHTML = "";

      fetchWeather(cityData.name);

    });

    suggestions.appendChild(div);

  });

});


// Enter Key Support
cityInput.addEventListener("keypress", (e) => {

  if(e.key === "Enter"){

    fetchWeather(cityInput.value);

    suggestions.innerHTML = "";

  }

});


// Dynamic Background
function changeBackground(temp){

  if(temp <= 10){

    document.body.style.background =
    "linear-gradient(135deg,#141E30,#243B55)";

  }
  else if(temp <= 25){

    document.body.style.background =
    "linear-gradient(135deg,#1D4350,#A43931)";

  }
  else{

    document.body.style.background =
    "linear-gradient(135deg,#FF512F,#DD2476)";

  }

}


// Default City
fetchWeather("London");
