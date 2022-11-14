import React, { useState, useEffect} from 'react';
import './Technologies.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ITechCardData, TechnologyCard} from '../components/TechnologyCards'

function Technologies() {

    const [technologiesData, setTechnologiesData] = useState<ITechCardData>();
    const [loadingData, setLoadingData] = useState<boolean>(true);
  
    const getData = async () => {
      axios.get('')
      .then(res => {
        setTechnologiesData(res.data);
        console.log(res.data);
        setLoadingData(false);
      })
    }
  
    useEffect(() => {
      setLoadingData(true);
      getData();
    }, [])
  

  return (
    <div className="Technologies">
        <Link to='/'>
            <div className='HomeLink'>
                <p>← Back to home screen</p>
            </div>
        </Link>
        <div className="TechnologyCardsContainer">
        {!loadingData ? <>
            {technologiesData.map(() => <h2>card placeholder</h2>)}
            </> : <p>loading cards</p>
         }
        </div>
    </div>
  );
}

export default Technologies;