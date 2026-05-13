const apiKey = "9b0d4b6f8e2f4d7390f5f3a1c2d7e8ab";

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

    if(input === "") return;

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

    if(!e.target.closest(".search-wrapper")){

        suggestions.innerHTML = "";

    }

});

async function getWeather() {

    const city =
    document.getElementById("cityInput").value;

    if(city === ""){

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
        ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        data.weather.slice(0,7).forEach(day => {

            const date =
            new Date(day.date);

            const dayName =
            days[date.getDay()];

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

    }

    catch(error){

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

cityInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        getWeather();

    }

});