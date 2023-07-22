import { useEffect, useState } from "react"

function Callback(){
    const [accessToken, setAccessToken] = useState<any>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        // let code = JSON.parse(urlParams.get('code')!)
        let code = urlParams.get('code')!
        // console.log(code)
        
        let codeVerifier = localStorage.getItem('code_verifier')!
        
        const CLIENT_ID = "ae5f44b004754463ae3db48891687fa3"
        const REDIRECT_URI = "http://localhost:3000/callback"
    
        let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            code_verifier: codeVerifier
        });
    
        fetch('https://accounts.spotify.com/api/token', {
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
            localStorage.setItem('refresh_token', data.refresh_token)
            console.log(data)
            console.log(data.access_token)
            console.log(data.refresh_token)
            setAccessToken(data.access_token)
        })
        .catch(error => {
            console.error('Error:', error);
            //refreshAccessToken(localStorage.getItem('refresh_token'))
        });
    
        
      }, [])

      // redirects to home page after getting access token
      useEffect(() => {
        if(accessToken) window.location.href = "http://localhost:3000/"
      },[accessToken])
    return <>
    </>
}

export default Callback