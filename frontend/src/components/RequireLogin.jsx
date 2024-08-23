import { useEffect, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import userContext from '../context/userContext';

export default function RequireAuth() {
    const { userData, setUserData } = useContext(userContext)
    
    const navigate = useNavigate()
    useEffect(() => {
        if (userData.data == undefined) {
            navigate('/login')
        }
    })
    if (userData.data == undefined) {
        return null
    }

    return <Outlet />
}