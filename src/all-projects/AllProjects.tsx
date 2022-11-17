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
    axios.get('http://localhost:8000/projects')
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
        <Link to='/'>
          <div className='HomeLink'>
            <p>← Back to home screen</p>
          </div>
        </Link>
        <Link to='/project/new'>
          <div className='HomeLink'>
            <p><b>+</b>New Project</p>
          </div>
        </Link>
      {!loadingData ? <>
        {projectCardsData.map((card) => <ProjectCard id={card.id} name={card.name}/>)}
      </> : <p>loading cards</p>
      }
    </div>
  );
}

export default AllProjects;