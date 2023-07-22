import { useState, useEffect } from "react";
import { RefreshAuth } from "./RefreshAuth";

function UserProfileComponent(){

    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        // getProfile().then(data => setUserInfo(data))
        getProfile()
    }, [])

    async function getProfile(){
        let accessToken = localStorage.getItem('access_token');
    
        await fetch('https://api.spotify.com/v1/me', {
            headers: {
            Authorization: 'Bearer ' + accessToken
            }
        }).then(async response => {
            if(response.status === 401){
                RefreshAuth(localStorage.getItem('refresh_token'))
            }
            if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
            }
            setUserInfo(await response.json())
            return response.json();
        }).catch(error => {
            console.log('1', error)
            console.log(error.message)
            if(error.status === 401){
                RefreshAuth(localStorage.getItem('refresh_token'))
            }
        });
    
    //   const data = await response.json();
    //   console.log(data['email'])
    //   return data
    }
    
    return <>
        {userInfo ? ( <div><h1>Hello, {userInfo['display_name']}</h1>
            <h1>email: {userInfo['email']}</h1></div>
            ):
            (<h1>PLEASE LOGIN</h1>)
        }
    </>
}

// async function getProfile(){
//     let accessToken = localStorage.getItem('access_token');

//     const response = await fetch('https://api.spotify.com/v1/me', {
//         headers: {
//         Authorization: 'Bearer ' + accessToken
//         }
//     }).then(response => {
//         if (!response.ok) {
//         throw new Error('HTTP status ' + response.status);
//         }
//         return response.json();
//     }).catch(error => {
//         console.log(error)
//         if(error.status === 401){
//             RefreshAuth(localStorage.getItem('refresh_token'))
//         }
//     });

//   const data = await response.json();
//   console.log(data['email'])
//   return data
// }
export default UserProfileComponent