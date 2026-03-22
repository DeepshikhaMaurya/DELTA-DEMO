async function getWeather() {
  let city = document.getElementById("city").value;

  let apiKey = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = "🌡️ " + data.main.temp + "°C";
    document.getElementById("desc").innerText = "☁️ " + data.weather[0].description;

  } catch (error) {
    alert("City not found!");
  }
}