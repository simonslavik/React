import Navbar from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"



import {useState} from "react";

function App() {

  const [username, setUsername] = useState("");
  return username ? (<div className="min-h-screen width-full bg-gray-100 text-gray-900 flex flex-col items-center justify-center p-4"> 
    <Home username={username}/>
  </div>):(
  <div className="min-h-screen width-full bg-gray-100 text-gray-900 flex flex-col items-center justify-center p-4"> 
    <Login onSubmit={setUsername}/>
  </div>
);
}

export  default App