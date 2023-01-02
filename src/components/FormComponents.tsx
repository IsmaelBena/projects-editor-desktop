import { useState } from 'react';
import './FormComponents.css'
import TechnologyMiniCard from './TechnologyMiniCards'

// =========================================================== Project Name ==========================================================================================

interface IProjectName {
    name: string,
    changeName: (arg: string) => void
}

function ProjectNameEntry(props: IProjectName) {

  return (
    <div className="ProjectNameEntry FormSegment">
        <label>
            Name:
            <input type='text' value={props.name} onChange={e => props.changeName(e.target.value)} />
        </label>
    </div>
  );
}

// =========================================================== Project Status =========================================================================================

interface IProjectStatus {
    status: string,
    changeStatus: (arg: string) => void
}

function ProjectStatusEntry(props: IProjectStatus) {

    return (
        <div className='ProjectStatusEntry FormSegment'>
            <label>
                Status:
                <select value={props.status} onChange={e => props.changeStatus(e.target.value)}>
                    {(props.status === "unselected") ? <option value="unselected">Select a Status</option> : null}
                    <option value="Planning">Planning</option>
                    <option value="In-Development">In Development</option>
                    <option value="Complete">Complete</option>
                </select>
            </label>                        
        </div>
    );
}

// =========================================================== Project Tech ==========================================================================================

interface ICardData {
    name: string,
    id: string
}

interface ITechData {
    cardsData: ICardData[],
    activeTech: string[],
    changeTech: (args: string[]) => void
}

function ProjectTechEntry(props: ITechData) {

    const findName = (id: string) => {
        let res = props.cardsData.find((card) => card.id === id)
        if (res !== undefined) {
            return res.name
        } else {
            return "Weird bug happening here..."
        }
    }

    const renderActiveTech = () => {
        return <div className="ActiveTech Inline">
            {props.activeTech.map((tech, index) =>
                <div onClick={() => {props.changeTech(props.activeTech.filter((Ftech) => Ftech !== tech))}}>
                    <TechnologyMiniCard id={tech} name={findName(tech)} redBG={""}/>
                </div>
            )}
        </div>
    }

    return (
        <div id='ProjectTechEntry' className="FormSegment">
            {renderActiveTech()}
            <div className="AllTech Inline">
            {props.cardsData.map((tech) => 
                <div onClick={() => {props.changeTech([...props.activeTech, tech.id])}}>
                    <TechnologyMiniCard id={tech.id} name={tech.name} redBG={(props.activeTech.find(Ltech => tech.id === Ltech) !== undefined) ? " redBG" : ""}/>
                </div>
            )}
            </div>
        </div>
    )
}

// =========================================================== Project Date ======================================================================================

interface IProjectDate {
    date: Date,
    changeDate: (arg: Date) => void
}

function ProjectDateEntry(props: IProjectDate) {

    return (
        <div className='ProjectDateEntry FormSegment'>
            <label>
                Date: {props.date.toISOString().split('T')[0]}
                <input type="date" onChange={e => props.changeDate(new Date(e.target.value))} />
            </label>
        </div>
    );
}

// =========================================================== Project Description =====================================================================================


interface IProjectDescription {
    description: string[],
    changeDescription: (arg: string[]) => void
}

function ProjectDescriptionEntry(props: IProjectDescription) {

    const renderDescInputs = () => {
        return <div id='DescriptionContainer' className='Inline'>
            <div id='DescriptionEntriesContainer' className='Column FormContainer'>
                {props.description.map((desc, index) => 
                    <div key={index.toString()}>
                        <label>
                            <textarea className='DescriptionEntry' value={desc} onChange={e => props.changeDescription(props.description.map((currentDesc, i) => {
                                if (i === index) {currentDesc = e.target.value} return currentDesc
                            }))}/>
                        </label>
                    </div>
                )}
                <button onClick={e => {e.preventDefault(); props.changeDescription([...props.description, ""])}}>add to description</button>
            </div>         
            <ul className='Column Start DescriptionUL FormContainer'>
                {props.description.map((desc, index) => 
                    <div className='Inline Start' key={index.toString()}>
                        <button className='RemoveBTN' onClick={e => {e.preventDefault(); props.changeDescription(props.description.filter((currentDesc, i) => i !== index))}}>Remove</button>
                        <li id={index.toString()}>{desc}</li>
                    </div>
                )}
            </ul>
        </div>
    }

    return (
        <div id='ProjectDescription' className='Inline'>
            {renderDescInputs()}
        </div>
    );
}

// =========================================================== Project Links ==========================================================================================

interface IProjectLinks {
    links: {linkType: string, url: string}[],
    changeLinks: (arg: {linkType: string, url: string}[]) => void
}

function ProjectLinksEntry(props: IProjectLinks) {

    const [newLinkUrl, setNewLinkUrl] = useState<string>("");
    const [newLinkType, setNewLinkType] = useState<string>("")

    const handleLinks = () => {
        if (props.links.find(link => link.url === newLinkUrl) === undefined) {
            props.changeLinks([...props.links, {linkType: newLinkType, url: newLinkUrl}])
            setNewLinkType("")
            setNewLinkUrl("")
        }
    }

    const renderLinks = () => {
        return <div className='LinksContainer'>
            {props.links.map(link => <p className='Link'>{link.linkType}: {link.url}</p>)}
        </div>
    }

    return (
        <div className='ProjectLinks'>
            <label>
                Type:
                <input type='text' value={newLinkType} onChange={e => setNewLinkType(e.target.value)}/>
            </label>
            <label>
                Url:
                <input type='text' value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)}/>
            </label>
            <button disabled={((newLinkType === "") || (newLinkUrl === ""))} onClick={e => {e.preventDefault(); handleLinks()}}>add new link</button>
            {renderLinks()}
        </div>
    );
}

// =========================================================== Module Exports ==========================================================================================

export {
    ProjectNameEntry,
    ProjectStatusEntry,
    ProjectDateEntry,
    ProjectDescriptionEntry,
    ProjectLinksEntry,
    ProjectTechEntry
};