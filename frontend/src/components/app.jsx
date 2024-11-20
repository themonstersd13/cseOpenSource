import React from 'react';
import Home from './Home';
import Bubbles from './particle';

function App() {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-700 min-h-screen flex items-center justify-center">
      <Bubbles />
      <Home />
    </div>
  );
}

export default App;
