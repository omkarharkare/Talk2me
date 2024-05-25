'use client'
import { Quiz } from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const Questions = () => {
    /*
    useEffect(() => {
        console.log("Try me")
    }, [])
    */
   
    // const [initial, setinitial] = useState(console.log("Welcome"));
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({audio: true})

    /*
    function handleClick () {
        setinitial(console.log("fuck off"))
    }
    */
    return (
        <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <video src={mediaBlobUrl} controls autoPlay loop />
        </div>
    )
}

export default Questions;