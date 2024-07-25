import React, { useState, useEffect } from 'react'
import axios from 'axios';
export default function Mynotes() {
    const [dataVector, setdataVector] = useState([]);
    const [titleVector, setTitleVector] = useState([]);
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

    useEffect(() => {
        const url = 'https://cse-open-source.vercel.app/load-my-notes';
        // const url = `http://localhost:3500/passdata`;
        const {username,password}=JSON.parse(sessionStorage.getItem('currentUser'))
        axios.post(url, { username,password })
          .then(response => {
            console.log(response.data);
            setdataVector(response.data.arr);
            setTitleVector(response.data.titleVector);
            // setIsLoading(false);
          })
          .catch(error => {
            setdataVector([]);
            // setfailedText("500");
            console.error('There was an error!', error);
          });
      }, []);
  return (
    <>
        {eleMents}
    </>
  )
}
