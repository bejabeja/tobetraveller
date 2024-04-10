import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Discover from './pages/Discover';
import City from './pages/City';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Layout from './layout/Layout';

import CreateTrip from './pages/trip/CreateTrip';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
      {/* <Route path="/discover/:cityName/:id" element={<ProtectedRoute><Place /></ProtectedRoute>} /> */}
      <Route path="/discover/:id" element={<City />} />

      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/trip/create/:placeToGo/:travelDays" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />


      {/* <Route path="/profile" element={<Layout><Profile /></Layout>} /> */}
      {/* <Route path="/trip/create/:placeToGo/:travelDays" element={<Layout><CreateTrip /> </Layout>} /> */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};

export default App;