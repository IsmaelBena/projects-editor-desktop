import React, { useState, useEffect} from 'react';
import './AllProjects.css';
import axios from 'axios';

interface ICard {
  name: string,
  url: string,
  field: string,
  tags: string[]
}

interface IProjectCardsData {
  cards: ICard[],
  filterData: {
    fields: string[],
    tags: string[]
  }
}

function AllProjects() {

  const [projectCardsData, setProjectCardsData] = useState<IProjectCardsData>({cards: [], filterData: {fields: [], tags: []}});

  useEffect(() => {
    axios.get('http://localhost:8000/projects/cards')
    .then(res => {
      setProjectCardsData(res.data);
      console.log(res.data)
    })
  }, [])

  const showProjectNames = () => {
    return <>
      {projectCardsData.cards.map((card: ICard) => {
        <p>{card.name}</p>
      })}
    </>
  }

  return (
    <div className="AllProjects">

    </div>
  );
}

export default AllProjects;