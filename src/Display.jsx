import React from 'react'
import { useState } from 'react'
import { useEffect} from 'react'
import './Display.css'
import UV from './UV.jsx'
export default function Display({locationData}) {
    const [json, setjson] = useState(null);
    const [skipCount, setSkipCount] = useState(true);
    const [location, setLocation] = useState(null);
    useEffect(() => {
        if (skipCount) setSkipCount(false);
        else {            
            getData();
        }
        
     },[location]);
    function getData() {
        if (location === undefined || location === null) {
            return;
        }
        console.log(location)
        const latitude = location.latitude
        const longitude = location.longitude
        setjson(null);
          let ignore = false;
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`
            + "&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,"
            + "uv_index&temperature_unit=fahrenheit&timezone=auto&forecast_hours=24&models=best_match", {
                mode: 'cors'
              }).then(function(response) {
            return response.json();
          })
          .then(function(response) {
            if (!ignore) {
                setjson(response);
                console.log(response)
              }
          })
          .catch(error => console.error(error));
        return () => {
          ignore = true;
        }
    }
    
    if (locationData === null || locationData === undefined || locationData.length === 0)
        return <h4>No data yet</h4>;      
    console.log(locationData)
    const latitude = locationData[0]["latitude"]
    const longitude = locationData[0]["longitude"]
    console.log(latitude)
    console.log(longitude)
    if (JSON.stringify(location) !== JSON.stringify({latitude, longitude})) setLocation({latitude, longitude})
    if (json !== null) {
        const weatherData = {
            hourly: {
                time: json.hourly.time,
                temperature2m: json.hourly.temperature_2m,
                relativeHumidity2m: json.hourly.relative_humidity_2m,
                precipitationProbability: json.hourly.precipitation_probability,
                uvIndex: json.hourly.uv_index,
            },
                
        };
        let data = []
        for (let i = 0; i < weatherData.hourly.time.length; i++) {
            console.log(
                weatherData.hourly.time[i].substring(
                    weatherData.hourly.time[i].length-5
                ),
                weatherData.hourly.temperature2m[i],
                weatherData.hourly.relativeHumidity2m[i],
                weatherData.hourly.precipitationProbability[i],
                weatherData.hourly.uvIndex[i]
            );
            data.push({time: weatherData.hourly.time[i].substring(
                weatherData.hourly.time[i].length-5
            ),
                temperature2m: weatherData.hourly.temperature2m[i],
                relativeHumidity2m:weatherData.hourly.relativeHumidity2m[i],
                precipitationProbability: weatherData.hourly.precipitationProbability[i],
                uvIndex: weatherData.hourly.uvIndex[i]});
        }
        return (
            <div className="hourly-weather">
                {data.map((hour, index) => (
                <div key={index} className="hourly-weather__item">
                    <UV uv={hour.uvIndex} />
                    <h3>{hour.time}</h3>
                    <p className="content">{hour.temperature2m}°F</p>
                    <p className="content">Humidity: {hour.relativeHumidity2m}%</p>
                    <p className="content">UV Index: {hour.uvIndex}</p>
                    <p className="content">Precipitation: {hour.precipitationProbability}%</p>
                </div>
                  ))}
            </div>
        );
    }   
}