import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const [curruser, setuser] = useState('Login');
  const [menuOpen, setMenuOpen] = useState(false); // State to manage mobile menu visibility
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cheak = sessionStorage.getItem('currentUser');
    if (cheak) {
      const curuser = JSON.parse(cheak).username;
      setuser(curuser);
    }
  }, []);

  const redirectToLogin = () => {
    navigate('/authentication');
  };

  const redirectToAbout = () => {
    navigate('/about');
  };

  const redirectToHome = () => {
    navigate('/');
  };

  const redirectToMyNotes = () => {
    navigate('/my-notes');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the mobile menu state
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav style={{ zIndex: 9999 }} className="bg-purple-600 sticky top-0 z-50 flex justify-between items-center px-8 py-4 w-full shadow-lg">
        <div onClick={redirectToHome} className="text-white text-3xl font-semibold">NOTES ADDA</div>
        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-3xl text-white">
            <i className={`fas fa-bars ${menuOpen ? 'transform rotate-90' : ''}`}></i>
          </button>
        </div>
        <ul className="flex space-x-6 text-lg font-semibold text-white lg:flex hidden">
          <li
            onClick={redirectToHome}
            className={`px-4 py-2 rounded-md transition duration-300 hover:bg-pink-600 ${location.pathname === '/' ? 'bg-pink-600 text-white' : ''}`}
          >
            Home
          </li>
          <li
            onClick={redirectToMyNotes}
            className={`px-4 py-2 rounded-md transition duration-300 hover:bg-pink-600 ${location.pathname === '/my-notes' ? 'bg-pink-600 text-white' : ''}`}
          >
            My Notes
          </li>
          <li
            onClick={redirectToAbout}
            className={`px-4 py-2 rounded-md transition duration-300 hover:bg-pink-600 ${location.pathname === '/about' ? 'bg-pink-600 text-white' : ''}`}
          >
            About
          </li>
          <li onClick={redirectToLogin} className="px-4 py-2 rounded-md transition duration-300 hover:bg-pink-600">
            {curruser}
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div
          style={{ zIndex: 9998 }}
          className={`lg:hidden fixed top-10 left-0 w-4/5 h-full bg-gradient-to-l from-indigo-500 via-purple-600 to-pink-500 text-white text-center transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <ul className="space-y-4 pt-8">
          <li
            onClick={redirectToHome}
            className={`py-4 transition duration-300 ${location.pathname === '/' ? 'bg-white text-black' : ''}`}
          >
            Home
          </li>
          <li
            onClick={redirectToMyNotes}
            className={`py-4 transition duration-300 ${location.pathname === '/my-notes' ? 'bg-white text-black' : ''}`}
          >
            My Notes
          </li>
          <li
            onClick={redirectToAbout}
            className={`py-4 transition duration-300 ${location.pathname === '/about' ? 'bg-white text-black' : ''}`}
          >
            About
          </li>
          <li onClick={redirectToLogin} className="py-4 transition duration-300">
            {curruser}
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
};

export default NavigationMenu;
