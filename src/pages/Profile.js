import React, { useState,useContext, useEffect } from 'react';
import { AuthContext } from '../auth/auth';

const Profile = () => {
  let {authTokens,logoutUser}=useContext(AuthContext)
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    id: '',
    number: '',
    file: ''
  });

  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' ,'Authorization':'Bearer '  + String(authTokens.access)},
    
    };
    fetch('http://127.0.0.1:8000/api/profile/', requestOptions)
    .then(response => {
      if (response.status === 400) {
        return response.json().then(data => {
         
        });
      } else if (response.status === 200) {
        return response.json().then(data => {
          setProfileData({
            first_name: data.first_name,
            last_name: data.last_name,
            id: data.id,
            number: data.number,
            file: data.file
          });
         
        });
      } else if(response.statusText === 'Unauthorized'){
        logoutUser()

      }else {
        return response.json();
      }
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
    
   
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <ul>
        <li><strong>First Name:</strong> {profileData.first_name}</li>
        <li><strong>First Name:</strong> {profileData.first_name}</li>
        <li><strong>Last Name:</strong> {profileData.last_name}</li>
        <li><strong>ID Number:</strong> {profileData.id}</li>
        <li><strong>Phone Number:</strong> {profileData.number}</li>
        <li><strong>File:</strong> {profileData.file}</li>
      </ul>
    </div>
  );
};

export default Profile;
