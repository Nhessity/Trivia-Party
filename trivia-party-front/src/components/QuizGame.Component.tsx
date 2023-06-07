import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import Playlists from "./Playlists";
import axios from "axios";

function QuizGameComponent(props: any){
    // const [quizPlaylist, setQuizPlaylist] = useState({data:""});

    // const handleSelectPlaylistCallback = (selectedPlaylistId : string) => {
    //     setQuizPlaylist({data})
    // }

    const [quizPlaylist, setQuizPlaylist] = useState()

    useEffect(
        function getPlaylistSonglistAfterLoading () {
            getPlaylistSonglist(props.data)
        }, [props.data]
    )

    const getPlaylistSonglist = async (playlistId: string) => {
        console.log('getting songlist from ' + playlistId)
        // TODO: fetch songlist using playlistId
        let accessToken = localStorage.getItem('access_token')
        const {data} = await axios.get('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
            headers: {
                Authorization: "Bearer " + accessToken,
            }
        })
        // console.log(data.items)

        // data.items.map((track: any) => {
        //     console.log(track.track.name)
        // })
        
        // console.log(data.items[5].track.name)
        // map track data into an arraylist
        // data.items.map((track: any) => {
        //     //console.log(track.track.name )
        // })
        setQuizPlaylist(data.items)
    }

    // todo: question bank and getting
    // const questionType = [{"type": 0, "str": "Which track is currently more popular?", "func": getAnswer(trackId1 : string, trackId2 : string){}},
    //     {1: Number, "Which track was released earlier?": String, getAnswer(trackId1 : string, trackId2 : string){}}]

    // var getAnswer:{() : any;}

    return <>
        <p>{props.data}</p>
        <div>
            <Container>
                {/* <Row>
                    <h1 className="text-center">{questionType[0]}</h1>
                </Row> */}
                <Row className="justify-content-center">
                    <Col>
                        <h1 className="text-center">SONG 1</h1>
                        <div className="d-flex justify-content-center">
                            <img src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" className=""></img>
                        </div>
                    </Col>
                    <Col>
                        <h1 className="text-center">SONG 2</h1>
                        <div className="d-flex justify-content-center">
                            <img src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" className=""></img>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div> 
        {/* : <Playlists playlistCallback={handleSelectPlaylistCallback} />} */}
    </>
}

export default QuizGameComponent