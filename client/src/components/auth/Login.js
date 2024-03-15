import React, { useState } from 'react';
import './Login.css'; // Ensure the CSS file is in the same directory for this import to work
import api from '../api/api';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await api.post('/user/login', {username, password})
        if (response.status==200){
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('_id', response.data.user._id)
            localStorage.setItem('username', username);
            navigate('/home');
        }
        else {
            alert("Invalid credentials");
        }
        return
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;
