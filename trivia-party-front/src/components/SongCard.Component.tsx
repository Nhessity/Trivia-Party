import { useEffect, useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import { Col, Row } from "react-bootstrap"


interface QuestionSet {
    questionNumber : any
    questionStr : string
    track1 : any
    track2 : any
    answer : any
}

function SongCardComponent({questionSet, handleAnswer}:any ){

    // const [questionSet2, setQuestionSet2] = useState()
    // useEffect(()=>{
    //     setQuestionSet(questionSet)
    // }, [])

    const handleSongSelect = (trackName:string, questionNumber:number) => {
    console.log(trackName, 'has been selected')
    // questionSet = null
    handleAnswer(trackName, questionNumber)
    }

    return <>
    
        <Row className="justify-content-center">
            <Col>
                <h1 className="text-center">{questionSet?.track1.name}</h1>
                <div className="d-flex justify-content-center">
                    <button>
                    <img onClick={() => handleSongSelect(questionSet?.track1.name, questionSet?.questionNumber)} src={questionSet?.track1.album.images[1].url} className=""></img>
                    </button>
                </div>
                <div className="d-flex justify-content-center">
                    <ReactAudioPlayer src={questionSet?.track1.preview_url} controls volume={0.25} key={questionSet?.questionNumber} />
                </div>
            </Col>

            <Col>
                <h1 className="text-center">{questionSet?.track2.name}</h1>
                <div className="d-flex justify-content-center">
                    <button>
                    <img onClick={() => handleSongSelect(questionSet?.track2.name, questionSet?.questionNumber)} src={questionSet?.track2.album.images[1].url} className=""></img>
                    </button>
                </div>
                <div className="d-flex justify-content-center">
                    <ReactAudioPlayer src={questionSet?.track2.preview_url} controls volume={0.25} key={questionSet?.questionNumber} />
                </div>
            </Col>
        </Row>
    </>
}

export default SongCardComponent