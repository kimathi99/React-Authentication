import React, { useState } from 'react';

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    fetch('http://127.0.0.1:8000/api/forgot_password/', requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {
            setErrors(data);
            throw new Error('Bad Request');
          });
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setSuccess(data);
            // setTimeout(() => {
            //   // do something after 5 seconds
            //   alert('Operation successful !!');
            // }, 5000);
            return data;
          });
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        {success.email && (
          <div className="success">
            {success.email} sent to {formData.email}
          </div>
        )}

        {errors.email && <div className="error">{errors.email}</div>}

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
