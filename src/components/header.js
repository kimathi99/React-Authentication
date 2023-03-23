import  React from 'react';
import { NavLink} from 'react-router-dom';
import { UserAuth } from '../auth/auth';


export const Navbar= ()=>{
    const auth=UserAuth()
    
    const NavLinkStyles =({isActive})=>{
        return{
            fontWeight: isActive? 'bold':'normal',
            textDecoration: 'none',
        }
    }
   
    return(
        <nav  className='main'>
            <NavLink style={NavLinkStyles} to='/'>Home</NavLink>
            <NavLink  style={NavLinkStyles} to ='/products'>Products</NavLink>
            
            
            {
                auth.user && (
                    <NavLink  style={NavLinkStyles} to ='/profile'>Profile</NavLink>
                )
            }
            {
                auth.user && (
                    <NavLink  style={NavLinkStyles} to ='/businessregistration'>Business</NavLink>
                )
            }
            {
                auth.user && (
                    <NavLink  style={NavLinkStyles} to ='/logout'>logout</NavLink>
                )
            }
            
            {
                !auth.user && (
                    <NavLink  style={NavLinkStyles} to ='/register'>Register</NavLink>
                )
            }
            
            {
                !auth.user && (
                    <NavLink  style={NavLinkStyles} to ='/login'>Login</NavLink>
                )
            }
            
        </nav>
    );
};