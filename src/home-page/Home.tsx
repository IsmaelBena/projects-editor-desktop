import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {

  return (
    <div className="Home">
      <div className='AllProjectsLink'>
        <Link to='/projects'><div className='buttonDiv'><h1>Projects</h1></div></Link>
      </div>
      <div className='NewProjectLink'>
        <Link to='/technologies'><div className="buttonDiv"><h1>Technologies</h1></div></Link>
      </div>      
    </div>
  );
}

export default Home;