// CurrentTime&Date
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

// change Temparature from c to f
function updateTempF(event) {
  event.preventDefault();

  let mainTemp = document.querySelector("#mainTemp");
  let mainTempF = (celsiusTemp * 9) / 5 + 32;
  mainTemp.innerHTML = Math.round(mainTempF);
}

function updateTempC(event) {
  event.preventDefault();

  let mainTemp = document.querySelector("#mainTemp");
  mainTemp.innerHTML = Math.round(celsiusTemp);
}

let mainTempF = document.querySelector(".tempF");
mainTempF.addEventListener("click", updateTempF);

let mainTempC = document.querySelector(".tempC");
mainTempC.addEventListener("click", updateTempC);

function mouseDownF() {
  let element = document.querySelector(".tempF");
  element.classList.add("mystyle");
  let element2 = document.querySelector(".tempC");
  element2.classList.remove("mystyle");
}

let tempF = document.querySelector(".tempF");
tempF.addEventListener("mousedown", mouseDownF);

function mouseDownC() {
  let element = document.querySelector(".tempC");
  element.classList.add("mystyle");
  let element2 = document.querySelector(".tempF");
  element2.classList.remove("mystyle");
}

let tempC = document.querySelector(".tempC");
tempC.addEventListener("mousedown", mouseDownC);

// update searched City data
function updateCityElement(response) {
  let cityName = document.querySelector(".cityname");
  let currentCityName = response.data.name;
  cityName.innerHTML = currentCityName;

  celsiusTemp = response.data.main.temp;
  let tempRound = Math.round(celsiusTemp);

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
  // iconElement.setAttribute("alt", response.data.weather[0].description);
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

let celsiusTemp = null;

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
  // iconElement.setAttribute("alt", response.data.weather[0].description);
  // console.log(response);
}

function getCurrentPlace(position) {
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
