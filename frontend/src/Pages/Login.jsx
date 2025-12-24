
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...LoginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = LoginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(LoginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, user } = result;

      if (!success) {
        return handleError(message);
      }

      // ✅ CORRECT LOCALSTORAGE
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("loggedInUser", user.name);
      localStorage.setItem("role", user.role);

      handleSuccess(message);

      setTimeout(() => {
        navigate("/employee");
      }, 1000);

    } catch (err) {
      handleError("Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={LoginInfo.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={LoginInfo.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>

        <span>
          Doesn't have an account? <Link to="/Signup">Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '300px',
    margin: '40px auto',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '8px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

export default Login;
