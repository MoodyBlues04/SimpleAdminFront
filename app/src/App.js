import './style/App.css';
import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import Event from './components/Event';
import useLocalStorage from './CustomHooks/useLocalStorage';
import Authorize from './components/Authorize';
import EventCreate from './components/EventCreate';
import Refresh from './components/Refresh';

function App() {
    let props = getProps();

    if (!props.credentials) {
        return <Authorize {...props} />
    }

    if (!props.jwt) {
        return <Refresh {...props}/>
    }

    return (
        <div className='App'>
            <Header {...props}/>
            <div className='Container'>
                <div className='row' style={{width: "100%"}}>
                    <NavBar jwt={props.jwt}/>
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

function getProps() {
    const [jwt, setJwt] = useLocalStorage('jwt', null);
    const [credentials, setCredentials] = useLocalStorage('credentials', null);
    return {
        jwt: jwt,
        setJwt: setJwt,
        credentials: credentials,
        setCredentials: setCredentials
    };
}

export default App;
