import { useState } from 'react'
import { useEffect} from 'react'
import './App.css'
import Search from  './Search.jsx'
function App() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const daysOfWeek = 
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDate = `${month}-${day}-${year}`;
  return (
    <>
      <h1>Weather</h1>
      <h2>{daysOfWeek[date.getDay()]}, {currentDate}</h2>
      <Search />
    </>
  )
}

export default App
