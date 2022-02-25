import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Project.css';
import axios from 'axios';

interface IProjectDescription {
  textType: string,
  text: string
}

interface ILink {
  linkType: string,
  linkUrl: string
}

interface IProjectEntry {
  id: string,
  name?: string,
  url?: string,
  field?: string,
  tags?: string[],
  progress?: string,
  description?: IProjectDescription[],
  video?: string,
  otherLinks?: string[]
}

interface IID {
  id: string
}

function Project() {

  const [loadingData, setLoadingData] = useState(true)
  const { id } = useParams<string>();
  const [projectData, setProjectData] = useState({
    id: 'loadingID',
    name: 'Loading Name',
    url: 'loading url',
    field: 'loadingField',
    tags: [''],
    progress: 'loadingProgress',
    description: [{textType: "header", text: "loading text"}],
    video: '',
    otherLinks: []
  });
  
  const getProjectData = async (id: any) => {
    console.log(id);
    axios.get(`http://localhost:8000/projects/edit-project/${id}`)
    .then(res => {
      setProjectData(res.data);
      console.log(res.data);
      setLoadingData(false);
    })
  }

  useEffect(() => {
    setLoadingData(true);
    getProjectData(id);
  }, [])

  const editFields = () => {
    
  }

  return (
    <div className="Project">
      <h1>{projectData.name}</h1>
      <h2>{projectData.field}</h2>
      <>{projectData.tags.map((tag, index) => {
        return <h3 key={index}>{tag}</h3>
      })}</>
      <h2>{projectData.progress}</h2>
      <>{projectData.description.map((txt, index) => {
        if (txt.textType === "header") return <h2>{txt.text}</h2>
        else if (txt.textType === "body") return <h3>{txt.text}</h3>
        else <h1>{txt}</h1>
      })}</>
    </div>
  );
}

export default Project;