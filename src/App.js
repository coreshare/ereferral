import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(()=>{
    fetchApi();
  },[]);
  const fetchApi = () =>{
    fetch("https://ereferralapi.azurewebsites.net/WeatherForecast")
    .then(res => res.json())
            .then(
                (data) => {
                    debugger;
                },
                (error) => {
                  debugger;
                }
            )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React - Test 512
        </a>
      </header>
    </div>
  );
}

export default App;
