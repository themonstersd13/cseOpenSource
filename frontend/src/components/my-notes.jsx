import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Mynotes() {
    const [dataVector, setdataVector] = useState([]);
    const [titleVector, setTitleVector] = useState([]);
    const [failedText, setfailedText] = useState("Loading...");
    const [isLoading, setIsLoading] = useState(true);
    const eleMents = dataVector.map((ele, index) => (
        <div className='bigContCp' key={index}>
            <div className="box-container">
                <div className="box">
                    <a href={ele} type="application/pdf">
                        <div>
                            <img alt="" className="images" src={process.env.PUBLIC_URL + '/images/pdf.png'} />
                            <p className='paraCont'>{titleVector[index].replace(/\.pdf$/, '')}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    ));
    const navigate = useNavigate();
    useEffect(() => {
        const url = 'https://cse-open-source.vercel.app/load-my-notes';
        // const url = `http://localhost:3500/passdata`;
        if(!sessionStorage.getItem('currentUser')){
            alert("you need to login to use this feature");
            navigate('/');
        }else{
        const {username,password}=JSON.parse(sessionStorage.getItem('currentUser'))
        axios.post(url, { username,password })
          .then(response => {
            console.log(response.data);
            setdataVector(response.data.arr);
            setTitleVector(response.data.titleVector);
            setIsLoading(false);
          })
          .catch(error => {
            setdataVector([]);
            setfailedText("500");
            console.error('There was an error!', error);
          })}
      }, [navigate]);
  return (
    <>
      {isLoading ?<h1 align="center"> {failedText} </h1>: eleMents}
    </>
  )
}
