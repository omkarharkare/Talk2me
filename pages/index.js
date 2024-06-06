'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  
  /*
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
  */
  
  return (
    <main>
      <div>
        <h2>
          Welcome To the headache study, Thank you for your contributions
        </h2>
        <button onClick={() => router.push('/login')}>Login</button>
        <button onClick={() => router.push('/register')}>Register</button>
      </div>
    </main>
  );
}


