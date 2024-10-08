import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [credentials, setCredentials] = useState({ username: '', password: ''});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const credentials = { username, password };
            console.log(credentials);
            const response = await api.post('api/token/', credentials);
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;  
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            console.log(localStorage.getItem('token'));  
            navigate('/tasks');  
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed');
        }
    };

    return (
        <>
        <p>
            Don't have an account? Sign up <a href="/register">here</a>.
        </p>
        <form className='mt-4' onSubmit={handleSubmit}>
            <div className='form-group'>
            <input
                type='text'
                className='form-control'
                placeholder='Username'
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
            <input
                type='password'
                className='form-control'
                placeholder='Password'
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
            </div>
            <button className='btn btn-primary mt-3' type='submit'>Login</button>
        </form>
        </>
    );
}

export default Login;