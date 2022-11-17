import React, { useState } from 'react';
import './AllProjects.css';
import { Link } from 'react-router-dom';

interface ICardData 
{
  id: string,
  name: string
}

function ProjectCard(props: ICardData) {

  return (
    <Link to={`/project/${props.id}`}>
      <div className="ProjectCard">
          <h2>{props.name}</h2>
          <p>{props.id}</p>
      </div>
    </Link>
  );
}

export default ProjectCard;