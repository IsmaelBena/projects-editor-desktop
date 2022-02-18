import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    const [newTagToAdd, setNewTagToAdd] = useState<string>("");
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

    const handleTags = () => {
        if (!projectTags.includes(newTagToAdd) && (newTagToAdd !== "")) {
            setProjectTags([...projectTags, newTagToAdd])
            setNewTagToAdd("")
        }
    }

    const renderTags = () => {
        return <div className='TagsContainer'>
            {projectTags.map(tag => <p className='Tag' onClick={e => setProjectTags(projectTags.filter((ftag) => ftag !== tag))} >{tag}</p>)}
        </div>
    }

    const renderDescInputs = () => {
        return <div className='DescriptionEntriesContainer'>
            {projectDescription.map((desc, index) => 
                <div key={index.toString()}>
                    <label className='DescriptionEntry'>
                        new desc entry:
                        <select value={desc.textType} onChange={e => setProjectDescription(projectDescription.filter(currentDesc => {
                            if (currentDesc === desc) {currentDesc.textType = e.target.value} return currentDesc
                        }))}>
                            <option value="header">Header</option>
                            <option value="body">Body</option>
                        </select>
                        <textarea value={desc.text} onChange={e => setProjectDescription(projectDescription.filter(currentDesc => {
                            if (currentDesc === desc) {currentDesc.text = e.target.value} return currentDesc
                        }))}/>
                    </label>
                    <button onClick={e => {e.preventDefault(); setProjectDescription(projectDescription.filter(currentDesc => currentDesc !== desc))}}>Remove</button>
                </div>
            )}
        </div>
    }

    const renderLinks = () => {
        if (projectLinks.length > 0) {
        return <div className='LinksContainer'>
            <p>Other Links</p>
            {projectLinks.map((link, index) =>
                <div key={index.toString()}>
                    <label className='Link'>
                        link {index + 1}:
                        <input value={link.linkUrl} onChange={e => setProjectLinks(projectLinks.filter(currentLink => {
                            if (currentLink === link) {currentLink.linkUrl = e.target.value} return currentLink
                        }))}/>
                    </label>
                    <button onClick={e => {e.preventDefault(); setProjectLinks(projectLinks.filter(currentLink => currentLink !== link))}}>Remove</button>
                </div>
            )}
        </div>
        }
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
            axios.post('http://localhost:8000/projects/project', projectEntry).then(res => console.log(res))
        }
    }

    return (
        <div className="NewProject">
            <div>
                <a href='/'><button>Return to menu</button></a>
            </div>
            <form className='NewProjectForm' onSubmit={e => {e.preventDefault(); handleSubmit();}}>
                <div className='ProjectName FormSegment'>
                    <label>
                        Project Name:
                        <input type='text' value={projectName} onChange={e => setProjectName(e.target.value)} />
                        <p>{projectEntry.url}</p>
                    </label>
                </div>
                <div className='ProjectField FormSegment'>
                    <label>
                        Project Field:
                        <select value={projectField} onChange={e => setProjectField(e.target.value)}>
                            {(projectField === "unselected") ? <option value="unselected">Select a field</option> : null}
                            <option value="FullStack">Full Stack</option>
                            <option value="GameDevelopment">Game Development</option>
                        </select>
                    </label>                        
                </div>
                <div className='FormSegment'>
                    <label className='ProjectTags'>
                        Project Tags:
                        <input type='text' value={newTagToAdd} onChange={e => setNewTagToAdd(e.target.value)}/>
                        <button onClick={e => {e.preventDefault(); handleTags()}}>add new tag</button>
                    </label>
                    {renderTags()}
                </div>
                <div className='ProjectProgress FormSegment'>
                    <label>
                        Project Progress:
                        <select value={projectProgress} onChange={e => setProjectProgress(e.target.value)}>
                            {(projectProgress === "unselected") ? <option value="unselected">Select a field</option> : null}
                            <option value="Planning">Planning</option>
                            <option value="InDevelopment">In Development</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </label>
                </div>
                <div className='ProjectDescription FormSegment'>
                    <button onClick={e => {e.preventDefault(); setProjectDescription([...projectDescription, {textType: "header", text: ""}])}}>add to description</button>
                    {renderDescInputs()}
                </div>
                <div className='ProjectVideo FormSegment'>
                    <label>
                        Video Link:
                        <input type='text' value={projectVideo} onChange={e => setProjectVideo(e.target.value)}/>
                    </label>
                </div>
                <div className='ProjectLinks FormSegment'>
                    <button onClick={e => {e.preventDefault(); setProjectLinks([...projectLinks, {linkType: "tobechanges", linkUrl: ""}])}}>add link</button>                 
                    {renderLinks()}
                </div>
                <div className='SubmitButtonDiv FormSegment'>
                    <input type='submit' value='Submit'/>
                </div>
            </form>
        </div>
    );
}

export default NewProject;