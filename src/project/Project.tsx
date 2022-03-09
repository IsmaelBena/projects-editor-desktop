import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Project.css';
import axios from 'axios';
import { ProjectDescriptionEntry, ProjectFieldEntry, ProjectLinksEntry, ProjectNameEntry, ProjectProgressEntry, ProjectTagsEntry, ProjectVideoEntry } from '../components/FormComponents';
import { Link } from 'react-router-dom';

interface IProjectDescription {
  textType: string,
  text: string
}

interface IProjectEntry {
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

  const navigate = useNavigate()

  const [loadingData, setLoadingData] = useState(true)
  const { id } = useParams<string>();

  const urlRegex = new RegExp('^[a-zA-z0-9-_~ ]*$');

  const [projectName, setProjectName] = useState<string>("")
  const [newProjectName, setNewProjectName] = useState<string>("")

  const [projectTags, setProjectTags] = useState<string[]>([])
  const [newProjectTags, setNewProjectTags] = useState<string[]>([])

  const [projectField, setProjectField] = useState<string>("unselected")
  const [newProjectField, setNewProjectField] = useState<string>("unselected")

  const [projectProgress, setProjectProgress] = useState<string>("unselected")
  const [newProjectProgress, setNewProjectProgress] = useState<string>("unselected")

  const [projectDescription, setProjectDescription] = useState<IProjectDescription[]>([])
  const [newProjectDescription, setNewProjectDescription] = useState<IProjectDescription[]>([])

  const [projectVideo, setProjectVideo] = useState<string>("")
  const [newProjectVideo, setNewProjectVideo] = useState<string>("")

  const [projectLinks, setProjectLinks] = useState<string[]>([])
  const [newProjectLinks, setNewProjectLinks] = useState<string[]>([])

  const [projectData, setProjectData] = useState<IProjectEntry>();

  const [pageEditingState, setPageEditingState] = useState<boolean[]>([false, false, false, false, false, false, false])

  const getProjectData = async (id: any) => {
    console.log(id);
    axios.get(`http://localhost:8000/projects/edit-project/${id}`)
    .then(res => {
      setProjectData(res.data);
      console.log(res.data);
      setProjectName(res.data.name)
      setNewProjectName(res.data.name)

      setProjectTags(res.data.tags)
      setNewProjectTags(res.data.tags)

      setProjectField(res.data.field)
      setNewProjectField(res.data.field)

      setProjectProgress(res.data.progress)
      setNewProjectProgress(res.data.progress)

      setProjectDescription(res.data.description)
      setNewProjectDescription(res.data.description)

      setProjectVideo(res.data.video)
      setNewProjectVideo(res.data.video)
      
      setProjectLinks(res.data.otherLinks)
      setNewProjectLinks(res.data.otherLinks)
      
      setLoadingData(false);
    })
  }

  const generateProjectUrl = (): string => {
    let tempUrl = projectName;
    tempUrl = tempUrl.toLowerCase();
    tempUrl = tempUrl.replaceAll(" ", "-")
    return tempUrl;
  }

  const checkFields = (): Boolean => {
    console.log("checking fields")
    if (projectName === "") {
      console.log("No project name provided")
      return false
    }
    if (!urlRegex.test(projectName))
    {
      console.log("invalid character in name: name should include letter, numbers and/or - _ ~")
      return false
    }
    if (projectTags.length < 1) {
      console.log("No tags provided")
      return false
    }
    if (projectField === "unselected") {
      console.log("No field provided")
      return false
    }
    if (projectProgress === "unselected") {
      console.log("No progress state provided")
      return false
    }
    if (projectDescription.length < 1) {
      console.log("No description provided")
      return false
    }
    return true
  }

  const updateProjectData = (): void => {
    console.log("update msg fired")
    if (checkFields()) {
      setProjectData({
        name: projectName,
        url: generateProjectUrl(),
        field: projectField,
        tags: projectTags,
        progress: projectProgress,
        description: projectDescription,
        video: projectVideo,
        otherLinks: projectLinks
    })}
    else {
      console.log("project unable to update yet")
    }
  }

  const handleSubmit = () => {
    console.log('Pushing changes to api')
    console.log("submit msg fired")
    if (projectData === undefined) console.log("Project var undefined?")
    else if (!checkFields()) console.log("cannot submit yet, some entry is not valid")
    else {
      axios.put(`http://localhost:8000/projects/edit-project/${id}`, projectData)
      .then(res => console.log(res)).catch(err => console.log(err.message))
    }
  }

  const deleteProject = (id: any): void => {
    axios.delete(`http://localhost:8000/projects/project/${id}`)
    .then(res => {console.log(res); navigate('/projects')})
    .catch(err => console.log(err.message))
    
  }

  useEffect(() => {
    if (loadingData) {
      getProjectData(id);
      setLoadingData(false);
    }
    else {
      updateProjectData()
    }
  }, [projectName, projectTags, projectField, projectProgress, projectDescription, projectVideo, projectLinks])

  const editEntry = (pos: number) => {
    let tempEditState = [...pageEditingState]
    tempEditState[pos] = !tempEditState[pos]
    setPageEditingState(tempEditState)
  }

