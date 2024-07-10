import React,{useState,useEffect} from 'react';
import Home from './Home';
import axios from 'axios';
import TestDiv from './testDiv';
function App(){
  const [currentId,redirectId]=useState('');
  const [homePageBool,changeHome]=useState(true);
  const [dataVector,updateDatavector]=useState([]);
  const [redirectBool,setredirectBool]=useState(false);
  const handleRedirect = (val) => {
    redirectId(val);
    changeHome(homePageBool => !homePageBool);
    setredirectBool(redirectBool => ! redirectBool)
  };
  const handleDataVector = (data) => {
     updateDatavector(data);
    }
    useEffect(() => {
      if (redirectBool) {
        const url = 'http://localhost:3500/passdata';
        axios.post(url, { currentId })
        .then(response => {
          handleDataVector(response.data);
          setredirectBool(redirectBool => ! redirectBool)
          console.log('Data received:', response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      }
    }, [homePageBool, currentId ,dataVector,redirectBool]);
    return <div>
    {homePageBool?
    <Home handleRedirect={handleRedirect}/>
    :
    <TestDiv currentId={currentId} dataVector={dataVector}/>
  }
  </div>;
};
export default App;