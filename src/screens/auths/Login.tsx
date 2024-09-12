import { Button, Card, Checkbox, Form, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialLogin from './components/SocialLogin'

const {Title, Paragraph} = Typography

const Login = () => {

  const [form] = Form.useForm();

  const [isRemember, setIsRemember] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (value: {email : string; password : string}) => {

  }
  return (
    <div>
      <Card>
        <div className='text-center'>
          <Title level={2}>Log in to account</Title>
          <Paragraph type='secondary'>
            Welcome back! Please enter your details.
          </Paragraph>
        </div>
        <Form 
          layout='vertical' 
          form={form} 
          onFinish={handleLogin} 
          disabled={isLoading}
          size='large'
        >
          <Form.Item 
            name={'email'} 
            label='Email'
            rules={[
              {
                required : true,
                message : 'Please enter your email ! '
              }
            ]}
          >
            <Input allowClear maxLength={100} type='email' />
          </Form.Item>
          <Form.Item 
            name={'password'} 
            label='Password'
            rules={[
              {
                required : true,
                message : 'Please enter your password ! '
              }
            ]}
          >
            <Input.Password maxLength={100} type='password' />
          </Form.Item>
        </Form>
        <div className="row">
          <div className="col">
            <Checkbox value={isRemember} onChange={(val) => setIsRemember(val.target.checked)}>Remember for 30 days</Checkbox>
          </div>
          <div className="col text-right">
            <Link to={'/'} >Forgot Password ?</Link>
          </div>
        </div>
        <div className='mt-4'>
          <Button
            onClick={() => form.submit()}
            type='primary' 
            style={{
              width : '100%'
            }} 
            size='large'
          >
            Login
          </Button>
        </div>
        <SocialLogin/>
        <div className='mt-4 text-center' ></div>
      </Card>
    </div>
  )
}

export default Login