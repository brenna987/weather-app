let now = new Date();

let h2 = document.querySelector("#day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

minutes = minutes + ``;
if (minutes < 10) {
  minutes = "0" + minutes;
}

h2.innerHTML = `${day}`;
document.getElementById("time-decoration").innerHTML = `${hours}:${minutes}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-heading");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "4b72c972f7597913fe5a676591dd7b39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search-input");
  search(cityInputElement.value);
}
//current location

function showLocationWeather(position) {
  let latitude = `${position.coords.latitude}`;
  let longitude = `${position.coords.longitude}`;
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then((response) => {
      let celsiusElement = Math.round(response.data.main.temp);
      document.getElementById("temperature").innerHTML = `${celsiusElement}`;
      document.getElementById(
        "city-heading"
      ).innerHTML = `${response.data.name}`;
    });
}

function currentLocationWeather() {
  navigator.geolocation.getCurrentPosition(showLocationWeather);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocationWeather);

let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "4b72c972f7597913fe5a676591dd7b39";

search("Los Angeles");
