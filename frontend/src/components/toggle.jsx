import React from 'react';
import ToggleButton from './toggleBtn';

function Toggle(props) {
  return (
    <div className="flex justify-center items-center mt-6">
        <div>
            <div className="flex justify-between items-center bg-blue-100 border border-blue-300 rounded-lg p-4">
                <div className="text-xl font-semibold text-blue-800">Skills</div>
                <div>
                    <ToggleButton checked={props.checked} handleDomain={props.handleDomain} />
                </div>
                <div className="text-xl font-semibold text-blue-800">Academics</div>
            </div>
            <div className="text-center mt-2 text-lg white">Made by Students, Made for Students</div>
        </div>
    </div>
  );
};

export default Toggle;
