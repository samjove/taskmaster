import React, { useState } from 'react';
import api from '../api';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle ] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = { title, description, completed: false };
            await api.post('tasks', newTask);
            setTitle('');
            setDescription('');
            onTaskAdded();
        } catch (error) {
            console.error('Error creating tasks', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Task Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type='text'
                placeholder='Task Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type='submit'>Add Task</button>
        </form>    
    );
};

export default TaskForm;