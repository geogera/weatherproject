import { useEffect } from "react"
import React from 'react';
import { useState } from "react"


function App() {
  const [weatherData, setWeatherData] = useState([])
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetched, setFetched] = useState(false)

  function handleChange(e) {
    const newValue = e.target.value;
    setText(newValue)
  }

  async function HandleSubmit(e) {

    e.preventDefault();

    setIsLoading(true)
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${process.env.REACT_APP_API_KEY}`).then(res => { return res.json() }).then(data => {
      setWeatherData(data)
      setIsLoading(false)
      setFetched(true)
    })
    setText("")
  }


  return (
    <div className="container">
      <h1>Insert city for weather forecast</h1>
      {isLoading && <p>Loading...</p>}
      <form >
        <input name="City" value={text} onChange={handleChange} />
        <button type="submit" onClick={HandleSubmit} >Submit</button>
        {isFetched && <table class="table table-sm ">
          <thead>
            <tr>
              <th scope="col">City</th>
              <th scope="col">Condition</th>
              <th scope="col">Temperature (C)</th>
            </tr>
          </thead>
          <tbody><tr>
            <td>{weatherData?.name}</td>
            <td>{weatherData.weather[0]?.description}</td>
            <td>{(weatherData.main?.temp - 272.15).toFixed(2)}</td>
          </tr></tbody>
        </table>}
      </form>
    </div>
  );
}

export default App;
