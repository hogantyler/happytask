// Task.js
import React from 'react';

function TaskSubList({ selectedList, selectList }) {

  const [tasks, setTasks] = useState([]);

  const addTask = (taskTitle) => {
    const newTask = {
      id: tasks.length + 1, // Simple ID assignment
      title: taskTitle
    };
    setTasks([...tasks, newTask]);
  };

  return (

    <ul className="task-list" id={day} key={day}>
      {tasks.map(task => (
        <Task key={task.id} task={task} removeTask={removeTask} />
      ))}
    </ul>
  );

}

export default TaskSubList;