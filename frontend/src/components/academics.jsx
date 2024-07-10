import React from 'react';
import NormalSc from './normalscbar';

function Domain(props){
  const { domain } = props; 
  const Allbars = Object.keys(domain).map((sem, index) => (
    <NormalSc 
    domain={domain[sem]} 
    CheakDomain={props.CheakDomain} 
    key={index} 
    domainN={(index*1)+1} 
    />
  ));
    return (
        <div>
            {Allbars}
        </div>
    );
}

export default Domain;