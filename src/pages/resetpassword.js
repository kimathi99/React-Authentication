import React from 'react'
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
  const [errors, setErrors] = useState({});
  const [success, setsuccess] = useState({});
  const [formData, setFormData] = useState({    
    password: '',
    token:'',
    uid64:''
  });
  const [confirmPassword, setconfirmPassword] = useState('')


 

  const navigate =useNavigate();

  

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (formData.password !== confirmPassword) {
      setErrors('Passwords do not match');
      return;
    }
    setErrors({});    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch('http://127.0.0.1:8000/api/reset_password/', requestOptions)

      .then(response => {
        if (response.status === 400) {
          return response.json().then(data => {
            setErrors(data);
            throw new Error('Bad Request');
          });
        } else if(response.status === 200){
          return response.json().then(data => {
            setsuccess(data);
            sleep(3000)
            alert("operation sucess"); 
            navigate('/logout', {replace: true});
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
      <h1>Reset Password</h1>
      {success.email && success.email.map(<div>{success.email}</div>)}
      {errors.email && errors.email.map(<div>{errors.email}</div>)}
      {errors && <div>{errors}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            value={confirmPassword}
            onChange={e=>setconfirmPassword(e.target)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword
