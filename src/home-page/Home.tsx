import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {

  return (
    <div className="Home">
      <div className='AllProjectsLink'>
        <Link to='/projects'>view all projects</Link>
      </div>
      <div className='NewProjectLink'>
        <Link to='/new-project'>add new project</Link>
      </div>
      
    </div>
  );
}

export default Home;