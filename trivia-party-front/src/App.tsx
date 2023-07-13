import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.css';
import TopArtists from './components/TopArtists';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import NavbarComponent from './components/Navbar.Component';
import Playlists from './components/Playlists';
import HomeComponent from './components/Home.Component';
import QuizGameComponent from './components/QuizGame.Component';
import QuizResultComponent from './components/QuizResult.Component';

function App() {
  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    // let code = JSON.parse(urlParams.get('code')!)
    let code = urlParams.get('code')!
    // console.log(code)
    
    let codeVerifier = localStorage.getItem('code_verifier')!
    
    const CLIENT_ID = "ae5f44b004754463ae3db48891687fa3"
    const REDIRECT_URI = "http://localhost:3000"

    let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier
    });

    const response = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('access_token', data.access_token);
        setAccessToken(data.access_token)
    })
    .catch(error => {
        console.error('Error:', error);
    });

  }, [accessToken])

  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/topartists" element={<TopArtists />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/quiz" element={<QuizGameComponent />} /> 
        <Route path="/result" element={<QuizResultComponent />} />
      </Routes>
    </>

  );
}

export default App;
