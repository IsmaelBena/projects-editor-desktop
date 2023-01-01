import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Project.css';
import axios from 'axios';
import { ProjectDescriptionEntry, ProjectDateEntry, ProjectLinksEntry, ProjectNameEntry, ProjectStatusEntry, ProjectTechEntry} from '../components/FormComponents';
import { Link } from 'react-router-dom';

interface IProjectEntry {
  name: string,
  date: Date,
  status: string,
  tech: string[],
  description: string[],
  links?: {
        linkType: string,
        url: string
    }[]
}

interface ITechData 
{
  _id: string,
  name: string,
  techType: string,
  image: {
    url?: string,
    fileName: string
  }
}

function Project() {

  const navigate = useNavigate()

  const [loadingData, setLoadingData] = useState(true)
  const { id } = useParams<string>();

  const [projectData, setProjectData] = useState<IProjectEntry>({
    name: "",
    date: new Date(2000,1,12),
    status: "",
    tech: [],
    description: []
  })

  const [newProjectData, setNewProjectData] = useState<IProjectEntry>({
    name: "",
    date: new Date(2000,1,12),
    status: "",
    tech: [],
    description: [],
    links: []
  })

  const [techData, setTechData] = useState<ITechData[]>([])
  const [techCardsData, setTechCardsData] = useState<{id: string, name: string}[]>([])

  const [newName, setNewName] = useState<string>("")
  const [newDate, setNewDate] = useState<Date>(new Date(2000,1,12))
  const [newStatus, setNewStatus] = useState<string>("unselected")
  const [newTech, setNewTech] = useState<string[]>([])
  const [newDescription, setNewDescription] = useState<string[]>([])
  const [newLinks, setNewLinks] = useState<{linkType: string, url: string}[]>([])
  const [editing, setEditing] = useState<boolean>(false)

  const getRequiredData = (id: any) => {
    if (id === "new") {
      setEditing(true)
    } else {
      axios.get(`https://ismaelbena-api.online/projects/${id}`)
      .then(res => {
        setProjectData({...res.data});
        setNewName(res.data.name)
        setNewDate(res.data.date)
        setNewStatus(res.data.status)
        setNewTech(res.data.tech)
        setNewDescription(res.data.description)
        setNewLinks(res.data.links)
      }) 
    }
    axios.get("https://ismaelbena-api.online/technologies")
    .then(res => {
      setTechData([...res.data]);
      let tempCards = res.data.map((data: ITechData) => {
        console.log("?",data);
        return {id: data._id, name: data.name}
      })
      setTechCardsData([...tempCards])
      setLoadingData(false);
    })
  }

  useEffect(() => {
    getRequiredData(id)
  }, [])

  const checkFields = (): Boolean => {
    console.log("checking fields")
    if (newName === "") {
      console.log("No project name provided")
      return false
    }
    if (newDate === new Date(2000,1,12)) {
      console.log("Data Not Added")
      return false
    }
    if (newStatus === "unselected") {
      console.log("No status provided")
      return false
    }
    if (newTech.length < 1) {
      console.log("No tech provided")
      return false
    }
    if (newDescription.length < 1) {
      console.log("No description provided")
      return false
    }
    return true
  }

  const handleSubmit = (): void => {
    console.log("Submitting")
    if (checkFields()) {
      if (id === "new") {
        postData({name: newName, date: newDate, status: newStatus, tech: newTech, description: newDescription, links: newLinks})
      } else {
        putData({name: newName, date: newDate, status: newStatus, tech: newTech, description: newDescription, links: newLinks})
      }
    }
    else {
      console.log("project unable to update yet")
    }
  }

  const postData = (newData: IProjectEntry) => {
    console.log('POSTing data to api')
    if (!checkFields()) console.log("cannot submit yet, some entry is not valid")
    else {
      if (newData.links !== undefined) {
        axios.post(`https://ismaelbena-api.online/projects`, newData)
        .then(res => console.log(res)).catch(err => console.log(err.message))
      } else {
        delete newData.links
        axios.post(`https://ismaelbena-api.online/projects`, newData)
        .then(res => console.log(res)).catch(err => console.log(err.message))
      }
    }
  }

  const putData = (newData: IProjectEntry) => {
    console.log('PUTing data to api')
    if (!checkFields()) console.log("cannot submit yet, some entry is not valid")
    else {
      if (newData.links !== undefined) {
        axios.put(`https://ismaelbena-api.online/projects/edit/${id}`, newData)
        .then(res => console.log(res)).catch(err => console.log(err.message))
      } else {
        delete newData.links
        axios.put(`https://ismaelbena-api.online/projects/edit/${id}`, newData)
        .then(res => console.log(res)).catch(err => console.log(err.message))
      }
    }
  }

  const deleteProject = (): void => {
    axios.delete(`https://ismaelbena-api.online/projects/delete/${id}`)
    .then(res => {console.log(res); navigate('/projects')})
    .catch(err => console.log(err.message))
    
  }

  const handleDateChange = (date: Date) => {
    setNewDate(date)
  }

  return (
    <div className="Project">
      {loadingData ? <h1>Loading...</h1> : <>
        {editing ? 
          <form onSubmit={e => {e.preventDefault(); handleSubmit()}}>
            <div className="FormInputs">
              <div className='NonTechDiv'>
                <div className='ProjectName'>
                    <ProjectNameEntry name={newName} changeName={setNewName}/>
                </div>
                <div className='ProjectStatus'>
                    <ProjectStatusEntry status={newStatus} changeStatus={setNewStatus}/>
                </div>
                <div className='ProjectDate'>
                    <ProjectDateEntry date={newDate} changeDate={handleDateChange}/>
                </div>
                <div className='ProjectDescrption'>
                    <ProjectDescriptionEntry description={newDescription} changeDescription={setNewDescription}/>
                </div>
                <div className='ProjectLinks'>
                    <ProjectLinksEntry links={newLinks} changeLinks={setNewLinks}/>
                </div>
              </div>
              <div className='ProjectTech'>
                <ProjectTechEntry cardsData={[...techCardsData]} activeTech={newTech} changeTech={setNewTech}/>
              </div>
            </div>
              <div className='SubmitButtonDiv FormSegment'>
                <input type='submit' value='Submit'/>
              </div>
            { (id === "new") ? <></> :
            <div className="EditingButtons">
              <button onClick={e => {e.preventDefault(); window.location.reload()}}>Cancel</button>
              <button onClick={e => {e.preventDefault(); deleteProject()}}>Delete project</button>
            </div>
            }
            <Link className='NavButton' to='/projects'>
                <p>← Back to Projects</p>
            </Link>
          </form>
        : <div className="ProjectDetails">
            <button onClick={e => {e.preventDefault(); setEditing(true)}}>Edit project</button>
            <h1>{projectData.name}</h1>
            <h2>{projectData.status}</h2>
            <h2>{projectData.date}</h2>
            <ul className='DescriptionUL'>
              {projectData.description.map((desc, index) => 
                <li id={index.toString()}>{desc}</li>
              )}
            </ul>
            {(projectData.links === undefined) ? <></> : projectData.links.map(link => <p className='Description'>{link.linkType}: {link.url}</p>)}
          </div>
        }
        </>
      }
    </div>
  );
}

export default Project;