document.addEventListener("DOMContentLoaded", () => {
  const resultDiv = document.getElementById("result");
  const weatherDetails = document.getElementById("weatherDetails");
  const loadingDiv = document.getElementById("loading");
  const button = document.getElementById("submitButton");

  function getWeather(location) {
    let weatherData = new Object();
    loadingDiv.style.display = "flex";
    weatherDetails.style.display = "none";
    console.log(` location ${location}`);
    return new Promise((resolve, reject) => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID={your api key}`
      )
        .then((res) => res.json())
        .catch((error) => `json error ${error}`)
        .then((data) => {
          if (data.weather === undefined) {
            reject(data.message);
            return;
          }

          weatherData.weather = data.weather[0].main;
          weatherData.location = data.name;
          weatherData.coordinates = `${data.coord.lat} - ${data.coord.lat}`;
          weatherData.humidity = data.main.temp;
          weatherData.temperature = (parseInt(data.main.temp) - 273.15).toFixed(
            2
          );
          document.getElementById("locationInput").value = "";
          return resolve(weatherData);
        })
        .catch((error) => {
          return error;
        });
    });
  }

  function onSuccess(data) {
    weatherDetails.style.display = "flex";
    document.getElementById("locationName").textContent = data.location;
    document.getElementById(
      "temperature"
    ).textContent = `${data.temperature} °C`;
    document.getElementById("humidity").textContent = `${data.humidity} %`;
    document.getElementById("weather").textContent = data.weather;
    document.getElementById("coordinates").textContent = data.coordinates;
  }

  function onError(error) {
    resultDiv.innerHTML = `<p>Oops! Error ${error}</p>`;
    weatherDetails.style.display = "none";
  }

  button.addEventListener("click", () => {
    let location = document.getElementById("locationInput").value;

    if (location === "") {
      alert("Enter the location");
      return;
    }
    getWeather(location)
      .then(onSuccess)
      .catch(onError)
      .finally(() => {
        loadingDiv.style.display = "none";
      });
  });
});
