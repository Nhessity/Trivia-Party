import { Button, ButtonToolbar, Col, Container, Row } from "react-bootstrap"
import Login from "./Login"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import SelectPlaylist from "./SelectPlaylist.Modal"

function HomeComponent(){
    const [showState, setShowState] = useState(false)
    const selectPlaylistHandler = () => {
        setShowState((showState) => showState = !showState)
    }

    return (<>
        <Container>
            <Row className="justify-content-md-center my-5">
                <Col className="justify-content-center">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <h1>Think trivia, but with <u style={{textDecorationColor:'#0d6efd', textDecorationSkipInk: 'none', }}>your playlists</u>.</h1>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', whiteSpace: 'pre-wrap'}}>
                        <h6>Play, score, and brag about your melodic IQ!{"\n"}
                        Do you really know your music?</h6>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    {localStorage.getItem("access_token") ? (<Button variant='primary' size='lg' onClick={selectPlaylistHandler}>Play Quiz</Button>) : <Login />}
                    </div>
                    {/* temp code to test modal */}
                    {/* <div>
                        <Button onClick={selectPlaylistHandler}>Select Playlist</Button>
                    </div> */}
                </Col>
            </Row>      
            
            <Row className='my-5'>
                {/* TODO: Make icons responsive */}
                <h2>How to play</h2>
                <hr />
                <Col>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#0d6efd" className="bi bi-spotify my-1" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
                    </svg>
                    <h3>Log in with Spotify</h3>
                    <p>Log in directly and securely from Spotify.com. Don't worry, we don't store any of your private data.</p>
                </Col>
                <Col>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#0d6efd" className="bi bi-music-note-list my-1" viewBox="0 0 16 16">
                    <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                    <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                    <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                    <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                </svg>
                    <h3>Select your playlist</h3>
                    <p>Choose the playlist you would like to play a game of trivia about! We'll generate several questions about your favotite tunes.</p>
                </Col>
                <Col>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#0d6efd" className="bi bi-play-circle-fill my-1" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                </svg>
                    <h3>Get ready to play!</h3>
                    <p>Challenge yourself and your melodic IQ! How well do you know your music?</p>
                </Col>
            </Row>
        </Container>
        
        {/* render modal when opened */}
        <SelectPlaylist show={showState} selectPlaylist={selectPlaylistHandler} />
    </>)
}
export default HomeComponent