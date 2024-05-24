import React from "react";
import Landing from "./welcome/Landing";
import Link from 'next/link'
import Login from "./welcome/Login";

export default function Page() {

  return (
    <main>
      <div>
        <Login/>
      </div>
    </main>
  );
}
