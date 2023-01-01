import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {

  return (
    <div className="Home">
      <Link className='LinkButton' to='/projects'>
        <h1>Projects</h1>
      </Link>
      <Link className='LinkButton' to='/technologies'>
        <h1>Technologies</h1>
      </Link>    
    </div>
  );
}

export default Home;