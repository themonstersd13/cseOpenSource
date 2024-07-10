import React from 'react';
import ScBarComponent from './innerComponentSc'; 

function NormalSc(props) {
    const skillsV=["","webDev","appDev","cp","dsa"];
    const { domain } = props;
    const Elements = domain.id.map((id, index) => (
        <ScBarComponent
            key={index} 
            domain={props.domainN}
            CheakDomain={props.CheakDomain}
            image={domain.images[index]}
            id={id}
            skillsV={skillsV}
            Name={domain.Name[index]}
        />
    ));
    return (
        <div>
            <div className='domainTitle'>{props.CheakDomain?"Semester "+props.domainN:skillsV[props.domainN]}</div>
        <div className="outeronesc1">
            <div className="scbar1cont">
                {Elements}
            </div>
        </div>
        </div>
    );
}

export default NormalSc;
