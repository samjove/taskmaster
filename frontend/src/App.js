import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import TaskPage from './components/TaskPage';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  //const [taskUpdated, setTaskUpdated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setIsAuthenticated(true);
      // navigate('/tasks');
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  // const refreshTasks = () => {
  //   setTaskUpdated(!taskUpdated);
  // };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      {isAuthenticated && (
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      )}
      
      <Routes>
        <Route path="/tasks" element={isAuthenticated? (
          <>
            {/* <TaskList taskUpdated={taskUpdated}/>
            <TaskForm onTaskAdded={refreshTasks}/> */}
            <TaskPage/>
          </>
        ): (
          <Navigate to="/login" /> 
        )
        } />
        <Route path="/register" element={isAuthenticated? (<Navigate to="/tasks"/>):(<Register/>) } />
        <Route path="/login" element={isAuthenticated? (<Navigate to="/tasks"/>):(<Login/>) } />
        <Route path="*" element={isAuthenticated? (<Navigate to="/tasks"/>):(<Navigate to="/login"/>) }/>
      </Routes>
    </div>
  )
}

export default App;
