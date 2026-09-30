import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLayoutRedirector = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/admin/dashboard')
    },[navigate])

  return null
}

export default AdminLayoutRedirector