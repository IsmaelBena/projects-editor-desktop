import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Technology.css'
import { useNavigate } from 'react-router-dom';

interface ITechCardData 
{
  _id: string,
  name: string,
  techType: string,
  image: {
    url?: string,
    fileName: string
  },
  authToken: string
}

function TechnologyCard(props: ITechCardData) {

  const navigate = useNavigate();

  const [editing, setEditing] = useState<Boolean>(false)

  const [newName, setNewName] = useState<string>(props.name)
  const [newTechType, setNewTechType] = useState<string>(props.techType)
  const [newImgUrl, setNewImgUrl] = useState<string>(props.image.url||"")
  const [newImgFileName, setNewImgFileName] = useState<string>(props.image.fileName)

  const putNewValues = async (name: string, techType: string, imgUrl: string, imgFileName: string) => {
    axios.put(`https://ismaelbena-api.online/technologies/edit/${props._id}`, !(newImgUrl === "") ? 
    {name: name, techType: techType, image: {url: imgUrl, fileName: imgFileName}} : 
    {name: name, techType: techType, image: {fileName: imgFileName}})
    .then(res => {
      console.log("PUTing new values");
      console.log(res)
      window.location.reload()
    }).catch(err => {
      console.log(err)
    })
  }

  const handleEditToggle = () => {
    if (editing) {
      setNewName(props.name)
      setNewTechType(props.techType)
      setNewImgUrl(props.image.url||"")
      setNewImgFileName(props.image.fileName)
      setEditing(false)
    }
    else {
      setEditing(true)
    }    
  }

  const confirmDelete = () => {
    if (window.confirm(`Are You sure you want to delete ${props.name}?`)) {
      axios.delete(`https://ismaelbena-api.online/technologies/delete/${props._id}`)
      .then(res => {
          console.log(`${props.name} has been deleted`, res)
          window.location.reload()
        }
      )
      .catch(err => {
        console.log(err)
      })
    }
  }

  const handleTechEdit = () => {
    putNewValues(newName, newTechType, newImgUrl, newImgFileName)
  }

  return (
    <div className="TechnologyCard">
        <div className="techCardHeader">
          <div className='editToggleDiv' onClick={handleEditToggle}>
            {
            !editing ? 
              <p>Edit</p> : <p>Cancel</p>
            }
          </div>
            <p onClick={confirmDelete}>Delete</p>
        </div>
        {
          !editing ? 
          <div className="techCardBody">
            <h3>Name: {props.name}</h3>
            <p>Type: {props.techType}</p>
            <p>Image Url: {props.image.url}</p>
            <p>Image File Name: {props.image.fileName}</p>
          </div>
          :
          <form className='techCardBody' onSubmit={e => {e.preventDefault(); handleTechEdit();}}>
            <div>
              <label>
                Name:
                <input type='text' value={newName} onChange={e => setNewName(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Type:
                <input type='text' value={newTechType} onChange={e => setNewTechType(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Image URL:
                <input type='text' value={newImgUrl} onChange={e => setNewImgUrl(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Image File Name:
                <input type='text' value={newImgFileName} onChange={e => setNewImgFileName(e.target.value)} />
              </label>
            </div>
            <input type='submit' value='Submit'/>
          </form>
        }
    </div>
  );
}

export default TechnologyCard;