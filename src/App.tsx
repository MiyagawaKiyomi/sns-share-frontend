import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import EditForm from './components/EditForm';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={!isAuthenticated ? <Auth /> : <Navigate to="/profile" />} />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" />}
        />
        <Route 
          path="/edit" 
          element={isAuthenticated ? <EditForm /> : <Navigate to="/auth" />}
        />
        <Route path="/" element={<Navigate to="/profile" />} />
      </Routes>
    </Router>
  );
};

export default App;