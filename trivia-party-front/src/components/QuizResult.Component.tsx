import { useLocation } from "react-router-dom"

function QuizResultComponent(){

    const {state} = useLocation()
    
    return<>
        Thank you for playing!
        Final Score: {state}/10
    </>
}

export default QuizResultComponent