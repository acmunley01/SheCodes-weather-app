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

function changeTemp(response) {
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
    response.data.weather[0].main;
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

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", getCurrentCity);

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "c9c6ee19f6a225b23ef1849cc5c67221";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(changeTemp);
}

let newCityForm = document.querySelector("#change-city-form");
newCityForm.addEventListener("submit", changeCity);
