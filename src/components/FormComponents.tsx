import { useState } from 'react';
import './FormComponents.css'

// =========================================================== Project Name ==========================================================================================

interface IProjectName {
    projectName: string,
    changeName: (arg: string) => void
}

function ProjectNameEntry(props: IProjectName) {

  return (
    <div className="ProjectNameEntry FormSegment">
        <label>
            Project Name:
            <input type='text' value={props.projectName} onChange={e => props.changeName(e.target.value)} />
        </label>
    </div>
  );
}

// =========================================================== Project Field =========================================================================================

interface IProjectField {
    projectField: string,
    changeField: (arg: string) => void
}

function ProjectFieldEntry(props: IProjectField) {

    return (
        <div className='ProjectField FormSegment'>
            <label>
                Project Field:
                <select value={props.projectField} onChange={e => props.changeField(e.target.value)}>
                    {(props.projectField === "unselected") ? <option value="unselected">Select a field</option> : null}
                    <option value="FullStack">Full Stack</option>
                    <option value="GameDevelopment">Game Development</option>
                </select>
            </label>                        
        </div>
    );
}

// =========================================================== Project Tags ==========================================================================================

interface IProjectTags {
    projectTags: string[],
    changeTags: (arg: string[]) => void
}

function ProjectTagsEntry(props: IProjectTags) {
    
    const [newTagToAdd, setNewTagToAdd] = useState<string>("");

    const handleTags = () => {
        if (!props.projectTags.includes(newTagToAdd) && (newTagToAdd !== "")) {
            props.changeTags([...props.projectTags, newTagToAdd])
            setNewTagToAdd("")
        }
    }

    const renderTags = () => {
        return <div className='TagsContainer'>
            {props.projectTags.map(tag => <p className='Tag' onClick={e => props.changeTags(props.projectTags.filter((ftag) => ftag !== tag))} >{tag}</p>)}
        </div>
    }

    return (
        <div className='FormSegment'>
            <label className='ProjectTags'>
                Project Tags:
                <input type='text' value={newTagToAdd} onChange={e => setNewTagToAdd(e.target.value)}/>
                <button onClick={e => {e.preventDefault(); handleTags()}}>add new tag</button>
            </label>
            {renderTags()}
        </div>
    );
}

// =========================================================== Project Progress ======================================================================================

interface IProjectProgress {
    projectProgress: string,
    changeProgress: (arg: string) => void
}

function ProjectProgressEntry(props: IProjectProgress) {

    return (
        <div className='ProjectProgress FormSegment'>
            <label>
                Project Progress:
                <select value={props.projectProgress} onChange={e => props.changeProgress(e.target.value)}>
                    {(props.projectProgress === "unselected") ? <option value="unselected">Select a field</option> : null}
                    <option value="Planning">Planning</option>
                    <option value="InDevelopment">In Development</option>
                    <option value="Complete">Complete</option>
                </select>
            </label>
        </div>
    );
}

// =========================================================== Project Description =====================================================================================

interface IProjectDescription {
    textType: string,
    text: string
}

interface IProjectDescriptionP {
    projectDescription: IProjectDescription[],
    changeDescription: (arg: IProjectDescription[]) => void
}

function ProjectDescriptionEntry(props: IProjectDescriptionP) {

    const renderDescInputs = () => {
        return <div className='DescriptionEntriesContainer'>
            {props.projectDescription.map((desc, index) => 
                <div key={index.toString()}>
                    <label className='DescriptionEntry'>
                        new desc entry:
                        <select value={desc.textType} onChange={e => props.changeDescription(props.projectDescription.filter(currentDesc => {
                            if (currentDesc === desc) {currentDesc.textType = e.target.value} return currentDesc
                        }))}>
                            <option value="header">Header</option>
                            <option value="body">Body</option>
                        </select>
                        <textarea value={desc.text} onChange={e => props.changeDescription(props.projectDescription.filter(currentDesc => {
                            if (currentDesc === desc) {currentDesc.text = e.target.value} return currentDesc
                        }))}/>
                    </label>
                    <button onClick={e => {e.preventDefault(); props.changeDescription(props.projectDescription.filter(currentDesc => currentDesc !== desc))}}>Remove</button>
                </div>
            )}
        </div>
    }

    return (
        <div className='ProjectDescription FormSegment'>
            <button onClick={e => {e.preventDefault(); props.changeDescription([...props.projectDescription, {textType: "header", text: ""}])}}>add to description</button>
            {renderDescInputs()}
        </div>
    );
}

// =========================================================== Project Video ==========================================================================================

interface IProjectVideo {
    projectVideo: string,
    changeVideo: (arg: string) => void
}

function ProjectVideoEntry(props: IProjectVideo) {

    return (
        <div className='ProjectVideo FormSegment'>
            <label>
                Video Link:
                <input type='text' value={props.projectVideo} onChange={e => props.changeVideo(e.target.value)}/>
            </label>
        </div>
    );
}

// =========================================================== Project Links ==========================================================================================

interface ILink {
    linkType: string,
    linkUrl: string
}

interface IProjectLinks {
    projectLinks: ILink[],
    changeLinks: (arg: ILink[]) => void
}

function ProjectLinksEntry(props: IProjectLinks) {

    const renderLinks = () => {
        if (props.projectLinks.length > 0) {
        return <div className='LinksContainer'>
            <p>Other Links</p>
            {props.projectLinks.map((link, index) =>
                <div key={index.toString()}>
                    <label className='Link'>
                        link {index + 1}:
                        <input value={link.linkUrl} onChange={e => props.changeLinks(props.projectLinks.filter(currentLink => {
                            if (currentLink === link) {currentLink.linkUrl = e.target.value} return currentLink
                        }))}/>
                    </label>
                    <button onClick={e => {e.preventDefault(); props.changeLinks(props.projectLinks.filter(currentLink => currentLink !== link))}}>Remove</button>
                </div>
            )}
        </div>
        }
    }

    return (
        <div className='ProjectLinks FormSegment'>
            <button onClick={e => {e.preventDefault(); props.changeLinks([...props.projectLinks, {linkType: "tobechanges", linkUrl: ""}])}}>add link</button>                 
            {renderLinks()}
        </div>
    );
}

// =========================================================== Module Exports ==========================================================================================

export {
    ProjectNameEntry,
    ProjectFieldEntry,
    ProjectTagsEntry,
    ProjectProgressEntry,
    ProjectDescriptionEntry,
    ProjectVideoEntry,
    ProjectLinksEntry
};