import React, { useEffect, useState } from 'react'
import AuthRouter from './AuthRouter'
import MainRouters from './MainRouters'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector, AuthState } from '../redux/reducers/authReducer'
import { localDataNames } from '../constants/appInfors'
import { Spin } from 'antd'

const Routers = () => {
  const [isLoading , setIsLoading] = useState(false);
  const auth : AuthState = useSelector(authSelector)
  const dispatch = useDispatch()
  useEffect(()=>{
    getData()
  },[])
  const getData = async () => {
    const res = localStorage.getItem(localDataNames.authData)
    res && dispatch(addAuth(JSON.parse(res)))
  };

  const handleCheckToken = async () => {
    
  };

  return isLoading ? <Spin/> : !auth.token ? <AuthRouter/> : <MainRouters/>
}

export default Routers