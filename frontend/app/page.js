import React from "react";
import Landing from "./pages/Landing";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Audio Recorder 1</h1>
        <Landing/>
      </div>
    </main>
  );
}
