import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Mynotes() {
    const [dataVector, setdataVector] = useState([]);
    const [titleVector, setTitleVector] = useState([]);
    const [failedText, setfailedText] = useState("Loading...");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const eleMents = dataVector.map((ele, index) => (
        <div
            className="p-5 bg-blue-100 rounded-lg shadow-md border-2 border-blue-300 rounded-lg hover:shadow-xl transition transform hover:scale-105"
            key={index}
        >
            <a href={ele} className="block text-center text-gray-800">
                <img
                    alt="PDF"
                    className="mx-auto w-16 mb-2"
                    src={`${process.env.PUBLIC_URL}/images/pdf.png`}
                />
                <p className="font-semibold text-lg truncate">
                    {titleVector[index].replace(/\.pdf$/, '')}
                </p>
            </a>
        </div>
    ));

    useEffect(() => {
        const url = 'https://cse-open-source.vercel.app/load-my-notes';
        if (!sessionStorage.getItem('currentUser')) {
            alert("You need to log in to use this feature");
            navigate('/');
        } else {
            const { username, password } = JSON.parse(sessionStorage.getItem('currentUser'));
            axios
                .post(url, { username, password })
                .then((response) => {
                    setdataVector(response.data.arr);
                    setTitleVector(response.data.titleVector);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setdataVector([]);
                    setfailedText("500");
                    console.error('There was an error!', error);
                });
        }
    }, [navigate]);

    return (
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-700 min-h-screen w-full ">
            <div className="p-6 rounded-lg  bg-opacity-90 max-w-screen-lg w-full text-white">
                {isLoading ? (
                    <h1 className="text-center text-4xl font-bold">{failedText}</h1>
                ) : (
                    <div className="mx-9 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {eleMents}
                    </div>
                )}
            </div>
        </div>
    );
}
