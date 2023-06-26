import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import Playlists from "./Playlists";
import axios from "axios";

function QuizGameComponent(props: any){
    // const [quizPlaylist, setQuizPlaylist] = useState({data:""});

    // const handleSelectPlaylistCallback = (selectedPlaylistId : string) => {
    //     setQuizPlaylist({data})
    // }

    const [quizPlaylist, setQuizPlaylist] = useState<any>(null)
    const [questionSet, setQuestionSet] = useState<QuestionSet>()
    // var quizPlaylist : any

    useEffect(
        function getPlaylistSonglistAfterLoading () {
            if (!props.data) return
            getPlaylistSonglist(props.data)
        }, [props.data]
    )

    // useEffect(
    //     function renderNewQuestion(){
    //         renderQuiz()
    //     }, [questionSet]
    // )

    useEffect(
        function startQuiz () {
            if(!quizPlaylist) return
            createQuestionSet(1)
        },[quizPlaylist]
    )

    const getPlaylistSonglist = async (playlistId: string) => {
        console.log('getting songlist from ' + playlistId)
        // TODO: fetch songlist using playlistId
        let accessToken = localStorage.getItem('access_token')
        const response = await axios.get('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
            headers: {
                Authorization: "Bearer " + accessToken,
            }
        })
    
        setQuizPlaylist(response.data.items)
        // quizPlaylist = data.data.items
        console.log(' fetch length '+ response.data.items.length)
        console.log('quizPlaylist length ' + quizPlaylist.length)
        // createQuestionSet(1)
        // console.log(quizPlaylist[0].track.name)
    }

    // todo: question bank and getting
    const questionType = [{"type": 0, "str": "Which track is currently more popular?", 
            "func": (track1 : any, track2 : any) => {if (track1.popularity >= track2.popularity){return 1} return 2}},
        {"type" : 1, "str" : "Which track was released earlier?", "func": (track1 : any, track2 : any) => {if (track1.popularity >= track2.popularity){return 1} return 2}}]

    // var getAnswer:{() : any;}

    // note: read up on component did mount

    // useEffect(
    //     function createQuestionSetAfterLoading(){
    //         createQuestionSet(1)
    //     }, []
    // )

    function getRandomInt(min:number, max:number){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    }

    // create a question set using random numbers and avoid using the same track twice
    const createQuestionSet = (questionNumber:number) => {
        // pick random tracks
        // make a check if dupe, then pick another track2
        // get answer based on question type selected

        let randomInt = getRandomInt(0,1)
        // const questionType : any = questionType[getRandomInt(0,1)]
        let questionStr = questionType[randomInt].str
        let track1 = quizPlaylist[getRandomInt(0, quizPlaylist.length)].track
        let track2 = quizPlaylist[getRandomInt(0, quizPlaylist.length)].track
        let answer = questionType[randomInt].func(track1, track2)
        
        //pass questionset parameters
        setQuestionSet({questionNumber, questionStr, track1, track2, answer})
    }

    // if i dont like this -> change questionSet to a useState?
    // when submitted, questionNumber needs to be incremented somewhere
    // quiz should end after the 10th question is answered
    // const questionSet = (questionNumber:any, track1:any, track2:any, answer:any) => {
    //     questionNumber = questionNumber
    //     track1 = track1
    //     track2 = track2
    //     answer = answer
    // }

    interface QuestionSet {
        questionNumber : any
        questionStr : string
        track1 : any
        track2 : any
        answer : any
    }

    

    const onAnswer = (questionNumber:number) => {
        // check if answer is correct. increment score if so
        // create and load new question set
        console.log(questionSet?.answer)
        createQuestionSet(questionNumber + 1)
    }

    const renderQuiz = () => {
        // if (!quizPlaylist) return <div/>
        return <>
            <Container>
                <Row>
                    <h1 className="text-center">{questionSet?.questionNumber}. {questionSet?.questionStr}</h1>
                </Row>
                <Row className="justify-content-center">
                    <Col>
                        {/* <h1 className="text-center">{quizPlaylist?.[0].track.name}</h1> */}
                        <h1 className="text-center">{questionSet?.track1.name}</h1>
                        <div className="d-flex justify-content-center">
                            {/* <img onClick={() => onAnswer(questionSet?.questionNumber)} src={quizPlaylist?.[0].track.album.images[1].url} className=""></img> */}
                            <img onClick={() => onAnswer(questionSet?.questionNumber)} src={questionSet?.track1.album.images[1].url} className=""></img>
                        </div>
                    </Col>
                    <Col>
                        {/* <h1 className="text-center">{quizPlaylist?.[1].track.name}</h1>
                        <div className="d-flex justify-content-center">
                            <img src={quizPlaylist?.[1].track.album.images[1].url} className=""></img>
                        </div> */}
                        <h1 className="text-center">{questionSet?.track2.name}</h1>
                        <div className="d-flex justify-content-center">
                            <img onClick={() => onAnswer(questionSet?.questionNumber)} src={questionSet?.track2.album.images[1].url} className=""></img>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    }

    return <>
        {/* <p>{props.data}</p> */}
        {/* {quizPlaylist ? {renderQuiz} : <></>} */}
        {/* {quizPlaylist ? renderQuiz() : <div/>} */}
        {questionSet ? renderQuiz() : <div/>}
    </>
}

export default QuizGameComponent