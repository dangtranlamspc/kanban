import React from 'react'
import AuthRouter from './AuthRouter'
import MainRouters from './MainRouters'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, AuthState } from '../redux/reducers/authReducer'

const Routers = () => {
  const auth : AuthState = useSelector(authSelector)
  const dispatch = useDispatch()

  return !auth.token ? <AuthRouter/> : <MainRouters/>
}

export default Routers