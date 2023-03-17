import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/auth';

const Profile = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    id_number: '',
  });
  const [isValid, setIsValid] = useState(null);



  const [errors, setErrors] = useState({});
  const [success, setsuccess] = useState({})

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors({});
    setIsValid(null);
   
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
      body: JSON.stringify(profileData)
    };
    fetch('http://127.0.0.1:8000/api/profile/create/', requestOptions)

      .then(response => {
        if (response.status === 400) {
          return response.json().then(data => {
            setErrors(data);
            throw new Error('Bad Request');
          });
        } else if(response.status === 200){
          return response.json().then(data => {
            setsuccess(data);
            alert("profile is complete");
            setIsValid(true);

          });          
          
        }
        else {
          return response.json();
        }
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };


 


  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authTokens.access}` },
    };
    fetch('http://127.0.0.1:8000/api/profile/', requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {});
        } else if (response.status === 200) {
          return response.json().then((data) => {
            setProfileData({
              first_name: data.first_name,
              last_name: data.last_name,
              id_number:data.id_number
              
            });
            // Check if all fields are not empty or null
            setIsValid(
              data.first_name !== '' &&
                data.last_name !== '' &&
                data.id_number !== '' 
                
            );
          });
        } else if (response.statusText === 'Unauthorized') {
          logoutUser();
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  if (isValid === null) {
    return <h2>Loading</h2>;
  }

  if (isValid) {
    return (
      <form onSubmit={handleSubmit}>
        <h1>complete your Profile</h1>
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" value={profileData.first_name}onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" value={profileData.last_name} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="id">ID Number:</label>
        <input type="text" id="id" name="id_number" value={profileData.id_number} onChange={handleInputChange} />
      </div>
      <button type='submit'>submit</button>
    </form>
     
    );
  }

  return (
    <div>
    <h2>Profile</h2>
    <ul>
      <li><strong>First Name:</strong> {profileData.first_name}</li>
      <li><strong>Last Name:</strong> {profileData.last_name}</li>
      <li><strong>ID Number:</strong> {profileData.id_number}</li>
    </ul>
  </div>
    
  );
};

export default Profile;
