import React, { useState, useEffect} from 'react';
import './AllProjects.css';
import axios from 'axios';
import ProjectCard from './ProjectCard';

interface ICard {
  id: string,
  name: string,
  url: string,
  field: string,
  tags: string[]
}

interface IProjectCardsData {
  cardsData: ICard[],
  filterData: {
    fields: string[],
    tags: string[]
  }
}

function AllProjects() {

  const [projectCardsData, setProjectCardsData] = useState<IProjectCardsData>({cardsData: [], filterData: {fields: [], tags: []}});
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const getData = async () => {
    axios.get('http://localhost:8000/projects/cards')
    .then(res => {
      setProjectCardsData(res.data);
      console.log(res.data);
      setLoadingData(false);
    })
  }

  useEffect(() => {
    setLoadingData(true);
    getData();
  }, [])

  return (
    <div className="AllProjects">
      {!loadingData ? <>
        {projectCardsData.cardsData.map((card, index) => <ProjectCard id={card.id} name={card.name} field={card.field} tags={card.tags} url={card.url}/>)}
      </> : <p>loading cards</p>
      }
    </div>
  );
}

export default AllProjects;