import axios from "axios"

// const RefreshAuth = async function(){
//     const CLIENT_ID = "ae5f44b004754463ae3db48891687fa3"

//     try{
//         const refreshToken = localStorage.getItem('refresh_token')
//         const form = new FormData()
//         form.append('grant_type', 'refresh_token')
//         form.append('refresh_token', refreshToken)
//         form.append('client_id', CLIENT_ID)

//         await axios.post('https://accounts.spotify.com/api/token', {
//         form,
//         headers : {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       }).then(function (response){
//         console.log('1',response)
//         localStorage.setItem('access_token', response.data.access_token)
//         localStorage.setItem('refresh_token', response.data.refresh_token)
//       }).catch(function (error){
//         console.log('2',error)
//       })
//     }catch(error) {
//       console.log('3',error)
//     }
//   }

export const RefreshAuth = async (refreshToken:any) => {
    const CLIENT_ID = "ae5f44b004754463ae3db48891687fa3"

    try{
        const form = new FormData()
        form.append('grant_type', 'refresh_token')
        form.append('refresh_token', refreshToken)
        form.append('client_id', CLIENT_ID)

        await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        }, {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }).then((response) => {
        console.log('1',response)
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('refresh_token', response.data.refresh_token)
      }).catch((error) => {
        console.log('2',error)
      })
    }catch(error) {
      console.log('3',error)
    }
}