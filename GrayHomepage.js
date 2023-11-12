import React from 'react';
import './GrayHomepage.css'; // Assuming you have a CSS file for styling

const GrayHomepage = () => {
  // A handler function to change the color, if needed
  const addTask = () => {
    // Logic to change the color
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'rgb(76, 175, 80)' ? '#388E3C' : '#4b4d4b';
  };

  return (
    <div className="gray-background">
      <h1>Welcome to HappyTask - The world's premier motivating to-do app</h1>
      <button onClick={addTask}>add task</button>
    </div>
  );
};

export default GrayHomepage;
