import React from 'react';
import ToggleButton from './toggleBtn';
function Toggle(props){
  return <div>
    <div className='ToggleContainer'>
        <div>
        <div className='toggleOptions'>
            <div className='domaintext'>Skills</div>
            <div>
                <ToggleButton checked={props.checked} handleDomain={props.handleDomain}/>
            </div>
            <div className='domaintext'>Academics</div>
        </div>
        <div className='bottomTagline'>Made by Students Made for Students</div>
        </div>
    </div>
  </div>;
};
export default Toggle;