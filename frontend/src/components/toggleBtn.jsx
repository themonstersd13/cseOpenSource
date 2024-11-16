import React from 'react';
import Switch from "react-switch";

export default function ToggleButton(props) {
   
   return (
    <div>
      <Switch
        onChange={props.handleDomain}
        checked={props.checked}
        offColor="#F5F5F7"
        onColor="#ff831d"
        offHandleColor="#ff831d"
        onHandleColor="#F5F5F7"
        uncheckedIcon={false}  
        checkedIcon={false}  
        className='toggleBtn'  
      />
    </div>
  );
}
