import React, { useState } from 'react';
import api from '../api';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle ] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = { title, description };
            console.log(newTask);
            await api.post('/tasks/', newTask);
            
            setTitle('');
            setDescription('');
            
            onTaskAdded();
        } catch (error) {
            console.error('Error creating tasks', error.response.data);
        }
    };

    return (
        <form className="mt-4" onSubmit={handleSubmit}>
            <div className='form-group'>
            <input
                type='text'
                className='form-control'
                placeholder='Task Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type='text'
                className='form-control'
                placeholder='Task Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <button className="btn btn-primary mt-3" type='submit'>Add Task</button>
        </form>    
    );
};

export default TaskForm;