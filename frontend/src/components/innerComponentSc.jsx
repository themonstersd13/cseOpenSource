import React, { useEffect, useRef } from 'react';
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

    useEffect(() => {
        const targetDivs = ref.current;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    entry.target.classList.add('hidden');
                } else {
                    entry.target.classList.remove('hidden');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (targetDivs) {
            observer.observe(targetDivs);
        }

        return () => {
            if (targetDivs) {
                observer.unobserve(targetDivs);
            }
        };
    }, []);

    return (
        <div
            onClick={handleClick}
            className="innerElements"
            id={props.id}
            ref={ref}
        >
            <img alt="" className="images" src={url + props.image}></img>
            <p className="innertitle">{props.Name}</p>
        </div>
    );
};

export default ScBarComponent;
