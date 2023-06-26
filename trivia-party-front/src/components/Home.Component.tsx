import { ButtonToolbar } from "react-bootstrap"
import Login from "./Login"
import { useNavigate } from "react-router-dom"

function HomeComponent(){
    return (<>
        {localStorage.getItem("access_token") ? (<button onClick={(e) => {
            e.preventDefault();
            window.location.href='http://localhost:3000/playlists'}}>Play Quiz</button>) : <Login />}
    </>)
}
export default HomeComponent