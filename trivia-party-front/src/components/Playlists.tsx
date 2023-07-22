import { useEffect, useState } from "react"
import axios from "axios"
import QuizGameComponent from "./QuizGame.Component"
import { RefreshAuth } from "./RefreshAuth"

// interface Playlists{
//     item: object
// }

// type Props = {
//     playlistId? : string
//     playlistSelection? :(newType : string) => void
// }

function Playlists(){
    const [playlistId, setPlaylistId] = useState<string>()
    const changePlaylistId = (playlistId : string) => {
        setPlaylistId(playlistId)
    }
    // const onSelectPlaylist = (playlistId: string) => {
    //     //playlistCallback(playlistId);
    //     playlistId = this.playlistId
    // }

    // const [userPlaylists, setUserPlaylists] = useState()

    // useEffect(() => {
    //     getPlaylists().then(response => setUserPlaylists(response.data))
    // }, [])

    // if (!userPlaylists) return null;

    // let playlist : any
    // const userPlaylists = getPlaylists();
    // userPlaylists
    //const entries = Object.entries(userPlaylists);

    // const [userPlaylists, setUserPlaylists] = useState<any>()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             const { data } = await getPlaylists()
    //             setUserPlaylists(data)
    //         }catch(e){
    //             console.error(e)
    //         }
    //     }

    //     fetchData()
    // }, [])

    const [userPlaylists, setUserPlaylists] = useState<any>()
    const getUserPlaylists = async () => {
        console.log('pinging2')
        let accessToken = localStorage.getItem('access_token')
        await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: "Bearer " + accessToken,
                // "Content-Type": "application/json"
            } 
        }).then(response =>{
            setUserPlaylists(response.data.items)
        }).catch(err => {
            if(err.response.status === 401){
                console.log('attempting to refresh 2')
                RefreshAuth(localStorage.getItem('refresh_token'))
                //TODO: re-render page after refresh
            }
        })


        // console.log(data.items)
        // setUserPlaylists(data.items)
    }

    useEffect(
        function getUserPlaylistsAfterLoading () {
            getUserPlaylists()
        }, []
    )

    // const getPlaylistSonglist = async (playlistId: string) => {
    //     console.log('getting songlist from ' + playlistId)
    //     // TODO: fetch songlist using playlistId
    //     let accessToken = localStorage.getItem('access_token')
    //     const {data} = await axios.get('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
    //         headers: {
    //             Authorization: "Bearer " + accessToken,
    //         }
    //     })
    //     console.log(data.items)

    //     data.items.map((track: any) => {
    //         console.log(track.track.name)
    //     })
    // }

    // getUserPlaylists()
    const renderPlaylists = () => {
        console.log('pinging')
        // return userPlaylists.array.forEach((playlist: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) => {
        //     <li>{playlist['name']}</li>
        // });
        // for(let playlist of userPlaylists){
        //     // <li>{playlist['name']}</li>
        //     this.playlistName
        // }
        return userPlaylists?.map((playlist: any) =>{
            //return <li onClick={() => getPlaylistSonglist(playlist.id)} key={playlist.id}>{playlist.name}</li>
            return <li onClick={() => changePlaylistId(playlist.id)} key={playlist.id}>{playlist.name}</li>
        })
    }

    // const renderPlaylists = () => {
    //     return userPlaylists.map((playlist: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) => (
    //         <li>{playlist.name}</li>
    //     ))
    // }



    return <>
        <h1>User Playlists</h1>
        {/* {userPlaylists ? (userPlaylists.item)} */}
        {/* {userPlaylists ? userPlaylists.map()} */}
        {/* {for (let playlist of userPlaylists){
            <ul>
                <li>{playlist['name']}</li>
            </ul>
        }} */}
        <ul>
            {renderPlaylists()}
        </ul>
        {playlistId ? <QuizGameComponent data={playlistId}/>
            : <>No Playlist selected</>}
    </>
}

async function getPlaylists(){
    let accessToken = localStorage.getItem('access_token')

    // const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    //     headers: {
    //         Authorization: 'Bearer' + accessToken
    //     }
    // })
    // return await response.json()

    /*
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: "Bearer " + accessToken,
            // "Content-Type": "application/json"
        }
    }).then((res) => {
        //console.log(res.data.items)
        //console.log(res.data + 'he')
        // for(const [key, value] of Object.entries(res.data.items)){
        //     console.log(`${key}: ${}`)
        // }
        let userPlaylists = Object.values(res.data.items)
        console.log(userPlaylists)
        for(let playlist of userPlaylists){
            console.log(playlist['name'])
        }
        // for (let p of userPlaylists){
        //     console.log(p['name'])
        // }
        return res.data
    }).catch(e => {
        //console.log(e)
    })
    */
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: "Bearer " + accessToken,
            // "Content-Type": "application/json"
        } 
    }).then(res => {
        const playlistNames = res.data.items
        //this.setState({playlistNames})
        for(let playlist of playlistNames){
            console.log(playlist['name'])
        }
        
        return playlistNames
    })
    
 

    //console.log(accessToken)
    //return response;
}



export default Playlists