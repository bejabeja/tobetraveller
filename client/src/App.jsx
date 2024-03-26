import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Discover from './pages/Discover';
import Place from './pages/Place';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Profile from './pages/Profile';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/discover/:name" element={<ProtectedRoute><Place /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};

export default App;