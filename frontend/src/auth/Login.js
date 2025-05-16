// Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundImage from '../images/Global.png'; // Update this path as needed

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          color: '#fff',
          textAlign: 'center',
          minWidth: '300px',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Login</h2>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: 'none',
            borderRadius: '8px',
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: 'none',
            borderRadius: '8px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
