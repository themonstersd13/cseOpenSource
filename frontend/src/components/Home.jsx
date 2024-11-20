import React, { useState } from 'react';
import Domain from './academics';
import Data from '../data/database';
import Toggle from './toggle';

function Home() {
  const [checked, setChecked] = useState(true);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const { academics, skills } = Data;
  let data;
  checked ? (data = academics) : (data = skills);

  return (
    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-700 min-h-screen w-full flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-opacity-80 max-w-full w-full text-white">
        <Toggle checked={checked} handleDomain={handleChange} />
        <Domain CheakDomain={checked} domain={data} />
      </div>
    </div>
  );
}

export default Home;
