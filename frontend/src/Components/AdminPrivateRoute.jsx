import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const { currentUser}=useSelector(state=>state.user)
  return currentUser && currentUser.isAdmin ? <Outlet/> :<Navigate to="/login"></Navigate>
}

export default PrivateRoute