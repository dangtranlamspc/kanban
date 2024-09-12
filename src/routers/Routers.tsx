import React from 'react'
import AuthRouter from './AuthRouter'
import MainRouters from './MainRouters'

const Routers = () => {
  return 1 < 2 ? <AuthRouter/> : <MainRouters/>
}

export default Routers