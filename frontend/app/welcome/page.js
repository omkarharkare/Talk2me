import React from "react";
import Landing from "./Landing";
import Login from "./Login";
import Register from "./Register";

export default function Page() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Register/>
      </div>
    </main>
  );
}
