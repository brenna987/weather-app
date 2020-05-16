let now = new Date();

let h2 = document.querySelector("h2");
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

//city search

function updateCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search-input");
  document.getElementById("city-heading").innerHTML = `${input.value}`;
  updateTemp(input.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", updateCity);

function updateTemp(cityName) {
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=metric`)
    .then((response) => {
      let celsiusElement = Math.round(response.data.main.temp);
      document.getElementById("temperature").innerHTML = `${celsiusElement}`;
    });
}

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "4b72c972f7597913fe5a676591dd7b39";

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
