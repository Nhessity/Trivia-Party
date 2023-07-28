import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import Playlists from "./Playlists";
import axios from "axios";
import SongCardComponent from "./SongCard.Component";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";

function QuizGameComponent(props: any){
    // const [quizPlaylist, setQuizPlaylist] = useState({data:""});

    // const handleSelectPlaylistCallback = (selectedPlaylistId : string) => {
    //     setQuizPlaylist({data})
    // }

    const [quizPlaylist, setQuizPlaylist] = useState<any>(null)
    const [questionSet, setQuestionSet] = useState<QuestionSet>()
    const [score, setScore] = useState<number>(0)
    // var quizIsDone = false
    const [quizIsDone, setQuizIsDone] = useState<boolean>(false)
    // var quizPlaylist : any
    const {state} = useLocation()

    useEffect(
        function getPlaylistSonglistAfterLoading () {
            // if (!state.playlistId) return
            getPlaylistSonglist(state)
            // if (!props.data) return
            // getPlaylistSonglist(props.data)
        }, []
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
    // add which song is shorter/longer
    const questionType = [{"type": 0, "str": "Which track is currently more popular?", 
            "func": (track1 : any, track2 : any) => {if (track1.popularity >= track2.popularity){return track1.name} return track2.name}},
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

        // make sure track2 is different from track1
        let track2 = quizPlaylist[getRandomInt(0, quizPlaylist.length)].track
        if (track1 === track2){
            track2 = quizPlaylist[getRandomInt(0, quizPlaylist.length)].track
        }
        let answer = questionType[randomInt].func(track1, track2)
        
        //pass questionset parameters
        setQuestionSet({questionNumber, questionStr, track1, track2, answer})
        console.log('question set created')
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

    const handleAnswer = (trackName:string, questionNumber:number) => {
        if(trackName === questionSet?.answer){
            console.log('correct', questionSet?.answer, 'is more popular')
            setScore(score+1)
        }else{
            console.log('incorrect', questionSet?.answer, 'is more popular')
        }

        if(questionNumber >= 10 ){
            // const navigate = useNavigate()
            // console.log("attempting to redirect");
            // navigate("/result")
            //return redirect("/result")
            // quizIsDone = true
            setQuizIsDone(true)
        }else{
            createQuestionSet(questionNumber+1)
        }
    }
    let navigate = useNavigate()
    

    useEffect(()=>{
        if(quizIsDone === true){
            navigate("/result", { state: score })
        }
    }, [quizIsDone])

    const renderScore = () => {
        return <>
            {score} / {questionSet?.questionNumber - 1}
        </>
    }

    const renderQuiz = () => {
        // if (!quizPlaylist) return <div/>
        console.log('quizPlaylist length at render ' + quizPlaylist.length)
        if(!questionSet) return <div/>
        return <>
            <Container>
                <Row>
                    <h1 className="text-center">{questionSet?.questionNumber}. {questionSet?.questionStr}</h1>
                </Row>
                <SongCardComponent questionSet={questionSet} handleAnswer={handleAnswer}></SongCardComponent>
            </Container>
        </>
    }

    return <>
        {console.log('rendering start')}
        {/* <p>{props.data}</p> */}
        {/* {quizPlaylist ? {renderQuiz} : <></>} */}
        {/* {quizPlaylist ? renderQuiz() : <div/>} */}
        {questionSet ? renderScore() : <div/>}
        {questionSet ? renderQuiz() : <div/>}
    </>
}

export default QuizGameComponent