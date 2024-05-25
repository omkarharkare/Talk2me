'use client'
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Grid, Box, Button, TextField} from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "green"
  },
}))

const Login = () => {
    const classes = useStyles();
    const router = useRouter();
    const [loginusername, setloginUsername] = useState("");
    const [loginpassword, setloginPassword] = useState("");

    const submit = () => {
        axios({
            method: "post", 
            data: {
                username: loginusername,
                password: loginpassword,
            },
            withCredentials: true,
            url: "http://localhost:5000/login",
            
        }).then((res) => {
            console.log(res);
            if (res.data === "User logged in") {
                router.push('/quiz')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <h1>Login</h1>
            <div>
                {console.log(loginusername, loginpassword)}
                <label for="username">First Name</label>
                <input type="text" id="username" name="username" placeholder="username" onChange={e => setloginUsername(e.target.value)}/>
                <label for="password">Password</label>
                <input type="text" id="password" name="password" placeholder="Password" onChange={e => setloginPassword(e.target.value)}/>
                <button onClick={submit}>Login</button>
            </div>
        </div>
    );
}

export default Login;