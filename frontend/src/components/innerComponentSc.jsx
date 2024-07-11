import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';
const ScBarComponent = (props) => {
    const skillsV = props.skillsV;
    const navigate = useNavigate();
    const handleClick = (val) => {
        const newId = val.target.parentElement.id;
        navigate(`/notes/${newId}`);
    };

    let url = '';
    props.CheakDomain ?
        url = `${process.env.PUBLIC_URL}/images/academics/sem${props.domain}/` :
        url = `${process.env.PUBLIC_URL}/images/skills/${skillsV[props.domain]}/`;

    return (
        <div
            onClick={handleClick}
            className={`innerElements`}
            id={props.id}
        >
            <img alt="" className="images" src={url + props.image}></img>
            <p className='innertitle'>{props.Name}</p>
        </div>
    );
};

export default ScBarComponent;
