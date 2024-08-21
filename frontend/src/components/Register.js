import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [credentials, setCredentials] = useState({ username: '', password: ''});
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {username, password } = credentials;
            const userData = {username, email, password};
            const response = await api.post('/register', userData);
            console.log("Registration successful", response)
            alert('User registered successfully');
            const response_jwt = await api.post('api/token/', credentials);
            const accessToken = response_jwt.data.access;
            const refreshToken = response_jwt.data.refresh;  
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken); 
            navigate('/tasks');  
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed');
        }
    };

    return (
        <>
        <p>
            Already have an account? Login <a href="/login">here</a>.
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
                type='text'
                className='form-control'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='text'
                className='form-control'
                placeholder='Password'
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
            </div>
            <button className='btn btn-primary mt-3' type='submit'>Register</button>
        </form>
        </>
    );
};

export default Register;