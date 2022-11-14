import React, { useState } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import AllProjects from './all-projects/AllProjects';
import './App.css';
import Home from './home-page/Home';
import NewProject from './new-project/NewProject';
import Project from './project/Project';
import Technologies from './technologies/Technologies';

function App() {

  const [targetProjectID, setTargetProjectID] = useState('');

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/technologies" element={<Technologies />} />          
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/edit-project/:id" element={<Project />} />
        </Routes>
    </div>
  );
}

export default App;
