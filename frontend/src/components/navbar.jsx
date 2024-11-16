import React,{useEffect,useState} from 'react';
import { useNavigate,Outlet,useLocation } from 'react-router-dom';
import '../css/style.css';

const NavigationMenu = () => {
    const [curruser,setuser]=useState("Login");
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // const cheak=localStorage.getItem('currentUser');
        const cheak=sessionStorage.getItem('currentUser');
        if(cheak){
            const curuser=JSON.parse(cheak).username;
            setuser(curuser);
        }
    }, []);
    const redirectToLogin = () => {
        navigate('/authentication');
    }
    const redirectToAbout = () => {
        navigate('/about');
    }
    const redirectToHome = () => {
        navigate('/');
    }
    const redirectToMyNotes = () => {
        navigate('/my-notes');
    }
  return (
    <>
    <nav>
      <div className="logo">NOTES  ADDA</div>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        <li onClick={redirectToHome} className={location.pathname==="/" ? "active":null}>Home</li>
        <li onClick={redirectToMyNotes} className={location.pathname==="/my-notes" ? "active":null}>My notes</li>
        <li className={location.pathname==="/about" ? "active":null} onClick={redirectToAbout}>About</li>
        <li onClick={redirectToLogin}>{curruser}</li>
      </ul>
    </nav>
    <Outlet />
    </>
  );
};

export default NavigationMenu;
