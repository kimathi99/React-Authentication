import React ,{useState,useContext}from 'react'
import { AuthContext } from '../auth/auth';
import { useNavigate } from 'react-router-dom';

function Otp() {
  let {regemail ,setregmail}=useContext(AuthContext)
  const[formData, setFormData] = useState({ email: regemail, code: ''  });
  const [errors, setErrors] = useState({});

  const handleInputChange = event => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value
  });
  };

  const navigate =useNavigate();

  const handleSubmit=(event)  => {
    event.preventDefault(); 
    setErrors({});        
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch('http://127.0.0.1:8000/api/account/verify/', requestOptions)
    .then(response => {
      if (response.status === 400) {
        return response.json().then(data => {
          setErrors(data);
          throw new Error('Bad Request');
        });
      } else if (response.status === 200) {
        return response.json().then(data => {
          
          alert("Your Account is active !!"); 
          setregmail('');
          navigate('/login', {replace: true});;
        });
      } else {
        return response.json();
      }
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };
  return (
    <div>
        <h1>ACTIVATE ACCOUNT</h1>
        <form onSubmit={handleSubmit}>
            <label>
              OTP:
                      
              <input type="text" name="code" value={formData.code} onChange={handleInputChange} />
              {errors.code&& <div className="error">{errors.code[0]}</div>}
            </label>
            <br />
            <button type="submit">Verify</button>
          </form>
    </div>
  )
}

export default Otp