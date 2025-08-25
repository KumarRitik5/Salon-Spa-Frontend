import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      );
      console.log(res.data.token);
      localStorage.setItem('token', res.data.token);
      navigate('/my-appointments');
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='form-container'>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={onChange}
          required
        />
        <input
          type='email'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={onChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={onChange}
          minLength='6'
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;