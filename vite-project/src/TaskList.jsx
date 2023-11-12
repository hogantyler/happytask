// TaskList.js
import React, { useState, useEffect } from 'react';
import Task from './Tasks';
import Confetti from 'react-confetti';

function TaskList() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const initialDays = Array.from({ length: 7 }, (_, i) => ({
    index: `${i + 1}`,
    day: days[i],
    selected: false,
    tasks: []
  }));
  initialDays[0].selected = true;

  const [daysWithTasks, setDaysWithTasks] = useState(initialDays);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGreenBackground, setIsGreenBackground] = useState(false);

  const addTaskToDay = (taskTitle) => {
    const newTask = { id: Date.now(), title: taskTitle };
    
    // Update the specific day's task list with the new task
    setDaysWithTasks(currentDays => currentDays.map(day => {
      if (day.selected) {
        return { ...day, tasks: [...day.tasks, newTask] };
      }
      return day;
    }));
  };
  const removeTaskFromDay = (dayIndex, taskId) => {
    setDaysWithTasks(currentDays => currentDays.map(day => {
      if (day.index === dayIndex) {
        // Filter out the task to be removed
        const updatedTasks = day.tasks.filter(task => task.id !== taskId);
        return { ...day, tasks: updatedTasks };
      }
      return day;
    }));
  };

  const initiateRemoveTaskFromDay = (dayIndex, taskId) => {
    setDaysWithTasks(currentDays => currentDays.map(day => {
      if (day.index === dayIndex) {
        // Filter out the task to be removed
        const updatedTasks = day.tasks.filter(task => task.id == taskId ? task.remove = true : task);
        return { ...day, tasks: updatedTasks };
      }
      return day;
    }));
  };


  const setSelected = (index) => {
    setDaysWithTasks(currentDays => currentDays.map(day => {
      return day.index === index ? { ...day, selected: true } : { ...day, selected: false };
    }));
  };


  // handleTaskCompletion
  const removeTask = (taskId, dayIndex) => {
    // Start both confetti and green background simultaneously
    setShowConfetti(true);
    setIsGreenBackground(true);
    
    initiateRemoveTaskFromDay(dayIndex, taskId);//doesnt really work ???
    
    setTimeout(() => {
      removeTaskFromDay(dayIndex,taskId);

    }, 1000);
  setTimeout(() => {
      setIsGreenBackground(false);
    }, 3000);
    // Stop both confetti and green background after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
          }, 5000);
  };
  

  useEffect(() => {
    if (isGreenBackground) {
      document.body.classList.add('green-background');
    } else {
      document.body.classList.remove('green-background');
    }
  }, [isGreenBackground]);

  return (
    <div>
      {showConfetti && <Confetti />}
        <form onSubmit={e => {e.preventDefault(); addTaskToDay(newTask);}} className="item-form">
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
        <h2>tasks</h2>
        <div className="list-list">
        {daysWithTasks.map((day) => (
          <div className={day.selected ? `selected` : ``} key={day.index} onClick={() => setSelected(day.index)}> {/* where shit goes down */}
            <h3>{day.day}</h3>
            <ul className="task-list">
              {day.tasks.map(task => (
                <Task key={task.id} task={task} dayId={day.index} removeTask={removeTask} />
              ))}
            </ul>
          </div>
        ))}
        </div>
    </div>
  );
}

export default TaskList;
