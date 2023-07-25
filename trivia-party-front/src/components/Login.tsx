import { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login(){

    return <>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={getSpotifyUserLogin} variant="primary" size='lg'>LOGIN WITH SPOTIFY</Button>
                </div>

    </>
}

function generateRandomString(length: number){
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible . length))
    }
    return text
}

async function generateCodeChallenge(codeVerifier: string){
    function base64encode(string: Uint8Array){
        return btoa(String.fromCharCode.apply(null, Array.from(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
            
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)

    return base64encode(new Uint8Array(digest))
}

function getSpotifyUserLogin(){

    const CLIENT_ID = "ae5f44b004754463ae3db48891687fa3"
    const REDIRECT_URI = "http://localhost:3000/callback"

    let codeVerifier = generateRandomString(128)

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
        let state = generateRandomString(16)
        let scope = 'user-read-private user-read-email user-top-read playlist-read-private'

        localStorage.setItem('code_verifier', codeVerifier)

        let args = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
        })

        window.location.href = 'https://accounts.spotify.com/authorize?' + args;
        
    })

    

}

function logOut(){
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("access_token")
    localStorage.removeItem("code_verifier")
    
}

export default Login;