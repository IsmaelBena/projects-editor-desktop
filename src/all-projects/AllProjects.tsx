import React, { useState, useEffect} from 'react';
import './AllProjects.css';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';

interface ICard {
  id: string,
  name: string
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
    axios.get('')
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
        <Link to='/'>
          <div className='HomeLink'>
            <p>← Back to home screen</p>
          </div>
        </Link>
      {!loadingData ? <>
        {projectCardsData.cardsData.map((card, index) => <h2>card placeholder</h2>)}
      </> : <p>loading cards</p>
      }
    </div>
  );
}

export default AllProjects;