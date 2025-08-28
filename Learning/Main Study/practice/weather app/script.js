let btn = document.querySelector(".theme");
let s = document.querySelector(".switch");
btn.addEventListener("click", (e) => {
    e.stopPropagation()
    s.classList.toggle("fwd")
    document.body.classList.toggle("dark-mode")
})

let sb = document.getElementById("search-inp")
sb.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById("search-btn").click();
    }
})


async function getWeather() {
    let city = document.getElementById("search-inp").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    let api = `https://api.weatherapi.com/v1/current.json?key=bad827423b674565b06155824241309&q=${city}`;
    try {
        let response = await fetch(api);
        if (!response.ok) {
            throw new Error("City not found");
        }

        let data = await response.json();



        document.getElementById("weather-info").innerHTML = `
            <p><strong>City:</strong> ${data.location.name}, ${data.location.country}</p>
            <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}" alt="Weather Icon">
        `;
        document.getElementById("search-inp").addEventListener("click", (e) => {
            document.getElementById("search-inp").value = ""
        })
        bg(data.current.condition.text);

    } catch (error) {
        alert("Error fetching weather data: " + error.message);
    }
}
async function bg(condition) {


    const weatherBackgrounds = {
        "clear": "assets/clear.png",
        "cloudy": "assets/cloudy.png",
        "overcast": "assets/cloudatnight.png",
        "mist": "assets/mist.png",
        "fog": "assets/mist.png",
        "rain": "assets/rain.png",
        "snow": "assets/snow.png",
        "thunder": "assets/thunder.png",
        "lightning": "assets/thunder.png"
    };
    let lowerCondition = condition.toLowerCase();
    for (let keyword in weatherBackgrounds) {
        if (lowerCondition.includes(keyword)) {
            document.body.style.backgroundImage = `url(${weatherBackgrounds[keyword]})`;
            return;
        }
    }
}