  return (
    <div className="Project">
      <form onSubmit={e => {e.preventDefault(); handleSubmit(); setPageEditingState([false, false, false, false, false, false, false])}}>
        <div className='ProjectName'>
          {pageEditingState[0] ? 
          <>
            <ProjectNameEntry projectName={newProjectName} changeName={setNewProjectName}/>
            <button onClick={(e) => {e.preventDefault(); editEntry(0); setProjectName(newProjectName)}}>Done</button>
            <button onClick={(e) => {e.preventDefault(); editEntry(0); setNewProjectName(projectName)}}>Cancel</button>
          </>
          :<>
            <h1>{projectName}</h1>
            <button onClick={(e) => {e.preventDefault(); editEntry(0)}}>Edit Name</button>
          </>}
        </div>
        <div className='ProjectField'>
          {pageEditingState[1] ?
          <>
            <ProjectFieldEntry projectField={newProjectField} changeField={setNewProjectField}/>
            <button onClick={(e) => {e.preventDefault(); editEntry(1); setProjectField(newProjectField)}}>Done</button>
            <button onClick={(e) => {e.preventDefault(); editEntry(1); setNewProjectField(projectField)}}>Cancel</button>
          </>
          :<>
            <h2>{projectField}</h2>
            <button onClick={(e) => {e.preventDefault(); editEntry(1)}}>Edit Field</button>
          </>}
        </div>
        <div className='ProjectTags'>
        {pageEditingState[2] ? 
          <>
            <ProjectTagsEntry projectTags={newProjectTags} changeTags={setNewProjectTags}/>
            <button onClick={(e) => {e.preventDefault(); editEntry(2); setProjectTags(newProjectTags)}}>Done</button>
            <button onClick={(e) => {e.preventDefault(); editEntry(2); setNewProjectTags(projectTags)}}>Cancel</button>
          </>
          :<>{projectTags.map((tag, index) => {
              return <h3 key={'t'+index}>{tag}</h3>
          })}
          <button onClick={(e) => {e.preventDefault(); editEntry(2)}}>Edit Tags</button>
          </>}
        </div>
        <div className='ProjectProgress'>
          {pageEditingState[3] ? 
          <>
            <ProjectProgressEntry projectProgress={newProjectProgress} changeProgress={setNewProjectProgress}/>
            <button onClick={(e) => {e.preventDefault(); editEntry(3); setProjectProgress(newProjectProgress)}}>Done</button>
            <button onClick={(e) => {e.preventDefault(); editEntry(3); setNewProjectProgress(projectProgress)}}>Cancel</button>
          </>
          :<>
            <h2>{projectProgress}</h2>
            <button onClick={(e) => {e.preventDefault(); editEntry(3)}}>Edit Progress</button>
          </>}
        </div>
        <div className='ProjectDescription'>
            {pageEditingState[4] ?
            <>
              <ProjectDescriptionEntry projectDescription={newProjectDescription} changeDescription={setNewProjectDescription}/>
              <button onClick={(e) => {e.preventDefault(); editEntry(4); setProjectDescription(newProjectDescription)}}>Done</button>
              <button onClick={(e) => {e.preventDefault(); editEntry(4); setNewProjectDescription(projectDescription)}}>Cancel</button>
            </>
            :<>
              {projectDescription.map((txt, index) => {
                if (txt.textType === "header") return <h2 key={'h'+index}>{txt.text}</h2>
                else if (txt.textType === "body") return <h3 key={'p'+index}>{txt.text}</h3>
                else <h1>{txt}</h1>
              })}
            <button onClick={(e) => {e.preventDefault(); editEntry(4)}}>Edit Description</button>
            </>
            }
        </div>
        <div className='ProjectVideo'>
          {pageEditingState[5] ? 
          <>
            <ProjectVideoEntry projectVideo={newProjectVideo} changeVideo={setNewProjectVideo}/>
            <button onClick={(e) => {e.preventDefault(); editEntry(5); setProjectVideo(newProjectVideo)}}>Done</button>
            <button onClick={(e) => {e.preventDefault(); editEntry(5); setNewProjectVideo(projectVideo)}}>Cancel</button>
          </>
          :<>
            <h1>{projectVideo}</h1>
            <button onClick={(e) => {e.preventDefault(); editEntry(5)}}>Edit Video</button>
          </>}
        </div>
        <div className='ProjectLinks'>
        {pageEditingState[6] ? 
          <>
            <ProjectLinksEntry projectLinks={newProjectLinks} changeLinks={setNewProjectLinks}/>
            <button onClick={(e) => {e.preventDefault(); console.log('links done'); editEntry(6); setProjectLinks(newProjectLinks)}}>Done</button>
            <button onClick={(e) => {e.preventDefault(); console.log('links cancel'); editEntry(6); setNewProjectLinks(projectLinks)}}>Cancel</button>
          </>
          :<>{projectLinks.map((link, index) => {
              return <h3 key={'l'+index}>{link}</h3>
          })}
          <button onClick={(e) => {e.preventDefault(); editEntry(6)}}>Edit Links</button>
          </>}
        </div>
        <div className='SubmitButtonDiv FormSegment'>
          <input type='submit' value='Commit Changes to project'/>
        </div>
      </form>
      <button onClick={e => {e.preventDefault(); getProjectData(id); setPageEditingState([false, false, false, false, false, false, false])}}>Restore original project data</button>
      <button onClick={e => {e.preventDefault(); deleteProject(id)}}>Delete project</button>
    </div>
  );
}

export default Project;