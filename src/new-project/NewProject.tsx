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

    const [projectName, setProjectName] = useState<string>("")
    const [newTagToAdd, setNewTagToAdd] = useState<string>("");
    const [projectTags, setProjectTags] = useState<string[]>([])
    const [projectField, setProjectField] = useState<string>("")
    const [projectProgress, setProjectProgress] = useState<string>("")
    const [projectDescription, setProjectDescription] = useState<IProjectDescription[]>([])
    const [projectVideo, setProjectVideo] = useState<string>("")
    const [projectLinks, setProjectLinks] = useState<ILink[]>([])

    const [projectEntry, setProjectEntry] = useState<IProjectEntry>()

    const handleSubmmit = (): void => {
        console.log("submit msg fired")
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
        if (projectEntry === undefined) console.log("not everything about the project was filled in")
        else console.log(projectEntry)
    }

    const generateProjectUrl = (): string => {
        // make checks for unique url on backend, if url exists, increment number at the end of url
        return "placeholder"
    }

    const getLinks = (): string[] => {
        let tempLinks: string[] = []
        projectLinks.map(link => {
            tempLinks.push(link.linkUrl)
        })
        return tempLinks
    }

    const handleTags = () => {
        if (!projectTags.includes(newTagToAdd)) {
            setProjectTags([...projectTags, newTagToAdd])
            setNewTagToAdd("")
        }
    }

    const renderDescInputs = () => {
        return <>
            {projectDescription.map((desc, index) => 
                <div key={index.toString()}>
                    <label>
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
                </div>
            )}
        </>
    }

    const renderLinks = () => {
        return <>
            {projectLinks.map((link, index) =>
                <div key={index.toString()}>
                    <label>
                        link {index}: {link.linkUrl}
                        <input value={link.linkUrl} onChange={e => setProjectLinks(projectLinks.filter(currentLink => {
                            if (currentLink === link) {currentLink.linkUrl = e.target.value} return currentLink
                        }))}/>
                    </label>
                </div>
            )}
        </>
    }

    return (
        <div className="NewProject">
            <form className='NewProjectForm' onSubmit={e => {handleSubmmit(); e.preventDefault();}}>
                <label>
                    Project Name: {projectName}
                    <input type='text' value={projectName} onChange={e => setProjectName(e.target.value)} />
                </label>
                <label>
                    Project Field: {projectField}
                    <select value={projectField} onChange={e => setProjectField(e.target.value)}>
                        <option value="FullStack">Full Stack</option>
                        <option value="GameDevelopment">Game Development</option>
                    </select>
                </label>
                <label>
                    Project Tags: {projectTags.map(tag => <p onClick={e => setProjectTags(projectTags.filter((ftag) => ftag !== tag))} >{tag}</p>)}
                    <input type='text' value={newTagToAdd} onChange={e => setNewTagToAdd(e.target.value)}/>
                    <button onClick={e => {e.preventDefault(); handleTags()}}>add new tag</button>
                </label>
                <label>
                    Project Progress: {projectProgress}
                    <select value={projectProgress} onChange={e => setProjectProgress(e.target.value)}>
                        <option value="Planning">Planning</option>
                        <option value="InDevelopment">In Development</option>
                        <option value="Complete">Complete</option>
                    </select>
                </label>
                <button onClick={e => {e.preventDefault(); setProjectDescription([...projectDescription, {textType: "header", text: ""}])}}>add to description</button>
                {renderDescInputs()}
                <label>
                    Video Link:
                    <input type='text' value={projectVideo} onChange={e => setProjectVideo(e.target.value)}/>
                </label>
                <button onClick={e => {e.preventDefault(); setProjectLinks([...projectLinks, {linkType: "tobechanges", linkUrl: ""}])}}>add link</button>
                <label>
                    Other Links:                    
                    {renderLinks()}
                </label>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    );
}

export default NewProject;