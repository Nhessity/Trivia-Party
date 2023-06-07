import { ButtonToolbar } from "react-bootstrap"
import Login from "./Login"

function HomeComponent(){
    return (<>
        {localStorage.getItem("access_token") ? (<button>Play Quiz</button>) : <Login />}
    </>)
}

export default HomeComponent