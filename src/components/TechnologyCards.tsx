import React, { useState } from 'react';
import './AllProjects.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ITechCardData 
{
  id: string,
  name: string,
  techType: string,
  image: {
    url?: string,
    fileName: string
  }
}

function TechnologyCard(props: ITechCardData) {

  return (
    <div className="TechnologyCard">
        <div className="techCardHeader">
            <p>Edit</p>
            <p>Delete</p>
        </div>
        <div className="techCardBody">
            <h2>Name: {props.name}</h2>
            <h1>Type: {props.techType}</h1>
            <p>Image File Name: {props.image.fileName}</p>
        </div>
      <Link to={`/edit-project/${props.id}`}>
        <p>{props.name}</p>
        <p>{props.field}</p>
        <div>
          {props.tags.map((tag, index) => {
            return <p key={index}>{tag}</p>
          })}
        </div>
      </Link>
    </div>
  );
}

export default TechnologyCard;