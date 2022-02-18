import React, { useState } from 'react';
import './AllProjects.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ICardData 
{
  name: string,
  field: string,
  url: string,
  tags: string[]
}

function ProjectCard(props: ICardData) {

  return (
    <Link to={`/project/${props.url}`}>
      <div className="ProjectCard">
        <p>{props.name}</p>
        <p>{props.field}</p>
        <div>
          {props.tags.map((tag, index) => {
            return <p key={index}>{tag}</p>
          })}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;