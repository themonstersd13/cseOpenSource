import React from 'react';
import Switch from "react-switch";

export default function ToggleButton(props) {
    return (
        <div>
            <Switch
                onChange={props.handleDomain}
                checked={props.checked}
                offColor="#e5e7eb"  
                onColor="#8b5cf6"   
                offHandleColor="#fff"  
                onHandleColor="#fff"   
                uncheckedIcon={false}  
                checkedIcon={false}  
                className="border-1 border-pink-300 rounded-lg" 
            />
        </div>
    );
}
