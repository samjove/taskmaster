import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import api from '../api';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = () => {
        fetchTasks();
    }

    return (
        <div className='container mt-4'>
            <TaskForm onTaskAdded={handleTaskAdded}/>
            <TaskList tasks={tasks}/>
        </div>
    );
};

export default TaskPage;

