import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, SignUp } from '../screens'
import { Typography } from 'antd'

const {Title} = Typography

const AuthRouter = () => {
  return (
    <div className="container-fluid">
      <div className="row">
          <div className="col d-none d-lg-block text-center" style={{marginTop : '15%'}}>
            <div className='mb-4'>
              <img 
                style={{ width : 256, objectFit : 'cover'}}
                src='https://firebasestorage.googleapis.com/v0/b/kanban-2fee4.appspot.com/o/kanbanlogo.png?alt=media&token=8bf7e583-b672-4511-b657-07126e4ad0aa' />
            </div>
            <Title className='text-primary'>KANBAN</Title>
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