import { useState } from "react";
import { useEffect, useRef } from "react";
import Confetti from 'react-confetti';
import "./index.css";

export default function App() {
  const [newTask, setNewTask] = useState(""); // now in TaskList
  const [tasks, setTasks] = useState([]); // TaskList
  const mapRef = useRef(null); // 
  const [showConfetti, setShowConfetti] = useState(false); // have to be in App
  const [isGreenBackground, setIsGreenBackground] = useState(false); // have to be in App

  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyALMP9YMJOVX9WFKTZmOzELexV3xQU7sxk&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize the map once the script is loaded
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 43.072, lng: -89.404 }, // Set your initial center coordinates
        zoom: 8, // Set the initial zoom level
      });

      // Set the map instance in the state
      setMap(map);
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Function to set the map instance in the state
  const setMap = (map) => {
    setGoogleMap(map);
  };

  // Function to add a marker to the map
  const addMarker = (lat, lng) => {
    const marker = new window.google.maps.Marker({
      position: { lat, lng },
      map: googleMap,
      title: "Your Task Location",
    });

    // Optionally, you can center the map on the marker
    googleMap.panTo({ lat, lng });
  };


  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Add a marker to the map
    addMarker(latitude, longitude);

    const newTaskObj = {
      id: generateId(),
      title: newTask.trim(),
      completed: false,
      lat: latitude,
      lng: longitude,
      removing: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTaskObj]);
    setNewTask("");
  }
  function getLocation() {
    // Checks if the browser has geolocation
    if (!navigator.geolocation) {
      console.error("Geolocation not supported by current browser");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const newTaskObj = {
        id: generateId(),
        title: newTask.trim(),
        completed: false,
        lat: latitude,
        lng: longitude,
        removing: false
      }

      setTasks(currentTasks => [...currentTasks, newTaskObj]);
      setNewTask("");
    }
    
    function error() {
      console.error("Unable to retrieve your location");
      const newTaskObj = {
        id: generateId(),
        title: newTask.trim(),
        completed: false,
        lat: null,
        lng: null,
        removing: false
      };

      setTasks(currentTasks => [...currentTasks, newTaskObj]);
      setNewTask("");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!newTask.trim()) return; // Prevent adding empty tasks

    getLocation();
  }

  function handleTaskCompletion(taskId) {
    setShowConfetti(true);
    setIsGreenBackground
    showCompliment();
    // Start animation by setting a 'removing' state on the task
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, removing: true } : task
      )
    );
    setTimeout(() => {
      setTasks(currentTasks =>
        currentTasks.filter(task => task.id !== taskId)
      );
    }, 1000);
    setTimeout(() => setShowConfetti(false), 5000);
    setTimeout(() => setIsGreenBackground(true), 5000);
  }
  
  
  // Simple client-side ID generation
  function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  function showCompliment() {
    const compliments = ["Good job buddy!","Great effort today!","You're doing fantastic!", "Make it count!", 
    "I know times are tough sometimes, but you're pushing through!", "Prove the haters wrong!", "Who's going to carry the boats?", 
    "The boats and the logs", "Remember what they did to you.", "type shit type shit", "NICE", "LET'S GO!!11!!1!", "To your success!", 
    "Great job!", "Awesome work!", "Excellent execution!", "Brilliantly done!", "Outstanding performance!", "Superb!", "Impressive!", "Fantastic!", 
    "Remarkable effort!", "Incredible results!", "Phenomenal!", "Amazing!", "Wonderful!", "Top-notch!", "First-class work!", "Stellar job!", 
    "Exceptional!", "A+ effort!", "Magnificent!", "Perfect!", "Superior work!", "Masterful!", "Skillfully done!", "Splendid!", "Admirable!", 
    "Exquisite!", "Extraordinary!", "Supreme effort!", "Ace job!", "High-quality work!", "Marvelous!", "Unbelievable!", "Terrific!", "Well-executed!", 
    "Impeccable!", "Dazzling!", "Excellent!", "Champion work!", "Top-class!", "Prime performance!", "Sensational!", "Superlative!", "Classy work!", 
    "Divine!", "Matchless!", "Peerless!", "Supreme!", "Praiseworthy!", "Inimitable!", "Flawless!", "Striking!", "Exemplary!", "Captivating!", 
    "Glorious!", "Spectacular!", "Radiant!", "Stupendous!", "Bravo!", "Pioneering!", "Hats off!", "Sublime!", "Epic!", "Victorious!", "Prodigious!", 
    "Astounding!", "Inspirational!", "Majestic!", "Laudable!", "Genius!", "Miraculous!", "Transcendent!", "Heroic!", "Mighty!", "Grand!", "Paramount!", 
    "Triumphant!", "Ultimate!", "Breathtaking!", "Sumptuous!", "Prize-worthy!", "Fantabulous!", "Innovative!", "Resplendent!", "Enthralling!", "Monumental!", 
    "Riveting!", "Dynamic!", "Astonishing!", "Unparalleled!", "Commanding!", "Formidable!", "Mind-blowing!", "Thrilling!", "Imposing!", "Fulfilling!", 
    "Gratifying!", "Rewarding!", "Heartening!", "Encouraging!", "Uplifting!", "Empowering!", "Energizing!", "Revitalizing!", "Motivating!", "Affirming!", 
    "Reassuring!", "Validating!"];
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    alert(randomCompliment); // For simplicity, using an alert to display the compliment
  }  

  return (
    <>
    {showConfetti && <Confetti />}

    <div className="container">
            <img src="/assets/smiley.svg" alt="Smiley" className="smiley-image" />
        </div>
      <div className="header-container">
        <h1>happy task</h1>
        <h2>where things get done, happily.</h2>
      </div>
      <form onSubmit={handleAdd} className="item-form">
        <div className="form-row">
          <label htmlFor="item">i need to: </label>
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            type="text"
            id="item"
            autoFocus
          />
        <button type="submit" className="btn">add task</button>
        </div>
      </form>
      <div>
        <h2>tasks</h2>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.removing ? 'removing' : ''}`}>
              <button onClick={() => handleTaskCompletion(task.id)}>
              {task.title} - Location: {task.lat ? `${task.lat.toFixed(3)}, ${task.lng.toFixed(3)}` : 'Not available'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div ref={mapRef} className="google-map"></div>
    </>
  );
}


