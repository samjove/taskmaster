//import React, {useEffect, useState } from 'react';
import api from '../api';

const TaskList = ({tasks, onTaskDeleted}) => {
    const handleDelete = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}/`);
            onTaskDeleted();
        } catch (error) {
            console.error('Error deleting tasks', error.response.data);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Your Tasks</h2>
            <div className="row">
                {tasks.map((task) => (
                    <div className="col-md-6" key={task.id}>
                        <div className="task-item">
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                        </div>
                        <button className='btn btn-warning'type='button' onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;