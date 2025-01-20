import React from 'react'
import { useState } from 'react'
import Display from './Display'
export default function Search() {
    const [City, setCity] = useState(null);
    const [data, setData] = useState(null);

    function handle() {
          setData(null);
          let ignore = false;
          fetch("https://geocoding-api.open-meteo.com/v1/search/?name=" + City + "&count=1&language=en&format=json", {
            mode: 'cors'
          }).then(function(response) {
            return response.json();
          })
          .then(function(response) {
            if (!ignore) {
                setData(response);
                console.log(response)
              }
          })
          .catch(error => console.error(error));
        return () => {
          ignore = true;
        }
      }
    return (
        <div>
            <div>
                <input onChange={(e) => {setCity(e.target.value)}} />
                <button onClick={handle}>Search</button>
            </div>
            <Display locationData={data} />
        </div>
        )
      
}
