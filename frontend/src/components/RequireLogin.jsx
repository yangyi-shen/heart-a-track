import { useEffect, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import userContext from '../context/userContext';

export default function RequireAuth() {
    const userData = useContext(userContext)
    
    const navigate = useNavigate()
    useEffect(() => {
        if (userData.data == undefined) {
            navigate('/login')
        }
    })

    return <Outlet />
}