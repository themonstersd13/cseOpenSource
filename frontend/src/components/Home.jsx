import React,{useState} from 'react';
import Domain from './academics';
import Data from '../data/database'
import Toggle from './toggle';
function Home(){
  const [checked, setChecked] = useState(true);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const {academics,skills}=Data;
  let data;
  checked?data=academics:data=skills;
  return <div>
  <Toggle checked={checked} handleDomain={handleChange}/>
  <Domain CheakDomain={checked} domain={data}/>
  </div>;
};
export default Home;