import React from 'react';
const ScBarComponent = (props) => {
        const skillsV=props.skillsV;
        const handleRedirect=(val)=>{
            props.handleRedirect(val.target.parentElement.id);
        }
        let url='';
        props.CheakDomain?
        url=`${process.env.PUBLIC_URL}/images/academics/sem${props.domain}/`
        :
        url=`${process.env.PUBLIC_URL}/images/skills/${skillsV[props.domain]}/`;
            return (
                <div
                    onClick={handleRedirect}
                    className={`innerElements`}
                    id={props.id}
                >
                <img alt="" className="images" src={url+props.image}></img>
                <p className='innertitle'>{props.Name}</p>
                </div>
            );
};

export default ScBarComponent;
