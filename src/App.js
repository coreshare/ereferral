import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import DemoForm from './components/DemoForm/DemoForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <p>Welcome to e-Referral Programme.</p>
        <DemoForm/>
        {/*<img src={logo} className="App-logo" alt="logo" />
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
        </a>*/}
      </header>
    </div>
  );
}

export default App;
