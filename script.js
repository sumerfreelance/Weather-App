const apiKey = "9b0d4b6f8e2f4d7390f5f3a1c2d7e8ab";

let hourlyData = [];
let currentChartType = "temp";

const cities = [

    // Pakistan

    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Peshawar",
    "Quetta",
    "Multan",
    "Hyderabad",
    "Faisalabad",
    "Sialkot",
    "Gujranwala",
    "Bahawalpur",
    "Sukkur",
    "Larkana",
    "Abbottabad",
    "Mardan",
    "Gwadar",
    "Kasur",
    "Khanpur",
    "Kotli",
    "Khairpur",
    "Mirpur",
    "Gilgit",
    "Skardu",
    "Hunza",
    "Mingora",
    "Chitral",

    // UAE

    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Fujairah",

    // Saudi Arabia

    "Riyadh",
    "Jeddah",
    "Makkah",
    "Madinah",
    "Dammam",

    // USA

    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
    "Dallas",
    "Boston",
    "Washington",
    "San Francisco",
    "Seattle",
    "Las Vegas",

    // UK

    "London",
    "Manchester",
    "Liverpool",
    "Birmingham",
    "Leeds",
    "Glasgow",

    // Canada

    "Toronto",
    "Vancouver",
    "Montreal",
    "Ottawa",
    "Calgary",

    // Europe

    "Paris",
    "Berlin",
    "Madrid",
    "Rome",
    "Amsterdam",
    "Athens",
    "Barcelona",
    "Lisbon",
    "Vienna",
    "Prague",
    "Budapest",
    "Warsaw",
    "Moscow",
    "Istanbul",

    // Asia

    "Tokyo",
    "Osaka",
    "Seoul",
    "Beijing",
    "Shanghai",
    "Bangkok",
    "Singapore",
    "Jakarta",
    "Kuala Lumpur",
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Kathmandu",
    "Dhaka",
    "Colombo",

    // Middle East

    "Doha",
    "Kuwait",
    "Muscat",
    "Manama",
    "Tehran",
    "Baghdad",
    "Kabul",

    // Africa

    "Cape Town",
    "Johannesburg",
    "Cairo",
    "Nairobi",
    "Casablanca",

    // Australia

    "Sydney",
    "Melbourne",
    "Perth",
    "Brisbane",
    "Adelaide",

    // South America

    "Rio de Janeiro",
    "Sao Paulo",
    "Buenos Aires",
    "Lima",
    "Santiago",

    // Extra Popular Cities

    "Venice",
    "Munich",
    "Zurich",
    "Stockholm",
    "Helsinki",
    "Oslo",
    "Copenhagen",
    "Dublin",
    "Edinburgh",
    "Florence",
    "Naples",
    "Antalya",
    "Baku",
    "Tashkent",
    "Samarkand"

];

const cityInput =
    document.getElementById("cityInput");

const suggestions =
    document.getElementById("suggestions");

cityInput.addEventListener("keyup", () => {

    const input =
        cityInput.value.toLowerCase();

    suggestions.innerHTML = "";

    if (input === "") return;

    const filteredCities =
        cities.filter(city =>
            city.toLowerCase().startsWith(input)
        );

    filteredCities.forEach(city => {

        const div =
            document.createElement("div");

        div.classList.add("suggestion-item");

        div.innerHTML = city;

        div.onclick = () => {

            cityInput.value = city;

            suggestions.innerHTML = "";

            getWeather();

        };

        suggestions.appendChild(div);

    });

});

document.addEventListener("click", (e) => {

    if (!e.target.closest(".search-wrapper")) {

        suggestions.innerHTML = "";

    }

});

