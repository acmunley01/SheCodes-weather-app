function formatDate(date) {
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
  let month = months[date.getMonth()];
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
  let today = document.querySelector("#today-date");
  today.innerHTML = `${day}, ${month} ${currentDate}, ${year}`;
  let updated = document.querySelector(".last-updated");
  updated.innerHTML = `Last Updated: ${currentHour}:${currentMin} on ${numberMonth}/${currentDate}/${year}`;
}

let now = new Date();
formatDate(now);

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
