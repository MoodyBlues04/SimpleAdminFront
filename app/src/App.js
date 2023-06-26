import './style/App.css';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import Event from './components/Event';
import useLocalStorage from './CustomHooks/useLocalStorage';
import Authorize from './components/Authorize';
import EventCreate from './components/EventCreate';

function App() { // TODO context
  // localStorage.clear();
  const [jwt, setJwt] = useLocalStorage('jwt');
  const [credentials, setCredentials] = useLocalStorage('credentials');
  let props = {
    jwt: jwt,
    setJwt: setJwt,
    credentials: credentials,
    setCredentials: setCredentials
  };

  if (!jwt || !credentials) {
    return <Authorize {...props} />
  }

  return (
    <div className='App'>
      <Header {...props}/> {/* TODO пароль то не надо) */}
      <div className='Container'>
        <div className='row' style={{width: "100%"}}>
          <NavBar jwt={jwt}/>
          <div className='col-9' style={{display: "flex", justifyContent: "center"}}>
            <Routes>
              <Route path='/event/create' element={<EventCreate {...props}/>}/>
              <Route path='/event/:id' element={<Event {...props}/>}/>
              <Route path='/profile' element={<Profile {...props}/>}/>
              <Route path='/' element={<Home/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
