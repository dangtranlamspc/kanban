import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SocialLogin from './components/SocialLogin';

const {Title, Paragraph, Text} = Typography

const SignUp = () => {
  const [form] = Form.useForm();

  const [isRemember, setIsRemember] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (values: {name : string ,email : string; password : string}) => {
    console.log(values)
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
          <Title level={2}>Create an account</Title>
          <Paragraph type='secondary'>
            Start your 30-day free trial.
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
            name={'name'} 
            label='Name'
            rules={[
              {
                required : true,
                message : 'Please enter your name ! '
              }
            ]}
          >
            <Input placeholder='Enter your name' allowClear/>
          </Form.Item>
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
            <Input.Password  placeholder='Enter your password' maxLength={100} type='password' />
          </Form.Item>
        </Form>
        <div className='mt-4 mb-4'>
          <Button
            onClick={() => form.submit()}
            type='primary' 
            style={{
              width : '100%'
            }} 
            size='large'
          >
            Getting Start
          </Button>
        </div>
          <SocialLogin/>
        <div className='mt-4 text-center'>
          <Space>
            <Text type='secondary'>You have an account ?</Text>
            <Link to={'/'}>Login</Link>
          </Space>
        </div>
      </Card>
    </>
  )
}

export default SignUp