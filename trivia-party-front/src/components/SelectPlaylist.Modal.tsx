import axios from "axios"
import { useEffect, useState } from "react"
import { ListGroup, Modal } from "react-bootstrap"
import { RefreshAuth } from "./RefreshAuth"
import { useNavigate } from "react-router-dom"

function SelectPlaylist(props:any){
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const [userPlaylists, setUserPlaylists] = useState<any>()
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>()

    useEffect(
        function getUserPlaylistsAfterLoading(){
            getUserPlaylists()
        }, []
    )

    const getUserPlaylists = async () => {
        let accessToken = localStorage.getItem('access_token')
        await axios.get('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: {
                Authorization: "Bearer " + accessToken
            } 
        }).then(response => {
            setUserPlaylists(response.data.items)
        }).catch(err => {
            if (err.response.status === 401){
                RefreshAuth(localStorage.getItem('refresh_token'))
            }
        })
    }

    const handleSelectedPlaylist = (playlistId:string, playlistName:string) => {
        setSelectedPlaylist({playlistId,playlistName})
    }

    let navigate = useNavigate()
    
    useEffect(
        function goConfirmPlaylist(){
            if(selectedPlaylist){
                navigate("/quizsetup", {state: selectedPlaylist})
            }
        }, [selectedPlaylist]
    )

    const renderPlaylists = () => {
        return userPlaylists?.map((playlist: any) => {
            return <ListGroup.Item onClick={() => handleSelectedPlaylist(playlist.id, playlist.name)} >
                    <b style={{fontSize:32}}>{playlist.name}{"\n"}</b>
                    <p style={{fontSize:32}}>{playlist.tracks.total} tracks</p>
                </ListGroup.Item>
        })
    }

    return <>
        <Modal show={props.show} onHide={props.selectPlaylist} scrollable size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Select Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>{renderPlaylists()}</ListGroup>
            </Modal.Body>
        </Modal>
    </>
}

export default SelectPlaylist