import React from 'react'
import { UserAuth } from './auth'

import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../Context'

function RequireAuth({ children }){
    const location = useLocation()
    const auth = UserAuth()
    if (!auth.user) {
        return <Navigate to='/login' state={{ from: location.pathname }} />
    }
    return children
}

export default RequireAuth