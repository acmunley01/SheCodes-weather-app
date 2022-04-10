function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();
  let year = date.getFullYear();
  return `${day}, ${month} ${currentDate}, ${year}`;
}

function formatDateUpdated(timestamp) {
  let date = new Date(timestamp);
  let monthNum = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  let numberMonth = monthNum[date.getMonth()];
  let currentDate = date.getDate();
  let year = date.getFullYear();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  return `Last Updated: ${currentHour}:${currentMin} on ${numberMonth}/${currentDate}/${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
           <div class="card" style="width: 8rem;">
              <div class="card-body">
                  <p class="card-text" id="date">${formatDay(
                    forecastDay.dt
                  )}</p>
                  <h2 class="card-title" id="date-status"><img src = "http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="" width="60"/></h2>
                  <p class="card-text"><span id="forecast-high">${Math.round(
                    forecastDay.temp.max
                  )}°</span> | <span id="forecast-low">${Math.round(
          forecastDay.temp.min
        )}°</span></p>
              </div>
           </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c9c6ee19f6a225b23ef1849cc5c67221";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function changeTemp(response) {
  fahrenheitTemperature = response.data.main.temp;
  fahrenheitHigh = response.data.main.temp_max;
  fahrenheitLow = response.data.main.temp_min;
  fahrenheitFeelsLike = response.data.main.feels_like;
  let currentTemp = Math.round(response.data.main.temp);
  let locationTemp = document.querySelector("#current-temp");
  locationTemp.innerHTML = `${currentTemp}°F`;
  let currentLocation = response.data.name;
  let currentCountry = response.data.sys.country;
  let useCurrentLocation = document.querySelector("h1");
  useCurrentLocation.innerHTML = `${currentLocation}, ${currentCountry}`;
  document.querySelector("#current-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#current-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  let todayDate = document.querySelector("#today-date");
  todayDate.innerHTML = formatDate(response.data.dt * 1000);
  let lastUpdated = document.querySelector(".last-updated");
  lastUpdated.innerHTML = formatDateUpdated(response.data.dt * 1000);
  let iconElement = document.querySelector("#condition-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c9c6ee19f6a225b23ef1849cc5c67221";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(changeTemp);
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function search(city) {
  let apiKey = "c9c6ee19f6a225b23ef1849cc5c67221";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(changeTemp);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTempCurrent = Math.round((fahrenheitTemperature - 32) * (5 / 9));
  document.querySelector("#current-temp").innerHTML = `${celsiusTempCurrent}°C`;
  let celsiusHigh = Math.round((fahrenheitHigh - 32) * (5 / 9));
  document.querySelector("#current-high").innerHTML = celsiusHigh;
  let celsiusLow = Math.round((fahrenheitLow - 32) * (5 / 9));
  document.querySelector("#current-low").innerHTML = celsiusLow;
  let celsiusFeelsLike = Math.round((fahrenheitFeelsLike - 32) * (5 / 9));
  document.querySelector("#feels-like").innerHTML = celsiusFeelsLike;
}

function displayFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    fahrenheitTemperature
  )}°F`;
  document.querySelector("#current-high").innerHTML =
    Math.round(fahrenheitHigh);
  document.querySelector("#current-low").innerHTML = Math.round(fahrenheitLow);
  document.querySelector("#feels-like").innerHTML =
    Math.round(fahrenheitFeelsLike);
}

let fahrenheitTemperature = null;
let fahrenheitHigh = null;
let fahrenheitLow = null;
let fahrenheitFeelsLike = null;

let newCityForm = document.querySelector("#change-city-form");
newCityForm.addEventListener("submit", changeCity);

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", getCurrentCity);

let celsiusButton = document.querySelector(".celsius");
celsiusButton.addEventListener("click", displayCelsius);

let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", displayFahrenheit);

search("Lancaster");
