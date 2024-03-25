import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Place from './pages/Place';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<ProtectedRoute />}  >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discover/:name" element={<Place />} />
        <Route path="/discover" element={<Discover />} />
      </Route>
    </Routes>
  );
};

export default App;