// Feature #1
function updateTime() {
  let now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  let showTime = `${hour} : ${min}`;

  document.querySelector(".cityTime").innerHTML = showTime;
}
updateTime();

function updateDate() {
  let date = new Date();
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let showDate = days[dayIndex];
  document.querySelector(".cityDate").innerHTML = showDate;
}
updateDate();

// // Feature #2
// function changeCityName(event) {
//   event.preventDefault();
//   let inputCityName = document.getElementById("inputacity");
//   let cityname = document.querySelector(".cityname");
//   cityname.innerHTML = inputCityName.value;
// }

// let inputCityName = document.querySelector("button");
// inputCityName.addEventListener("click", changeCityName);

// // Feature #3
// function mouseDownF() {
//   document.getElementById("mainTemp").innerHTML = "90";
//   let element = document.querySelector(".tempF");
//   element.classList.add("mystyle");
//   let element2 = document.querySelector(".tempC");
//   element2.classList.remove("mystyle");
// }

// let tempF = document.querySelector(".tempF");
// tempF.addEventListener("mousedown", mouseDownF);

// function mouseDownC() {
//   document.getElementById("mainTemp").innerHTML = "32";
//   let element = document.querySelector(".tempC");
//   element.classList.add("mystyle");
//   let element2 = document.querySelector(".tempF");
//   element2.classList.remove("mystyle");
// }

// let tempC = document.querySelector(".tempC");
// tempC.addEventListener("mousedown", mouseDownC);

// display city Name
// function insertCityName(event) {
//   event.preventDefault();
//   let cityName = document.getElementById("inputacity");
//   let tempElement = document.querySelector(".cityname");

//   // tempElement.innerHTML = cityName.value;
// }

// let cityName = document.querySelector("button");
// cityName.addEventListener("click", insertCityName);

// update searched City data
function updateCityElement(response) {
  let tempRound = Math.round(response.data.main.temp);
  let tempElement = document.getElementById("mainTemp");
  tempElement.innerHTML = `${tempRound}`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let tempMax = document.querySelector(".highest_temp");
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  let tempMin = document.querySelector(".lowest_temp");
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  let icon = document.getElementById("icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.getElementById("inputacity").value;
  let apiKey = "10bffd0ee69586cf4e1b1e702883c72c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=10bffd0ee69586cf4e1b1e702883c72c&units=metric`;
  axios.get(apiUrl).then(updateCityElement);
}

let cityName = document.querySelector(".form-inline");
cityName.addEventListener("submit", handleSubmit);

// current place
function showCurrentTempPlace(response) {
  let cityName = document.querySelector(".cityname");
  let currentCityName = response.data.name;
  cityName.innerHTML = currentCityName;

  let mainTemp = document.getElementById("mainTemp");
  let currentTemp = Math.round(response.data.main.temp);
  mainTemp.innerHTML = currentTemp;
  let wind = document.querySelector(".wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let tempMax = document.querySelector(".highest_temp");
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  let tempMin = document.querySelector(".lowest_temp");
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector(".cityname").innerHTML = response.data.name;
  let icon = document.getElementById("icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response);
}

function getCurrentPlace(position) {
  // let apiKey = "10bffd0ee69586cf4e1b1e702883c72c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=10bffd0ee69586cf4e1b1e702883c72c`;
  axios.get(apiUrl).then(showCurrentTempPlace);
}

function currentPlace() {
  navigator.geolocation.getCurrentPosition(getCurrentPlace);
}

let currentButton = document.getElementById("currentlocation");
currentButton.addEventListener("click", currentPlace);
