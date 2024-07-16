import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/log&reg.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [currentFormState, setCurrentFormState] = useState("Don't have an account?");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    prn: '',
    branch: ''
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setCurrentFormState(isLogin ? "Already registered?" : "Don't have an account?");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem('currentUser', JSON.stringify(data));
  };

  const handleLoginFailure = () => {
    localStorage.setItem('currentUser', '0');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = isLogin ? 'https://cse-open-source.vercel.app/login' : 'https://cse-open-source.vercel.app/register';
    const method = 'POST';
    const body = new FormData();

    if (isLogin) {
      body.append('username', formData.username);
      body.append('password', formData.password);
    } else {
      body.append('username', formData.username);
      body.append('password', formData.password);
      body.append('prn', formData.prn);
      body.append('name', formData.name);
      body.append('branch', formData.branch);
    }

    fetch(endpoint, {
      method: method,
      body: body
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        console.log('Success:', data);
        if (isLogin) {
          handleLoginSuccess(data.data); 
          navigate(`/`);
        } else {
          handleLoginFailure(); 
          toggleForm(); 
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert(isLogin?"failed to login":"failed to register");
        setFormData({
          username: '',
          password: '',
          name: '',
          prn: '',
          branch: ''
        });
      });
  };

  return (
    <div className='loginRegContainer'>
      <title>Login and Register</title>
      <link rel="stylesheet" href="" />
      
      {isLogin ? (
        <div className="container" id="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="login-username">Username</label>
            <input
              type="text"
              id="login-username"
              name="username"
              placeholder="Enter your Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Login</button>
          </form>
          <button className="toggle-button" onClick={toggleForm}>{currentFormState}</button>
        </div>
      ) : (
        <div className="container" id="register-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="register-name">Name</label>
            <input
              type="text"
              id="register-name"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="register-prn">PRN</label>
            <input
              type="text"
              id="register-prn"
              name="prn"
              placeholder="Enter your PRN"
              value={formData.prn}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="register-branch">Branch</label>
            <input
              type="text"
              id="register-branch"
              name="branch"
              placeholder="Enter your Branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="register-username">Username</label>
            <input
              type="text"
              id="register-username"
              name="username"
              placeholder="Enter your Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="register-password">Password</label>
            <input
              type="password"
              id="register-password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Register</button>
          </form>
          <button className="toggle-button" onClick={toggleForm}>{currentFormState}</button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
