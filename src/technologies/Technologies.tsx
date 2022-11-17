import React, { useState, useEffect} from 'react';
import './Technologies.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCards'

interface ITechCardData 
{
  _id: string,
  name: string,
  techType: string,
  image: {
    url?: string,
    fileName: string
  }
}

function Technologies() {

    const [technologiesData, setTechnologiesData] = useState<ITechCardData[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [addingNewTech, setAddingNewTech] = useState<boolean>(false);
  
    const getData = async () => {
      axios.get('http://localhost:8000/technologies')
      .then(res => {
        setTechnologiesData(res.data);
        console.log(res.data);
        setLoadingData(false);
      }).catch(err => {
        console.log(err)
      })
    }
  
    useEffect(() => {
      setLoadingData(true);
      getData();
    }, [])
  
    const toggleAddingNewTech = () => {
      setAddingNewTech(!addingNewTech)
    }

    const [newName, setNewName] = useState<string>("")
    const [newTechType, setNewTechType] = useState<string>("")
    const [newImgUrl, setNewImgUrl] = useState<string>("")
    const [newImgFileName, setNewImgFileName] = useState<string>("")
  
    const postNewValues = async (name: string, techType: string, imgUrl: string, imgFileName: string) => {
      axios.post('http://localhost:8000/technologies', !(newImgUrl === "") ? 
      {name: name, techType: techType, image: {url: imgUrl, fileName: imgFileName}} : 
      {name: name, techType: techType, image: {fileName: imgFileName}})
      .then(res => {
        console.log("POSTing new values");
        console.log(res)
        window.location.reload()
      }).catch(err => {
        console.log(err)
      })
    }

    const handleNewTechSubmit = () => {
      postNewValues(newName, newTechType, newImgUrl, newImgFileName)
    }

  return (
    <div className="Technologies">
        <Link className='HomeLink' to='/'>
            <div >
                <p>← Back to home screen</p>
            </div>
        </Link>
        {!addingNewTech ? 
        <div className='HomeLink' onClick={toggleAddingNewTech}>
          <p><b>+</b> Add New Technology</p>
        </div> :
          <form className='NewTechForm' onSubmit={e => {e.preventDefault(); handleNewTechSubmit();}}>
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
            <button onClick={toggleAddingNewTech}>Cancel</button>
          </form>
        }
        <div className="TechnologyCardsContainer">
        {!loadingData ? <>
            {technologiesData.map((tech) => <TechnologyCard _id={tech._id} name={tech.name} techType={tech.techType} image={tech.image}/>)}
            </> : <p>loading cards</p>
         }
        </div>
    </div>
  );
}

export default Technologies;