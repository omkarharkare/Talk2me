'use client'
import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const submit = () => {
        axios({
            method: "POST", 
            data: {
                username: username,
                password: password
            },
            withCredentials: true,
            url: "http://localhost:5000/register"
        }).then((res) => {
          console.log(res);
          if (res.data.message === "Username already exists") {
            console.log("Try another username")
          }
          else {
            router.push('/login')
          }
        })
        //.catch((err) => console.log(err)));
    }

  return (
    <div>
      <h1>Register</h1>
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