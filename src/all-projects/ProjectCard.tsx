import React, { useState } from 'react';
import './AllProjects.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ICardData 
{
  id: string,
  name: string,
  field: string,
  url: string,
  tags: string[]
}

function ProjectCard(props: ICardData) {

  return (
    <div className="ProjectCard">
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

export default ProjectCard;