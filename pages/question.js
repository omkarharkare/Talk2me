'use client'
import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder-2";
import axios from "axios";
import { useRouter } from "next/navigation";
import Basepage from "./components/Basepage";

const Questions = () => {
    const recording_time = 11*1000; // 2 minutes 
    const router = useRouter();
    const [audiofile, setAudiofile] = useState(null);
    
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

    const handleUpload = async () => {
        if (audiofile) {
            try {
                const formData = new FormData();
                formData.append("audio", audiofile); // Assuming audiofile is a File object
    
                const response = await axios.post("http://localhost:5000/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("Audio file uploaded successfully:", response.data);
            } catch (error) {
                console.error("Error uploading audio file:", error);
            }
        } else {
            console.error("No audio file selected");
        }
    }

    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ audio: true });

    return (
        <Basepage>
            <p>Status: {status}</p>
            {status === "recording" && (
                <button onClick={stopRecording}>Stop Recording</button>
            )}
            <h3> Username: {username}</h3>
            {mediaBlobUrl && 
                <div>
                    <audio src={mediaBlobUrl} controls />
                    <button onClick={() => setAudiofile(mediaBlobUrl)}>Save Audio</button>
                    <button onClick={handleUpload}>upload</button>
                </div>    
            }
        </Basepage>
    );
};

export default Questions;