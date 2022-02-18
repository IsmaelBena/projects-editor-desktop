import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import AllProjects from './all-projects/AllProjects';
import './App.css';
import Home from './home-page/Home';
import NewProject from './new-project/NewProject';
import Project from './project/Project';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/project/:name" element={<Project />} />
        </Routes>
    </div>
  );
}

export default App;
