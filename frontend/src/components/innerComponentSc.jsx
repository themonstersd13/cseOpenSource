import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';

const ScBarComponent = (props) => {
    const navigate = useNavigate();
    const ref = useRef(null);

    const handleClick = (val) => {
        const newId = val.target.parentElement.id;
        navigate(`/notes/${newId}`);
    };

    let url = '';
    props.CheakDomain
        ? (url = `${process.env.PUBLIC_URL}/images/academics/sem${props.domain}/`)
        : (url = `${process.env.PUBLIC_URL}/images/skills/${props.skillsV[props.domain]}/`);

    return (
        <div
            onClick={handleClick}
            className="flex-shrink-0 inline-block m-5 p-4 bg-blue-100 border-2 border-blue-300 rounded-lg cursor-pointer transition duration-300 hover:shadow-xl hover:border-blue-700"
            id={props.id}
            ref={ref}
            style={{
                width: '300px', 
                height:'auto',
            }}
        >
            <img alt="" className="w-96 h-48 object-cover rounded-md" src={url + props.image}></img>
            <p className="font-semibold text-lg text-center break-words px-1 text-blue-800">{props.Name}</p>
        </div>
    );
};

export default ScBarComponent;
