import React from 'react'

const Weather =({weather})=>{
console.log(weather)

        return(
            <div>
                <h3>Weather in {weather['location'].name}</h3>
                <p><b>temperature: </b>{weather['current'].temperature} Celcius</p>
                <img src={weather['current'].weather_icons} width='100' height='100' alt='Country flag unavailable'></img>
                <p><b>wind: </b>{weather['current'].wind_speed} mph direction {weather['current'].wind_dir}</p>

            </div>
    )
 
}

export default Weather
