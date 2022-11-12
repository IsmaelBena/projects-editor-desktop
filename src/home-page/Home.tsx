import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {

  return (
    <div className="Home">
      <div className='AllProjectsLink'>
        <Link to='/projects'><div className='buttonDiv'><h1>view all projects</h1></div></Link>
      </div>
      <div className='NewProjectLink'>
        <Link to='/new-project'><div className="buttonDiv"><h1>add new project</h1></div></Link>
      </div>
      
    </div>
  );
}

export default Home;