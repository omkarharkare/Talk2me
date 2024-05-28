'use client'
import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder-2";
import axios from "axios";
import { useRouter } from "next/navigation";

const Try = () => {
    const recording_time = 11*1000; // 2 minutes 
    const router = useRouter();
    useEffect(() => {

        getUser();
        startRecording(); // Automatically start recording when component mounts

        const timeoutId = setTimeout(() => {
            stopRecording();
          }, recording_time);

        return () => clearTimeout(timeoutId); // Clear the timeout on component unmoun
    }, []);

    const [username, setUsername] = useState('');
    const getUser = () => {
        axios({
            method: "get", 
            withCredentials: true,
            url: "http://localhost:5000/getUser",
        }).then((res) => {
            if(res.data === "") {
                router.push('/login')
            }
            setUsername(res.data.username)
        })
        .catch(err => console.log(err))
    }

    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ audio: true });

    return (
        <div>
            <p>Status: {status}</p>
            {status === "recording" && (
                <button onClick={stopRecording}>Stop Recording</button>
            )}
            <h3> Username: {username}</h3>
            {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
        </div>
    );
};

export default Try;