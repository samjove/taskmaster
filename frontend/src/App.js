import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  const [taskUpdated, setTaskUpdated] = useState(false);
  
  const token = localStorage.getItem('token');
  //console.log(token);
  if (!token) {
    return (<Login />);
  }

  const refreshTasks = () => {
    setTaskUpdated(!taskUpdated);
  }

  return (
    <Router>
        <Routes>
            <Route path="register" element={<Register/>} />
            <Route path="login" element={<Login/>} />
            <Route path="tasks" element={(
              <>
                <TaskList taskUpdated={taskUpdated}/>
                <TaskForm onTaskAdded={refreshTasks}/>
              </>
            )} />
        </Routes>
    </Router>
  );
}

export default App;
