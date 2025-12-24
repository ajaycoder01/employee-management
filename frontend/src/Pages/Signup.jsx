import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Signup() {

  const [SignupInfo, setSignupInfo] = useState({
    name:'',
    email:'',
    password:''
  })

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} = e.target;
    // console.log(name,value);
    const copySignupInfo = {...SignupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }

  // console.log('SignupInfo--->',SignupInfo)

  const handleSignup = async(e)=>{
    e.preventDefault();

    const {name,email,password} = SignupInfo;
    if(!name || !email || !password){
      return handleError('name,email and password are required!')
    }

    try {
      const url = "https://employee-management-backend-e17j.onrender.com/auth/signup";
      const response = await fetch(url,{
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(SignupInfo)
      });
      const result = await response.json();
      const {success, message, error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        },1000) 
      }else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message)
      }
      // console.log(result);
    } catch (err) {
        handleError(err);
    }

  }

  return (
   <div style={styles.container}>
      <h2>Signup Form</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          style={styles.input}
          name = "name"
          value={SignupInfo.name}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
          name = "email"
          value={SignupInfo.email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
          name = "password"
          value={SignupInfo.password}
        />
        <button type="submit" style={styles.button}>Sign Up</button>
        <span>Already have an account? 
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}




const styles = {
  container: {
    maxWidth: '300px',
    margin: '40px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Signup
