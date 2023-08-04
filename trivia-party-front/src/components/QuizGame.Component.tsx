import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import Playlists from "./Playlists";
import axios from "axios";
import SongCardComponent from "./SongCard.Component";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import AnswerFeedback from "./AnswerFeedback.Component";

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
    const [showAnswerFeedback, setShowAnswerFeedback] = useState(false)
    const [userAnswer, setUserAnswer] = useState<any>()
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
        // TODO: refresh token if access expires
        let accessToken = localStorage.getItem('access_token')
        const response = await axios.get('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
            headers: {
                Authorization: "Bearer " + accessToken,
            }
        })
    
        setQuizPlaylist(response.data.items)
        console.log(' fetch length '+ response.data.items.length)
        console.log('quizPlaylist length ' + quizPlaylist.length)

    }

    // todo: question bank and getting
    // add which song is shorter/longer
    const questionType = [{"type": 0, "str": "Which track is currently more popular?", 
            "func": (track1 : any, track2 : any) => {if (track1.popularity >= track2.popularity){return track1} return track2}},
        {"type" : 1, "str" : "Which track was released earlier?", "func": (track1 : any, track2 : any) => {if (track1.popularity >= track2.popularity){return 1} return 2}}]


    function getRandomInt(min:number, max:number){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    }

    // create a question set using random numbers and avoid using the same track twice
    const createQuestionSet = (questionNumber:number) => {

        setUserAnswer(null)
        setShowAnswerFeedback(false)
        // pick random tracks
        // make a check if dupe, then pick another track2
        // get answer based on question type selected

        let randomInt = getRandomInt(0,1)
        // const questionType : any = questionType[getRandomInt(0,1)]
        let questionStr = questionType[randomInt].str
        let track1 = quizPlaylist[getRandomInt(0, quizPlaylist.length)].track

        // make sure track2 is different from track1
        // TODO: dont let user pick a playlist of a small size else cant find different tracks to create question
        let track2 = quizPlaylist[getRandomInt(0, quizPlaylist.length)].track
        let i = 0
        while (track1 === track2){
            track2 = quizPlaylist[getRandomInt(0, quizPlaylist.length)].track
            i++;
            if (i > 20){
                console.log('couldnt find two different tracks')
                break
            }
        }
        let answer = questionType[randomInt].func(track1, track2)
        
        //pass questionset parameters
        setQuestionSet({questionNumber, questionStr, track1, track2, answer})
        console.log('question set created')
    }

    interface QuestionSet {
        questionNumber : any
        questionStr : string
        track1 : any
        track2 : any
        answer : any
    }

    const handleAnswer = (trackName:string, questionNumber:number) => {
        // console.log('track', trackName, 'is being compared to answer', questionSet?.answer.name)
        if (trackName === questionSet?.answer.name){
            
            setUserAnswer(true)
            setShowAnswerFeedback((showAnswerFeedback) => showAnswerFeedback = !showAnswerFeedback)
        }else{
            setUserAnswer(false)
            setShowAnswerFeedback((showAnswerFeedback) => showAnswerFeedback = !showAnswerFeedback)
        }
        
    }

    const handleContinue = (questionNumber:number, score:number) => {
        setScore(score)
        if(questionNumber >= 10 ){
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
            {score}
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
        {questionSet ? renderScore() : <div/>}
        {questionSet ? renderQuiz() : <div/>}
        <AnswerFeedback show={showAnswerFeedback} questionSet={questionSet} selectedAnswer={userAnswer} handleContinue={handleContinue}/>
    </>
}

export default QuizGameComponent