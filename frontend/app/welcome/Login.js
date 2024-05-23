'use client'
import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {
        axios({
            method: "post", 
            data: {
                username: username,
                password: password
            },
            withCredentials: true,
            url: "http://localhost:5000/register",
            
        }).then((res) => console.log(res));
    }

    return (
        <div>
            <h1>Login</h1>
            <div>
                {console.log(username, password)}
                <label for="username">First Name</label>
                <input type="text" id="username" name="username" placeholder="username" onChange={e => setUsername(e.target.value)}/>
                <label for="password">Password</label>
                <input type="text" id="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <button onClick={submit}>Login</button>
            </div>
        </div>
    );
}

export default Login;