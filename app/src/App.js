import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.done,
  Completed: (task) => task.done
};



const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {

  const getTasksAsync = async () => {
    let url = `http://127.0.0.1:5000/api/todo`;
    let options_get = {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
    try {
      const response = await fetch(url, options_get);
      const data = await response.json();
      console.log(data);
      setTasks(data);
    }
    catch (error) {
      console.log(error);
    }
  };

  const postMatch = async (newTask) => {

    let url = `http://127.0.0.1:5000/api/todo`;
    let options_get = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(newTask)
    }
    try {
      //console.log("attempt to fetch")
      const response = await fetch(url, options_get);
      const data = await response.json()
      console.log(data);
      console.log('data posted!');

    } catch (error) {
      console.log(error)
    }

  };

  const deleteTaskAsync = async (id) => {

    let url = `http://127.0.0.1:5000/api/todo/${id}/delete`;
    let options_get = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    }
    try {
      //console.log("attempt to fetch")
      const response = await fetch(url, options_get);
      const data = await response.json()
      console.log(data);
      console.log('data deleted!');

    } catch (error) {
      console.log(error)
    }

  };

  const updateTaskAsync = async (id, putTask) => {

    let url = `http://127.0.0.1:5000/api/todo/${id}/update`;
    let options_get = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(putTask)
    }
    try {
      //console.log("attempt to fetch")
      const response = await fetch(url, options_get);
      const data = await response.json()
      console.log(data);
      console.log('data updated!');

    } catch (error) {
      console.log(error)
    }

  };

  const [tasks, setTasks] = useState([]);

  const addTask = (label) => {
    const newTask = { id: `todo-${nanoid()}`, label, done: false };
    console.log(newTask);
    postMatch(newTask);
    setTasks([...tasks, newTask]);
    console.log(tasks)
  };

  const [filter, setFilter] = useState('All');
  console.log(FILTER_MAP[filter]);

  const filterList = FILTER_NAMES.map((label) => {
    return <FilterButton key={label} name={label} isPressed={label === filter} setFilter={setFilter} />
  })

  function toggleTaskCompleted(id) {
    const updatedTask = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.done };
      }
      return task;
    })
    setTasks(updatedTask)
    console.log(tasks)
  };

  const deleteTask = (id) => {
    console.log(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    deleteTaskAsync(id);
    setTasks(remainingTasks);
  };

  const editTask = (id, newName) => {
    const editedTasksList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, label: newName }
      }
      return task;
    });
    console.log(editedTasksList[0]);
    const putTask = editedTasksList[0];
    updateTaskAsync(id, putTask);
    setTasks(editedTasksList);
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.label}
        completed={task.done}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const taskLength = `${taskList.length} ${taskNoun} remaining.`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  useEffect(() => {
    getTasksAsync();
  }, [])

  return (
    <div className="todoapp stack-large">
      <h1>To-Do List</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list-heading" tabIndex='-1' ref={listHeadingRef}>
        {taskLength}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;