import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Bubbles from './particle';

const ContributionPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dataVector, setDataVector] = useState([]);
    const [titleVector, setTitleVector] = useState([]);
    const [failedText, setFailedText] = useState("Loading...");
    const [formData, setFormData] = useState({
        name: '',
        prn: '',
        filename: '',
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
        const maxSize = 10 * 1024 * 1024;

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
        if (fileError) return;

        const url = 'https://cse-open-source.vercel.app/upload';
        const uploadData = new FormData();
        uploadData.append('name', formData.name);
        uploadData.append('prn', formData.prn);
        uploadData.append('filename', formData.filename);
        uploadData.append('currentId', currentId);
        uploadData.append('file', formData.file);

        axios.post(url, uploadData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(() => closeForm())
        .catch(error => console.error('Error uploading file!', error));
    };

    const addToMyNotes = (e) => {
        const currid = e.target.id;
        const url = dataVector[currid];
        const filename = titleVector[currid];
        const { username, password } = JSON.parse(sessionStorage.getItem('currentUser'));

        axios.post('https://cse-open-source.vercel.app/my-notes-update-arr', { username, password, url, filename })
        .then(response => {
            setDataVector(response.data.arr);
            setTitleVector(response.data.titleVector);
            window.location.reload();
        })
        .catch(() => {
            setDataVector([]);
            alert("Failed to upload");
        });
    };

    useEffect(() => {
        const url = 'https://cse-open-source.vercel.app/passdata';
        axios.post(url, { currentId })
        .then(response => {
            setDataVector(response.data.arr);
            setTitleVector(response.data.titleVector);
            setIsLoading(false);
        })
        .catch(() => {
            setDataVector([]);
            setFailedText("500");
        });
    }, [currentId]);

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    return (
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-700 min-h-screen w-full flex items-center justify-center">
            <Bubbles />
            <div className="p-6 rounded-lg shadow-lg bg-opacity-90 max-w-screen-lg w-full text-white">
                {isLoading ? (
                    <h1 className="text-center text-4xl font-bold">{failedText}</h1>
                ) : (
                    <>
                        <div className="mx-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dataVector.map((ele, index) => (
                                <div key={index} className="p-5 bg-blue-100 rounded-lg shadow-md border-2 border-blue-300 rounded-lg hover:shadow-xl transition transform hover:scale-105">
                                    <a href={ele} className="block text-center text-gray-800">
                                        <img src={`${process.env.PUBLIC_URL}/images/pdf.png`} alt="PDF" className="mx-auto w-16 mb-2" />
                                        <p className="font-semibold text-lg truncate">{titleVector[index].replace(/\.pdf$/, '')}</p>
                                    </a>
                                    <button
                                        onClick={addToMyNotes}
                                        id={index}
                                        className="w-full mt-3 px-6 py-3 bg-gradient-to-l from-indigo-500 via-purple-600 to-pink-500 text-white font-bold rounded-md hover:bg-orange-600 transition transform hover:scale-105"
                                    >
                                        ADD
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            className="fixed bottom-6 right-6 px-6 py-4 bg-gradient-to-r from-red-400 via-orange-500 to-red-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110"
                            onClick={openForm}
                        >
                            Contribute
                        </button>
                        {showForm && (
                            <>
                                {/* Overlay */}
                                <div className="fixed inset-0 bg-black bg-opacity-40 z-10" onClick={closeForm}></div>

                                {/* Form Modal with Flexbox Centering */}
                                <div className="fixed inset-0 flex items-center justify-center z-20">
                                    <div className="bg-blue-50 p-6 rounded-xl shadow-lg w-full max-w-lg">
                                        {/* Close Button */}
                                        <button
                                            className="absolute top-4 right-4 w-12 h-12 text-gray-600 font-bold rounded-full shadow-lg hover:bg-gray-200 transition duration-300 flex items-center justify-center text-2xl"
                                            onClick={closeForm}
                                        >
                                            &times;
                                        </button>

                                        {/* Title */}
                                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                                            Contribute
                                        </h2>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {/* Name Input */}
                                            <div className="relative">
                                                <label htmlFor="name" className="block text-gray-800 mb-2">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your full name"
                                                    className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    required
                                                />
                                            </div>

                                            {/* PRN Input */}
                                            <div className="relative">
                                                <label htmlFor="prn" className="block text-gray-800 mb-2">
                                                    PRN (ID)
                                                </label>
                                                <input
                                                    type="text"
                                                    id="prn"
                                                    name="prn"
                                                    value={formData.prn}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your PRN"
                                                    className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    required
                                                />
                                            </div>

                                            {/* Filename Input */}
                                            <div className="relative">
                                                <label htmlFor="filename" className="block text-gray-800 mb-2">
                                                    File Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="filename"
                                                    name="filename"
                                                    value={formData.filename}
                                                    onChange={handleInputChange}
                                                    maxLength="16"
                                                    placeholder="Enter a descriptive file name"
                                                    className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    required
                                                />
                                            </div>

                                            {/* File Upload */}
                                            <div className="relative">
                                                <label htmlFor="file" className="block text-gray-800 mb-2">
                                                    Upload File
                                                </label>
                                                <input
                                                    type="file"
                                                    id="file"
                                                    name="file"
                                                    onChange={handleFileChange}
                                                    className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                {fileError && <p className="text-red-500 mt-2">{fileError}</p>}
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex justify-between  mt-6 flex-wrap">
                                                <button
                                                    type="button"
                                                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-l from-red-500 via-orange-600 to-pink-500 text-white font-bold rounded-md hover:bg-orange-600 transition"
                                                    onClick={closeForm}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-l from-indigo-500 via-purple-600 to-pink-500 text-white font-bold rounded-md hover:bg-orange-600 transition"
                                                >
                                                    Upload
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ContributionPage;
