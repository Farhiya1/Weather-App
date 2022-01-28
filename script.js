// Targeting html elements by id and storing API key
const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
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

// Event listener for search location button "submit"
button.addEventListener("click", () => {
  const currentVal = search.value;
