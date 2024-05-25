'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from '@mui/material';

export default function Home() {

  const [username, setUsername] = useState('');
  
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios({
        method: "get", 
        withCredentials: true,
        url: "http://localhost:5000/getUser",
    }).then((res) => {
        setUsername(res.data.username)
    })
    .catch(err => console.log(err))
}

  return (
    <main>
      <div>
        Home
        <h3>Logged in with user : {username}</h3>
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
    </main>
  );
}


