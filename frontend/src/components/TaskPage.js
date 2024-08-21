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

    const handleTaskUpdated = () => {
        fetchTasks();
    }

    return (
        <div className='container mt-4'>
            <TaskForm onTaskAdded={handleTaskUpdated}/>
            <TaskList tasks={tasks} onTaskDeleted={handleTaskUpdated}/>
        </div>
    );
};

export default TaskPage;

