// Targeting html elements by id and storing API key
const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid=988fbbe10b9a8419e74f5e6d95338e7c"
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
  });

// Event listener for search location button "submit"
button.addEventListener("click", () => {
  const currentVal = search.value;
