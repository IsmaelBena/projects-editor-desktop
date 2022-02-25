import axios from 'axios';
import { useState } from 'react';
import { ProjectNameEntry, ProjectFieldEntry, ProjectTagsEntry, ProjectProgressEntry, ProjectDescriptionEntry, ProjectVideoEntry, ProjectLinksEntry } from '../components/FormComponents';
import './NewProject.css'

interface IProjectDescription {
    textType: string,
    text: string
}

interface ILink {
    linkType: string,
    linkUrl: string
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

    const urlRegex = new RegExp('^[a-zA-z0-9-_~ ]*$');

    const [projectName, setProjectName] = useState<string>("")
    const [projectTags, setProjectTags] = useState<string[]>([])
    const [projectField, setProjectField] = useState<string>("unselected")
    const [projectProgress, setProjectProgress] = useState<string>("unselected")
    const [projectDescription, setProjectDescription] = useState<IProjectDescription[]>([])
    const [projectVideo, setProjectVideo] = useState<string>("")
    const [projectLinks, setProjectLinks] = useState<ILink[]>([])

    const [projectEntry, setProjectEntry] = useState<IProjectEntry>({
        name: projectName,
        url: "",
        field: projectField,
        tags: projectTags,
        progress: projectProgress,
        description: projectDescription,
        video: projectVideo,
        otherLinks: []
    })

    const generateProjectUrl = (): string => {
        let tempUrl = projectName;
        tempUrl = tempUrl.toLowerCase();
        tempUrl = tempUrl.replaceAll(" ", "-")
        // make checks for unique url on backend, if url exists, increment number at the end of url
        return tempUrl;
    }

    const getLinks = (): string[] => {
        let tempLinks: string[] = []
        projectLinks.map(link => {
            tempLinks.push(link.linkUrl)
        })
        return tempLinks
    }

    const handleSubmit = (): void => {
        console.log("submit msg fired")
        if (projectName === "") {
            console.log("No project name provided")
            return
        }
        if (!urlRegex.test(projectName))
        {
            console.log("invalid character in name: name should include letter, numbers and/or - _ ~")
        }
        if (projectTags.length < 1) {
            console.log("No tags provided")
            return
        }
        if (projectField === "unselected") {
            console.log("No field provided")
            return
        }
        if (projectProgress === "unselected") {
            console.log("No progress state provided")
            return
        }
        if (projectDescription.length < 1) {
            console.log("No description provided")
            return
        }

        setProjectEntry({
            name: projectName,
            url: generateProjectUrl(),
            field: projectField,
            tags: projectTags,
            progress: projectProgress,
            description: projectDescription,
            video: projectVideo,
            otherLinks: getLinks()
        })

        if (projectEntry === undefined) console.log("Project var undefined?")
        else {
            console.log(projectEntry);
            axios.post('http://localhost:8000/projects/project', projectEntry).then(res => console.log(res)).catch(err => console.log(err.message))
        }
    }

    return (
        <div className="NewProject">
            <div>
                <a href='/'><button>Return to menu</button></a>
            </div>
            <form className='NewProjectForm' onSubmit={e => {e.preventDefault(); handleSubmit();}}>
                <ProjectNameEntry projectName={projectName} changeName={setProjectName} />
                <ProjectFieldEntry projectField={projectField} changeField={setProjectField} />
                <ProjectTagsEntry projectTags={projectTags} changeTags={setProjectTags} />
                <ProjectProgressEntry projectProgress={projectProgress} changeProgress={setProjectProgress} />
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