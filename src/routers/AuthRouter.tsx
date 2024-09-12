import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, SignUp } from '../screens'

const AuthRouter = () => {
  return (
    <div className="container">
      <div className="row">
          <div className="col">
            <h1>dfjai</h1>
            <img className='' alt='' />
          </div>
        <div className="col content-center ">
          <BrowserRouter>
            <Routes>
              <Route path='/' element = {<Login/>} />
              <Route path='/sign-up' element = {<SignUp/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>

  )
}

export default AuthRouter