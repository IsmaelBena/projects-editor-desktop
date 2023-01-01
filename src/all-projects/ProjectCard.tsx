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
    <Link className="ProjectCard" to={`/project/${props.id}`}>
      <h2>{props.name}</h2>
      <p>{props.id}</p>
    </Link>
  );
}

export default ProjectCard;