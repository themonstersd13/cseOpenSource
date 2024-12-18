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
        <div >
            <div className='p-0 px-2 py-4 text-2xl font-bold'>
                {props.CheakDomain ? `Semester ${props.domainN}` : skillsV[props.domainN]}
            </div>
            <div className="overflow-x-auto py-4 bg-transparent">
                <div className="flex space-x-5">
                    {Elements}
                </div>
            </div>
        </div>
    );
}

export default NormalSc;
