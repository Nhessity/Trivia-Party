import { useEffect, useState } from "react"
import { Button, Modal, ModalBody } from "react-bootstrap"

function AnswerFeedback({show, correctAnswer, selectedAnswer, handleContinue}:any){

    const [feedback, setFeedback] = useState<any>()
    const [score, setScore] = useState<number>(0)

    useEffect(
        function onLoadCheckAnswer(){
            checkAnswer()
        }, [selectedAnswer?.questionNumber]
    )

    const handleBackToQuiz = () => {
        //pass score calculation and move onto next question
        // props.handleContinue(props.selectedAnswer?.questionNumber)
        handleContinue(selectedAnswer.questionNumber, score)
    }

    const checkAnswer = () => {
        // console.log(correctAnswer?.name)
        // console.log(selectedAnswer?.trackName)
        if (correctAnswer?.name === selectedAnswer?.trackName && selectedAnswer?.questionNumber > 0){
            // console.log(correctAnswer?.name)
            // console.log(selectedAnswer?.trackName)
            setFeedback({
                title: 'Correct',
                description: 'You\'re right on the money! This song is the more popular track.',
                songName: correctAnswer?.name,
                artist: correctAnswer?.artists[0].name
            })
            setScore(score+100)
        }else{
            setFeedback({
                title: 'Incorrect',
                description: 'The more popular track is...',
                songName: correctAnswer?.name,
                artist: correctAnswer?.artists[0].name
            })
        }
    }
    
    return <>
        <Modal show={show} onHide={handleBackToQuiz}>
            <ModalBody>
                <p style={{fontSize:48}}>{feedback?.title}</p>  
                <p style={{fontSize:24}}>{feedback?.description}</p>

                <div>
                    <p style={{fontSize:24, fontWeight:700}}>{feedback?.songName}</p>
                    <p style={{fontSize:24, fontWeight:400}}>{feedback?.artist}</p>
                    <p style={{fontSize:24, fontWeight:400}}>Added on 2022 - 07 - 12</p>
                </div>

                <div>
                    Score: {score}
                </div>
                <div>
                    <Button onClick={handleBackToQuiz}>CONTINUE</Button>
                </div>
            </ModalBody>
        </Modal>
    </>
}

export default AnswerFeedback