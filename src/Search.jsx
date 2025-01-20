import React from 'react'
import { useState } from 'react'
import Display from './Display'
export default function Search() {
    const [city, setCity] = useState(null);
    const [data, setData] = useState(null);
    const [state, setState] = useState(null);
    function handle() {
          setData(null);
          let ignore = false;
          fetch("https://geocoding-api.open-meteo.com/v1/search/?name=" + city + "&count=10&language=en&format=json", {
            mode: 'cors'
          }).then(function(response) {
            return response.json();
          })
          .then(function(response) {
            if (!ignore) {
                console.log(response);
                setData(Object.values(response.results).filter((item) => item.admin1 === state));
                console.log(data);
              }
          })
          .catch(error => console.error(error));
        return () => {
          if (data != null || data != undefined) {
            ignore = true;
          }
        }
      }
    return (
        <div>
            <div>
                <h1>Enter city and state</h1>
                <input onChange={(e) => {setCity(e.target.value)}} />
                <input onChange={(e) => {setState(e.target.value)}} />
                <button onClick={handle}>Search</button>
            </div>
            <Display locationData={data} />
        </div>
        )
      
}
