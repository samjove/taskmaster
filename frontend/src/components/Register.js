import React, { useState } from 'react';
import api from '../api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { username, email, password };
            const response = await api.post('register', userData);
            console.log("Registration successful", response)
            alert('User registered successfully');
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed');
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
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Register</button>
        </form>
    );
};

export default Register;