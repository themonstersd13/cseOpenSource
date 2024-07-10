import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function TestDiv() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { state } = location;
  const { currentId} = state;
  const [dataVector, setdataVector] = useState([]);
  const eleMents = dataVector.map((ele, index) => (
    <a 
      key={index}
      href={`${process.env.PUBLIC_URL}/data/${currentId}/${ele}`} 
      type="application/pdf">
      <div className='testDiv'>
      <div>{ele.replace(/\.pdf$/, '')}</div>
      </div>
    </a>
  ));

  useEffect(() => {
    console.log(currentId)
    const url = 'http://localhost:3500/passdata';
    axios.post(url, { currentId })
      .then(response => {
        setdataVector(response.data.arr);
        setIsLoading(false);
      })
      .catch(error => {
        setdataVector([]);
        console.error('There was an error!', error);
        setIsLoading(false); 
      });
  }, [currentId]);

  return (
    <div>
      {isLoading ? 'loading...' : eleMents}
    </div>
  );
}

export default TestDiv;
