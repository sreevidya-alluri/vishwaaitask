import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing token when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from storage
    setIsLoggedIn(false); // Update login state
  };

  return (
    <div>
      {isLoggedIn ? (
        <Home onLogout={handleLogout} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default App;