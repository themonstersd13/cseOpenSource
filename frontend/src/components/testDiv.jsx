import React from "react";


function TestDiv (props){
    const {currentId,dataVector}=props;
    const eleMents=dataVector.map((ele,index)=>(
        <a 
        key={index}
        href={`${process.env.PUBLIC_URL}/data/${currentId}/${ele}`} 
        type="application/pdf">
        <div className='testDiv'>
        </div>
        </a>
    ))
    return <div>
        {eleMents}
    </div>;
}

export default TestDiv;