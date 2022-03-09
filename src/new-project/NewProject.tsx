import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProjectNameEntry, ProjectFieldEntry, ProjectTagsEntry, ProjectProgressEntry, ProjectDescriptionEntry, ProjectVideoEntry, ProjectLinksEntry } from '../components/FormComponents';
import './NewProject.css'

interface IProjectDescription {
    textType: string,
    text: string
}

interface IProjectEntry {
    name: string,
    url: string,
    field: string,
    tags: string[],
    progress: string,
    description: IProjectDescription[],
    video: string,
    otherLinks: string[]
}

function NewProject() {

    const navigate = useNavigate();

    const urlRegex = new RegExp('^[a-zA-z0-9-_~ ]*$');

    const [projectName, setProjectName] = useState<string>("")
    const [projectTags, setProjectTags] = useState<string[]>([])
    const [projectField, setProjectField] = useState<string>("unselected")
    const [projectProgress, setProjectProgress] = useState<string>("unselected")
    const [projectDescription, setProjectDescription] = useState<IProjectDescription[]>([])
    const [projectVideo, setProjectVideo] = useState<string>("")
    const [projectLinks, setProjectLinks] = useState<string[]>([])

    const [projectEntry, setProjectEntry] = useState<IProjectEntry>()

    const generateProjectUrl = (): string => {
        let tempUrl = projectName;
        tempUrl = tempUrl.toLowerCase();
        tempUrl = tempUrl.replaceAll(" ", "-")
        return tempUrl;
    }

    const checkFields = (): Boolean => {
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

    const updateProjectEntry = (): void => {
        console.log("update msg fired")
        if (checkFields()) {
            setProjectEntry({
                name: projectName,
                url: generateProjectUrl(),
                field: projectField,
                tags: projectTags,
                progress: projectProgress,
                description: projectDescription,
                video: projectVideo,
                otherLinks: projectLinks
            })
        }
        else {
            console.log("project unable to update yet")
        }
    }

    const handleSubmit = (): void => {      
        console.log("submit msg fired")
        if (projectEntry === undefined) console.log("Project var undefined?")
        else if (!checkFields()) console.log("cannot submit yet, some entry is not valid")
        else {
            console.log(projectEntry);
            axios.post('http://localhost:8000/projects/project', projectEntry).then(res => {console.log(res); navigate('/')}).catch(err => console.log(err.message))
        }
    }

    useEffect(() => {
        updateProjectEntry();
    }, [projectName, projectTags, projectField, projectProgress, projectDescription, projectVideo, projectLinks]);

    return (
        <div className="NewProject">
            <div>
                <a href='/'><button>Return to menu</button></a>
            </div>
            <form className='NewProjectForm' onSubmit={e => {e.preventDefault(); handleSubmit();}}>
                <div className='NameProgressDiv'>
                    <ProjectNameEntry projectName={projectName} changeName={setProjectName} />
                    <ProjectProgressEntry projectProgress={projectProgress} changeProgress={setProjectProgress} />
                </div>
                <div className='FieldTagsDiv'>
                    <ProjectFieldEntry projectField={projectField} changeField={setProjectField} />
                    <ProjectTagsEntry projectTags={projectTags} changeTags={setProjectTags} />
                </div>
                <ProjectDescriptionEntry projectDescription={projectDescription} changeDescription={setProjectDescription} />
                <ProjectVideoEntry projectVideo={projectVideo} changeVideo={setProjectVideo} />
                <ProjectLinksEntry projectLinks={projectLinks} changeLinks={setProjectLinks} />
                <div className='SubmitButtonDiv FormSegment'>
                    <input type='submit' value='Submit'/>
                </div>
            </form>
        </div>
    );
}

export default NewProject;