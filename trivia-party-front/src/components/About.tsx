import { useEffect, useState } from "react";

// interface UserProfile{
//     // display_name: string,
//     email: string
// }

function About(){
    // return <h1>About Page</h1>
    
    // const [userProfile, setUserProfile] = useState<String>();

    // useEffect(() => {
    //     fetch("http://localhost:8080/api/get-current-profile")
    //     .then(response => response.text())
    //     .then(data => {
    //         console.log(data)
    //         setUserProfile(data)
    //     })
    // },  []);

    // return (
    //     <div>
    //         {userProfile ? (
    //             <h1>Welcome {userProfile}</h1>
    //         ):
    //         (<h1>No USER... PLEASE LOGIN</h1>)}
    //     </div>
    // )

    //test code to see if accesstoken works
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

export default About;