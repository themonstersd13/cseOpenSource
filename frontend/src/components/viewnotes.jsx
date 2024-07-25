import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../css/ContributionPage.css';

const ContributionPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dataVector, setdataVector] = useState([]);
    const [titleVector, setTitleVector] = useState([]);
    const [failedText, setfailedText] = useState("Loading...");
    const [formData, setFormData] = useState({
        name: '',
        prn: '',
        filename: '',
        courseCode: '',
        file: null
    });
    const [fileError, setFileError] = useState('');
    const { currentId } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes

        if (file && file.size > maxSize) {
            setFileError('File size exceeds the 10MB limit.');
        } else {
            setFileError('');
            setFormData(prevState => ({
                ...prevState,
                file: file
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fileError) {
            return;
        }

        const url = 'https://cse-open-source.vercel.app/upload';
        // const url = `http://localhost:3500/upload`;
        const uploadData = new FormData();
        uploadData.append('name', formData.name);
        uploadData.append('prn', formData.prn);
        uploadData.append('filename', formData.filename);
        uploadData.append('currentId', currentId);
        uploadData.append('file', formData.file);

        axios.post(url, uploadData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data);
            closeForm();
        })
        .catch(error => {
            console.error('There was an error uploading the file!', error);
        });
    };

    const addToMyNotes = (e) => {
        const currid = e.target.id;
        const url = dataVector[currid];
        const filename = titleVector[currid];
        const { username, password } = JSON.parse(sessionStorage.getItem('currentUser'));
        axios.post('https://cse-open-source.vercel.app/my-notes-update-arr', { username, password, url, filename })
          .then(response => {
            console.log(response.data);
            setdataVector(response.data.arr);
            setTitleVector(response.data.titleVector);
          })
          .catch(error => {
            setdataVector([]);
            alert("failed to upload");
            console.error('There was an error!', error);
          });
    };

    useEffect(() => {
        console.log(currentId);
        const url = 'https://cse-open-source.vercel.app/passdata';
        // const url = `http://localhost:3500/passdata`;
        axios.post(url, { currentId })
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
          });
      }, [currentId]);

    const openForm = () => {
        setShowForm(true);
        console.log("true");
    };

    const closeForm = () => {
        setShowForm(false);
        console.log("false");
    };

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
            <div className="buttons">
                <button onClick={addToMyNotes} id={index} className="button-77">ADD</button>
            </div>
        </div>
    ));

    return (
        <>{isLoading ?<h1 align="center"> {failedText} </h1>:
        <>
            <div className="bigCont">
                {eleMents}
            </div>
            <button className="button-87" id="contributeBtn" onClick={openForm}>Contribute</button>
            {showForm && (
                <>
                    <div className="overlay" onClick={closeForm}></div>
                    <div className="contribute-form">
                        <button className="close-btn" onClick={closeForm}>X</button>
                        <h2>Contribute</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-field">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="prn">PRN</label>
                                <input type="text" id="prn" name="prn" value={formData.prn} onChange={handleInputChange} required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="filename">Enter Filename</label>
                                <input type="text" id="filename" name="filename" value={formData.filename} onChange={handleInputChange} required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="file">Upload File:</label>
                                <input type="file" id="file" name="file" onChange={handleFileChange} />
                                {fileError && <p className="error-message">{fileError}</p>}
                            </div>
                            <div className="form-buttons">
                                <button className="button submit-btn" type="submit">Submit</button>
                                <button className="button close-btn" onClick={closeForm}>Close</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>}
        </>);
};

export default ContributionPage;
