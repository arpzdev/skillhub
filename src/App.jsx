import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import Dashboard from './views/Dashboard/Dashboard';
import CreateBusinessProfile from './views/CreateBusinessProfile/CreateBusinessProfile';
import Feed from './views/Feed/Feed';


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/create-business-profile' element={<CreateBusinessProfile/>} />
      <Route path='/feed' element={<Feed/>} />
   
    </Routes>
    
    </>
  );
}

export default App;
