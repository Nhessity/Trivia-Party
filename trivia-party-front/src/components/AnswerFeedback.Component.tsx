import { useEffect, useState } from "react"
import { Button, Modal, ModalBody } from "react-bootstrap"

function AnswerFeedback({show, questionSet, selectedAnswer, handleContinue}:any){

    const [feedback, setFeedback] = useState<any>()
    const [score, setScore] = useState<number>(0)

    useEffect(
        function onLoadCheckAnswer(){
            if(selectedAnswer !== null){
                checkAnswer()
            }
        }, [selectedAnswer]
    )

    const handleBackToQuiz = () => {
        handleContinue(questionSet.questionNumber, score)
    }

    const checkAnswer = () => {
        //console.log('checking selected answer value: ' + selectedAnswer)
        if(selectedAnswer){
            setFeedback({
                title: 'Correct',
                description: 'You\'re right on the money! This song is the more popular track.',
                songName: questionSet?.answer.name,
                artist: questionSet?.answer.artists[0].name,
                backgroundColor: '#0094FF',
                releaseDate: questionSet?.answer.album.release_date
            })
            setScore(score+100)
        }else{
            setFeedback({
                title: 'Incorrect',
                description: 'The more popular track is...',
                songName: questionSet?.answer.name,
                artist: questionSet?.answer.artists[0].name,
                backgroundColor: '#DD6C49',
                releaseDate: questionSet?.answer.album.release_date
            })
        }
    }
    
    return <>
        <Modal show={show} onHide={handleBackToQuiz} size="lg">
            <ModalBody style={{backgroundColor: feedback?.backgroundColor}}>
                    <p style={{fontSize:48, color: '#FFFFFF', paddingLeft: 41}}>{feedback?.title}</p>  
                    <p style={{fontSize:24, color: '#FFFFFF', paddingLeft: 41}}>{feedback?.description}</p>
                    <div className="d-flex">
                        <div style={{paddingLeft: 41}}>
                            <img src={questionSet?.answer.album.images[1].url}></img>
                        </div>
                        <div className="d-flex flex-column justify-content-between" style={{paddingLeft: 48}}>
                            <p style={{fontSize:24, fontWeight:700, color: '#FFFFFF'}}>{feedback?.songName}</p>
                            <p style={{fontSize:24, fontWeight:400, color: '#FFFFFF'}}>{feedback?.artist}</p>
                            <p style={{fontSize:24, fontWeight:400, color: '#FFFFFF'}}>Released: {feedback?.releaseDate}</p>
                        </div>
                    </div>
                        <div className="d-flex justify-content-center pt-4">
                            <p style={{fontSize:24, fontWeight:400, color: '#FFFFFF'}}>Score: {score}</p>
                        </div>
                    <div className="d-flex justify-content-center pb-3">
                        <Button variant="light" size="lg" onClick={handleBackToQuiz}><text style={{fontSize: 32, fontWeight: 700, color: feedback?.backgroundColor, paddingLeft: 48, paddingRight: 48, paddingTop: 24, paddingBottom: 24}}>CONTINUE</text></Button>
                    </div>
            </ModalBody>
        </Modal>
    </>
}

export default AnswerFeedback