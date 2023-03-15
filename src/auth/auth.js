import { createContext,useContext, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()


const AuthProvider = ({children}) => {
    
    
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [regemail, setregemail] = useState(()=>localStorage.getItem('regemail'))
    const navigate =useNavigate()



    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        alert("Logged out sucessfully!!")
        navigate('/', {replace: true});
    }


    let contextData = {
        user:user,
        authTokens:authTokens,
        logoutUser:logoutUser,
        setUser:setUser,
        setAuthTokens:setAuthTokens,
        regemail:regemail,
        setregemail:setregemail,
    }


    return(
        <AuthContext.Provider value={contextData} >
            { children}
        </AuthContext.Provider>
    )
}

const UserAuth= ()=>{
    return useContext (AuthContext)
}

export { AuthProvider, UserAuth, AuthContext };