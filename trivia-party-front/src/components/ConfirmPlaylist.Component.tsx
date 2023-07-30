import { Button } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"

function ConfirmPlaylist(){
    
    const {state} = useLocation()
    let navigate = useNavigate()

    const handleStartQuiz = (playlistId:string) => {
        navigate('/quiz', {state: playlistId})
    }

    const handleBackButton = () => {
        navigate('/home')
    }
    
    return <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1>Playlist:</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1>{state.playlistName}</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="dark" onClick={handleBackButton}>Back</Button>
            <Button variant="primary" onClick={() => handleStartQuiz(state.playlistId)}>Start Quiz</Button>
        </div>
    </>
}

export default ConfirmPlaylist