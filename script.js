// Targeting html elements by id and storing API key
const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
const btn = document.getElementById("previousLocation");
let currentWeatherEl = document.getElementById("current");
let futureWeatherEl = document.getElementById("forecast");
const myKey = "988fbbe10b9a8419e74f5e6d95338e7c";
fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}&units=metric`
)
    .then(function (response) {
      return response.json();
  })
  .then(function (data) {
    console.log(data);
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;

      getCurrentAndForecast(latitude, longitude, input);
  });
}

// Seceond fetch call to get more information such as uv index, and future weather forecast.
function getCurrentAndForecast(lat, lon, input) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${myKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("One Call API", data);
      createCurrentWeatherUI(data.current, input);
      createFiveDayForecastUI(data.daily);
    });
}

// Function to display weather data retreived from API into cards.
function createCurrentWeatherUI(currentWeather, input) {
  // Changing uv index colour based on index readings.
  var uvButton;
  if (currentWeather.uvi < 2) {
    uvButton = " btn-success";
  } else if (currentWeather.uvi > 3 || 5) {
    uvButton = " btn-warning";
  } else {
    currentWeather.uvi > 6;
    uvButton = " btn-danger";
  }

  currentWeatherEl.innerHTML = `
    <div class="card mx-auto mt-5" style="width: 18rem;">
        <div class="card-body justify-content-center">
            <h5 class="card-title">${input}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Temp: ${currentWeather.temp} °C</h6>
            <img src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png">
            <p class="card-text ">Wind Speed: ${currentWeather.wind_speed} MPH</p>
          <p class="card-text ">Humidity: ${currentWeather.humidity} %</p>
          <button class=${uvButton}>UV: ${currentWeather.uvi}<button/>
        </div>
    </div>`;
}
// Function to display 5 day weather forecast to html including weather icons
function createFiveDayForecastUI(forecast) {
  // Clearing future forecast when page reloads
  futureWeatherEl.innerHTML = "";
  console.log(forecast);
  for (var i = 0; i < 5; i++) {
    var forecastDate = moment().add(i + 1, "days");
    var forecastCard = document.createElement("div");
    forecastCard.setAttribute("class", "col-lg-2");
    forecastCard.innerHTML = `
    <div class="card mx-auto mt-5">
    <div class="card-body justify-content-center">
    <h6 class="card-subtitle mb-2 text-muted">${forecastDate}}</h6> <br>
        <h6 class="card-subtitle mb-2 text-muted">Temp: ${forecast[i].temp.day} °C</h6>
        <img src="http://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png">
        <p class="card-text ">Wind Speed: ${forecast[i].wind_speed} MPH</p>
      <p class="card-text ">Humidity: ${forecast[i].humidity} %</p>
    </div>
</div>`;

    futureWeatherEl.appendChild(forecastCard);
  }
}
function createSearchHistoryButtons() {
  console.log(previousSearchHistory);
  //use search history and render the buttons onto the page
  var searchPrev;
}
// Event listener for search location button "submit"
button.addEventListener("click", () => {
  const currentVal = search.value;

  //   Function to find and display location called
  getCurrentSearchCoords(currentVal);
});

createSearchHistoryButtons();

// Event listener for search previous location button "previousLocation"
btn.addEventListener("click", () => {
  const searchedLocations = previousSearchHistory.value;
});
