import React, {useEffect, useState } from 'react';
import api from '../api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks/');
                // console.log(response.data);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;