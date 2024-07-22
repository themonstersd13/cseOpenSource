import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

const NavigationMenu = () => {
    const [curruser,setuser]=useState("Login");
    const navigate = useNavigate();
    useEffect(() => {
        const cheak=localStorage.getItem('currentUser');
        if(cheak){
            const curuser=JSON.parse(cheak).username;
            console.log(cheak)
            setuser(curuser);
        }
    }, []);
    const redirectToLogin = () =>{
        navigate('/authentication');
    }
  return (
    <nav>
      <div className="logo">WCE</div>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        <li className="active">Home</li>
        <li>My notes</li>
        <li>Others</li>
        <li onClick={redirectToLogin}>{curruser}</li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
