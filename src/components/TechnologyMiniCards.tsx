import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ITechCardData 
{
  id: string,
  name: string,
  redBG: string
}

function TechnologyMiniCard(props: ITechCardData) {

  return (
    <div className={"TechnologyMiniCard"+props.redBG}>
        <div className="techCardID">
            <p>id: {props.id}</p>
        </div>
        <div className="techCardName">
            <h3>Name: {props.name}</h3>
        </div>
    </div>
  );
}

export default TechnologyMiniCard;