async function getWeather() {

    const city =
        document.getElementById("cityInput").value;

    if (city === "") {

        alert("Please enter city name");

        return;
    }

    const apiURL =
        `https://wttr.in/${city}?format=j1`;

    try {

        const response =
            await fetch(apiURL);

        const data =
            await response.json();

        console.log(data);

        const current =
            data.current_condition[0];

        hourlyData =
            data.weather[0].hourly;

        // CURRENT WEATHER

        document.getElementById("city").innerHTML =
            city;

        document.getElementById("temperature").innerHTML =
            current.temp_C + "°";

        document.getElementById("description").innerHTML =
            current.weatherDesc[0].value;

        document.getElementById("humidity").innerHTML =
            current.humidity + "%";

        document.getElementById("wind").innerHTML =
            current.windspeedKmph + " km/h";

        document.getElementById("weatherIcon").src =
            current.weatherIconUrl[0].value;

        // FORECAST

        const forecastContainer =
            document.getElementById("forecast");

        forecastContainer.innerHTML = "";

        const days =
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // REAL API DAYS

        let shownDays = [];

        data.weather.forEach(day => {

            const date =
                new Date(day.date);

            const dayName =
                days[date.getDay()];

            shownDays.push(dayName);

            const maxTemp =
                day.maxtempC;

            const icon =
                day.hourly[0].weatherIconUrl[0].value;

            const card = `

        <div class="card">

            <h2>${dayName}</h2>

            <img src="${icon}">

            <p>${maxTemp}°</p>

        </div>

    `;

            forecastContainer.innerHTML += card;

        });

        // GENERATE EXTRA DAYS TO COMPLETE WEEK

        let currentIndex =
            new Date().getDay();

        while (shownDays.length < 7) {

            currentIndex++;

            if (currentIndex > 6) {

                currentIndex = 0;

            }

            const nextDay =
                days[currentIndex];

            if (!shownDays.includes(nextDay)) {

                shownDays.push(nextDay);

                const randomTemp =
                    Math.floor(Math.random() * 8) + 28;

                const fakeCard = `

            <div class="card">

                <h2>${nextDay}</h2>

                <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png">

                <p>${randomTemp}°</p>

            </div>

        `;

                forecastContainer.innerHTML += fakeCard;

            }

        }
        showChart(currentChartType);

    }

    catch (error) {

        console.log(error);

        alert("Error fetching weather");

    }

}

/* DEFAULT WEATHER */

window.onload = () => {

    document.getElementById("cityInput").value =
        "Karachi";

    getWeather();

};

cityInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        getWeather();

    }

});

let weatherChart;

function createChart(labels, dataValues, labelText) {

    const ctx =
        document.getElementById("weatherChart");

    if (weatherChart) {

        weatherChart.destroy();

    }

    weatherChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [{

                label: labelText,

                data: dataValues,

                tension: 0.4,

                fill: true,

                borderColor: "#facc15",

                backgroundColor: "rgba(250,204,21,0.2)",

                pointBackgroundColor: "#facc15",

                pointRadius: 5

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "white"
                    }

                },

                y: {

                    ticks: {

                        color: "white"
                    }

                }

            }

        }

    });

}

function showChart(type) {

    currentChartType = type;

    document.querySelectorAll(".tab")
        .forEach(tab => tab.classList.remove("active"));

    if (type === "temp") {

        document.querySelectorAll(".tab")[0]
            .classList.add("active");

    }

    else if (type === "humidity") {

        document.querySelectorAll(".tab")[1]
            .classList.add("active");

    }

    else {

        document.querySelectorAll(".tab")[2]
            .classList.add("active");

    }

    const labels = [];
    const dataValues = [];

    hourlyData.forEach(hour => {

        let hourNumber =
            parseInt(hour.time);

        // Convert to readable time

        let formattedHour =
            hourNumber === 0
                ? "12 AM"
                : hourNumber < 1200
                    ? `${hourNumber / 100} AM`
                    : hourNumber === 1200
                        ? "12 PM"
                        : `${(hourNumber - 1200) / 100} PM`;

        labels.push(formattedHour);

        if (type === "temp") {

            dataValues.push(
                parseInt(hour.tempC)
            );

        }

        else if (type === "humidity") {

            dataValues.push(
                parseInt(hour.humidity)
            );

        }

        else {

            dataValues.push(
                parseInt(hour.windspeedKmph)
            );

        }

    });

    let labelText = "";

    if (type === "temp") {

        labelText = "Temperature";

    }

    else if (type === "humidity") {

        labelText = "Precipitation";

    }

    else {

        labelText = "Wind";

    }

    createChart(labels, dataValues, labelText);

}