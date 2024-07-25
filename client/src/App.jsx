import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Discover from './pages/Discover';
import City from './pages/City';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import PrivateProfile from './pages/PrivateProfile';
import Layout from './layout/Layout';
import CreatedTravelPreview from './components/privateProfile/CreatedTravelPreview';
import CreateTravel from './pages/trip/CreateTravel';
import UserFavs from './components/privateProfile/UserFavs';
import UserTravels from './components/privateProfile/UserTravels';


const App = () => {
  return (

    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:id" element={<City />} />
        <Route path="/private-profile" element={<ProtectedRoute><PrivateProfile /></ProtectedRoute>} />
        <Route path='/private-profile/created-travel/:id' element={<ProtectedRoute><CreatedTravelPreview /></ProtectedRoute>} />
        <Route path="/trip/create" element={<ProtectedRoute><CreateTravel /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><UserFavs /></ProtectedRoute>} />
        <Route path="/my-travels" element={<ProtectedRoute><UserTravels /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Layout>
    //   {/* <Route path="/trip/create/:placeToGo/:travelDays" element={<ProtectedRoute><CreateTravel /></ProtectedRoute>} /> */}
    //   {/* <Route path="/private-profile" element={<Layout><PrivateProfile /></Layout>} /> */}
    //   {/* <Route path="/trip/create/:placeToGo/:travelDays" element={<Layout><CreateTravel /> </Layout>} /> */}

  );
};

export default App;