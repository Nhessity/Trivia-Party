import { useEffect, useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import { Button, Col, Container, Row } from "react-bootstrap"


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

    const [selectSong, setSelectSong] = useState()
    // var state = {
    //     color: 'white' 
    // }
    const [selectCard, setSelectCard] = useState([{color:'white'}, {color:'white'}])
    const [selectAnswer, setSelectAnswer] = useState()

    const onSong1Click = (e:any) => {
        setSelectCard([{color:'#B0DAFA'}, {color:'white'}])
        setSelectAnswer(questionSet?.track1.name)
    }

    const onSong2Click = () => {
        setSelectCard([{color:'white'}, {color:'#B0DAFA'}])
        setSelectAnswer(questionSet?.track2.name)
    }
    
    useEffect(
        function onLoadResetQuestion(){
            setSelectCard([{color:'white'}, {color:'white'}])
            setSelectAnswer(undefined)
        },[questionSet]
    )

    const getAllArtistsInSong = (artists : Array<any>) => {
        let artistNameArray = artists.map(artist => artist.name)
        let str = artistNameArray.join(', ')
        return str
    }

    const handleSongSelect = (trackName:string, questionNumber:number) => {
    console.log(trackName, 'has been selected')
    // questionSet = null
    handleAnswer(trackName, questionNumber)
    }

    return <>
        <Container>
        <Row className="justify-content-center">
            <Col>
                    <div className="d-flex" onClick={onSong1Click} style={{backgroundColor: selectCard![0].color}}>
                        <div className="">
                            
                                <img src={questionSet?.track1.album.images[1].url} className=""></img>
                            
                        </div>
                        <div className="d-flex flex-column justify-content-between" style={{height: 316, paddingLeft: 5}}>
                                <p className="text-left" style={{fontSize: 24, fontWeight: 700}}>{questionSet?.track1.name}</p>
                                <p className="text-left" style={{fontSize: 24, fontWeight: 400}}>{getAllArtistsInSong(questionSet?.track1.artists)}</p> 
                                <ReactAudioPlayer src={questionSet?.track1.preview_url} controls volume={0.25} key={questionSet?.questionNumber} />
                        </div>
                    </div>
            </Col>

            <Col>
                    <div className="d-flex" onClick={onSong2Click} style={{backgroundColor: selectCard![1].color}}>
                        <div className="">
                            
                                <img src={questionSet?.track2.album.images[1].url} className=""></img>
                            
                        </div>
                        <div className="d-flex flex-column justify-content-between" style={{height: 316, paddingLeft: 5}}>
                                <p className="text-left" style={{fontSize: 24, fontWeight: 700}}>{questionSet?.track2.name}</p>
                                <p className="text-left" style={{fontSize: 24, fontWeight: 400}}>{getAllArtistsInSong(questionSet?.track2.artists)}</p> 
                                <ReactAudioPlayer src={questionSet?.track2.preview_url} controls volume={0.25} key={questionSet?.questionNumber} />
                        </div>
                    </div>
            </Col>

            {/* <Col>
                <h1 className="text-center">{questionSet?.track2.name}</h1>
                <div className="d-flex justify-content-center">
                    <button>
                    <img onClick={() => handleSongSelect(questionSet?.track2.name, questionSet?.questionNumber)} src={questionSet?.track2.album.images[1].url} className=""></img>
                    </button>
                </div>
                <div className="d-flex justify-content-center">
                    <ReactAudioPlayer src={questionSet?.track2.preview_url} controls volume={0.25} key={questionSet?.questionNumber} />
                </div>
            </Col> */}
        </Row>
        <Row>
            <Button onClick={() => handleSongSelect(selectAnswer!, questionSet?.questionNumber)} disabled={!selectAnswer}>Submit</Button>
        </Row>
        </Container>
    </>
}

export default SongCardComponent