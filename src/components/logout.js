import React,{useContext} from 'react';
import { AuthContext } from '../auth/auth';


const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext);; 


  return (
    <>
      <div>
      <button onClick={logoutUser}>Logout</button>
      </div>
      
    </>
    

  )
  
};

export default LogoutButton;
