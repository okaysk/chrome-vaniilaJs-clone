const API_KEY = '2dc75d75a168eee563c76775524b56d6'

function geolocationOk(position) {
    const lon = position.coords.longitude
    const lat = position.coords.latitude
    console.log(`you live in ${lat}, ${lon}`)

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = document.querySelector('#weather span:nth-child(1)')
            const weather = document.querySelector('#weather span:nth-child(2)')

            weather.innerText = data.weather[0].main
            city.innerText = `${data.name} / ${data.main.temp}`
        })
}

function geolocationError() {
    alert("Can't find the location.")
}

navigator.geolocation.getCurrentPosition(geolocationOk, geolocationError)
