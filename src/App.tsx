import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import axios from 'axios';
import AllProjects from './all-projects/AllProjects';
import './App.css';
import Home from './home-page/Home';
import NewProject from './new-project/NewProject';
import Project from './project/Project';
import Technologies from './technologies/Technologies';

function App() {

  const [authToken, setAuthToken] = useState('');
  const [viewToken, setViewToken] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [incorrectTokenWarning, setTncorrectTokenWarning] = useState(false)

  const getAuthCheck = async () => {
    axios.get('https://ismaelbena-api.online/authCheck', {
      headers: {
        Token: authToken
      }
    })
    .then(res => {
      if (res.status === 200) {
        setHidden(true)
      }
    })
    .catch(err => {
      if (err.response.status === 401) {
        console.log("incorrect token")
        setTncorrectTokenWarning(true)
        setTimeout(() => {
          setTncorrectTokenWarning(false)
        }, 500)
      }
    })
  }

  const toggleViewToken = () => {
    setViewToken(!viewToken)
  }

  const checkToken = () => {
    getAuthCheck()
  }

  const toggleTokenBanner = () => {
    setHidden(!hidden)
  }

  return (
    <div className={"App"}>
        <div className={"AuthenticationTokenBanner " + (hidden ? "hiddenBanner " : "") + (incorrectTokenWarning ? "incorrectTokenFlash " : "")}>
          <label className='TokenLabel'>
              Token:
              <input type={viewToken ? 'text' : 'password'} value={authToken} onChange={e => setAuthToken(e.target.value)} />
          </label>
          <button className='TokenButton' onClick={toggleViewToken}>View Token</button>
          <button className='TokenButton' onClick={checkToken}>Check Token</button>
        </div>
        <button className='ToggleTokenBannerBtn TokenButton' onClick={toggleTokenBanner}>{hidden ? "Show" : "Hide"} token banner</button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/technologies" element={<Technologies authToken={authToken} />} />          
          <Route path="/new-project" element={<NewProject authToken={authToken} />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
    </div>
  );
}

export default App;
