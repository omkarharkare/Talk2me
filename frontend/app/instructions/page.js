'use client'
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Instructions() {
    const router = useRouter();
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
            if (res.data === "") {
                router.push('/login')
            }
            setUsername(res.data.username)
            
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Welcome Instructions</h1>
            <p>{content.gibbers}</p>
            <h3>Logged in with user : {username}</h3>
            <Button onClick={() => router.push('/question')}>Start Test</Button>
        </div>
    )
}

const content = {
    gibbers : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc risus, semper sed vehicula ac, tincidunt eget urna. Phasellus vitae aliquam purus. Morbi non lectus ac erat imperdiet molestie vitae et ligula. Ut porta nibh eget posuere gravida. Sed posuere dui at dapibus feugiat. Suspendisse nunc elit, interdum quis lectus ut, convallis vulputate felis. Curabitur vitae neque condimentum, dignissim est porta, semper leo. Suspendisse potenti. Aenean quis dolor at urna blandit fermentum et in urna. In pretium lacinia consequat. Quisque eget lacus lobortis lacus dictum congue nec vitae mauris. Maecenas est sem, convallis porttitor sapien eget, aliquet venenatis lacus. Nunc elit magna, tempor at tellus nec, gravida eleifend velit. Nunc vel efficitur risus. Vivamus ac purus nisl. Suspendisse iaculis finibus ex, a pharetra tortor porttitor vitae.    Sed sit amet diam mollis, tristique dui at, auctor mauris. Aliquam vel pharetra ante, nec scelerisque lorem. Donec sagittis nisi suscipit nulla rhoncus, quis condimentum lacus condimentum. Integer est purus, vulputate sit amet luctus vitae, tristique vel velit. Sed eu mauris non nisl lobortis pretium. Aliquam suscipit nulla et bibendum egestas. Nunc commodo gravida auctor. In vulputate sit amet ex ultrices placerat. Proin bibendum, ligula eget viverra iaculis, neque massa lacinia turpis, at viverra sapien arcu at enim. Donec blandit urna ut orci pretium dignissim. Nam at sapien cursus, feugiat justo non, mollis mauris. Vestibulum tempor fermentum diam ut mattis. Duis congue iaculis rhoncus. Cras ultricies augue non elementum fermentum. Vestibulum ut nulla imperdiet, consectetur dui vitae, auctor risus. Curabitur malesuada urna non vestibulum feugiat. Duis cursus eros a ante faucibus molestie."
}
