import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function TestDiv() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataVector, setdataVector] = useState([]);
  const [failedText,setfailedText] = useState("Loading...");
  const {currentId} = useParams();
  const eleMents = dataVector.map((ele, index) => (
    <a 
      key={index}
      href={`${process.env.PUBLIC_URL}/notes/${currentId}/${ele}`} 
      type="application/pdf">
      <div className='testDiv'>
      <div>{ele.replace(/\.pdf$/, '')}</div>
      </div>
    </a>
  ));

  useEffect(() => {
    console.log(currentId)
    const url = 'http://localhost:3500/passdata';
    // const  url=`http://192.168.29.163:3500/passdata`;
    axios.post(url, { currentId })
      .then(response => {
        setdataVector(response.data.arr);
        setIsLoading(false);
      })
      .catch(error => {
        setdataVector([]);
        setfailedText("500");
        console.error('There was an error!', error);
      });
  }, [currentId]);

  return (
    <div>
      {isLoading ?<h1 align="center"> {failedText} </h1>: eleMents}
    </div>
  );
}

export default TestDiv;
