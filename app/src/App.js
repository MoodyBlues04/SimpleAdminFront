import './style/App.css';
import React, { useState } from 'react';
import User from './classes/User';
import { Route, Routes, Navigate } from 'react-router';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import Event from './components/Event';
import useLocalStorage from './CustomHooks/useLocalStorage';
import Authorize from './components/Authorize';

function App() {
  // let [jwt, setJwt] = useLocalStorage(null);
  let [jwt, setJwt] = useState(null);
  if(!jwt) {
    return <Authorize setJwt={setJwt} />
  }

  return (
    <div className='App'>
      <Header/>
      <div className='Container'>
        <NavBar/>
        <div className='Content'>
          <Routes>
            <Route path='/' element={<Home/>}>
            </Route>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/event' element={<Event/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
