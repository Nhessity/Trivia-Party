import { Col, Row } from "react-bootstrap"


interface QuestionSet {
    questionNumber : any
    questionStr : string
    track1 : any
    track2 : any
    answer : any
}

function SongCardComponent({questionSet, handleAnswer}:any ){
    const handleSongSelect = (trackName:string, questionNumber:number) => {
    console.log(trackName, 'has been selected')
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
            </Col>

            <Col>
                <h1 className="text-center">{questionSet?.track2.name}</h1>
                <div className="d-flex justify-content-center">
                    <button>
                    <img onClick={() => handleSongSelect(questionSet?.track2.name, questionSet?.questionNumber)} src={questionSet?.track2.album.images[1].url} className=""></img>
                    </button>
                </div>
            </Col>
        </Row>
    </>
}

export default SongCardComponent