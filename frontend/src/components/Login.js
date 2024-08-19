import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const credentials = { username, password };
            console.log(credentials);
            const response = await api.post('api/token/', credentials);  
            localStorage.setItem('token', response.data.access);  
            navigate('/tasks');  
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
        </form>
    );
}

export default Login;