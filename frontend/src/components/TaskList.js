import React, {useEffect, useState } from 'react';
import api from '../api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('tasks/');
                // console.log(response.data);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.completed ? 'Completed':'Pending'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;