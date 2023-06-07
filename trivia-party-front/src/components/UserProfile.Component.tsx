import { useState, useEffect } from "react";

function UserProfileComponent(){

    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        getProfile().then(data => setUserInfo(data))
    }, [])
    
    return <>
        {userInfo ? ( <div><h1>Hello, {userInfo['display_name']}</h1>
            <h1>email: {userInfo['email']}</h1></div>
            ):
            (<h1>PLEASE LOGIN</h1>)
        }
    </>
}

async function getProfile(){
    let accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
        Authorization: 'Bearer ' + accessToken
        }
    });

  const data = await response.json();
  console.log(data['email'])
  return data
}
export default UserProfileComponent