import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialLogin from './components/SocialLogin'

const {Title, Paragraph, Text} = Typography

const Login = () => {

  const [form] = Form.useForm();

  const [isRemember, setIsRemember] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (value: {email : string; password : string}) => {

  }
  return (
    <>
      <Card style={{width : '50%'}}>
        <div className='text-center'>
          <img
            className='mb-3'
            src={'https://firebasestorage.googleapis.com/v0/b/kanban-2fee4.appspot.com/o/kanbanlogo.png?alt=media&token=8bf7e583-b672-4511-b657-07126e4ad0aa'}
            style={{width:48, height :48}}
          />
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
            <Input placeholder='Enter your email' allowClear maxLength={100} type='email' />
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
            <Input.Password placeholder='Enter your password' maxLength={100} type='password' />
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
        <div className='mt-4 mb-4'>
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
        <div className='mt-4 text-center'>
          <Space>
            <Text type='secondary'>Don't have an account ?</Text>
            <Link to={'/sign-up'}>SignUp</Link>
          </Space>
        </div>
      </Card>
    </>
  )
}

export default Login