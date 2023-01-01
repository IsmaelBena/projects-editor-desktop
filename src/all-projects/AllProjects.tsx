import React, { useState, useEffect} from 'react';
import './AllProjects.css';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';

interface ICard {
  id: string,
  name: string
}

interface IProjectEntry {
  _id: string,
  name: string,
  date: Date,
  status: string,
  tech: string[]
  description: string[]
  links?: {
        linkType: string,
        url: string
    }[]
}


function AllProjects() {

  const [resData, setResData] = useState<IProjectEntry[]>([])
  const [projectCardsData, setProjectCardsData] = useState<ICard[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const getData = async () => {
    axios.get('https://ismaelbena-api.online/projects')
    .then(res => {
      setResData(res.data)
      let tempCardData: ICard[] = res.data.map((value: IProjectEntry) => {
        return {id: value._id, name: value.name}
      });
      setProjectCardsData(tempCardData);
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
      <Link className='NavButton' to='/'>
        ← Back to home screen
      </Link>
      <Link className='NewProjectBtn' to='/project/new'>
          <b>+</b> New Project
      </Link>
      {!loadingData ? <div className="ProjectCardsContainer">
        {projectCardsData.map((card) => <ProjectCard id={card.id} name={card.name}/>)}
      </div> : <p>loading cards</p>
      }
    </div>
  );
}

export default AllProjects;