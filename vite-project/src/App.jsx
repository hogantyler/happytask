import { useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import TaskList from "./TaskList";
import Map from "./theMap";
import smiley from "./assets/smileyred.png";

import "./index.css";

export default function App() {
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGreenBackground, setIsGreenBackground] = useState(false);
  
  return (
    <>
      <div className="header-container">
        <img src={smiley} alt="smiley"></img>
        <div>
        <h1 className="h1-title">happy task</h1>
        <h2 className="h2-title">where you get stuff done, happily.</h2>
        </div>
      </div>
        <hr></hr>
      <div>
        <TaskList />
      </div>
    </>
  );
}


