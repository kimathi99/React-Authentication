import React, {useContext, useState } from 'react';
import { AuthContext } from '../auth/auth';
import { useNavigate } from 'react-router-dom';
  
const Register = () => {
  let {setregemail}=useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });
  const navigate =useNavigate();

  const [errors, setErrors] = useState({});
  const [success, setsuccess] = useState({})

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors({});
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch('http://127.0.0.1:8000/api/account/signup/', requestOptions)

      .then(response => {
        if (response.status === 400) {
          return response.json().then(data => {
            setErrors(data);
            throw new Error('Bad Request');
          });
        } else if(response.status === 200){
          return response.json().then(data => {
            setsuccess(data);
            setregemail(formData.email);
            localStorage.setItem('regmail', JSON.stringify(formData.email));
            alert("operation sucess"); 
            navigate('/verify', {replace: true});
          });          
          
        }
        else {
          return response.json();
        }
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Registration</h1>
      {success && <div className="success">{success.sucess}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        {errors.email && errors.email.map(error => <div className="error">{error}</div>)}
        <br />
        <label>
          Username:
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        </label>
        {errors.username && errors.username.map(error => <div className="error">{error}</div>)}
        <br />
        <label>
          Phone Number:
          <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
        </label>
        {errors.phone_number && errors.phone_number.map(error => <div className="error">{error}</div>)}
        <br />
        <label>
          Password:
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </label>
        {errors.password && errors.password.map(error => <div className="error">{error}</div>)}
        <br />
        <label>
          Confirm Password:
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
        </label>
        {errors.confirmPassword && errors.confirmPassword.map(error => <div className="error">{error}</div>)}
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;