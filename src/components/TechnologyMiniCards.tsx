import React, { useState } from 'react';
import './AllProjects.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ITechCardData 
{
  id: string,
  name: string
}

function TechnologyCard(props: ITechCardData) {

  return (
    <div className="TechnologyCard">
        <div className="techCardHeader">
            <p>id: {props.id}</p>
        </div>
        <div className="techCardBody">
            <h2>Name: {props.name}</h2>
        </div>
    </div>
  );
}

export default TechnologyCard;