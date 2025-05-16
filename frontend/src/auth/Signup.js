// Signup.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundImage from '../images/globaimg.jpg';

const Signup = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const result = signup(username, password);
    if (result.success) {
      toast.success('Signup successful! Redirecting to login...');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      toast.error(result.message);
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
        <h2 style={{ marginBottom: '20px' }}>Sign Up</h2>
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
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
