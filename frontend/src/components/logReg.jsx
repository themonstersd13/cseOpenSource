import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../css/log&reg.css';

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
    sessionStorage.setItem('currentUser', JSON.stringify(data));
  };

  const handleLoginFailure = () => {
    sessionStorage.setItem('currentUser', '0');
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-indigo-500 via-purple-600 to-pink-500">
      <div className="w-96 p-8 bg-blue-100 border-2 border-blue-300 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="register-name">Name</label>
              <input
                type="text"
                id="register-name"
                name="name"
                placeholder="Enter your Name"
                className="w-full px-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400 mb-4"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="register-prn">PRN</label>
              <input
                type="text"
                id="register-prn"
                name="prn"
                placeholder="Enter your PRN"
                className="w-full px-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400 mb-4"
                value={formData.prn}
                onChange={handleInputChange}
                required
              />
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="register-branch">Branch</label>
              <input
                type="text"
                id="register-branch"
                name="branch"
                placeholder="Enter your Branch"
                className="w-full px-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400 mb-4"
                value={formData.branch}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your Username"
            className="w-full px-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400 mb-4"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            className="w-full px-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400 mb-6"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          className="mt-4 w-full py-2 px-4 border border-pink-600 text-pink-600 font-medium rounded-lg hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          onClick={toggleForm}
        >
          {currentFormState}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
