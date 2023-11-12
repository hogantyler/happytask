// Task.js
import React from 'react';

function Task({ task, dayId, removeTask }) {

  return (
    <li className={`task-item ${task.removing ? 'removing' : ''}`}>
      {task.title}
      <button onClick={() => removeTask(task.id, dayId)} className="remove-btn">×</button>
    </li>
  );

}

export default Task;